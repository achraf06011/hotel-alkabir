import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { bookingSchema } from '@/lib/validations'
import { calculateBookingTotal, generateBookingRef } from '@/lib/utils'
import { differenceInDays } from 'date-fns'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = bookingSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 422 })
    }

    const { roomId, checkIn, checkOut, adults, children, guestName, guestEmail, guestPhone, guestCountry, specialRequests } = parsed.data

    const session = await getServerSession(authOptions)

    const room = await prisma.room.findUnique({ where: { id: roomId } })
    if (!room) return NextResponse.json({ error: 'Chambre introuvable' }, { status: 404 })

    const checkInDate = new Date(checkIn)
    const checkOutDate = new Date(checkOut)
    const nights = differenceInDays(checkOutDate, checkInDate)

    if (nights < 1) {
      return NextResponse.json({ error: 'Dates invalides' }, { status: 422 })
    }

    // Check availability
    const conflict = await prisma.booking.findFirst({
      where: {
        roomId,
        status: { in: ['CONFIRMED', 'CHECKED_IN'] },
        OR: [{ checkIn: { lte: checkOutDate }, checkOut: { gte: checkInDate } }],
      },
    })
    if (conflict) {
      return NextResponse.json({ error: 'Cette chambre n\'est pas disponible pour ces dates' }, { status: 409 })
    }

    const { subtotal, taxes, total } = calculateBookingTotal(room.price, nights)
    const bookingRef = generateBookingRef()

    const booking = await prisma.booking.create({
      data: {
        bookingRef,
        roomId,
        userId: session?.user.id,
        checkIn: checkInDate,
        checkOut: checkOutDate,
        nights,
        adults: adults ?? 1,
        children: children ?? 0,
        pricePerNight: room.price,
        subtotal,
        taxes,
        totalPrice: total,
        guestName,
        guestEmail,
        guestPhone,
        guestCountry,
        specialRequests,
        status: 'PENDING',
      },
    })

    return NextResponse.json({ booking, bookingRef }, { status: 201 })
  } catch (error) {
    console.error('[BOOKINGS POST]', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

    const where = session.user.role === 'ADMIN' ? {} : { userId: session.user.id }

    const bookings = await prisma.booking.findMany({
      where,
      include: { room: { include: { images: { where: { isPrimary: true }, take: 1 } } }, payment: true },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ bookings })
  } catch (error) {
    console.error('[BOOKINGS GET]', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
