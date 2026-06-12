import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 403 })
    }

    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

    const [
      totalUsers,
      totalRooms,
      totalBookings,
      monthRevenue,
      activeGuests,
      pendingMessages,
      occupiedRooms,
    ] = await Promise.all([
      prisma.user.count({ where: { role: 'USER' } }),
      prisma.room.count(),
      prisma.booking.count({ where: { status: { not: 'CANCELLED' } } }),
      prisma.payment.aggregate({ where: { status: 'PAID', createdAt: { gte: startOfMonth } }, _sum: { amount: true } }),
      prisma.booking.count({ where: { status: 'CHECKED_IN' } }),
      prisma.contact.count({ where: { status: 'NEW' } }),
      prisma.room.count({ where: { status: 'OCCUPIED' } }),
    ])

    return NextResponse.json({
      totalUsers,
      totalRooms,
      totalBookings,
      monthRevenue: monthRevenue._sum.amount || 0,
      activeGuests,
      pendingMessages,
      occupancyRate: totalRooms > 0 ? Math.round((occupiedRooms / totalRooms) * 100) : 0,
    })
  } catch (error) {
    console.error('[ADMIN STATS]', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
