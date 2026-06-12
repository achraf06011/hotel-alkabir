'use client'

import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { toast } from 'sonner'
import {
  CalendarDays, Users, ChevronRight, ChevronLeft, Shield,
  BedDouble, Minus, Plus, CheckCircle2, Loader2
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { bookingSchema, type BookingInput } from '@/lib/validations'
import { formatPrice, calculateNights, calculateBookingTotal } from '@/lib/utils'
import type { Room, RoomImage } from '@prisma/client'

type RoomWithImage = Room & { images: RoomImage[] }

interface BookingFormProps {
  rooms: RoomWithImage[]
  initialParams: Record<string, string>
}

const STEPS = ['Chambre & Dates', 'Informations client', 'Confirmation']

export function BookingForm({ rooms, initialParams }: BookingFormProps) {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const dayAfter = new Date()
  dayAfter.setDate(dayAfter.getDate() + 3)

  const defaultCheckIn = initialParams.checkIn || tomorrow.toISOString().split('T')[0]
  const defaultCheckOut = initialParams.checkOut || dayAfter.toISOString().split('T')[0]

  const [selectedRoomId, setSelectedRoomId] = useState(initialParams.roomId || '')
  const [checkIn, setCheckIn] = useState(defaultCheckIn)
  const [checkOut, setCheckOut] = useState(defaultCheckOut)
  const [adults, setAdults] = useState(parseInt(initialParams.adults || '2'))
  const [children, setChildren] = useState(parseInt(initialParams.children || '0'))

  const selectedRoom = rooms.find((r) => r.id === selectedRoomId)
  const nights = calculateNights(new Date(checkIn), new Date(checkOut))
  const pricing = selectedRoom && nights > 0
    ? calculateBookingTotal(selectedRoom.price, nights)
    : null

  type GuestFormData = {
    guestName: string
    guestEmail: string
    guestPhone: string
    guestCountry: string
    specialRequests: string
  }

  const form = useForm<GuestFormData>({
    defaultValues: {
      guestName: '',
      guestEmail: '',
      guestPhone: '',
      guestCountry: 'MA',
      specialRequests: '',
    },
  })

  const handleSubmit = async (formData: GuestFormData) => {
    if (!selectedRoomId || nights <= 0) {
      toast.error('Veuillez sélectionner une chambre et des dates valides')
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roomId: selectedRoomId,
          checkIn,
          checkOut,
          adults,
          children,
          nights,
          pricePerNight: selectedRoom?.price,
          subtotal: pricing?.subtotal,
          taxes: pricing?.taxes,
          totalPrice: pricing?.total,
          guestName: formData.guestName,
          guestEmail: formData.guestEmail,
          guestPhone: formData.guestPhone,
          guestCountry: formData.guestCountry,
          specialRequests: formData.specialRequests,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        router.push(`/booking/confirmation?ref=${data.booking.bookingRef}`)
      } else {
        toast.error(data.error || 'Une erreur est survenue')
      }
    } catch (error) {
      toast.error('Erreur de connexion. Veuillez réessayer.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      {/* Steps indicator */}
      <div className="flex items-center gap-0 mb-8">
        {STEPS.map((stepName, i) => (
          <React.Fragment key={stepName}>
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                i < step ? 'bg-green-500 text-white' :
                i === step ? 'bg-gold text-black' :
                'bg-muted text-muted-foreground'
              }`}>
                {i < step ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
              </div>
              <span className={`text-sm font-medium hidden sm:block transition-colors ${i === step ? 'text-foreground' : 'text-muted-foreground'}`}>
                {stepName}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`flex-1 h-px mx-3 transition-colors ${i < step ? 'bg-green-500' : 'bg-border'}`} />
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main form */}
        <div className="lg:col-span-2">
          <div className="bg-card border border-border rounded-2xl p-6">
            {/* Step 1: Room & Dates */}
            {step === 0 && (
              <div className="space-y-6">
                <h2 className="font-serif text-xl font-semibold">Choisissez votre chambre & vos dates</h2>

                {/* Room selection */}
                <div className="space-y-3">
                  <Label>Chambre *</Label>
                  <div className="grid grid-cols-1 gap-3">
                    {rooms.map((room) => {
                      const img = room.images[0]
                      return (
                        <button
                          key={room.id}
                          onClick={() => setSelectedRoomId(room.id)}
                          className={`flex items-center gap-4 p-3 rounded-xl border-2 text-left transition-all ${
                            selectedRoomId === room.id
                              ? 'border-gold bg-gold/5'
                              : 'border-border hover:border-gold/40'
                          }`}
                        >
                          <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
                            {img ? (
                              <Image src={img.url} alt={room.name} fill className="object-cover" />
                            ) : (
                              <div className="w-full h-full bg-muted flex items-center justify-center">
                                <BedDouble className="h-6 w-6 text-muted-foreground" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-sm">{room.name}</div>
                            <div className="text-xs text-muted-foreground">{room.capacity} personnes • {room.size ? `${room.size} m²` : ''}</div>
                          </div>
                          <div className="text-right shrink-0">
                            <div className="font-bold text-gold">{formatPrice(room.price)}</div>
                            <div className="text-xs text-muted-foreground">/nuit</div>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Dates */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-1.5">
                      <CalendarDays className="h-3.5 w-3.5 text-gold" />
                      Date d&apos;arrivée *
                    </Label>
                    <input
                      type="date"
                      value={checkIn}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full border border-input rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-1.5">
                      <CalendarDays className="h-3.5 w-3.5 text-gold" />
                      Date de départ *
                    </Label>
                    <input
                      type="date"
                      value={checkOut}
                      min={checkIn}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full border border-input rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold"
                    />
                  </div>
                </div>

                {/* Guests */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Adultes</Label>
                    <div className="flex items-center gap-3 border border-input rounded-lg px-3 py-2">
                      <button onClick={() => setAdults(Math.max(1, adults - 1))} className="w-6 h-6 rounded-full border border-border hover:border-gold flex items-center justify-center">
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="flex-1 text-center font-medium">{adults}</span>
                      <button onClick={() => setAdults(Math.min(6, adults + 1))} className="w-6 h-6 rounded-full border border-border hover:border-gold flex items-center justify-center">
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Enfants (2-12 ans)</Label>
                    <div className="flex items-center gap-3 border border-input rounded-lg px-3 py-2">
                      <button onClick={() => setChildren(Math.max(0, children - 1))} className="w-6 h-6 rounded-full border border-border hover:border-gold flex items-center justify-center">
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="flex-1 text-center font-medium">{children}</span>
                      <button onClick={() => setChildren(Math.min(4, children + 1))} className="w-6 h-6 rounded-full border border-border hover:border-gold flex items-center justify-center">
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>

                <Button
                  variant="gold"
                  size="lg"
                  className="w-full"
                  onClick={() => {
                    if (!selectedRoomId) { toast.error('Veuillez sélectionner une chambre'); return }
                    if (nights <= 0) { toast.error('Veuillez sélectionner des dates valides'); return }
                    setStep(1)
                  }}
                >
                  Continuer
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}

            {/* Step 2: Guest info */}
            {step === 1 && (
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
                <h2 className="font-serif text-xl font-semibold">Vos informations</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2 space-y-2">
                    <Label htmlFor="guestName">Nom complet *</Label>
                    <Input
                      id="guestName"
                      placeholder="Ahmed Benali"
                      {...form.register('guestName', { required: 'Nom requis' })}
                      className={form.formState.errors.guestName ? 'border-red-400' : ''}
                    />
                    {form.formState.errors.guestName && (
                      <p className="text-xs text-red-500">{form.formState.errors.guestName.message as string}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="guestEmail">Email *</Label>
                    <Input
                      id="guestEmail"
                      type="email"
                      placeholder="ahmed@example.com"
                      {...form.register('guestEmail', { required: 'Email requis' })}
                      className={form.formState.errors.guestEmail ? 'border-red-400' : ''}
                    />
                    {form.formState.errors.guestEmail && (
                      <p className="text-xs text-red-500">{form.formState.errors.guestEmail.message as string}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="guestPhone">Téléphone</Label>
                    <Input id="guestPhone" type="tel" placeholder="+212 6XX XXX XXX" {...form.register('guestPhone')} />
                  </div>

                  <div className="sm:col-span-2 space-y-2">
                    <Label htmlFor="guestCountry">Pays</Label>
                    <Select onValueChange={(val) => form.setValue('guestCountry', val)} defaultValue="MA">
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un pays" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MA">🇲🇦 Maroc</SelectItem>
                        <SelectItem value="FR">🇫🇷 France</SelectItem>
                        <SelectItem value="ES">🇪🇸 Espagne</SelectItem>
                        <SelectItem value="US">🇺🇸 États-Unis</SelectItem>
                        <SelectItem value="GB">🇬🇧 Royaume-Uni</SelectItem>
                        <SelectItem value="DE">🇩🇪 Allemagne</SelectItem>
                        <SelectItem value="SA">🇸🇦 Arabie Saoudite</SelectItem>
                        <SelectItem value="AE">🇦🇪 Émirats Arabes Unis</SelectItem>
                        <SelectItem value="OTHER">Autre</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="sm:col-span-2 space-y-2">
                    <Label htmlFor="specialRequests">Demandes spéciales (optionnel)</Label>
                    <Textarea
                      id="specialRequests"
                      placeholder="Oreiller supplémentaire, vue préférée, régime alimentaire..."
                      rows={3}
                      {...form.register('specialRequests')}
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button type="button" variant="outline" onClick={() => setStep(0)} className="flex-1">
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Retour
                  </Button>
                  <Button type="submit" variant="gold" className="flex-1" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Traitement...
                      </>
                    ) : (
                      <>
                        Confirmer la réservation
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Booking summary */}
        <div className="lg:col-span-1">
          <div className="bg-card border border-border rounded-2xl p-5 sticky top-24">
            <h3 className="font-serif text-lg font-semibold mb-4">Résumé</h3>

            {selectedRoom ? (
              <div className="space-y-4">
                {/* Room */}
                <div className="flex items-center gap-3">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
                    {selectedRoom.images[0] ? (
                      <Image src={selectedRoom.images[0].url} alt={selectedRoom.name} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full bg-muted flex items-center justify-center">
                        <BedDouble className="h-6 w-6 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{selectedRoom.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {adults} adulte{adults > 1 ? 's' : ''}{children > 0 ? ` • ${children} enfant${children > 1 ? 's' : ''}` : ''}
                    </div>
                  </div>
                </div>

                {/* Dates */}
                {nights > 0 && (
                  <div className="bg-muted/40 rounded-lg p-3 text-sm space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Arrivée</span>
                      <span className="font-medium">{new Date(checkIn).toLocaleDateString('fr-MA', { day: 'numeric', month: 'long' })}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Départ</span>
                      <span className="font-medium">{new Date(checkOut).toLocaleDateString('fr-MA', { day: 'numeric', month: 'long' })}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Durée</span>
                      <span className="font-medium">{nights} nuit{nights > 1 ? 's' : ''}</span>
                    </div>
                  </div>
                )}

                {/* Pricing */}
                {pricing && (
                  <>
                    <Separator />
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between text-muted-foreground">
                        <span>{formatPrice(selectedRoom.price)} × {nights} nuit{nights > 1 ? 's' : ''}</span>
                        <span>{formatPrice(pricing.subtotal)}</span>
                      </div>
                      <div className="flex justify-between text-muted-foreground">
                        <span>Taxes (10%)</span>
                        <span>{formatPrice(pricing.taxes)}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-bold text-base">
                        <span>Total</span>
                        <span className="text-gold">{formatPrice(pricing.total)}</span>
                      </div>
                    </div>
                  </>
                )}

                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Shield className="h-3.5 w-3.5 text-green-500 shrink-0" />
                  Annulation gratuite 48h avant le check-in
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-8">
                Sélectionnez une chambre pour voir le résumé
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
