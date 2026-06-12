import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

    const { id } = await params
    const booking = await prisma.booking.findUnique({
      where: { id },
      include: { room: true, payment: true },
    })

    if (!booking) return NextResponse.json({ error: 'Réservation introuvable' }, { status: 404 })

    // Users can only see their own bookings
    if (session.user.role !== 'ADMIN' && booking.userId !== session.user.id) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 403 })
    }

    return NextResponse.json({ booking })
  } catch (error) {
    console.error('[BOOKING GET]', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

    const { id } = await params
    const body = await request.json()
    const { status } = body

    const booking = await prisma.booking.findUnique({ where: { id } })
    if (!booking) return NextResponse.json({ error: 'Réservation introuvable' }, { status: 404 })

    // Users can only cancel their own pending/confirmed bookings
    if (session.user.role !== 'ADMIN') {
      if (booking.userId !== session.user.id) {
        return NextResponse.json({ error: 'Non autorisé' }, { status: 403 })
      }
      if (status !== 'CANCELLED') {
        return NextResponse.json({ error: 'Action non autorisée' }, { status: 403 })
      }
      if (!['PENDING', 'CONFIRMED'].includes(booking.status)) {
        return NextResponse.json({ error: 'Cette réservation ne peut pas être annulée' }, { status: 409 })
      }
    }

    const updated = await prisma.booking.update({
      where: { id },
      data: { status },
    })

    return NextResponse.json({ booking: updated })
  } catch (error) {
    console.error('[BOOKING PATCH]', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
