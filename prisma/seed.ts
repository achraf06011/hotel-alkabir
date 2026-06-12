import { PrismaClient, UserRole, RoomType, RoomStatus, BookingStatus, PaymentStatus, PaymentMethod } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding Hotel Alkabir database...')

  // ─── Admin User ────────────────────────────────────────────────────────────
  const adminPassword = await bcrypt.hash('Admin@123456', 12)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@hotelalkabir.com' },
    update: {},
    create: {
      name: 'Hotel Manager',
      email: 'admin@hotelalkabir.com',
      password: adminPassword,
      role: UserRole.ADMIN,
      phone: '+212 522 000 000',
      country: 'MA',
      isActive: true,
    },
  })
  console.log('✅ Admin user created:', admin.email)

  // ─── Demo User ─────────────────────────────────────────────────────────────
  const userPassword = await bcrypt.hash('User@123456', 12)
  const demoUser = await prisma.user.upsert({
    where: { email: 'client@example.com' },
    update: {},
    create: {
      name: 'Ahmed Benali',
      email: 'client@example.com',
      password: userPassword,
      role: UserRole.USER,
      phone: '+212 661 234 567',
      country: 'MA',
      city: 'Casablanca',
      loyaltyPoints: 1250,
      isActive: true,
    },
  })
  console.log('✅ Demo user created:', demoUser.email)

  // ─── Amenities ─────────────────────────────────────────────────────────────
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
  console.log(`✅ ${amenitiesData.length} amenities created`)

  // ─── Rooms ─────────────────────────────────────────────────────────────────
  const allAmenityNames = amenitiesData.map(a => a.name)

  const roomsData = [
    {
      name: 'Chambre Double',
      slug: 'chambre-double',
      type: RoomType.STANDARD,
      description: `Chambre confortable équipée d'un grand lit double, idéale pour deux personnes. Entièrement climatisée avec chauffage, TV à écran plat et salle de bain privée avec baignoire ou douche.\n\nDispose de toutes les commodités nécessaires pour un séjour agréable : armoire, téléphone, articles de toilette gratuits, serviettes, bidet et accès par ascenseur aux étages supérieurs. Ambiance calme au cœur du quartier Guéliz à Marrakech.`,
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
      description: `Chambre spacieuse équipée d'un grand lit Queen-Size, offrant un confort supérieur pour les couples. Climatisation et chauffage réversibles, TV à écran plat et salle de bain complète avec baignoire ou douche.\n\nTous les équipements sont inclus : coffre-fort, téléphone, armoire, articles de toilette gratuits (savon, shampooing), serviettes, bidet et papier hygiénique. Accès par ascenseur, détecteurs de fumée présents. Idéal pour un séjour agréable à Marrakech.`,
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
      description: `Notre chambre la plus spacieuse avec un grand lit King-Size, parfaite pour un séjour en tout confort. Équipée d'une climatisation performante, d'un chauffage, d'une TV à écran plat et d'une salle de bain complète avec baignoire ou douche.\n\nInclus : coffre-fort, téléphone, grande armoire, articles de toilette gratuits (savon, shampooing), serviettes, bidet et papier hygiénique. Accès aux étages supérieurs par ascenseur. Détecteurs de fumée et extincteur présents.`,
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

  const roomAmenityMap: Record<string, string[]> = {
    'chambre-double': allAmenityNames,
    'chambre-queen-size': allAmenityNames,
    'chambre-king-size': allAmenityNames,
    'chambre-triple': allAmenityNames,
  }

  for (const roomData of roomsData) {
    const room = await prisma.room.upsert({
      where: { slug: roomData.slug },
      update: {},
      create: roomData,
    })

    // Add images
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
      }).catch(() => {})
    }

    // Add amenities
    const roomAmenityNames = roomAmenityMap[roomData.slug] || []
    for (const amenityName of roomAmenityNames) {
      if (amenities[amenityName]) {
        await prisma.roomAmenity.create({
          data: {
            roomId: room.id,
            amenityId: amenities[amenityName].id,
          },
        }).catch(() => {})
      }
    }
  }
  console.log(`✅ ${roomsData.length} rooms created with images and amenities`)

  // ─── Reviews ───────────────────────────────────────────────────────────────
  const reviewsData = [
    {
      guestName: 'Sophie Martin',
      guestImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
      rating: 5,
      title: 'Une expérience magique!',
      body: 'Notre séjour à l\'Hotel Alkabir était absolument merveilleux. Le personnel était d\'une attention et d\'une gentillesse remarquables. La chambre était immaculée, avec une décoration somptueuse. Le petit-déjeuner buffet était d\'une richesse incroyable. Nous reviendrons certainement!',
      approved: true,
      featured: true,
    },
    {
      guestName: 'Jean-Pierre Dubois',
      guestImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
      rating: 5,
      title: 'Le summum du luxe au Maroc',
      body: 'J\'ai eu l\'occasion de séjourner dans la Chambre King lors de mon voyage d\'affaires à Marrakech. Le service était impeccable, la literie d\'une qualité exceptionnelle et le restaurant de l\'hôtel offrait une cuisine marocaine de premier ordre.',
      approved: true,
      featured: true,
    },
    {
      guestName: 'Amira Bensouda',
      guestImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b787?w=100&q=80',
      rating: 5,
      title: 'Notre lune de miel parfaite',
      body: 'Mon mari et moi avons passé notre lune de miel dans la Suite Romantique. Tout était parfait : la décoration avec les pétales de rose, le champagne à l\'arrivée, le jacuzzi sous les étoiles... Un souvenir impérissable que nous chérirons toujours.',
      approved: true,
      featured: true,
    },
    {
      guestName: 'Carlos Mendez',
      guestImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
      rating: 4,
      title: 'Très bon séjour en famille',
      body: 'Nous avons séjourné avec nos trois enfants dans la Suite Familiale. Les enfants ont adoré la piscine et les activités proposées. Le personnel a été très attentionné avec nos petits. Je retire une étoile uniquement parce que le parking était un peu exigu.',
      approved: true,
      featured: true,
    },
    {
      guestName: 'Emma Johnson',
      guestImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80',
      rating: 5,
      title: 'Absolutely stunning hotel!',
      body: 'This hotel exceeded all my expectations. The architecture blends traditional Moroccan art with modern luxury perfectly. The spa treatments were divine, and the rooftop pool views were breathtaking. The staff spoke excellent English and French. Highly recommended!',
      approved: true,
      featured: false,
    },
    {
      guestName: 'Mohamed Al-Rashid',
      guestImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&q=80',
      rating: 5,
      title: 'خدمة استثنائية وراحة فائقة',
      body: 'قضيت أسبوعاً رائعاً في فندق الكبير. الغرف فسيحة ومؤثثة بأناقة رائعة. المطعم يقدم أشهى الأطباق المغربية والعالمية. الموظفون متعاونون ومهذبون للغاية. سأعود بالتأكيد في زيارتي القادمة.',
      approved: true,
      featured: true,
    },
  ]

  for (const review of reviewsData) {
    await prisma.review.create({ data: review })
  }
  console.log(`✅ ${reviewsData.length} reviews created`)

  // ─── Gallery ───────────────────────────────────────────────────────────────
  const galleryData = [
    { url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80', alt: 'Façade Hotel Alkabir', title: 'Notre façade majestueuse', category: 'hotel', featured: true, sortOrder: 1 },
    { url: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80', alt: 'Suite Présidentielle', title: 'Suite Présidentielle', category: 'rooms', featured: true, sortOrder: 2 },
    { url: 'https://images.unsplash.com/photo-1544124499-58912cbddaad?w=800&q=80', alt: 'Piscine à débordement', title: 'Piscine panoramique', category: 'pool', featured: true, sortOrder: 3 },
    { url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80', alt: 'Restaurant gastronomique', title: 'Restaurant Al Nokhba', category: 'restaurant', featured: true, sortOrder: 4 },
    { url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80', alt: 'Espace Spa', title: 'Spa & Bien-être', category: 'spa', featured: true, sortOrder: 5 },
    { url: 'https://images.unsplash.com/photo-1605146769289-440113cc3d00?w=800&q=80', alt: 'Hall d\'entrée', title: 'Hall principal', category: 'hotel', featured: false, sortOrder: 6 },
    { url: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80', alt: 'Chambre Deluxe', title: 'Chambre Deluxe', category: 'rooms', featured: false, sortOrder: 7 },
    { url: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80', alt: 'Vue panoramique', title: 'Vue depuis le rooftop', category: 'hotel', featured: false, sortOrder: 8 },
    { url: 'https://images.unsplash.com/photo-1568376794508-ae52c6ab3929?w=800&q=80', alt: 'Salle de bain', title: 'Salle de bain de luxe', category: 'rooms', featured: false, sortOrder: 9 },
    { url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80', alt: 'Bar lounge', title: 'Bar & Lounge', category: 'restaurant', featured: false, sortOrder: 10 },
    { url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80', alt: 'Piscine détail', title: 'Relaxation au bord de la piscine', category: 'pool', featured: false, sortOrder: 11 },
    { url: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80', alt: 'Petit-déjeuner', title: 'Petit-déjeuner marocain', category: 'restaurant', featured: false, sortOrder: 12 },
  ]

  for (const img of galleryData) {
    await prisma.galleryImage.create({ data: img })
  }
  console.log(`✅ ${galleryData.length} gallery images created`)

  // ─── Blog Categories ────────────────────────────────────────────────────────
  const blogCategoriesData = [
    { name: 'Voyages & Découvertes', slug: 'voyages-decouvertes', description: 'Explorez le Maroc et ses merveilles', color: '#D4AF37' },
    { name: 'Gastronomie', slug: 'gastronomie', description: 'La richesse de la cuisine marocaine', color: '#8B4513' },
    { name: 'Bien-être & Spa', slug: 'bien-etre-spa', description: 'Conseils pour votre bien-être', color: '#4A7C59' },
    { name: 'Culture & Histoire', slug: 'culture-histoire', description: 'Marrakech et le patrimoine marocain', color: '#2C5282' },
    { name: 'Événements', slug: 'evenements', description: 'Actualités et événements de l\'hôtel', color: '#742A2A' },
  ]

  const blogCategories: Record<string, { id: string }> = {}
  for (const cat of blogCategoriesData) {
    const category = await prisma.blogCategory.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    })
    blogCategories[cat.slug] = category
  }
  console.log(`✅ ${blogCategoriesData.length} blog categories created`)

  // ─── Blog Posts ────────────────────────────────────────────────────────────
  const blogPostsData = [
    {
      title: 'Les incontournables de Marrakech',
      slug: 'incontournables-marrakech',
      excerpt: 'Découvrez les merveilles architecturales, culinaires et culturelles de la ville ocre du Maroc.',
      body: `# Les incontournables de Marrakech\n\nMarrakech, la ville ocre aux mille couleurs, regorge de trésors à découvrir. À quelques minutes de l'Hôtel Al Kabir, voici les expériences incontournables lors de votre séjour.\n\n## 1. La Médina et la Place Jemaa El-Fna\n\nInscrite au patrimoine mondial de l'UNESCO, la médina de Marrakech est un labyrinthe fascinant de ruelles, de souks et de riads. La Place Jemaa El-Fna s'anime le soir de musiciens, conteurs et danseurs.\n\n## 2. Les Souks de Marrakech\n\nLes souks regroupent artisans et commerçants par métier : souk des tanneurs, des teinturiers, des bijoutiers... Une immersion totale dans l'artisanat marocain authentique.\n\n## 3. Le Jardin Majorelle\n\nCet écrin de verdure créé par Jacques Majorelle, racheté par Yves Saint Laurent, abrite un musée berbère et un jardin botanique aux couleurs bleu cobalt saisissantes.\n\n## 4. La Koutoubia\n\nSymbole de Marrakech, ce minaret du XIIe siècle domine la ville et guide les voyageurs depuis des siècles. Les jardins environnants offrent un cadre paisible.\n\n## 5. Le Palais de la Bahia\n\nCe palais du XIXe siècle, aux jardins d'orangers et aux salles ornées de zellige et de stuc, témoigne du raffinement de l'architecture marocaine traditionnelle.\n\n*Notre réception se tient à votre disposition pour organiser des visites guidées personnalisées de Marrakech.*`,
      coverImage: 'https://images.unsplash.com/photo-1539036754402-4b2b2f87a5d4?w=800&q=80',
      categoryId: blogCategories['voyages-decouvertes'].id,
      authorId: admin.id,
      published: true,
      featured: true,
      readTime: 8,
      tags: ['Marrakech', 'Tourisme', 'Culture', 'Médina'],
      publishedAt: new Date('2024-01-15'),
    },
    {
      title: 'La cuisine marocaine: un voyage des sens',
      slug: 'cuisine-marocaine-voyage-sens',
      excerpt: 'Plongez dans les saveurs envoûtantes de la gastronomie marocaine : tajines, couscous, pastilla et bien plus encore.',
      body: `# La cuisine marocaine: un voyage des sens\n\nLa cuisine marocaine est reconnue mondialement pour sa richesse aromatique et la générosité de ses portions. Au restaurant Al Nokhba de l'Hotel Alkabir, nous vous proposons de vivre cette expérience gastronomique authentique.\n\n## Les épices, âme de la cuisine marocaine\n\nLe ras-el-hanout, mélange de plus de 20 épices, confère aux plats marocains leur caractère unique. Cannelle, curcuma, gingembre, cumin et coriandre se combinent dans des proportions jalousement gardées par chaque chef.\n\n## Le tajine, symbole de la cuisine marocaine\n\nCuit lentement dans son plat en terre cuite conique, le tajine est une symphonie de saveurs. Le tajine d'agneau aux pruneaux et amandes, ou celui de poulet aux citrons confits et olives, sont des classiques indétrônables.\n\n## Le couscous du vendredi\n\nTradition sacrée au Maroc, le couscous est préparé chaque vendredi avec soin et amour. Les sept légumes symboliques et la viande tendre cuite à la vapeur en font un plat d'exception.\n\n## Les douceurs marocaines\n\nLa pastilla au lait, la corne de gazelle fourrée à la pâte d'amandes et les cornes de gazelle aux noix concluent idéalement tout repas marocain.`,
      coverImage: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80',
      categoryId: blogCategories['gastronomie'].id,
      authorId: admin.id,
      published: true,
      featured: true,
      readTime: 6,
      tags: ['Gastronomie', 'Cuisine marocaine', 'Restaurant', 'Épices'],
      publishedAt: new Date('2024-02-10'),
    },
    {
      title: 'Les bienfaits du hammam traditionnel marocain',
      slug: 'bienfaits-hammam-traditionnel',
      excerpt: 'Découvrez les secrets millénaires du hammam marocain et ses incroyables bienfaits pour la peau et l\'esprit.',
      body: `# Les bienfaits du hammam traditionnel marocain\n\nPratique ancestrale transmise depuis des millénaires, le hammam marocain est bien plus qu'un simple bain de vapeur. C'est un rituel de purification, de relaxation et de socialisation profondément ancré dans la culture marocaine.\n\n## Le rituel du hammam\n\nLe parcours traditionnel commence par la salle tiède (el-bayt el-wastani), où le corps s'adapte progressivement à la chaleur. On passe ensuite dans la salle chaude (el-bayt el-skhoun) avant de terminer dans la salle froide pour refermer les pores.\n\n## Le savon beldi, trésor de la cosmétique marocaine\n\nFabriqué à base d'huile d'olive et de potasse, ce savon noir aux propriétés exfoliantes exceptionnelles est la base de tout soin hammam authentique. Sa texture gélatineuse nourrit et hydrate la peau en profondeur.\n\n## Le kessa, l'exfoliant par excellence\n\nLe gant kessa, utilisé avec des mouvements circulaires après le savonnage, débarrasse la peau des cellules mortes et stimule la circulation sanguine. Le résultat est une peau d'une douceur incomparable.\n\n## Au Spa Alkabir\n\nNotre spa propose l'expérience complète du hammam traditionnel avec des soins adaptés aux standards contemporains de bien-être et de luxe.`,
      coverImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80',
      categoryId: blogCategories['bien-etre-spa'].id,
      authorId: admin.id,
      published: true,
      featured: false,
      readTime: 5,
      tags: ['Spa', 'Hammam', 'Bien-être', 'Beauté', 'Tradition'],
      publishedAt: new Date('2024-03-05'),
    },
  ]

  for (const post of blogPostsData) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: {},
      create: post,
    })
  }
  console.log(`✅ ${blogPostsData.length} blog posts created`)

  // ─── Settings ──────────────────────────────────────────────────────────────
  const settingsData = [
    { key: 'hotel_name', value: 'Hôtel Al Kabir', group: 'general', label: 'Nom de l\'hôtel', type: 'text' },
    { key: 'hotel_tagline', value: 'Votre hôtel au cœur de Guéliz depuis 1983', group: 'general', label: 'Slogan', type: 'text' },
    { key: 'hotel_description', value: 'Situé au cœur du quartier Guéliz à Marrakech, l\'Hôtel Al Kabir est un établissement 3 étoiles qui accueille des voyageurs du monde entier depuis 1983. Chambres climatisées, piscine extérieure, café-restaurant et réception 24h/24.', group: 'general', label: 'Description', type: 'textarea' },
    { key: 'hotel_email', value: 'contact@hotelalkabir.com', group: 'contact', label: 'Email', type: 'email' },
    { key: 'hotel_phone', value: '05244-39540', group: 'contact', label: 'Téléphone principal', type: 'tel' },
    { key: 'hotel_phone_reservation', value: '05244-39540', group: 'contact', label: 'Téléphone réservations', type: 'tel' },
    { key: 'hotel_address', value: 'Boulevard Mohamed Zerktouni, Guéliz, Marrakech 40000, Maroc', group: 'contact', label: 'Adresse', type: 'text' },
    { key: 'hotel_checkin_time', value: '14:00', group: 'policies', label: 'Heure de check-in', type: 'time' },
    { key: 'hotel_checkout_time', value: '12:00', group: 'policies', label: 'Heure de check-out', type: 'time' },
    { key: 'hotel_currency', value: 'MAD', group: 'finance', label: 'Devise', type: 'text' },
    { key: 'hotel_tax_rate', value: '10', group: 'finance', label: 'Taux de TVA (%)', type: 'number' },
    { key: 'hotel_stars', value: '3', group: 'general', label: 'Étoiles', type: 'number' },
    { key: 'hotel_license', value: '40000HT0556', group: 'general', label: 'Numéro de licence', type: 'text' },
    { key: 'facebook_url', value: 'https://facebook.com/hotelalkabir', group: 'social', label: 'Facebook', type: 'url' },
    { key: 'instagram_url', value: 'https://instagram.com/hotelalkabir', group: 'social', label: 'Instagram', type: 'url' },
    { key: 'twitter_url', value: 'https://twitter.com/hotelalkabir', group: 'social', label: 'Twitter/X', type: 'url' },
  ]

  for (const setting of settingsData) {
    await prisma.setting.upsert({
      where: { key: setting.key },
      update: {},
      create: setting,
    })
  }
  console.log(`✅ ${settingsData.length} settings created`)

  // ─── Sample Booking ────────────────────────────────────────────────────────
  const deluxeRoom = await prisma.room.findUnique({ where: { slug: 'chambre-king-size' } })
  if (deluxeRoom) {
    await prisma.booking.create({
      data: {
        bookingRef: 'ALK-2024-001',
        userId: demoUser.id,
        roomId: deluxeRoom.id,
        checkIn: new Date('2024-12-20'),
        checkOut: new Date('2024-12-25'),
        adults: 2,
        children: 0,
        nights: 5,
        pricePerNight: deluxeRoom.price,
        subtotal: deluxeRoom.price * 5,
        taxes: deluxeRoom.price * 5 * 0.1,
        totalPrice: deluxeRoom.price * 5 * 1.1,
        status: BookingStatus.CHECKED_OUT,
        guestName: 'Ahmed Benali',
        guestEmail: 'client@example.com',
        guestPhone: '+212 661 234 567',
        guestCountry: 'MA',
        checkedInAt: new Date('2024-12-20T14:30:00'),
        checkedOutAt: new Date('2024-12-25T11:15:00'),
        payment: {
          create: {
            amount: deluxeRoom.price * 5 * 1.1,
            currency: 'MAD',
            method: PaymentMethod.CREDIT_CARD,
            status: PaymentStatus.PAID,
            transactionId: 'TXN-2024-001',
            paidAt: new Date('2024-12-20'),
          },
        },
      },
    })
    console.log('✅ Sample booking created')
  }

  console.log('\n🎉 Database seeded successfully!')
  console.log('\n📋 Demo Credentials:')
  console.log('  Admin:  admin@hotelalkabir.com / Admin@123456')
  console.log('  Client: client@example.com    / User@123456')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
