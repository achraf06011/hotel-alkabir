import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { registerSchema } from '@/lib/validations'
import { sendVerificationEmail, generateToken } from '@/lib/email'
import bcrypt from 'bcryptjs'
import { addHours } from 'date-fns'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = registerSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 422 })
    }

    const { name, email, password } = parsed.data

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json({ error: 'Cet email est déjà utilisé' }, { status: 409 })
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
      select: { id: true, name: true, email: true },
    })

    // Create verification token (24h expiry)
    const token = generateToken()
    await prisma.verificationToken.create({
      data: {
        identifier: email,
        token,
        expires: addHours(new Date(), 24),
      },
    })

    // Send verification email
    try {
      await sendVerificationEmail(email, name, token)
    } catch (emailError) {
      console.error('[EMAIL ERROR]', emailError)
      // Don't fail registration if email fails — user can resend
    }

    return NextResponse.json(
      { user, message: 'Compte créé ! Vérifiez votre email pour activer votre compte.' },
      { status: 201 }
    )
  } catch (error) {
    console.error('[REGISTER]', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
