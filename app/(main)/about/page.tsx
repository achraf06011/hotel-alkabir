import { Metadata } from 'next'
import Image from 'next/image'
import { Crown, Award, Star, Users, Heart, MapPin } from 'lucide-react'

export const metadata: Metadata = {
  title: 'À propos | Hotel Al Kabir Marrakech',
  description:
    'Découvrez l\'histoire de l\'Hôtel Al Kabir, établissement 3 étoiles situé au cœur du quartier Guéliz à Marrakech depuis 1983.',
}

const team = [
  {
    name: 'Direction Générale',
    role: 'Management',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=80',
    bio: 'Une équipe expérimentée au service de votre confort depuis 1983.',
  },
  {
    name: 'Service Restauration',
    role: 'Cuisine marocaine & internationale',
    image: 'https://images.unsplash.com/photo-1607631568010-a87245c0daf8?w=300&q=80',
    bio: 'Des saveurs authentiques marocaines et des plats internationaux préparés avec soin.',
  },
  {
    name: 'Réception 24h/24',
    role: 'Accueil & Conciergerie',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&q=80',
    bio: 'Disponibles à toute heure pour répondre à toutes vos demandes.',
  },
  {
    name: 'Équipe Entretien',
    role: 'Propreté & Confort',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=80',
    bio: 'Nous veillons à ce que chaque séjour soit agréable et confortable.',
  },
]

const milestones = [
  { year: '1983', event: 'Fondation de l\'Hôtel Al Kabir à Guéliz, Marrakech' },
  { year: '1990', event: 'Extension de l\'hôtel et ajout de nouvelles chambres' },
  { year: '2000', event: 'Inauguration de la piscine extérieure avec terrasse' },
  { year: '2010', event: 'Rénovation importante des installations et chambres' },
  { year: '2018', event: 'Modernisation du restaurant et de la carte culinaire' },
  { year: '2023', event: 'Lancement du site web et du système de réservation en ligne' },
]

const values = [
  { icon: Heart, title: 'Hospitalité', description: 'Un accueil chaleureux et authentique digne de la tradition marocaine.' },
  { icon: MapPin, title: 'Emplacement', description: 'Au cœur de Guéliz, à 15 min de l\'aéroport Marrakech-Menara.' },
  { icon: Star, title: 'Authenticité', description: 'Une expérience marocaine genuine dans un cadre convivial et accueillant.' },
  { icon: Users, title: 'Service', description: 'Une réception ouverte 24h/24 pour vous accompagner à tout moment.' },
  { icon: Award, title: 'Rapport qualité-prix', description: 'Le meilleur confort au meilleur prix pour découvrir Marrakech.' },
  { icon: Crown, title: 'Confort', description: 'Chambres climatisées, piscine extérieure et restaurant sur place.' },
]

