import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'
import { formatPrice, formatDate } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { FileText, Download } from 'lucide-react'

export default async function InvoicesPage() {
  const session = await getServerSession(authOptions)
  if (!session) return null

  const bookings = await prisma.booking.findMany({
    where: { userId: session.user.id, status: { in: ['CONFIRMED', 'CHECKED_IN', 'CHECKED_OUT'] } },
    include: { room: true, payment: true },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-bold">Mes factures</h1>
        <p className="text-muted-foreground text-sm">{bookings.length} facture{bookings.length !== 1 ? 's' : ''}</p>
      </div>

      {bookings.length === 0 ? (
        <div className="bg-card border border-border rounded-2xl p-12 text-center">
          <FileText className="h-16 w-16 text-muted-foreground/20 mx-auto mb-4" />
          <p className="text-muted-foreground">Aucune facture disponible</p>
        </div>
      ) : (
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/40">
              <tr>
                <th className="text-left p-4 font-medium text-muted-foreground">Référence</th>
                <th className="text-left p-4 font-medium text-muted-foreground hidden md:table-cell">Chambre</th>
                <th className="text-left p-4 font-medium text-muted-foreground hidden sm:table-cell">Date</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Montant</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Statut</th>
                <th className="text-right p-4 font-medium text-muted-foreground">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-muted/20 transition-colors">
                  <td className="p-4 font-mono text-xs">{booking.bookingRef}</td>
                  <td className="p-4 hidden md:table-cell">{booking.room.name}</td>
                  <td className="p-4 hidden sm:table-cell text-muted-foreground">{formatDate(booking.createdAt)}</td>
                  <td className="p-4 font-semibold text-gold">{formatPrice(booking.totalPrice)}</td>
                  <td className="p-4">
                    <Badge variant={booking.payment?.status === 'PAID' ? 'success' : 'warning'}>
                      {booking.payment?.status === 'PAID' ? 'Payé' : 'En attente'}
                    </Badge>
                  </td>
                  <td className="p-4 text-right">
                    <Button variant="outline" size="sm" className="gap-1.5">
                      <Download className="h-3.5 w-3.5" />
                      PDF
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
