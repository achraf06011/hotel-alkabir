import { prisma } from '@/lib/prisma'
import { formatPrice, formatDate, getBookingStatusLabel } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Eye, CheckCircle, LogIn, LogOut, XCircle } from 'lucide-react'

export default async function AdminBookingsPage() {
  const bookings = await prisma.booking.findMany({
    include: {
      room: true,
      user: true,
      payment: true,
    },
    orderBy: { createdAt: 'desc' },
    take: 100,
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold">Gestion des réservations</h1>
          <p className="text-muted-foreground text-sm">{bookings.length} réservation{bookings.length !== 1 ? 's' : ''}</p>
        </div>
      </div>

      {/* Status filters */}
      <div className="flex flex-wrap gap-2">
        {['Toutes', 'PENDING', 'CONFIRMED', 'CHECKED_IN', 'CHECKED_OUT', 'CANCELLED'].map((s) => (
          <button
            key={s}
            className="px-3 py-1.5 text-xs rounded-full border border-border hover:border-gold/40 hover:text-gold transition-colors"
          >
            {s === 'Toutes' ? 'Toutes' :
             s === 'PENDING' ? 'En attente' :
             s === 'CONFIRMED' ? 'Confirmées' :
             s === 'CHECKED_IN' ? 'Arrivées' :
             s === 'CHECKED_OUT' ? 'Parties' : 'Annulées'}
          </button>
        ))}
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/30 border-b border-border">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Référence</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Client</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden md:table-cell">Chambre</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden lg:table-cell">Arrivée</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden lg:table-cell">Départ</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Montant</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Statut</th>
                <th className="text-right px-4 py-3 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {bookings.map((booking) => {
                const status = getBookingStatusLabel(booking.status)
                return (
                  <tr key={booking.id} className="hover:bg-muted/20 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{booking.bookingRef}</td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-sm">{booking.guestName}</div>
                      <div className="text-xs text-muted-foreground">{booking.guestEmail}</div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell text-sm">{booking.room.name}</td>
                    <td className="px-4 py-3 hidden lg:table-cell text-xs text-muted-foreground">{formatDate(booking.checkIn)}</td>
                    <td className="px-4 py-3 hidden lg:table-cell text-xs text-muted-foreground">{formatDate(booking.checkOut)}</td>
                    <td className="px-4 py-3 font-semibold text-gold text-sm">{formatPrice(booking.totalPrice)}</td>
                    <td className="px-4 py-3">
                      <Badge variant={
                        status.color === 'green' ? 'success' :
                        status.color === 'yellow' ? 'warning' :
                        status.color === 'blue' ? 'info' :
                        status.color === 'red' ? 'error' : 'secondary'
                      } className="text-xs">
                        {status.label}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        {booking.status === 'PENDING' && (
                          <form action={`/api/bookings/${booking.id}`} method="POST">
                            <input type="hidden" name="status" value="CONFIRMED" />
                            <Button type="submit" variant="ghost" size="icon" className="h-8 w-8 text-green-600 hover:text-green-700">
                              <CheckCircle className="h-3.5 w-3.5" />
                            </Button>
                          </form>
                        )}
                        {booking.status === 'CONFIRMED' && (
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600 hover:text-blue-700">
                            <LogIn className="h-3.5 w-3.5" />
                          </Button>
                        )}
                        {booking.status === 'CHECKED_IN' && (
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-purple-600 hover:text-purple-700">
                            <LogOut className="h-3.5 w-3.5" />
                          </Button>
                        )}
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="h-3.5 w-3.5" />
                        </Button>
                        {(booking.status === 'PENDING' || booking.status === 'CONFIRMED') && (
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                            <XCircle className="h-3.5 w-3.5" />
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
