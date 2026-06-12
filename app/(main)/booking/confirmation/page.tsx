import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { formatPrice, formatDate } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, Calendar, Users, BedDouble, Download, Home, Phone } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Réservation confirmée | Hotel Alkabir',
  robots: { index: false },
}

export default async function ConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string }>
}) {
  const { ref } = await searchParams

  if (!ref) notFound()

  const booking = await prisma.booking.findUnique({
    where: { bookingRef: ref },
    include: {
      room: { include: { images: { where: { isPrimary: true }, take: 1 } } },
      payment: true,
    },
  })

  if (!booking) notFound()

  return (
    <div className="pt-20 min-h-screen bg-muted/20">
      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Success header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="h-10 w-10 text-green-500" />
          </div>
          <h1 className="font-serif text-3xl font-bold mb-2">Réservation confirmée!</h1>
          <p className="text-muted-foreground">
            Votre réservation a bien été reçue. Un email de confirmation a été envoyé à{' '}
            <span className="font-medium text-foreground">{booking.guestEmail}</span>.
          </p>
        </div>

        {/* Booking details card */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm mb-6">
          {/* Booking ref header */}
          <div className="bg-[#0A0A0A] text-white p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-xs uppercase tracking-wider mb-1">Référence de réservation</p>
                <p className="font-mono text-xl font-bold text-gold">{booking.bookingRef}</p>
              </div>
              <Badge className="bg-green-500 text-white border-0">Confirmée</Badge>
            </div>
          </div>

          <div className="p-6 space-y-5">
            {/* Room */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center shrink-0">
                <BedDouble className="h-7 w-7 text-muted-foreground" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-semibold">{booking.room.name}</h3>
                <p className="text-sm text-muted-foreground">Hôtel Al Kabir, Marrakech</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-muted/40 rounded-lg p-3">
                <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
                  <Calendar className="h-3.5 w-3.5" />
                  <span className="text-xs uppercase tracking-wide">Check-in</span>
                </div>
                <div className="font-semibold">{formatDate(booking.checkIn, 'EEEE d MMMM yyyy')}</div>
                <div className="text-xs text-muted-foreground">À partir de 14h00</div>
              </div>
              <div className="bg-muted/40 rounded-lg p-3">
                <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
                  <Calendar className="h-3.5 w-3.5" />
                  <span className="text-xs uppercase tracking-wide">Check-out</span>
                </div>
                <div className="font-semibold">{formatDate(booking.checkOut, 'EEEE d MMMM yyyy')}</div>
                <div className="text-xs text-muted-foreground">Avant 12h00</div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {booking.nights} nuit{booking.nights > 1 ? 's' : ''}
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="h-4 w-4" />
                {booking.adults} adulte{booking.adults > 1 ? 's' : ''}
                {booking.children > 0 && `, ${booking.children} enfant${booking.children > 1 ? 's' : ''}`}
              </div>
            </div>

            <div className="border-t border-border pt-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">
                  {formatPrice(booking.pricePerNight)} × {booking.nights} nuits
                </span>
                <span>{formatPrice(booking.subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm mb-3">
                <span className="text-muted-foreground">Taxes</span>
                <span>{formatPrice(booking.taxes)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total payé</span>
                <span className="text-gold">{formatPrice(booking.totalPrice)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact info */}
        <div className="bg-gold/5 border border-gold/20 rounded-2xl p-5 mb-6">
          <h3 className="font-semibold mb-3">Besoin d&apos;aide?</h3>
          <p className="text-sm text-muted-foreground mb-3">
            Notre équipe est disponible 24h/24 pour vous assister.
          </p>
          <a href="tel:+212522000001" className="flex items-center gap-2 text-sm font-medium text-gold hover:underline">
            <Phone className="h-4 w-4" />
            +212 522 000 001
          </a>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="outline" className="flex-1 gap-2">
            <Download className="h-4 w-4" />
            Télécharger la facture
          </Button>
          <Button variant="gold" className="flex-1 gap-2" asChild>
            <Link href="/">
              <Home className="h-4 w-4" />
              Retour à l&apos;accueil
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
