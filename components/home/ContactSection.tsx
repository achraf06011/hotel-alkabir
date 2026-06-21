'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function ContactSection() {
  return (
    <section className="section-padding bg-background relative overflow-hidden">
      {/* Decorative gold line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Map placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden h-[400px] bg-muted relative"
          >
            <iframe
              src="https://maps.google.com/maps?q=31.6372231,-8.010916&z=17&output=embed&hl=fr"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale hover:grayscale-0 transition-all duration-300"
              title="Hôtel Al Kabir - Marrakech"
            />
            <div className="absolute inset-0 pointer-events-none border border-gold/20 rounded-2xl" />
          </motion.div>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <p className="section-subtitle">Nous contacter</p>
              <h2 className="section-title mb-4">Nous sommes là pour vous</h2>
              <p className="text-muted-foreground">
                Notre équipe de concierge est disponible 24h/24 pour répondre à toutes
                vos demandes et organiser un séjour parfait.
              </p>
            </div>

            <div className="space-y-5">
              {[
                {
                  icon: MapPin,
                  label: 'Adresse',
                  value: 'Boulevard Mohamed Zerktouni, Guéliz, Marrakech, Maroc',
                  href: 'https://maps.app.goo.gl/6KjmRZxPWEQEqBaA7',
                },
                {
                  icon: Phone,
                  label: 'Téléphone',
                  value: '05244-39540',
                  href: 'tel:+212524439540',
                },
                {
                  icon: Mail,
                  label: 'Email',
                  value: 'contact@hotelalkabir.com',
                  href: 'mailto:contact@hotelalkabir.com',
                },
              ].map((item) => {
                const Icon = item.icon
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.icon === MapPin ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0 group-hover:bg-gold/20 transition-colors">
                      <Icon className="h-5 w-5 text-gold" />
                    </div>
                    <div>
                      <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                        {item.label}
                      </div>
                      <div className="text-foreground font-medium group-hover:text-gold transition-colors">
                        {item.value}
                      </div>
                    </div>
                  </a>
                )
              })}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="gold" size="lg" asChild className="flex-1">
                <Link href="/booking">Réserver maintenant</Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="flex-1 gap-2">
                <Link href="/contact">
                  <MessageSquare className="h-4 w-4" />
                  Nous écrire
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
