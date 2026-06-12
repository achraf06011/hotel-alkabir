import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

    const body = await request.json()
    const { roomId, rating, title, comment } = body

    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json({ error: 'Note invalide (1-5)' }, { status: 422 })
    }

    const review = await prisma.review.create({
      data: {
        userId: session.user.id,
        roomId: roomId || null,
        rating,
        title,
        body: comment || '',
        approved: false,
      },
    })

    return NextResponse.json({ review }, { status: 201 })
  } catch (error) {
    console.error('[REVIEWS POST]', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const roomId = searchParams.get('roomId')
    const featured = searchParams.get('featured')
    const limit = parseInt(searchParams.get('limit') || '10')

    const where: Record<string, unknown> = { approved: true }
    if (roomId) where.roomId = roomId
    if (featured === 'true') where.featured = true

    const reviews = await prisma.review.findMany({
      where,
      include: { user: { select: { name: true, image: true } }, room: { select: { name: true } } },
      orderBy: { createdAt: 'desc' },
      take: limit,
    })

    return NextResponse.json({ reviews })
  } catch (error) {
    console.error('[REVIEWS GET]', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
