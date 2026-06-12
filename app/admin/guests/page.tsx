import { prisma } from '@/lib/prisma'
import { formatDate } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { getInitials } from '@/lib/utils'
import { Users } from 'lucide-react'

export const dynamic = 'force-dynamic'


export default async function AdminGuestsPage() {
  const users = await prisma.user.findMany({
    where: { role: 'USER' },
    include: {
      _count: { select: { bookings: true } },
    },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-bold">Gestion des clients</h1>
        <p className="text-muted-foreground text-sm">{users.length} client{users.length !== 1 ? 's' : ''} enregistré{users.length !== 1 ? 's' : ''}</p>
      </div>

      {users.length === 0 ? (
        <div className="bg-card border border-border rounded-2xl p-12 text-center">
          <Users className="h-16 w-16 text-muted-foreground/20 mx-auto mb-4" />
          <p className="text-muted-foreground">Aucun client enregistré</p>
        </div>
      ) : (
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/30 border-b border-border">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Client</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden md:table-cell">Email</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden lg:table-cell">Inscrit le</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Réservations</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={user.image || ''} />
                        <AvatarFallback className="text-xs">{getInitials(user.name || user.email)}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{user.name || 'Sans nom'}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell text-muted-foreground">{user.email}</td>
                  <td className="px-4 py-3 hidden lg:table-cell text-muted-foreground">{formatDate(user.createdAt)}</td>
                  <td className="px-4 py-3 text-center">{user._count.bookings}</td>
                  <td className="px-4 py-3">
                    <Badge variant={user.isActive ? 'success' : 'secondary'} className="text-xs">
                      {user.isActive ? 'Actif' : 'Inactif'}
                    </Badge>
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

