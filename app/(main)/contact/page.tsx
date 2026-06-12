'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { MapPin, Phone, Mail, Clock, Send, Loader2, MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const subjects = [
  'Réservation', 'Information chambre', 'Événement & Séminaire',
  'Spa & Bien-être', 'Restaurant', 'Réclamation', 'Autre',
]

type ContactFormData = {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

export default function ContactPage() {
  const [isLoading, setIsLoading] = useState(false)
  const form = useForm<ContactFormData>({ defaultValues: { name: '', email: '', phone: '', subject: '', message: '' } })

  const handleSubmit = async (data: ContactFormData) => {
    setIsLoading(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        toast.success('Message envoyé! Nous vous répondrons dans les 24h.')
        form.reset()
      } else {
        toast.error('Erreur lors de l\'envoi. Veuillez réessayer.')
      }
    } catch {
      toast.error('Erreur de connexion.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="pt-20">
      {/* Hero */}
      <div className="bg-[#0A0A0A] text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gold text-sm font-medium tracking-widest uppercase mb-3">Contactez-nous</p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Nous sommes à votre écoute</h1>
          <p className="text-white/70 max-w-xl mx-auto">
            Notre équipe se tient à votre disposition 24h/24 pour répondre à toutes vos questions
            et organiser votre séjour de rêve.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Contact info */}
          <div className="space-y-6">
            <h2 className="font-serif text-2xl font-semibold">Informations de contact</h2>
            {[
              { icon: MapPin, title: 'Adresse', info: 'Boulevard Mohamed Zerktouni\nGuéliz, Marrakech 40000, Maroc', href: undefined },
              { icon: Phone, title: 'Téléphone', info: '05244-39540\nreservation@hotelalkabir.com (Réservations)', href: 'tel:+212524439540' },
              { icon: Mail, title: 'Email', info: 'contact@hotelalkabir.com\nreservation@hotelalkabir.com', href: 'mailto:contact@hotelalkabir.com' },
              { icon: Clock, title: 'Réception 24h/24', info: 'Check-in: dès 14h00\nCheck-out: avant 12h00', href: undefined },
            ].map(({ icon: Icon, title, info, href }) => (
              <div key={title} className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center shrink-0">
                  <Icon className="h-5 w-5 text-gold" />
                </div>
                <div>
                  <p className="font-semibold text-sm mb-1">{title}</p>
                  {href ? (
                    <a href={href} className="text-sm text-muted-foreground hover:text-gold transition-colors whitespace-pre-line">{info}</a>
                  ) : (
                    <p className="text-sm text-muted-foreground whitespace-pre-line">{info}</p>
                  )}
                </div>
              </div>
            ))}

            {/* Map */}
            <div className="rounded-xl overflow-hidden h-48 border border-border">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3397.3!2d-7.9938!3d31.6295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDM3JzQ2LjIiTiA3wrA1OSczNi42Ilc!5e0!3m2!1sfr!2sma!4v1000000000000"
                width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
                className="grayscale hover:grayscale-0 transition-all"
                title="Hôtel Al Kabir - Marrakech"
              />
            </div>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-2">
            <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <MessageSquare className="h-5 w-5 text-gold" />
                <h2 className="font-serif text-2xl font-semibold">Envoyez-nous un message</h2>
              </div>

              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nom complet *</Label>
                    <Input id="name" placeholder="Ahmed Benali" {...form.register('name', { required: true })} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" type="email" placeholder="ahmed@example.com" {...form.register('email', { required: true })} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input id="phone" type="tel" placeholder="+212 6XX XXX XXX" {...form.register('phone')} />
                  </div>
                  <div className="space-y-2">
                    <Label>Sujet *</Label>
                    <Select onValueChange={(val) => form.setValue('subject', val)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choisir un sujet" />
                      </SelectTrigger>
                      <SelectContent>
                        {subjects.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    placeholder="Comment puis-je vous aider? Décrivez votre demande..."
                    rows={5}
                    {...form.register('message', { required: true })}
                  />
                </div>

                <Button type="submit" variant="gold" size="lg" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Envoi en cours...</>
                  ) : (
                    <><Send className="h-4 w-4 mr-2" />Envoyer le message</>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
