import { Suspense } from 'react'
import { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import { HeroSection } from '@/components/home/HeroSection'
import { AboutSection } from '@/components/home/AboutSection'
import { FeaturedRooms } from '@/components/home/FeaturedRooms'
import { ServicesSection } from '@/components/home/ServicesSection'
import { TestimonialsSection } from '@/components/home/TestimonialsSection'
import { GalleryPreview } from '@/components/home/GalleryPreview'
import { ContactSection } from '@/components/home/ContactSection'
import { Skeleton } from '@/components/ui/skeleton'

export const dynamic = 'force-dynamic'


export const metadata: Metadata = {
  title: 'Hôtel Al Kabir | Hôtel 3 Étoiles à Marrakech — Guéliz',
  description:
    "Bienvenue à l'Hôtel Al Kabir, établissement 3 étoiles au cœur du quartier Guéliz à Marrakech depuis 1983. Chambres climatisées, piscine extérieure, restaurant marocain et réception 24h/24.",
}

async function getFeaturedRooms() {
  return prisma.room.findMany({
    where: { featured: true, status: 'AVAILABLE' },
    include: { images: { orderBy: { sortOrder: 'asc' } } },
    orderBy: { sortOrder: 'asc' },
    take: 6,
  })
}

async function getFeaturedReviews() {
  return prisma.review.findMany({
    where: { approved: true, featured: true },
    orderBy: { createdAt: 'desc' },
    take: 6,
  })
}

async function getGalleryImages() {
  return prisma.galleryImage.findMany({
    where: { featured: true },
    orderBy: { sortOrder: 'asc' },
    take: 6,
  })
}

export default async function HomePage() {
  const [rooms, reviews, galleryImages] = await Promise.all([
    getFeaturedRooms(),
    getFeaturedReviews(),
    getGalleryImages(),
  ])

  return (
    <div>
      <HeroSection />
      <AboutSection />
      <Suspense fallback={<div className="py-24 flex items-center justify-center"><Skeleton className="h-96 w-full max-w-7xl mx-auto" /></div>}>
        <FeaturedRooms rooms={rooms} />
      </Suspense>
      <ServicesSection />
      <GalleryPreview images={galleryImages} />
      {reviews.length > 0 && <TestimonialsSection reviews={reviews} />}
      <ContactSection />
    </div>
  )
}

