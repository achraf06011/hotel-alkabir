import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true, name: true, email: true, image: true,
        phone: true, address: true, city: true, country: true,
        loyaltyPoints: true, createdAt: true,
      },
    })

    return NextResponse.json({ user })
  } catch (error) {
    console.error('[PROFILE GET]', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

    const body = await request.json()
    const { name, phone, address, city, country } = body

    const user = await prisma.user.update({
      where: { id: session.user.id },
      data: { name, phone, address, city, country },
      select: { id: true, name: true, email: true, phone: true, address: true, city: true, country: true },
    })

    return NextResponse.json({ user })
  } catch (error) {
    console.error('[PROFILE PATCH]', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
