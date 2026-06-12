import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  UtensilsCrossed, Waves, Sparkles, Dumbbell, Wifi, Car,
  Bell, Music, Clock, Phone, Users, CalendarDays
} from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Services & Équipements | Hotel Alkabir',
  description:
    'Découvrez tous les services premium de l\'Hotel Alkabir : restaurant gastronomique, spa luxueux, piscine panoramique, salle de sport et bien plus.',
}

const services = [
  {
    id: 'restaurant',
    icon: UtensilsCrossed,
    title: 'Restaurant Al Nokhba',
    subtitle: 'Gastronomie marocaine & internationale',
    description:
      'Notre restaurant gastronomique étoilé vous propose une expérience culinaire inoubliable. Sous la direction du Chef Youssef Amrani, formé dans les plus grandes maisons de France et du Maroc, la carte conjugue les saveurs authentiques marocaines avec les techniques de la cuisine française contemporaine.',
    features: ['Petit-déjeuner buffet 6h30-10h30', 'Déjeuner 12h00-15h00', 'Dîner 19h00-23h00', 'Menu dégustation sur réservation', 'Cave à vins de 400 références', 'Menu végétarien & halal disponible'],
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
  },
  {
    id: 'pool',
    icon: Waves,
    title: 'Piscine Panoramique',
    subtitle: 'Piscine extérieure au dernier étage',
    description:
      'Notre piscine extérieure est perchée au dernier étage de l\'hôtel, offrant une vue panoramique sur les toits de Marrakech et, par temps clair, les sommets enneigés de l\'Atlas. Entourée de transats et de parasols, elle est l\'espace idéal pour se détendre sous le soleil marocain.',
    features: ['Ouverte de 7h00 à 22h00', 'Service barman au bord de la piscine', 'Espace jacuzzi séparé', 'Piscine enfants (juillet-août)', 'Cours d\'aquagym', 'Serviettes fournies'],
    image: 'https://images.unsplash.com/photo-1544124499-58912cbddaad?w=800&q=80',
  },
  {
    id: 'spa',
    icon: Sparkles,
    title: 'Spa Alkabir',
    subtitle: 'Sanctuaire de bien-être de 1500 m²',
    description:
      'Le Spa Alkabir est un véritable temple de bien-être s\'étendant sur 1500 m². Il comprend un hammam traditionnel marocain, une salle de soins avec 8 cabines privées, un espace de relaxation et une piscine intérieure chauffée. Nos thérapeutes certifiés utilisent des produits naturels d\'argan et de rose du Maroc.',
    features: ['Hammam traditionnel marocain', '8 cabines de soins privées', 'Massages thérapeutiques', 'Soins visage au ghassoul', 'Rituel d\'argan complet', 'Piscine intérieure 28°C', 'Ouvert de 9h à 21h'],
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80',
  },
  {
    id: 'gym',
    icon: Dumbbell,
    title: 'Fitness Center',
    subtitle: 'Équipements de dernière génération',
    description:
      'Notre centre de fitness ultra-moderne de 800 m² est équipé des dernières machines Technogym. Que vous soyez adepte de cardio, musculation ou cours collectifs, vous trouverez tout ce qu\'il vous faut pour maintenir votre forme pendant votre séjour.',
    features: ['Machines cardio Technogym', 'Zone de musculation free weights', 'Cours collectifs (yoga, pilates...)', 'Coach personnel sur demande', 'Ouvert 24h/24 pour les résidents', 'Vestiaires premium'],
    image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&q=80',
  },
  {
    id: 'events',
    icon: Users,
    title: 'Séminaires & Événements',
    subtitle: '6 salles de conférence modulables',
    description:
      'L\'Hotel Alkabir dispose de 6 salles de réunion et de conférence entièrement équipées, pouvant accueillir de 10 à 300 personnes. Idéales pour vos séminaires d\'entreprise, conférences, présentations ou événements privés.',
    features: ['Capacité jusqu\'à 300 personnes', 'Équipement audiovisuel haute définition', 'WiFi haut débit dédié', 'Service catering sur mesure', 'Équipe événementielle dédiée', 'Parking privatif disponible'],
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
  },
  {
    id: 'bar',
    icon: Music,
    title: 'Bar & Lounge',
    subtitle: 'Ambiance raffinée jusqu\'à 2h du matin',
    description:
      'Le Bar Lounge "Al Maghrib" vous accueille dans une atmosphère intimiste et feutrée. Nos barmen créatifs vous proposent des cocktails signature inspirés des saveurs marocaines, une sélection de whisky single malt et les meilleurs vins de la région de Meknès.',
    features: ['Ouvert de 12h00 à 2h00', 'Cocktails signature marocains', 'Cave à whisky & cognac', 'Vins marocains sélectionnés', 'Musique live (vendredi-samedi)', 'Happy Hour 17h-20h'],
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80',
  },
]

export default function ServicesPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1920&q=80"
          alt="Hotel Alkabir Services"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-white text-center px-4">
          <p className="text-gold text-sm font-medium tracking-widest uppercase mb-3">Prestations</p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Services & Équipements</h1>
          <p className="text-white/80 max-w-xl">
            Un ensemble complet de services premium pour rendre votre séjour parfait
          </p>
        </div>
      </div>

      {/* Services */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-20">
          {services.map((service, index) => {
            const Icon = service.icon
            const isEven = index % 2 === 0
            return (
              <section key={service.id} id={service.id} className="scroll-mt-24">
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-center ${isEven ? '' : 'lg:grid-flow-col-dense'}`}>
                  {/* Image */}
                  <div className={`relative h-72 md:h-96 rounded-2xl overflow-hidden ${!isEven ? 'lg:col-start-2' : ''}`}>
                    <Image src={service.image} alt={service.title} fill className="object-cover" />
                    <div className="absolute top-4 left-4 w-12 h-12 rounded-xl bg-gold/90 flex items-center justify-center shadow-lg">
                      <Icon className="h-6 w-6 text-black" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className={!isEven ? 'lg:col-start-1 lg:row-start-1' : ''}>
                    <p className="text-gold text-sm font-medium tracking-widest uppercase mb-2">{service.subtitle}</p>
                    <h2 className="font-serif text-3xl font-bold mb-4">{service.title}</h2>
                    <p className="text-muted-foreground leading-relaxed mb-6">{service.description}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                      {service.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>

                    <Button variant="gold" asChild>
                      <Link href="/booking">Réserver maintenant</Link>
                    </Button>
                  </div>
                </div>
              </section>
            )
          })}
        </div>

        {/* Additional info */}
        <div className="mt-20 bg-[#0A0A0A] rounded-2xl p-8 text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Clock, title: 'Horaires', info: 'Nos services sont disponibles 24h/24 pour votre confort.' },
              { icon: Phone, title: 'Concierge', info: 'Notre équipe de concierge organise tout pour vous.' },
              { icon: Bell, title: 'Room Service', info: 'Service en chambre disponible jour et nuit.' },
            ].map(({ icon: Icon, title, info }) => (
              <div key={title} className="text-center">
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mx-auto mb-3">
                  <Icon className="h-6 w-6 text-gold" />
                </div>
                <h3 className="font-serif text-lg font-semibold mb-2">{title}</h3>
                <p className="text-white/60 text-sm">{info}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
