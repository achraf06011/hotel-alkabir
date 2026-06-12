'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { CalendarDays, Users, Shield, Star, Minus, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { formatPrice, calculateNights, calculateBookingTotal } from '@/lib/utils'
import type { Room } from '@prisma/client'

interface RoomBookingWidgetProps {
  room: Room
}

export function RoomBookingWidget({ room }: RoomBookingWidgetProps) {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const dayAfter = new Date()
  dayAfter.setDate(dayAfter.getDate() + 3)

  const [checkIn, setCheckIn] = useState(tomorrow.toISOString().split('T')[0])
  const [checkOut, setCheckOut] = useState(dayAfter.toISOString().split('T')[0])
  const [adults, setAdults] = useState(1)
  const [children, setChildren] = useState(0)

  const nights = calculateNights(new Date(checkIn), new Date(checkOut))
  const { subtotal, taxes, total } = calculateBookingTotal(room.price, Math.max(nights, 0))

  const bookingUrl = `/booking?roomId=${room.id}&checkIn=${checkIn}&checkOut=${checkOut}&adults=${adults}&children=${children}`

  return (
    <div className="bg-card border border-border rounded-2xl p-6 shadow-lg">
      {/* Price */}
      <div className="flex items-baseline gap-1 mb-6">
        <span className="text-3xl font-bold text-gold">{formatPrice(room.price)}</span>
        <span className="text-muted-foreground">/nuit</span>
        <div className="ml-auto flex items-center gap-1 text-sm">
          <Star className="h-4 w-4 text-gold fill-gold" />
          <span className="font-medium">4.9</span>
        </div>
      </div>

      {/* Date pickers */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="space-y-1">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-1">
            <CalendarDays className="h-3 w-3 text-gold" />
            Arrivée
          </label>
          <input
            type="date"
            value={checkIn}
            min={new Date().toISOString().split('T')[0]}
            onChange={(e) => setCheckIn(e.target.value)}
            className="w-full border border-input rounded-lg px-2.5 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-1">
            <CalendarDays className="h-3 w-3 text-gold" />
            Départ
          </label>
          <input
            type="date"
            value={checkOut}
            min={checkIn}
            onChange={(e) => setCheckOut(e.target.value)}
            className="w-full border border-input rounded-lg px-2.5 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold"
          />
        </div>
      </div>

      {/* Guests */}
      <div className="border border-input rounded-lg divide-y divide-border mb-4">
        <div className="flex items-center justify-between px-3 py-2.5">
          <div>
            <span className="text-sm font-medium">Adultes</span>
            <p className="text-xs text-muted-foreground">13 ans et +</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setAdults((prev) => Math.max(1, prev - 1))}
              className="w-7 h-7 rounded-full border border-border hover:border-gold flex items-center justify-center transition-colors"
            >
              <Minus className="h-3 w-3" />
            </button>
            <span className="w-6 text-center text-sm font-medium">{adults}</span>
            <button
              onClick={() => setAdults((prev) => Math.min(room.adults, prev + 1))}
              className="w-7 h-7 rounded-full border border-border hover:border-gold flex items-center justify-center transition-colors"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between px-3 py-2.5">
          <div>
            <span className="text-sm font-medium">Enfants</span>
            <p className="text-xs text-muted-foreground">2-12 ans</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setChildren((prev) => Math.max(0, prev - 1))}
              className="w-7 h-7 rounded-full border border-border hover:border-gold flex items-center justify-center transition-colors"
            >
              <Minus className="h-3 w-3" />
            </button>
            <span className="w-6 text-center text-sm font-medium">{children}</span>
            <button
              onClick={() => setChildren((prev) => Math.min(room.children, prev + 1))}
              className="w-7 h-7 rounded-full border border-border hover:border-gold flex items-center justify-center transition-colors"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Price breakdown */}
      {nights > 0 && (
        <div className="bg-muted/40 rounded-lg p-4 mb-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">{formatPrice(room.price)} × {nights} nuit{nights > 1 ? 's' : ''}</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Taxes (10%)</span>
            <span>{formatPrice(taxes)}</span>
          </div>
          <Separator />
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span className="text-gold">{formatPrice(total)}</span>
          </div>
        </div>
      )}

      <Button variant="gold" size="lg" className="w-full mb-3" asChild>
        <Link href={bookingUrl}>
          Réserver maintenant
        </Link>
      </Button>

      <p className="text-xs text-center text-muted-foreground mb-4">
        Pas de frais de réservation • Annulation gratuite 48h avant
      </p>

      <div className="flex items-center gap-2 text-xs text-muted-foreground justify-center">
        <Shield className="h-3.5 w-3.5 text-green-500" />
        Paiement sécurisé — Données chiffrées SSL
      </div>
    </div>
  )
}
