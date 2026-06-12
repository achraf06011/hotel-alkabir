import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter, Youtube } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

const footerLinks = {
  hotel: [
    { label: 'À propos', href: '/about' },
    { label: 'Galerie', href: '/gallery' },
    { label: 'Blog', href: '/blog' },
    { label: 'Carrières', href: '/careers' },
    { label: 'Presse', href: '/press' },
  ],
  services: [
    { label: 'Chambres & Suites', href: '/rooms' },
    { label: 'Restaurant', href: '/services#restaurant' },
    { label: 'Spa & Bien-être', href: '/services#spa' },
    { label: 'Piscine', href: '/services#pool' },
    { label: 'Salle de sport', href: '/services#gym' },
    { label: 'Séminaires', href: '/services#events' },
  ],
  info: [
    { label: 'Réservation', href: '/booking' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Contact', href: '/contact' },
    { label: 'Politique annulation', href: '/cancellation-policy' },
    { label: 'Confidentialité', href: '/privacy' },
    { label: 'CGU', href: '/terms' },
  ],
}

const socialLinks = [
  { icon: Facebook, href: 'https://facebook.com/hotelalkabir', label: 'Facebook' },
  { icon: Instagram, href: 'https://instagram.com/hotelalkabir', label: 'Instagram' },
  { icon: Twitter, href: 'https://twitter.com/hotelalkabir', label: 'Twitter' },
  { icon: Youtube, href: 'https://youtube.com/hotelalkabir', label: 'YouTube' },
]

export function Footer() {
  return (
    <footer className="bg-[#0A0A0A] text-white">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand column */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo.svg"
                alt="Logo Hôtel Al Kabir"
                width={44}
                height={44}
                className="rounded-full"
              />
              <div>
                <div className="font-serif text-xl font-bold text-white">Hôtel Al Kabir</div>
                <div className="text-xs tracking-widest text-gold">★★★ Guéliz, Marrakech</div>
              </div>
            </Link>

            <p className="text-white/60 text-sm leading-relaxed max-w-sm">
              Situé au cœur du quartier Guéliz à Marrakech, l&apos;Hôtel Al Kabir vous accueille
              dans une ambiance conviviale et authentique depuis 1983.
            </p>

            <div className="space-y-3">
              <div className="flex items-start gap-3 text-sm text-white/70">
                <MapPin className="h-4 w-4 text-gold mt-0.5 shrink-0" />
                <span>Boulevard Mohamed Zerktouni, Guéliz, Marrakech, Maroc</span>
              </div>
              <a href="tel:+21205244-39540" className="flex items-center gap-3 text-sm text-white/70 hover:text-gold transition-colors">
                <Phone className="h-4 w-4 text-gold shrink-0" />
                05244-39540
              </a>
              <a href="mailto:contact@hotelalkabir.com" className="flex items-center gap-3 text-sm text-white/70 hover:text-gold transition-colors">
                <Mail className="h-4 w-4 text-gold shrink-0" />
                contact@hotelalkabir.com
              </a>
              <div className="flex items-center gap-3 text-sm text-white/70">
                <Clock className="h-4 w-4 text-gold shrink-0" />
                Réception ouverte 24h/24
              </div>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:border-gold hover:text-gold transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links columns */}
          <div>
            <h4 className="font-serif text-sm font-semibold text-gold uppercase tracking-widest mb-5">L&apos;Hôtel</h4>
            <ul className="space-y-2.5">
              {footerLinks.hotel.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/60 hover:text-gold transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-sm font-semibold text-gold uppercase tracking-widest mb-5">Services</h4>
            <ul className="space-y-2.5">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/60 hover:text-gold transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-sm font-semibold text-gold uppercase tracking-widest mb-5">Informations</h4>
            <ul className="space-y-2.5">
              {footerLinks.info.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/60 hover:text-gold transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="font-serif text-lg font-medium text-white mb-1">Newsletter exclusive</h4>
              <p className="text-sm text-white/60">Recevez nos offres privilèges et actualités en avant-première.</p>
            </div>
            <div className="flex w-full md:w-auto gap-2 max-w-md">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="flex-1 bg-white/5 border border-white/20 rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/40 focus:outline-none focus:border-gold transition-colors"
              />
              <button className="bg-gold text-black font-semibold px-5 py-2.5 rounded-lg hover:bg-gold-600 transition-colors text-sm whitespace-nowrap">
                S&apos;abonner
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/40">
            <div>
              © {new Date().getFullYear()} Hotel Alkabir. Tous droits réservés.
            </div>
            <div className="flex items-center gap-4">
              <span>Hôtel Al Kabir — Guéliz, Marrakech</span>
              <span>•</span>
              <Link href="/privacy" className="hover:text-gold transition-colors">Confidentialité</Link>
              <Link href="/terms" className="hover:text-gold transition-colors">CGU</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
