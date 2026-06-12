'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'

const categories = [
  { value: 'all', label: 'Tout' },
  { value: 'hotel', label: 'L\'Hôtel' },
  { value: 'rooms', label: 'Chambres' },
  { value: 'pool', label: 'Piscine' },
  { value: 'restaurant', label: 'Restaurant' },
  { value: 'spa', label: 'Spa' },
]

const galleryImages = [
  { id: '1', url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80', alt: 'Façade', title: 'Notre façade majestueuse', category: 'hotel' },
  { id: '2', url: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80', alt: 'Suite', title: 'Suite Présidentielle', category: 'rooms' },
  { id: '3', url: 'https://images.unsplash.com/photo-1544124499-58912cbddaad?w=800&q=80', alt: 'Piscine', title: 'Piscine panoramique', category: 'pool' },
  { id: '4', url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80', alt: 'Restaurant', title: 'Restaurant Al Nokhba', category: 'restaurant' },
  { id: '5', url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80', alt: 'Spa', title: 'Spa Alkabir', category: 'spa' },
  { id: '6', url: 'https://images.unsplash.com/photo-1605146769289-440113cc3d00?w=800&q=80', alt: 'Hall', title: 'Hall principal', category: 'hotel' },
  { id: '7', url: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80', alt: 'Chambre', title: 'Chambre Deluxe', category: 'rooms' },
  { id: '8', url: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80', alt: 'Vue', title: 'Vue panoramique', category: 'hotel' },
  { id: '9', url: 'https://images.unsplash.com/photo-1568376794508-ae52c6ab3929?w=800&q=80', alt: 'Salle de bain', title: 'Salle de bain luxe', category: 'rooms' },
  { id: '10', url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80', alt: 'Bar', title: 'Bar Lounge', category: 'restaurant' },
  { id: '11', url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80', alt: 'Piscine', title: 'Bord de piscine', category: 'pool' },
  { id: '12', url: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80', alt: 'Petit-déjeuner', title: 'Petit-déjeuner marocain', category: 'restaurant' },
  { id: '13', url: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800&q=80', alt: 'Suite Junior', title: 'Suite Junior', category: 'rooms' },
  { id: '14', url: 'https://images.unsplash.com/photo-1623625434462-e5e42318ae49?w=800&q=80', alt: 'Suite Exec', title: 'Suite Exécutive', category: 'rooms' },
  { id: '15', url: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&q=80', alt: 'Gym', title: 'Fitness Center', category: 'spa' },
]

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const filtered = activeCategory === 'all'
    ? galleryImages
    : galleryImages.filter((img) => img.category === activeCategory)

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return
      if (e.key === 'ArrowRight') setLightboxIndex((prev) => (prev! + 1) % filtered.length)
      if (e.key === 'ArrowLeft') setLightboxIndex((prev) => (prev! - 1 + filtered.length) % filtered.length)
      if (e.key === 'Escape') setLightboxIndex(null)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [lightboxIndex, filtered.length])

  return (
    <div className="pt-20">
      {/* Hero */}
      <div className="bg-[#0A0A0A] text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gold text-sm font-medium tracking-widest uppercase mb-3">Galerie</p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">L&apos;Hôtel en Images</h1>
          <p className="text-white/70 max-w-xl mx-auto">
            Découvrez la beauté de l&apos;Hotel Alkabir à travers notre galerie photographique
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Category filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat.value
                  ? 'bg-gold text-black shadow-md'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          {filtered.map((image, index) => (
            <motion.div
              key={image.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="break-inside-avoid cursor-pointer group relative overflow-hidden rounded-xl"
              onClick={() => setLightboxIndex(index)}
            >
              <div className={`relative w-full ${index % 3 === 0 ? 'h-64' : index % 3 === 1 ? 'h-48' : 'h-56'}`}>
                <Image
                  src={image.url}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <ZoomIn className="h-5 w-5 text-white" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-white text-sm font-medium">{image.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={() => setLightboxIndex(null)}
          >
            <button className="absolute top-4 right-4 p-2 text-white/70 hover:text-white z-10" onClick={() => setLightboxIndex(null)}>
              <X className="h-8 w-8" />
            </button>
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white z-10"
              onClick={(e) => { e.stopPropagation(); setLightboxIndex((p) => (p! - 1 + filtered.length) % filtered.length) }}
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <motion.div
              key={lightboxIndex}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative w-full max-w-5xl aspect-video mx-16"
              onClick={(e) => e.stopPropagation()}
            >
              <Image src={filtered[lightboxIndex].url} alt={filtered[lightboxIndex].alt} fill className="object-contain" />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm">
                {filtered[lightboxIndex].title} • {lightboxIndex + 1}/{filtered.length}
              </div>
            </motion.div>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white z-10"
              onClick={(e) => { e.stopPropagation(); setLightboxIndex((p) => (p! + 1) % filtered.length) }}
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
