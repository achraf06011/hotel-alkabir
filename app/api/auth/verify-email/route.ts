import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get('token')

  if (!token) {
    return NextResponse.json({ error: 'Token manquant' }, { status: 400 })
  }

  const record = await prisma.verificationToken.findUnique({ where: { token } })

  if (!record) {
    return NextResponse.json({ error: 'Lien invalide ou déjà utilisé' }, { status: 400 })
  }

  if (record.expires < new Date()) {
    await prisma.verificationToken.delete({ where: { token } })
    return NextResponse.json({ error: 'Lien expiré. Veuillez vous réinscrire.' }, { status: 400 })
  }

  // Mark email as verified
  await prisma.user.update({
    where: { email: record.identifier },
    data: { emailVerified: new Date() },
  })

  // Delete used token
  await prisma.verificationToken.delete({ where: { token } })

  return NextResponse.redirect(new URL('/login?verified=1', request.url))
}
