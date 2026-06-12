'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { UtensilsCrossed, Waves, Sparkles, Dumbbell, Wifi, Car, Bell, Music, ArrowRight } from 'lucide-react'

const services = [
  {
    icon: UtensilsCrossed,
    title: 'Restaurant Al Nokhba',
    description: 'Gastronomie marocaine et internationale dans un cadre somptueux. Notre chef étoilé vous propose une expérience culinaire unique.',
    href: '/services#restaurant',
    color: 'from-amber-500/20 to-orange-500/20',
  },
  {
    icon: Waves,
    title: 'Piscine Panoramique',
    description: 'Piscine extérieure avec vue panoramique sur les toits de Marrakech et les montagnes de l\'Atlas. Ouverte de 7h à 22h.',
    href: '/services#pool',
    color: 'from-blue-500/20 to-cyan-500/20',
  },
  {
    icon: Sparkles,
    title: 'Spa Alkabir',
    description: 'Hammam traditionnel, soins corps et visage, massages thérapeutiques. Un sanctuaire de bien-être de 1500 m².',
    href: '/services#spa',
    color: 'from-purple-500/20 to-pink-500/20',
  },
  {
    icon: Dumbbell,
    title: 'Fitness Center',
    description: 'Salle de sport ultra-équipée avec coach personnel sur demande. Cours collectifs disponibles 7j/7.',
    href: '/services#gym',
    color: 'from-green-500/20 to-emerald-500/20',
  },
  {
    icon: Wifi,
    title: 'WiFi Haut Débit',
    description: 'Connexion fibre optique gratuite dans tout l\'établissement. Débit jusqu\'à 1 Gbps pour les suites.',
    href: '/services#wifi',
    color: 'from-sky-500/20 to-blue-500/20',
  },
  {
    icon: Car,
    title: 'Parking & Transferts',
    description: 'Parking sécurisé avec service voiturier. Transferts aéroport Mohammed V sur réservation.',
    href: '/services#parking',
    color: 'from-gray-500/20 to-slate-500/20',
  },
  {
    icon: Bell,
    title: 'Room Service 24h',
    description: 'Service en chambre disponible 24h/24. Menu complet de restauration et cave à vins sélectionnée.',
    href: '/services#room-service',
    color: 'from-gold/20 to-yellow-500/20',
  },
  {
    icon: Music,
    title: 'Bar & Lounge',
    description: 'Bar lounge ouvert jusqu\'à 2h du matin. Cocktails signature, vins et musique live le week-end.',
    href: '/services#bar',
    color: 'from-rose-500/20 to-red-500/20',
  },
]

export function ServicesSection() {
  return (
    <section className="section-padding bg-[#0A0A0A] relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, #D4AF37 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gold text-sm font-medium tracking-widest uppercase mb-3"
          >
            Nos prestations
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white"
          >
            Services & Équipements
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-white/60 max-w-2xl mx-auto"
          >
            Un ensemble complet de services pour rendre votre séjour aussi confortable
            et mémorable que possible.
          </motion.p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.07 }}
              >
                <Link href={service.href} className="group block h-full">
                  <div className="h-full border border-white/10 rounded-xl p-6 hover:border-gold/40 transition-all duration-300 hover:bg-white/5 relative overflow-hidden">
                    {/* Background gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl`} />

                    <div className="relative z-10">
                      <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors">
                        <Icon className="h-6 w-6 text-gold" />
                      </div>
                      <h3 className="font-serif text-base font-semibold text-white mb-2 group-hover:text-gold transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-white/50 text-sm leading-relaxed group-hover:text-white/70 transition-colors">
                        {service.description}
                      </p>
                      <div className="mt-4 flex items-center gap-1 text-gold/70 text-xs group-hover:text-gold transition-colors">
                        <span>En savoir plus</span>
                        <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
