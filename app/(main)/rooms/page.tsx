import { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import { RoomsClient } from '@/components/rooms/RoomsClient'

export const metadata: Metadata = {
  title: 'Chambres & Suites | Hotel Alkabir',
  description:
    'Découvrez notre sélection de chambres et suites luxueuses. Du standard raffiné à la suite présidentielle, chaque espace est une invitation au voyage.',
}

async function getRooms(searchParams: Record<string, string>) {
  const { type, minPrice, maxPrice, capacity } = searchParams

  const where: Record<string, unknown> = {
    status: 'AVAILABLE',
  }

  if (type) where.type = type
  if (capacity) where.capacity = { gte: parseInt(capacity) }
  if (minPrice || maxPrice) {
    where.price = {
      ...(minPrice ? { gte: parseFloat(minPrice) } : {}),
      ...(maxPrice ? { lte: parseFloat(maxPrice) } : {}),
    }
  }

  return prisma.room.findMany({
    where,
    include: {
      images: { orderBy: { sortOrder: 'asc' } },
      amenities: { include: { amenity: true } },
      _count: { select: { reviews: true } },
    },
    orderBy: { sortOrder: 'asc' },
  })
}

export default async function RoomsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>
}) {
  const params = await searchParams
  const rooms = await getRooms(params)

  return (
    <div className="pt-24">
      {/* Hero */}
      <div className="bg-[#0A0A0A] text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gold text-sm font-medium tracking-widest uppercase mb-3">
            Nos hébergements
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
            Chambres & Suites
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto">
            Choisissez parmi notre sélection de {rooms.length} hébergements d&apos;exception,
            tous aménagés avec le souci du moindre détail.
          </p>
        </div>
      </div>

      <RoomsClient rooms={rooms} initialParams={params} />
    </div>
  )
}
