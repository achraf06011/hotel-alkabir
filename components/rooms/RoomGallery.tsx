'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Grid2X2, Expand } from 'lucide-react'
import type { RoomImage } from '@prisma/client'

interface RoomGalleryProps {
  images: RoomImage[]
  roomName: string
}

export function RoomGallery({ images, roomName }: RoomGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  if (!images.length) return null

  const primaryImage = images.find((img) => img.isPrimary) || images[0]
  const otherImages = images.filter((img) => img.id !== primaryImage.id).slice(0, 4)

  return (
    <>
      {/* Gallery grid */}
      <div className="relative grid grid-cols-4 grid-rows-2 gap-2 h-[400px] md:h-[500px] rounded-2xl overflow-hidden">
        {/* Main image */}
        <div
          className="col-span-4 md:col-span-2 row-span-2 relative cursor-pointer group"
          onClick={() => setLightboxIndex(0)}
        >
          <Image
            src={primaryImage.url}
            alt={primaryImage.alt || roomName}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
        </div>

        {/* Secondary images */}
        {otherImages.map((img, i) => (
          <div
            key={img.id}
            className="hidden md:block relative cursor-pointer group"
            onClick={() => setLightboxIndex(i + 1)}
          >
            <Image
              src={img.url}
              alt={img.alt || `${roomName} - ${i + 2}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
          </div>
        ))}

        {/* View all button */}
        <button
          onClick={() => setLightboxIndex(0)}
          className="absolute bottom-4 right-4 bg-background/95 backdrop-blur-sm border border-border rounded-lg px-4 py-2 text-sm font-medium flex items-center gap-2 hover:bg-background transition-colors shadow-lg"
        >
          <Grid2X2 className="h-4 w-4" />
          Voir {images.length} photos
        </button>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setLightboxIndex(null)}
          >
            <button
              className="absolute top-4 right-4 p-2 text-white/70 hover:text-white transition-colors"
              onClick={() => setLightboxIndex(null)}
            >
              <X className="h-6 w-6" />
            </button>

            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              onClick={(e) => {
                e.stopPropagation()
                setLightboxIndex((prev) => (prev! - 1 + images.length) % images.length)
              }}
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <motion.div
              key={lightboxIndex}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-4xl aspect-video"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[lightboxIndex].url}
                alt={images[lightboxIndex].alt || roomName}
                fill
                className="object-contain"
              />
            </motion.div>

            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              onClick={(e) => {
                e.stopPropagation()
                setLightboxIndex((prev) => (prev! + 1) % images.length)
              }}
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
              {lightboxIndex + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