export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <div className="relative h-80 md:h-[500px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1920&q=80"
          alt="Hotel Al Kabir Marrakech"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-white text-center px-4">
          <div className="w-16 h-16 rounded-full bg-gold flex items-center justify-center mb-4">
            <Crown className="h-8 w-8 text-black" />
          </div>
          <p className="text-gold text-sm font-medium tracking-widest uppercase mb-3">Notre histoire</p>
          <h1 className="font-serif text-4xl md:text-6xl font-bold mb-4">Plus de 40 ans d&apos;accueil</h1>
          <p className="text-white/80 max-w-2xl">
            Depuis 1983, l&apos;Hôtel Al Kabir accueille des voyageurs du monde entier au cœur de Marrakech
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Story section */}
        <section className="py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-gold text-sm font-medium tracking-widest uppercase mb-3">Qui sommes-nous</p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
                Un établissement historique au cœur de Guéliz
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Situé au cœur du quartier dynamique de Guéliz à Marrakech, l&apos;Hôtel Al Kabir est
                  un établissement 3 étoiles qui accueille des voyageurs du monde entier dans une
                  ambiance conviviale et authentique.
                </p>
                <p>
                  Construit en 1983, l&apos;hôtel fait partie des établissements historiques de Guéliz.
                  Au fil des années, il a évolué afin d&apos;améliorer le confort de ses clients tout
                  en conservant son caractère chaleureux. Une rénovation importante a notamment été
                  réalisée au cours de son exploitation.
                </p>
                <p>
                  Grâce à sa situation privilégiée sur le Boulevard Mohamed Zerktouni, les visiteurs
                  bénéficient d&apos;un accès rapide aux principaux centres d&apos;intérêt de Marrakech,
                  notamment le Jardin Majorelle, la gare ferroviaire, les centres commerciaux et
                  la célèbre médina.
                </p>
              </div>
            </div>
            <div className="relative h-[500px]">
              <div className="absolute inset-0 rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1596436889106-be35e843f974?w=800&q=80"
                  alt="Hotel Al Kabir Marrakech"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-gold text-black rounded-xl p-4 shadow-xl">
                <div className="font-serif text-4xl font-bold">40+</div>
                <div className="text-sm font-medium">Années d&apos;accueil</div>
              </div>
            </div>
          </div>
        </section>

        {/* Key figures */}
        <section className="py-16 border-t border-border">
          <div className="text-center mb-12">
            <p className="text-gold text-sm font-medium tracking-widest uppercase mb-3">En chiffres</p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold">L&apos;Hôtel Al Kabir</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 text-center">
            {[
              { value: '1983', label: 'Année de fondation' },
              { value: '~95', label: 'Chambres' },
              { value: '7', label: 'Étages' },
              { value: '3★', label: 'Classement' },
              { value: '24h/24', label: 'Réception' },
              { value: '15 min', label: 'De l\'aéroport' },
              { value: 'Guéliz', label: 'Quartier, Marrakech' },
            ].map((stat) => (
              <div key={stat.label} className="bg-card border border-border rounded-xl p-4">
                <div className="font-serif text-2xl font-bold text-gold mb-1">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Values */}
        <section className="py-16 border-t border-border">
          <div className="text-center mb-12">
            <p className="text-gold text-sm font-medium tracking-widest uppercase mb-3">Pourquoi nous choisir</p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold">Nos atouts</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map(({ icon: Icon, title, description }) => (
              <div key={title} className="bg-card border border-border rounded-xl p-6 hover:border-gold/40 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-4">
                  <Icon className="h-6 w-6 text-gold" />
                </div>
                <h3 className="font-serif text-lg font-semibold mb-2">{title}</h3>
                <p className="text-muted-foreground text-sm">{description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Mission */}
        <section className="py-16 border-t border-border">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-gold text-sm font-medium tracking-widest uppercase mb-3">Notre mission</p>
              <h2 className="font-serif text-3xl font-bold mb-6">Une expérience authentique à Marrakech</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Offrir à chaque visiteur une expérience confortable et authentique au cœur de Marrakech,
                en combinant hospitalité marocaine, emplacement stratégique et services adaptés aussi
                bien aux voyageurs d&apos;affaires qu&apos;aux touristes.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                L&apos;établissement dispose de chambres climatisées, d&apos;une piscine extérieure avec terrasse,
                d&apos;un restaurant proposant une cuisine marocaine et internationale ainsi que d&apos;une
                réception ouverte 24h/24 pour garantir un séjour agréable à chaque client.
              </p>
            </div>
            <div className="relative h-80 rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80"
                alt="Piscine Hotel Al Kabir"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-16 border-t border-border">
          <div className="text-center mb-12">
            <p className="text-gold text-sm font-medium tracking-widest uppercase mb-3">Chronologie</p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold">Notre parcours</h2>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border hidden md:block" />
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={milestone.year} className={`flex items-center gap-6 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="bg-card border border-border rounded-xl p-4 inline-block">
                      <div className="text-gold font-bold text-lg mb-1">{milestone.year}</div>
                      <p className="text-sm text-muted-foreground">{milestone.event}</p>
                    </div>
                  </div>
                  <div className="hidden md:flex w-4 h-4 rounded-full bg-gold border-4 border-background shadow-sm shrink-0 z-10" />
                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-16 border-t border-border">
          <div className="text-center mb-12">
            <p className="text-gold text-sm font-medium tracking-widest uppercase mb-3">Notre équipe</p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold">À votre service</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <div key={member.name} className="text-center group">
                <div className="relative w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 border-4 border-transparent group-hover:border-gold transition-colors">
                  <Image src={member.image} alt={member.name} fill className="object-cover" />
                </div>
                <h3 className="font-serif text-lg font-semibold">{member.name}</h3>
                <p className="text-gold text-sm mb-2">{member.role}</p>
                <p className="text-muted-foreground text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
