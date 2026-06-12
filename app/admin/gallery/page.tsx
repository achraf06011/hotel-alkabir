import { prisma } from '@/lib/prisma'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Plus, Trash2, Star } from 'lucide-react'

export const dynamic = 'force-dynamic'


export default async function AdminGalleryPage() {
  const images = await prisma.galleryImage.findMany({
    orderBy: { sortOrder: 'asc' },
  })

  const categories = Array.from(new Set(images.map((img) => img.category).filter(Boolean)))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold">Gestion de la galerie</h1>
          <p className="text-muted-foreground text-sm">{images.length} image{images.length !== 1 ? 's' : ''}</p>
        </div>
        <Button variant="gold" size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          Ajouter des images
        </Button>
      </div>

      {/* Category summary */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <Badge key={cat} variant="secondary" className="text-xs">
            {cat} ({images.filter((i) => i.category === cat).length})
          </Badge>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {images.map((img) => (
          <div key={img.id} className="group relative aspect-square rounded-xl overflow-hidden bg-muted">
            <Image
              src={img.url}
              alt={img.alt || img.title || ''}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {img.featured && (
              <div className="absolute top-2 left-2">
                <div className="w-6 h-6 bg-gold rounded-full flex items-center justify-center">
                  <Star className="h-3 w-3 text-black" />
                </div>
              </div>
            )}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
              <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:text-red-400 hover:bg-red-400/20">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            {img.category && (
              <div className="absolute bottom-0 inset-x-0 p-2 bg-gradient-to-t from-black/60 to-transparent">
                <p className="text-white text-xs truncate">{img.category}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

