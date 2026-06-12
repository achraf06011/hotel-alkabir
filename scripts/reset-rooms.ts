import { PrismaClient, RoomType, RoomStatus } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🗑️  Suppression des anciennes chambres...')

  // Delete in order to respect foreign keys
  await prisma.roomAmenity.deleteMany({})
  await prisma.roomImage.deleteMany({})
  await prisma.payment.deleteMany({})
  await prisma.booking.deleteMany({})
  await prisma.room.deleteMany({})
  await prisma.amenity.deleteMany({})
  console.log('✅ Anciennes chambres supprimées')

  // ─── Amenities réelles ────────────────────────────────────────────────────
  const amenitiesData = [
    { name: 'WiFi gratuit', icon: 'Wifi', category: 'connectivity' },
    { name: 'Climatisation', icon: 'Wind', category: 'comfort' },
    { name: 'Chauffage', icon: 'Flame', category: 'comfort' },
    { name: 'TV écran plat', icon: 'Tv', category: 'entertainment' },
    { name: 'Coffre-fort', icon: 'Lock', category: 'security' },
    { name: 'Téléphone', icon: 'Phone', category: 'service' },
    { name: 'Armoire / penderie', icon: 'LayoutGrid', category: 'comfort' },
    { name: 'Salle de bain privée', icon: 'Bath', category: 'bathroom' },
    { name: 'Baignoire ou douche', icon: 'Droplets', category: 'bathroom' },
    { name: 'Bidet', icon: 'Droplets', category: 'bathroom' },
    { name: 'Serviettes', icon: 'Star', category: 'bathroom' },
    { name: 'Articles de toilette gratuits', icon: 'Sparkles', category: 'bathroom' },
    { name: 'Savon & Shampooing', icon: 'Droplets', category: 'bathroom' },
    { name: 'Papier hygiénique', icon: 'FileText', category: 'bathroom' },
    { name: 'Ascenseur', icon: 'ArrowUpDown', category: 'facilities' },
    { name: 'Détecteurs de fumée', icon: 'AlertTriangle', category: 'safety' },
    { name: 'Extincteur d\'incendie', icon: 'Flame', category: 'safety' },
    { name: 'Poubelles', icon: 'Trash2', category: 'comfort' },
  ]

  const amenities: Record<string, { id: string }> = {}
  for (const a of amenitiesData) {
    const amenity = await prisma.amenity.upsert({
      where: { name: a.name },
      update: {},
      create: a,
    })
    amenities[a.name] = amenity
  }
  console.log(`✅ ${amenitiesData.length} équipements créés`)

  // Toutes les chambres partagent les mêmes équipements
  const allAmenityNames = amenitiesData.map(a => a.name)

  // ─── Les 4 vrais types de chambres ───────────────────────────────────────
  const roomsData = [
    {
      name: 'Chambre Double',
      slug: 'chambre-double',
      type: RoomType.STANDARD,
      description: `Chambre confortable équipée de deux lits ou d'un grand lit double, idéale pour deux personnes. Entièrement climatisée avec chauffage, TV à écran plat et salle de bain privée avec baignoire ou douche.\n\nDispose de toutes les commodités nécessaires pour un séjour agréable : armoire, téléphone, articles de toilette gratuits, serviettes et accès par ascenseur aux étages supérieurs. Ambiance calme et reposante au cœur du quartier Guéliz.`,
      shortDesc: 'Chambre climatisée avec TV et salle de bain — idéale pour 2 personnes',
      price: 380,
      weekendPrice: 420,
      floor: 2,
      roomNumber: '201',
      capacity: 2,
      adults: 2,
      children: 1,
      size: 22,
      bedType: 'Lit double',
      view: 'Vue sur rue',
      featured: true,
      status: RoomStatus.AVAILABLE,
      sortOrder: 1,
    },
    {
      name: 'Chambre Lit Queen-Size',
      slug: 'chambre-queen-size',
      type: RoomType.STANDARD,
      description: `Chambre spacieuse équipée d'un grand lit Queen-Size, offrant un confort supérieur pour les couples. Climatisation et chauffage réversibles, TV à écran plat et salle de bain complète avec baignoire ou douche.\n\nTous les équipements sont inclus : coffre-fort, téléphone, armoire, articles de toilette gratuits (savon, shampooing), serviettes et bidet. Les étages supérieurs sont accessibles par ascenseur. Idéal pour un séjour romantique ou de détente à Marrakech.`,
      shortDesc: 'Chambre avec lit Queen-Size, climatisation et salle de bain complète',
      price: 450,
      weekendPrice: 490,
      floor: 3,
      roomNumber: '305',
      capacity: 2,
      adults: 2,
      children: 1,
      size: 24,
      bedType: 'Queen Size',
      view: 'Vue sur rue',
      featured: true,
      status: RoomStatus.AVAILABLE,
      sortOrder: 2,
    },
    {
      name: 'Chambre Lit King-Size',
      slug: 'chambre-king-size',
      type: RoomType.DELUXE,
      description: `Notre chambre la plus spacieuse avec un grand lit King-Size, parfaite pour un séjour en tout confort. Équipée d'une climatisation performante, d'un chauffage, d'une TV à écran plat et d'une salle de bain luxueuse avec baignoire ou douche.\n\nInclus : coffre-fort, téléphone, grande armoire, articles de toilette gratuits (savon, shampooing), serviettes, bidet et papier hygiénique. Accès aux étages supérieurs par ascenseur. Détecteurs de fumée et extincteur présents pour votre sécurité.`,
      shortDesc: 'Chambre supérieure avec lit King-Size — le plus grand confort',
      price: 520,
      weekendPrice: 580,
      floor: 4,
      roomNumber: '402',
      capacity: 2,
      adults: 2,
      children: 1,
      size: 26,
      bedType: 'King Size',
      view: 'Vue sur jardin',
      featured: true,
      status: RoomStatus.AVAILABLE,
      sortOrder: 3,
    },
    {
      name: 'Chambre Triple de Base',
      slug: 'chambre-triple',
      type: RoomType.FAMILY,
      description: `Chambre triple idéale pour les familles ou les groupes de 3 personnes. Équipée de 3 lits (ou 1 lit double + 1 lit simple), climatisation, chauffage et TV à écran plat. Salle de bain complète avec baignoire ou douche.\n\nInclus : coffre-fort, téléphone, armoire spacieuse, articles de toilette gratuits (savon, shampooing), serviettes, bidet et papier hygiénique. Accès par ascenseur, détecteurs de fumée et extincteur d'incendie présents. La solution idéale pour voyager en famille à Marrakech.`,
      shortDesc: 'Chambre pour 3 personnes avec tous les équipements — idéale en famille',
      price: 590,
      weekendPrice: 650,
      floor: 2,
      roomNumber: '215',
      capacity: 3,
      adults: 3,
      children: 1,
      size: 28,
      bedType: '1 lit double + 1 lit simple',
      view: 'Vue sur rue',
      featured: false,
      status: RoomStatus.AVAILABLE,
      sortOrder: 4,
    },
  ]

  // Images Unsplash réalistes pour hôtel 3 étoiles Marrakech
  const roomImages: Record<string, string[]> = {
    'chambre-double': [
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80',
      'https://images.unsplash.com/photo-1568376794508-ae52c6ab3929?w=800&q=80',
    ],
    'chambre-queen-size': [
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80',
      'https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=800&q=80',
    ],
    'chambre-king-size': [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
      'https://images.unsplash.com/photo-1560185007-5f0bb1866cab?w=800&q=80',
      'https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800&q=80',
    ],
    'chambre-triple': [
      'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=800&q=80',
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80',
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80',
    ],
  }

  for (const roomData of roomsData) {
    const room = await prisma.room.create({ data: roomData })

    // Images
    const images = roomImages[roomData.slug] || []
    for (let i = 0; i < images.length; i++) {
      await prisma.roomImage.create({
        data: {
          roomId: room.id,
          url: images[i],
          alt: `${roomData.name} - Photo ${i + 1}`,
          isPrimary: i === 0,
          sortOrder: i,
        },
      })
    }

    // Équipements (tous les mêmes pour toutes les chambres)
    for (const amenityName of allAmenityNames) {
      if (amenities[amenityName]) {
        await prisma.roomAmenity.create({
          data: { roomId: room.id, amenityId: amenities[amenityName].id },
        }).catch(() => {})
      }
    }

    console.log(`✅ ${roomData.name} créée`)
  }

  // ─── Mise à jour des paramètres ───────────────────────────────────────────
  const settingsUpdates = [
    { key: 'hotel_name', value: 'Hôtel Al Kabir' },
    { key: 'hotel_stars', value: '3' },
    { key: 'hotel_tagline', value: 'Votre hôtel au cœur de Guéliz depuis 1983' },
    { key: 'hotel_description', value: 'Situé au cœur du quartier Guéliz à Marrakech, l\'Hôtel Al Kabir est un établissement 3 étoiles qui accueille des voyageurs du monde entier depuis 1983. Chambres climatisées, piscine extérieure, café-restaurant et réception 24h/24.' },
    { key: 'hotel_phone', value: '05244-39540' },
    { key: 'hotel_phone_reservation', value: '05244-39540' },
    { key: 'hotel_address', value: 'Boulevard Mohamed Zerktouni, Guéliz, Marrakech 40000, Maroc' },
    { key: 'hotel_checkin_time', value: '14:00' },
    { key: 'hotel_checkout_time', value: '12:00' },
    { key: 'hotel_license', value: '40000HT0556' },
    { key: 'hotel_currency', value: 'MAD' },
    { key: 'hotel_tax_rate', value: '10' },
  ]

  for (const s of settingsUpdates) {
    await prisma.setting.upsert({
      where: { key: s.key },
      update: { value: s.value },
      create: { key: s.key, value: s.value },
    })
  }
  console.log('✅ Paramètres mis à jour')

  console.log('\n🎉 Chambres réinitialisées avec succès !')
  console.log('   4 types de chambres créés :')
  console.log('   • Chambre Double         — 380 MAD/nuit')
  console.log('   • Chambre Queen-Size     — 450 MAD/nuit')
  console.log('   • Chambre King-Size      — 520 MAD/nuit')
  console.log('   • Chambre Triple de Base — 590 MAD/nuit')
}

main()
  .catch((e) => {
    console.error('❌ Erreur :', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
