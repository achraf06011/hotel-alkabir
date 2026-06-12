import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'
import { Toaster } from 'sonner'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  title: {
    default: 'Hôtel Al Kabir | Hôtel 3 Étoiles à Marrakech — Guéliz',
    template: '%s | Hôtel Al Kabir Marrakech',
  },
  description:
    "Découvrez l'Hôtel Al Kabir, établissement 3 étoiles au cœur du quartier Guéliz à Marrakech. Chambres climatisées, piscine extérieure, restaurant marocain. Réservez votre séjour dès maintenant.",
  keywords: [
    'Hôtel Al Kabir',
    'hôtel Marrakech',
    '3 étoiles Marrakech',
    'hôtel Guéliz',
    'hôtel Maroc',
    'Boulevard Mohamed Zerktouni',
    'hotel Marrakech',
    'hôtel piscine Marrakech',
    'hôtel pas cher Marrakech',
  ],
  authors: [{ name: 'Hôtel Al Kabir' }],
  creator: 'Hôtel Al Kabir',
  publisher: 'Hôtel Al Kabir',
  openGraph: {
    type: 'website',
    locale: 'fr_MA',
    alternateLocale: ['en_US', 'ar_MA'],
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: 'Hôtel Al Kabir Marrakech',
    title: 'Hôtel Al Kabir | Hôtel 3 Étoiles à Marrakech — Guéliz',
    description:
      "Hôtel 3 étoiles au cœur de Guéliz, Marrakech. Chambres climatisées, piscine, restaurant marocain et réception 24h/24.",
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Hôtel Al Kabir - Hôtel 3 Étoiles Marrakech',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hôtel Al Kabir | Hôtel 3 Étoiles à Marrakech',
    description: "L'art de vivre le luxe marocain.",
    images: ['/images/og-image.jpg'],
    creator: '@hotelalkabir',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-background antialiased">
        <Providers>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: 'hsl(var(--card))',
                color: 'hsl(var(--foreground))',
                border: '1px solid hsl(var(--border))',
              },
            }}
          />
        </Providers>
      </body>
    </html>
  )
}
