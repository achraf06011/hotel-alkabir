import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { formatPrice, getRoomTypeLabel } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  Star, Users, Maximize2, BedDouble, Eye, Layers, CheckCircle2,
  Phone, Calendar, ArrowLeft, Share2, Heart
} from 'lucide-react'
import { RoomBookingWidget } from '@/components/rooms/RoomBookingWidget'
import { RoomGallery } from '@/components/rooms/RoomGallery'

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const room = await prisma.room.findUnique({ where: { id } })
  if (!room) return {}
  return {
    title: `${room.name} | Hotel Alkabir`,
    description: room.shortDesc || room.description.slice(0, 160),
  }
}

async function getRoom(id: string) {
  return prisma.room.findUnique({
    where: { id },
    include: {
      images: { orderBy: { sortOrder: 'asc' } },
      amenities: { include: { amenity: true } },
      reviews: { where: { approved: true }, orderBy: { createdAt: 'desc' }, take: 5 },
      _count: { select: { bookings: true, reviews: true } },
    },
  })
}

export default async function RoomDetailPage({ params }: PageProps) {
  const { id } = await params
  const room = await getRoom(id)

  if (!room) notFound()

  const avgRating = room.reviews.length
    ? room.reviews.reduce((sum, r) => sum + r.rating, 0) / room.reviews.length
    : 4.9

  const amenitiesByCategory = room.amenities.reduce(
    (acc, { amenity }) => {
      const cat = amenity.category || 'general'
      if (!acc[cat]) acc[cat] = []
      acc[cat].push(amenity)
      return acc
    },
    {} as Record<string, typeof room.amenities[0]['amenity'][]>
  )

  return (
    <div className="pt-20">
      {/* Breadcrumb */}
      <div className="bg-muted/30 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">Accueil</Link>
          <span>/</span>
          <Link href="/rooms" className="hover:text-foreground transition-colors">Chambres</Link>
          <span>/</span>
          <span className="text-foreground">{room.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-4 mb-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <Badge variant="gold">{getRoomTypeLabel(room.type)}</Badge>
              {room.featured && <Badge variant="gold-outline">✦ Coup de cœur</Badge>}
            </div>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">{room.name}</h1>
            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
              {room.view && (
                <div className="flex items-center gap-1.5">
                  <Eye className="h-4 w-4 text-gold" />
                  {room.view}
                </div>
              )}
              {room.floor && (
                <div className="flex items-center gap-1.5">
                  <Layers className="h-4 w-4 text-gold" />
                  Étage {room.floor}
                </div>
              )}
              <div className="flex items-center gap-1.5">
                <Star className="h-4 w-4 text-gold fill-gold" />
                <span className="font-medium text-foreground">{avgRating.toFixed(1)}</span>
                <span>({room._count.reviews} avis)</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="p-2.5 rounded-xl border border-border hover:border-gold hover:text-gold transition-colors">
              <Share2 className="h-4 w-4" />
            </button>
            <button className="p-2.5 rounded-xl border border-border hover:border-red-400 hover:text-red-400 transition-colors">
              <Heart className="h-4 w-4" />
            </button>
            <Button variant="gold" asChild>
              <Link href={`/booking?roomId=${room.id}`}>
                <Calendar className="h-4 w-4 mr-2" />
                Réserver
              </Link>
            </Button>
          </div>
        </div>

        {/* Gallery */}
        <RoomGallery images={room.images} roomName={room.name} />

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
          {/* Left: Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick specs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { icon: Users, label: 'Capacité', value: `${room.capacity} personnes` },
                ...(room.size ? [{ icon: Maximize2, label: 'Superficie', value: `${room.size} m²` }] : []),
                ...(room.bedType ? [{ icon: BedDouble, label: 'Literie', value: room.bedType }] : []),
                ...(room.floor ? [{ icon: Layers, label: 'Étage', value: `${room.floor}e étage` }] : []),
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="bg-muted/40 rounded-xl p-4 text-center">
                  <Icon className="h-5 w-5 text-gold mx-auto mb-2" />
                  <div className="text-xs text-muted-foreground">{label}</div>
                  <div className="font-semibold text-sm mt-0.5">{value}</div>
                </div>
              ))}
            </div>

            {/* Description */}
            <div>
              <h2 className="font-serif text-2xl font-semibold mb-4">Description</h2>
              <div className="prose prose-slate dark:prose-invert max-w-none">
                {room.description.split('\n\n').map((paragraph, i) => (
                  <p key={i} className="text-muted-foreground leading-relaxed mb-3">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <Separator />

            {/* Amenities */}
            <div>
              <h2 className="font-serif text-2xl font-semibold mb-6">Équipements & Services</h2>
              <div className="space-y-6">
                {Object.entries(amenitiesByCategory).map(([category, amenities]) => (
                  <div key={category}>
                    <h3 className="text-sm font-semibold text-gold uppercase tracking-wider mb-3 capitalize">
                      {category}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {amenities.map((amenity) => (
                        <div key={amenity.id} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                          <CheckCircle2 className="h-4 w-4 text-gold shrink-0" />
                          {amenity.name}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Reviews */}
            {room.reviews.length > 0 && (
              <div>
                <h2 className="font-serif text-2xl font-semibold mb-6">
                  Avis clients
                  <span className="text-lg font-normal text-muted-foreground ml-3">({room._count.reviews})</span>
                </h2>
                <div className="space-y-4">
                  {room.reviews.map((review) => (
                    <div key={review.id} className="bg-muted/30 rounded-xl p-4">
                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`h-3.5 w-3.5 ${i < review.rating ? 'text-gold fill-gold' : 'text-muted-foreground/30'}`} />
                        ))}
                      </div>
                      {review.title && <p className="font-semibold text-sm mb-1">{review.title}</p>}
                      <p className="text-sm text-muted-foreground">{review.body}</p>
                      <p className="text-xs text-muted-foreground mt-2">{review.guestName || 'Client vérifié'}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: Booking widget */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <RoomBookingWidget room={room} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
