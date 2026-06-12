import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import Image from 'next/image'
import { formatPrice, getRoomTypeLabel } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Plus, Edit, Trash2, Eye, BedDouble } from 'lucide-react'

export const dynamic = 'force-dynamic'


export default async function AdminRoomsPage() {
  const rooms = await prisma.room.findMany({
    include: {
      images: { where: { isPrimary: true }, take: 1 },
      _count: { select: { bookings: true, reviews: true } },
    },
    orderBy: { sortOrder: 'asc' },
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold">Gestion des chambres</h1>
          <p className="text-muted-foreground text-sm">{rooms.length} chambre{rooms.length !== 1 ? 's' : ''} au total</p>
        </div>
        <Button variant="gold" size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          Ajouter une chambre
        </Button>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/30 border-b border-border">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Chambre</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden md:table-cell">Type</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Prix/nuit</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden lg:table-cell">Capacité</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Statut</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden xl:table-cell">Réservations</th>
              <th className="text-right px-4 py-3 font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rooms.map((room) => (
              <tr key={room.id} className="hover:bg-muted/20 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-10 rounded-lg bg-muted overflow-hidden shrink-0">
                      {room.images[0] ? (
                        <Image src={room.images[0].url} alt={room.name} width={48} height={40} className="object-cover w-full h-full" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <BedDouble className="h-4 w-4 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{room.name}</p>
                      {room.roomNumber && <p className="text-xs text-muted-foreground">N° {room.roomNumber}</p>}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <Badge variant="secondary" className="text-xs">{getRoomTypeLabel(room.type)}</Badge>
                </td>
                <td className="px-4 py-3 font-semibold text-gold">{formatPrice(room.price)}</td>
                <td className="px-4 py-3 hidden lg:table-cell text-muted-foreground">{room.capacity} pers.</td>
                <td className="px-4 py-3">
                  <Badge variant={
                    room.status === 'AVAILABLE' ? 'success' :
                    room.status === 'OCCUPIED' ? 'warning' : 'secondary'
                  } className="text-xs">
                    {room.status === 'AVAILABLE' ? 'Disponible' :
                     room.status === 'OCCUPIED' ? 'Occupée' : 'Maintenance'}
                  </Badge>
                </td>
                <td className="px-4 py-3 hidden xl:table-cell text-muted-foreground">{room._count.bookings}</td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button variant="ghost" size="icon" asChild className="h-8 w-8">
                      <Link href={`/rooms/${room.id}`} target="_blank"><Eye className="h-3.5 w-3.5" /></Link>
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

