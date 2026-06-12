import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    const capacity = searchParams.get('capacity')
    const checkIn = searchParams.get('checkIn')
    const checkOut = searchParams.get('checkOut')
    const featured = searchParams.get('featured')

    const where: Record<string, unknown> = { status: 'AVAILABLE' }

    if (type) where.type = type
    if (capacity) where.capacity = { gte: parseInt(capacity) }
    if (minPrice || maxPrice) {
      where.price = {}
      if (minPrice) (where.price as Record<string, number>).gte = parseFloat(minPrice)
      if (maxPrice) (where.price as Record<string, number>).lte = parseFloat(maxPrice)
    }
    if (featured === 'true') where.featured = true

    // Exclude rooms that are booked during the requested period
    if (checkIn && checkOut) {
      where.bookings = {
        none: {
          status: { in: ['CONFIRMED', 'CHECKED_IN'] },
          OR: [
            { checkIn: { lte: new Date(checkOut) }, checkOut: { gte: new Date(checkIn) } },
          ],
        },
      }
    }

    const rooms = await prisma.room.findMany({
      where,
      include: {
        images: { where: { isPrimary: true }, take: 1 },
        amenities: { include: { amenity: true }, take: 5 },
      },
      orderBy: { sortOrder: 'asc' },
    })

    return NextResponse.json({ rooms })
  } catch (error) {
    console.error('[ROOMS GET]', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 403 })
    }

    const body = await request.json()
    const room = await prisma.room.create({ data: body })
    return NextResponse.json({ room }, { status: 201 })
  } catch (error) {
    console.error('[ROOMS POST]', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
