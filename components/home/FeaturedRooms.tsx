'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Star, Users, Maximize2, BedDouble, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatPrice } from '@/lib/utils'
import type { RoomWithPrimaryImage } from '@/types'

interface FeaturedRoomsProps {
  rooms: RoomWithPrimaryImage[]
}

export function FeaturedRooms({ rooms }: FeaturedRoomsProps) {
  return (
    <section className="section-padding bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-subtitle"
          >
            Nos chambres & suites
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-title"
          >
            Des espaces d&apos;exception
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-muted-foreground max-w-2xl mx-auto"
          >
            De la chambre standard raffinée à la suite présidentielle somptueuse,
            chaque espace est conçu pour offrir une expérience inoubliable.
          </motion.p>
        </div>

        {/* Rooms grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {rooms.map((room, index) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <RoomCard room={room} />
            </motion.div>
          ))}
        </div>

        {/* View all CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button variant="gold-outline" size="lg" asChild className="group">
            <Link href="/rooms">
              Voir toutes nos chambres
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

function RoomCard({ room }: { room: RoomWithPrimaryImage }) {
  const primaryImage = room.images.find((img) => img.isPrimary) || room.images[0]

  return (
    <Link href={`/rooms/${room.id}`} className="group block">
      <div className="hotel-card overflow-hidden">
        {/* Image */}
        <div className="relative h-56 overflow-hidden">
          {primaryImage ? (
            <Image
              src={primaryImage.url}
              alt={primaryImage.alt || room.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center">
              <BedDouble className="h-12 w-12 text-gold/40" />
            </div>
          )}
          {room.featured && (
            <div className="absolute top-3 left-3">
              <Badge variant="gold" className="text-xs font-semibold">
                ✦ Coup de cœur
              </Badge>
            </div>
          )}
          <div className="absolute bottom-3 right-3">
            <div className="bg-background/95 backdrop-blur-sm rounded-lg px-3 py-1.5 text-sm font-bold">
              <span className="text-gold">{formatPrice(room.price)}</span>
              <span className="text-muted-foreground text-xs font-normal">/nuit</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-serif text-lg font-semibold group-hover:text-gold transition-colors">
                {room.name}
              </h3>
              {room.view && (
                <p className="text-xs text-muted-foreground mt-0.5">{room.view}</p>
              )}
            </div>
            <div className="flex items-center gap-1 text-gold">
              <Star className="h-3.5 w-3.5 fill-gold" />
              <span className="text-xs font-medium">4.9</span>
            </div>
          </div>

          {/* Room specs */}
          <div className="flex items-center gap-4 mt-3 pt-3 border-t border-border text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5" />
              <span>{room.capacity} pers.</span>
            </div>
            {room.size && (
              <div className="flex items-center gap-1.5">
                <Maximize2 className="h-3.5 w-3.5" />
                <span>{room.size} m²</span>
              </div>
            )}
            {room.bedType && (
              <div className="flex items-center gap-1.5">
                <BedDouble className="h-3.5 w-3.5" />
                <span className="truncate">{room.bedType}</span>
              </div>
            )}
          </div>

          <div className="mt-4 flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Taxes incluses</span>
            <span className="text-xs text-gold font-medium group-hover:underline">
              Voir détails →
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
