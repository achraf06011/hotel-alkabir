import { prisma } from '@/lib/prisma'
import { formatPrice, formatDate, getBookingStatusLabel } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import {

export const dynamic = 'force-dynamic'

  TrendingUp, TrendingDown, Users, Calendar, BedDouble,
  DollarSign, MessageSquare, Star, CheckCircle, Clock
} from 'lucide-react'

async function getStats() {
  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
  const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
  const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0)

  const [
    totalBookings,
    monthBookings,
    lastMonthBookings,
    totalRevenue,
    monthRevenue,
    activeGuests,
    totalRooms,
    pendingMessages,
    pendingReviews,
    recentBookings,
  ] = await Promise.all([
    prisma.booking.count({ where: { status: { not: 'CANCELLED' } } }),
    prisma.booking.count({ where: { createdAt: { gte: startOfMonth }, status: { not: 'CANCELLED' } } }),
    prisma.booking.count({ where: { createdAt: { gte: startOfLastMonth, lte: endOfLastMonth }, status: { not: 'CANCELLED' } } }),
    prisma.payment.aggregate({ where: { status: 'PAID' }, _sum: { amount: true } }),
    prisma.payment.aggregate({ where: { status: 'PAID', createdAt: { gte: startOfMonth } }, _sum: { amount: true } }),
    prisma.booking.count({ where: { status: 'CHECKED_IN' } }),
    prisma.room.count(),
    prisma.contact.count({ where: { status: 'NEW' } }),
    prisma.review.count({ where: { approved: false } }),
    prisma.booking.findMany({
      take: 8,
      orderBy: { createdAt: 'desc' },
      include: { room: true, user: true },
    }),
  ])

  const bookingChange = lastMonthBookings > 0
    ? ((monthBookings - lastMonthBookings) / lastMonthBookings) * 100
    : 0

  return {
    totalBookings,
    monthBookings,
    bookingChange,
    totalRevenue: totalRevenue._sum.amount || 0,
    monthRevenue: monthRevenue._sum.amount || 0,
    activeGuests,
    totalRooms,
    occupancyRate: totalRooms > 0 ? Math.round((activeGuests / totalRooms) * 100) : 0,
    pendingMessages,
    pendingReviews,
    recentBookings,
  }
}

export default async function AdminPage() {
  const stats = await getStats()

  const statCards = [
    {
      title: 'Revenus du mois',
      value: formatPrice(stats.monthRevenue),
      sub: `Total: ${formatPrice(stats.totalRevenue)}`,
      icon: DollarSign,
      color: 'text-green-500',
      bg: 'bg-green-50 dark:bg-green-900/10',
    },
    {
      title: 'Réservations du mois',
      value: stats.monthBookings.toString(),
      sub: `${stats.bookingChange > 0 ? '+' : ''}${stats.bookingChange.toFixed(0)}% vs mois dernier`,
      icon: Calendar,
      color: 'text-blue-500',
      bg: 'bg-blue-50 dark:bg-blue-900/10',
    },
    {
      title: 'Clients en séjour',
      value: stats.activeGuests.toString(),
      sub: `Taux d'occupation: ${stats.occupancyRate}%`,
      icon: Users,
      color: 'text-purple-500',
      bg: 'bg-purple-50 dark:bg-purple-900/10',
    },
    {
      title: 'Messages non lus',
      value: stats.pendingMessages.toString(),
      sub: `${stats.pendingReviews} avis en attente`,
      icon: MessageSquare,
      color: 'text-orange-500',
      bg: 'bg-orange-50 dark:bg-orange-900/10',
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-bold">Tableau de bord</h1>
        <p className="text-muted-foreground text-sm">Aperçu en temps réel de votre hôtel</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {statCards.map(({ title, value, sub, icon: Icon, color, bg }) => (
          <div key={title} className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 rounded-lg ${bg} flex items-center justify-center`}>
                <Icon className={`h-5 w-5 ${color}`} />
              </div>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </div>
            <div className="font-bold text-2xl mb-0.5">{value}</div>
            <div className="text-xs text-muted-foreground">{title}</div>
            <div className="text-xs text-muted-foreground/60 mt-1">{sub}</div>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { href: '/admin/bookings', label: 'Nouvelle réservation', icon: Calendar },
          { href: '/admin/rooms', label: 'Gérer les chambres', icon: BedDouble },
          { href: '/admin/messages', label: `${stats.pendingMessages} messages`, icon: MessageSquare },
          { href: '/admin/reviews', label: `${stats.pendingReviews} avis`, icon: Star },
        ].map(({ href, label, icon: Icon }) => (
          <a key={href} href={href} className="bg-card border border-border rounded-xl p-4 hover:border-gold/40 transition-colors group">
            <Icon className="h-5 w-5 text-muted-foreground group-hover:text-gold mb-2 transition-colors" />
            <p className="text-sm font-medium">{label}</p>
          </a>
        ))}
      </div>

      {/* Recent bookings */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-border flex items-center justify-between">
          <h2 className="font-semibold">Réservations récentes</h2>
          <a href="/admin/bookings" className="text-xs text-gold hover:underline">Voir tout</a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/30">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Référence</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Client</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden md:table-cell">Chambre</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden lg:table-cell">Arrivée</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Montant</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {stats.recentBookings.map((booking) => {
                const status = getBookingStatusLabel(booking.status)
                return (
                  <tr key={booking.id} className="hover:bg-muted/20 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs">{booking.bookingRef}</td>
                    <td className="px-4 py-3">
                      <div className="font-medium">{booking.guestName}</div>
                      <div className="text-xs text-muted-foreground">{booking.guestEmail}</div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">{booking.room.name}</td>
                    <td className="px-4 py-3 hidden lg:table-cell text-muted-foreground">{formatDate(booking.checkIn)}</td>
                    <td className="px-4 py-3 font-semibold text-gold">{formatPrice(booking.totalPrice)}</td>
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

