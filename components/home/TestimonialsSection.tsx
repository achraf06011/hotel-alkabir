'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react'
import type { ReviewWithUser } from '@/types'

interface TestimonialsProps {
  reviews: ReviewWithUser[]
}

export function TestimonialsSection({ reviews }: TestimonialsProps) {
  const [current, setCurrent] = useState(0)

  const next = () => setCurrent((prev) => (prev + 1) % reviews.length)
  const prev = () => setCurrent((prev) => (prev - 1 + reviews.length) % reviews.length)

  if (!reviews.length) return null

  return (
    <section className="section-padding bg-[#F9F6EF] dark:bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-subtitle"
          >
            Témoignages clients
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-title"
          >
            Ce que disent nos hôtes
          </motion.h2>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Main testimonial */}
          <div className="bg-background rounded-2xl shadow-lg p-8 md:p-12 relative overflow-hidden">
            {/* Decorative quote */}
            <Quote className="absolute top-6 right-8 h-20 w-20 text-gold/10" />

            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Stars */}
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < reviews[current].rating ? 'text-gold fill-gold' : 'text-muted-foreground/30'}`}
                    />
                  ))}
                </div>

                {/* Title */}
                {reviews[current].title && (
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                    &quot;{reviews[current].title}&quot;
                  </h3>
                )}

                {/* Body */}
                <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                  {reviews[current].body}
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden bg-gold/10">
                    {reviews[current].guestImage ? (
                      <Image
                        src={reviews[current].guestImage!}
                        alt={reviews[current].guestName || 'Client'}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gold font-bold text-lg">
                        {(reviews[current].guestName || 'C')[0]}
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{reviews[current].guestName}</div>
                    <div className="text-sm text-gold">Client vérifié</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-border hover:border-gold hover:text-gold flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`transition-all ${i === current ? 'w-6 h-2 bg-gold rounded-full' : 'w-2 h-2 bg-border rounded-full hover:bg-gold/40'}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-border hover:border-gold hover:text-gold flex items-center justify-center transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* All reviews mini grid */}
          <div className="hidden md:grid grid-cols-3 gap-4 mt-8">
            {reviews.slice(0, 3).map((review, i) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setCurrent(i)}
                className={`cursor-pointer p-4 rounded-xl border transition-all ${i === current ? 'border-gold bg-gold/5' : 'border-border hover:border-gold/40'}`}
              >
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(review.rating)].map((_, j) => (
                    <Star key={j} className="h-3 w-3 text-gold fill-gold" />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">{review.body}</p>
                <p className="text-xs font-medium mt-2 text-foreground">{review.guestName}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
