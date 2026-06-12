import { prisma } from '@/lib/prisma'
import { formatDate } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Star, CheckCircle, Trash2 } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getInitials } from '@/lib/utils'

export default async function AdminReviewsPage() {
  const reviews = await prisma.review.findMany({
    include: {
      user: true,
      room: true,
    },
    orderBy: { createdAt: 'desc' },
  })

  const pendingCount = reviews.filter((r) => !r.approved).length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-bold">Gestion des avis</h1>
        <p className="text-muted-foreground text-sm">
          {pendingCount > 0 && (
            <span className="text-gold font-medium">{pendingCount} en attente de modération — </span>
          )}
          {reviews.length} avis au total
        </p>
      </div>

      {reviews.length === 0 ? (
        <div className="bg-card border border-border rounded-2xl p-12 text-center">
          <Star className="h-16 w-16 text-muted-foreground/20 mx-auto mb-4" />
          <p className="text-muted-foreground">Aucun avis reçu</p>
        </div>
      ) : (
        <div className="space-y-3">
          {reviews.map((review) => (
            <div
              key={review.id}
              className={`bg-card border rounded-xl p-5 ${
                !review.approved ? 'border-yellow-300/50 bg-yellow-50/30 dark:bg-yellow-900/10' : 'border-border'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <Avatar className="h-10 w-10 shrink-0">
                    <AvatarImage src={review.user?.image || ''} />
                    <AvatarFallback className="text-xs">{getInitials(review.user?.name || review.user?.email || 'A')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="font-semibold">{review.user?.name || review.guestName || 'Anonyme'}</span>
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3.5 w-3.5 ${i < review.rating ? 'fill-gold text-gold' : 'text-muted-foreground/30'}`}
                          />
                        ))}
                      </div>
                      {review.room && (
                        <span className="text-xs text-muted-foreground">— {review.room.name}</span>
                      )}
                    </div>
                    {review.title && <p className="font-medium text-sm mb-1">{review.title}</p>}
                    <p className="text-muted-foreground text-sm line-clamp-3">{review.body}</p>
                    <p className="text-xs text-muted-foreground/60 mt-1.5">{formatDate(review.createdAt)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Badge variant={review.approved ? 'success' : 'warning'} className="text-xs">
                    {review.approved ? 'Approuvé' : 'En attente'}
                  </Badge>
                  {!review.approved && (
                    <Button variant="outline" size="icon" className="h-8 w-8 text-green-600 hover:text-green-700">
                      <CheckCircle className="h-3.5 w-3.5" />
                    </Button>
                  )}
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
