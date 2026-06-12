'use client'

import React, { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Star, Users, Maximize2, BedDouble, Filter, SlidersHorizontal,
  Grid3X3, List, ChevronDown
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { formatPrice, getRoomTypeLabel } from '@/lib/utils'
import type { RoomWithDetails } from '@/types'

interface RoomsClientProps {
  rooms: RoomWithDetails[]
  initialParams: Record<string, string>
}

const ROOM_TYPES = [
  { value: 'all', label: 'Tous les types' },
  { value: 'STANDARD', label: 'Standard' },
  { value: 'DELUXE', label: 'Deluxe' },
  { value: 'SUITE', label: 'Suite' },
  { value: 'FAMILY', label: 'Familiale' },
  { value: 'HONEYMOON', label: 'Lune de miel' },
  { value: 'PRESIDENTIAL', label: 'Présidentielle' },
]

export function RoomsClient({ rooms, initialParams }: RoomsClientProps) {
  const [typeFilter, setTypeFilter] = useState(initialParams.type || 'all')
  const [priceSort, setPriceSort] = useState('price_asc')
  const [capacityFilter, setCapacityFilter] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const filtered = useMemo(() => {
    let result = [...rooms]

    if (typeFilter !== 'all') {
      result = result.filter((r) => r.type === typeFilter)
    }

    if (capacityFilter !== 'all') {
      result = result.filter((r) => r.capacity >= parseInt(capacityFilter))
    }

    if (priceSort === 'price_asc') result.sort((a, b) => a.price - b.price)
    else if (priceSort === 'price_desc') result.sort((a, b) => b.price - a.price)
    else if (priceSort === 'name_asc') result.sort((a, b) => a.name.localeCompare(b.name))

    return result
  }, [rooms, typeFilter, priceSort, capacityFilter])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Filters bar */}
      <div className="bg-card border border-border rounded-xl p-4 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Filter className="h-4 w-4" />
            Filtres:
          </div>

          {/* Type filter */}
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-44 h-9 text-sm">
              <SelectValue placeholder="Type de chambre" />
            </SelectTrigger>
            <SelectContent>
              {ROOM_TYPES.map((type) => (
                <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Capacity filter */}
          <Select value={capacityFilter} onValueChange={setCapacityFilter}>
            <SelectTrigger className="w-36 h-9 text-sm">
              <SelectValue placeholder="Capacité" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes</SelectItem>
              <SelectItem value="1">1+ personne</SelectItem>
              <SelectItem value="2">2+ personnes</SelectItem>
              <SelectItem value="3">3+ personnes</SelectItem>
              <SelectItem value="4">4+ personnes</SelectItem>
              <SelectItem value="5">5+ personnes</SelectItem>
            </SelectContent>
          </Select>

          {/* Price sort */}
          <Select value={priceSort} onValueChange={setPriceSort}>
            <SelectTrigger className="w-44 h-9 text-sm">
              <SelectValue placeholder="Trier par" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price_asc">Prix croissant</SelectItem>
              <SelectItem value="price_desc">Prix décroissant</SelectItem>
              <SelectItem value="name_asc">Nom A-Z</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">{filtered.length} résultat{filtered.length !== 1 ? 's' : ''}</span>
          <div className="flex border border-border rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 ${viewMode === 'grid' ? 'bg-gold text-black' : 'hover:bg-accent'} transition-colors`}
            >
              <Grid3X3 className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 ${viewMode === 'list' ? 'bg-gold text-black' : 'hover:bg-accent'} transition-colors`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-muted-foreground text-lg">Aucune chambre ne correspond à vos critères.</p>
          <Button variant="gold-outline" className="mt-4" onClick={() => { setTypeFilter('all'); setCapacityFilter('all') }}>
            Réinitialiser les filtres
          </Button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((room, index) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <RoomGridCard room={room} />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((room, index) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <RoomListCard room={room} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

function RoomGridCard({ room }: { room: RoomWithDetails }) {
  const primaryImage = room.images.find((img) => img.isPrimary) || room.images[0]
  const amenityCount = room.amenities.length

  return (
    <Link href={`/rooms/${room.id}`} className="group block hotel-card">
      <div className="relative h-52 overflow-hidden">
        {primaryImage ? (
          <Image src={primaryImage.url} alt={primaryImage.alt || room.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center">
            <BedDouble className="h-12 w-12 text-gold/40" />
          </div>
        )}
        {room.featured && (
          <div className="absolute top-3 left-3">
            <Badge variant="gold" className="text-xs">✦ Coup de cœur</Badge>
          </div>
        )}
        <div className="absolute top-3 right-3">
          <Badge variant="secondary" className="text-xs">{getRoomTypeLabel(room.type)}</Badge>
        </div>
        <div className="absolute bottom-3 right-3 bg-background/95 backdrop-blur-sm rounded-lg px-3 py-1.5 text-sm font-bold">
          <span className="text-gold">{formatPrice(room.price)}</span>
          <span className="text-muted-foreground text-xs font-normal">/nuit</span>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between mb-1">
          <h3 className="font-serif text-lg font-semibold group-hover:text-gold transition-colors line-clamp-1">{room.name}</h3>
          <div className="flex items-center gap-1 text-gold shrink-0 ml-2">
            <Star className="h-3.5 w-3.5 fill-gold" />
            <span className="text-xs font-medium">4.9</span>
          </div>
        </div>
        {room.view && <p className="text-xs text-muted-foreground mb-3">{room.view}</p>}

        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
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
              <span className="truncate max-w-[80px]">{room.bedType}</span>
            </div>
          )}
        </div>

        {amenityCount > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {room.amenities.slice(0, 3).map(({ amenity }) => (
              <span key={amenity.id} className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
                {amenity.name}
              </span>
            ))}
            {amenityCount > 3 && (
              <span className="text-xs text-gold px-2 py-0.5 rounded-full border border-gold/30">
                +{amenityCount - 3}
              </span>
            )}
          </div>
        )}

        <Button variant="gold" className="w-full text-sm" asChild>
          <span>Voir & Réserver</span>
        </Button>
      </div>
    </Link>
  )
}

function RoomListCard({ room }: { room: RoomWithDetails }) {
  const primaryImage = room.images.find((img) => img.isPrimary) || room.images[0]

  return (
    <Link href={`/rooms/${room.id}`} className="group block">
      <div className="hotel-card flex flex-col md:flex-row overflow-hidden">
        <div className="relative w-full md:w-64 h-48 md:h-auto shrink-0 overflow-hidden">
          {primaryImage ? (
            <Image src={primaryImage.url} alt={room.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center">
              <BedDouble className="h-12 w-12 text-gold/40" />
            </div>
          )}
        </div>

        <div className="flex-1 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-serif text-xl font-semibold group-hover:text-gold transition-colors">{room.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className="text-xs">{getRoomTypeLabel(room.type)}</Badge>
                  {room.view && <span className="text-xs text-muted-foreground">{room.view}</span>}
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-gold text-xl">{formatPrice(room.price)}</div>
                <div className="text-xs text-muted-foreground">par nuit</div>
              </div>
            </div>

            <p className="text-muted-foreground text-sm line-clamp-2 mb-4">{room.shortDesc || room.description.slice(0, 150)}...</p>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5" />{room.capacity} personnes</div>
              {room.size && <div className="flex items-center gap-1.5"><Maximize2 className="h-3.5 w-3.5" />{room.size} m²</div>}
              {room.bedType && <div className="flex items-center gap-1.5"><BedDouble className="h-3.5 w-3.5" />{room.bedType}</div>}
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
            <div className="flex flex-wrap gap-1.5">
              {room.amenities.slice(0, 4).map(({ amenity }) => (
                <span key={amenity.id} className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">{amenity.name}</span>
              ))}
            </div>
            <Button variant="gold" size="sm" className="shrink-0">Réserver</Button>
          </div>
        </div>
      </div>
    </Link>
  )
}
