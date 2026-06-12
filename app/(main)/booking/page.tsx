import { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import { BookingForm } from '@/components/booking/BookingForm'

export const dynamic = 'force-dynamic'


export const metadata: Metadata = {
  title: 'Réservation | Hotel Alkabir',
  description: 'Réservez votre séjour à l\'Hotel Alkabir. Sélectionnez vos dates, votre chambre et bénéficiez de nos meilleures offres.',
}

async function getRooms() {
  return prisma.room.findMany({
    where: { status: 'AVAILABLE' },
    include: { images: { where: { isPrimary: true }, take: 1 } },
    orderBy: { sortOrder: 'asc' },
  })
}

export default async function BookingPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>
}) {
  const params = await searchParams
  const rooms = await getRooms()

  return (
    <div className="pt-20 min-h-screen bg-muted/20">
      {/* Header */}
      <div className="bg-[#0A0A0A] text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gold text-sm font-medium tracking-widest uppercase mb-3">Réservation</p>
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-3">
            Réservez votre séjour
          </h1>
          <p className="text-white/70">
            Complétez le formulaire ci-dessous pour réserver votre chambre.
            Notre équipe vous confirmera votre réservation dans les plus brefs délais.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <BookingForm rooms={rooms} initialParams={params} />
      </div>
    </div>
  )
}

