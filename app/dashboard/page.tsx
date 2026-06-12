import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'
import { formatPrice, formatDate, getBookingStatusLabel } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, Star, Trophy, ArrowRight } from 'lucide-react'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  if (!session) return null

  const [bookings, user] = await Promise.all([
    prisma.booking.findMany({
      where: { userId: session.user.id },
      include: { room: { include: { images: { where: { isPrimary: true }, take: 1 } } } },
      orderBy: { createdAt: 'desc' },
      take: 5,
    }),
    prisma.user.findUnique({ where: { id: session.user.id } }),
  ])

  const totalSpent = bookings.filter(b => b.status !== 'CANCELLED').reduce((sum, b) => sum + b.totalPrice, 0)
  const completedStays = bookings.filter(b => b.status === 'CHECKED_OUT').length

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-[#0A0A0A] to-[#1a1a2e] text-white rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/60 text-sm mb-1">Bienvenue,</p>
            <h1 className="font-serif text-2xl font-bold">{session.user.name}</h1>
            <p className="text-gold text-sm mt-1">Membre Gold • {user?.loyaltyPoints || 0} points</p>
          </div>
          <div className="w-16 h-16 rounded-2xl bg-gold/10 flex items-center justify-center">
            <Trophy className="h-8 w-8 text-gold" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="bg-white/10 rounded-xl p-3 text-center">
            <div className="text-xl font-bold text-gold">{bookings.length}</div>
            <div className="text-xs text-white/60">Réservations</div>
          </div>
          <div className="bg-white/10 rounded-xl p-3 text-center">
            <div className="text-xl font-bold text-gold">{completedStays}</div>
            <div className="text-xs text-white/60">Séjours</div>
          </div>
          <div className="bg-white/10 rounded-xl p-3 text-center">
            <div className="text-xl font-bold text-gold">{formatPrice(totalSpent).replace('MAD', '').trim()}</div>
            <div className="text-xs text-white/60">MAD dépensés</div>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <Button variant="gold" className="h-auto py-4 flex-col gap-2" asChild>
          <Link href="/booking">
            <Calendar className="h-5 w-5" />
            <span className="text-xs font-medium">Réserver</span>
          </Link>
        </Button>
        <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
          <Link href="/dashboard/bookings">
            <Star className="h-5 w-5" />
            <span className="text-xs font-medium">Mes séjours</span>
          </Link>
        </Button>
        <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
          <Link href="/rooms">
            <ArrowRight className="h-5 w-5" />
            <span className="text-xs font-medium">Nos chambres</span>
          </Link>
        </Button>
      </div>

      {/* Recent bookings */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-serif text-xl font-semibold">Réservations récentes</h2>
          <Link href="/dashboard/bookings" className="text-sm text-gold hover:underline flex items-center gap-1">
            Voir tout <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {bookings.length === 0 ? (
          <div className="text-center py-10">
            <Calendar className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-muted-foreground">Aucune réservation pour le moment</p>
            <Button variant="gold" size="sm" className="mt-4" asChild>
              <Link href="/booking">Faire une réservation</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {bookings.map((booking) => {
              const status = getBookingStatusLabel(booking.status)
              return (
                <div key={booking.id} className="flex items-center gap-4 p-3 rounded-xl border border-border hover:border-gold/30 transition-colors">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="font-medium text-sm truncate">{booking.room.name}</p>
                      <Badge variant={
                        status.color === 'green' ? 'success' :
                        status.color === 'yellow' ? 'warning' :
                        status.color === 'red' ? 'error' : 'secondary'
                      } className="text-xs shrink-0">
                        {status.label}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(booking.checkIn)} – {formatDate(booking.checkOut)}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-semibold text-sm text-gold">{formatPrice(booking.totalPrice)}</p>
                    <p className="text-xs text-muted-foreground">{booking.nights} nuit{booking.nights > 1 ? 's' : ''}</p>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
