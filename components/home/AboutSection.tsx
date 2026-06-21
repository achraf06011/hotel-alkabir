'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Crown, Award, Heart, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const values = [
  {
    icon: Crown,
    title: 'Excellence',
    description: 'Chaque détail est pensé pour surpasser vos attentes',
  },
  {
    icon: Heart,
    title: 'Hospitalité',
    description: 'L\'art de l\'accueil marocain dans toute sa splendeur',
  },
  {
    icon: Award,
    title: 'Authenticité',
    description: 'Une expérience culturelle riche et authentique',
  },
]

export function AboutSection() {
  return (
    <section className="section-padding bg-[#F9F6EF] dark:bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/facade/facade-1.jpg"
                alt="Façade Hôtel Al Kabir"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-48 h-48 rounded-xl overflow-hidden border-4 border-background shadow-xl hidden md:block">
              <Image
                src="/images/facade/facade-2.jpg"
                alt="Hôtel Al Kabir Marrakech"
                fill
                className="object-cover"
              />
            </div>
            {/* Gold badge */}
            <div className="absolute -top-4 -left-4 w-24 h-24 rounded-full bg-gold flex flex-col items-center justify-center shadow-lg hidden md:flex">
              <span className="font-serif text-2xl font-bold text-black">40+</span>
              <span className="text-black text-xs font-medium">Années</span>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div>
              <p className="section-subtitle">Notre histoire</p>
              <h2 className="section-title mb-4">
                40 ans d&apos;accueil
                <br />
                <span className="text-gold">au cœur de Marrakech</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Fondé en 1983, l&apos;Hôtel Al Kabir est un établissement historique du quartier Guéliz
                à Marrakech. Situé sur le Boulevard Mohamed Zerktouni, il accueille des voyageurs
                du monde entier dans une ambiance conviviale et authentique.
              </p>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              À 15 minutes de l&apos;aéroport Marrakech-Menara, l&apos;hôtel offre un accès rapide
              au Jardin Majorelle, à la médina et aux principaux centres d&apos;intérêt de la ville.
              Piscine extérieure, restaurant marocain et réception 24h/24 pour un séjour réussi.
            </p>

            {/* Values */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {values.map((value, index) => {
                const Icon = value.icon
                return (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-background rounded-xl p-4 border border-border/50"
                  >
                    <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center mb-3">
                      <Icon className="h-4 w-4 text-gold" />
                    </div>
                    <h3 className="font-semibold text-sm mb-1">{value.title}</h3>
                    <p className="text-xs text-muted-foreground">{value.description}</p>
                  </motion.div>
                )
              })}
            </div>

            <Button variant="gold" size="lg" asChild className="group">
              <Link href="/about">
                Découvrir notre histoire
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
