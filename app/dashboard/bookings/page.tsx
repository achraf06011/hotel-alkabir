import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'
import { formatPrice, formatDate, getBookingStatusLabel } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, BedDouble } from 'lucide-react'

export default async function BookingsPage() {
  const session = await getServerSession(authOptions)
  if (!session) return null

  const bookings = await prisma.booking.findMany({
    where: { userId: session.user.id },
    include: {
      room: { include: { images: { where: { isPrimary: true }, take: 1 } } },
      payment: true,
    },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold">Mes réservations</h1>
          <p className="text-muted-foreground text-sm">{bookings.length} réservation{bookings.length !== 1 ? 's' : ''} au total</p>
        </div>
        <Button variant="gold" size="sm" asChild>
          <Link href="/booking">Nouvelle réservation</Link>
        </Button>
      </div>

      {bookings.length === 0 ? (
        <div className="bg-card border border-border rounded-2xl p-12 text-center">
          <Calendar className="h-16 w-16 text-muted-foreground/20 mx-auto mb-4" />
          <h3 className="font-serif text-xl font-semibold mb-2">Aucune réservation</h3>
          <p className="text-muted-foreground mb-6">Commencez votre aventure à l&apos;Hotel Alkabir</p>
          <Button variant="gold" asChild>
            <Link href="/booking">Réserver maintenant</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => {
            const status = getBookingStatusLabel(booking.status)
            return (
              <div key={booking.id} className="bg-card border border-border rounded-2xl p-5 hover:border-gold/30 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className="w-full sm:w-24 h-20 sm:h-20 rounded-xl bg-muted overflow-hidden shrink-0 flex items-center justify-center">
                    <BedDouble className="h-8 w-8 text-muted-foreground" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="font-serif text-lg font-semibold">{booking.room.name}</h3>
                      <Badge variant={
                        status.color === 'green' ? 'success' :
                        status.color === 'yellow' ? 'warning' :
                        status.color === 'blue' ? 'info' :
                        status.color === 'red' ? 'error' : 'secondary'
                      }>
                        {status.label}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-3 text-sm">
                      <div>
                        <p className="text-xs text-muted-foreground">Arrivée</p>
                        <p className="font-medium">{formatDate(booking.checkIn, 'dd/MM/yyyy')}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Départ</p>
                        <p className="font-medium">{formatDate(booking.checkOut, 'dd/MM/yyyy')}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Durée</p>
                        <p className="font-medium">{booking.nights} nuit{booking.nights > 1 ? 's' : ''}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Référence</p>
                        <p className="font-mono font-medium text-xs">{booking.bookingRef}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Voyageurs</p>
                        <p className="font-medium">{booking.adults} adulte{booking.adults > 1 ? 's' : ''}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Total</p>
                        <p className="font-bold text-gold">{formatPrice(booking.totalPrice)}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/booking/confirmation?ref=${booking.bookingRef}`}>Voir les détails</Link>
                  </Button>
                  {booking.status === 'CONFIRMED' || booking.status === 'PENDING' ? (
                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10">
                      Annuler
                    </Button>
                  ) : null}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
