import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const galleryImages = [
  // ─── Façade (en premier, featured) ──────────────────────────────────────────
  { url: '/images/facade/facade-1.jpg',  alt: 'Façade Hôtel Al Kabir', title: 'Façade de l\'hôtel', category: 'facade', featured: true,  sortOrder: 1 },
  { url: '/images/facade/facade-2.jpg',  alt: 'Hôtel Al Kabir Marrakech', title: 'Hôtel Al Kabir', category: 'facade', featured: true,  sortOrder: 2 },

  // ─── Chambre Double ──────────────────────────────────────────────────────────
  { url: '/images/ChambreDouble/double-1.webp', alt: 'Chambre Double', title: 'Chambre Double', category: 'chambres', featured: true,  sortOrder: 3 },
  { url: '/images/ChambreDouble/double-2.webp', alt: 'Chambre Double', title: 'Chambre Double', category: 'chambres', featured: true,  sortOrder: 4 },
  { url: '/images/ChambreDouble/double-3.webp', alt: 'Chambre Double', title: 'Chambre Double', category: 'chambres', featured: false, sortOrder: 5 },
  { url: '/images/ChambreDouble/double-4.webp', alt: 'Chambre Double', title: 'Chambre Double', category: 'chambres', featured: false, sortOrder: 6 },
  { url: '/images/ChambreDouble/double-5.webp', alt: 'Chambre Double', title: 'Chambre Double', category: 'chambres', featured: false, sortOrder: 7 },
  { url: '/images/ChambreDouble/double-6.webp', alt: 'Chambre Double', title: 'Chambre Double', category: 'chambres', featured: false, sortOrder: 8 },
  { url: '/images/ChambreDouble/double-7.webp', alt: 'Chambre Double', title: 'Chambre Double', category: 'chambres', featured: false, sortOrder: 9 },
  { url: '/images/ChambreDouble/double-8.webp', alt: 'Chambre Double', title: 'Chambre Double', category: 'chambres', featured: false, sortOrder: 10 },

  // ─── Chambre Lit Queen-Size ──────────────────────────────────────────────────
  { url: '/images/ChambreLitQueenSize/queen-1.webp', alt: 'Chambre Lit Queen-Size', title: 'Chambre Queen-Size', category: 'chambres', featured: true,  sortOrder: 11 },
  { url: '/images/ChambreLitQueenSize/queen-2.webp', alt: 'Chambre Lit Queen-Size', title: 'Chambre Queen-Size', category: 'chambres', featured: false, sortOrder: 12 },
  { url: '/images/ChambreLitQueenSize/queen-3.webp', alt: 'Chambre Lit Queen-Size', title: 'Chambre Queen-Size', category: 'chambres', featured: false, sortOrder: 13 },
  { url: '/images/ChambreLitQueenSize/queen-4.webp', alt: 'Chambre Lit Queen-Size', title: 'Chambre Queen-Size', category: 'chambres', featured: false, sortOrder: 14 },
  { url: '/images/ChambreLitQueenSize/queen-5.webp', alt: 'Chambre Lit Queen-Size', title: 'Chambre Queen-Size', category: 'chambres', featured: false, sortOrder: 15 },

  // ─── Chambre Lit King-Size ───────────────────────────────────────────────────
  { url: '/images/ChambreLitKing-Size/king-1.jpg', alt: 'Chambre Lit King-Size', title: 'Chambre King-Size', category: 'chambres', featured: true,  sortOrder: 16 },
  { url: '/images/ChambreLitKing-Size/king-2.jpg', alt: 'Chambre Lit King-Size', title: 'Chambre King-Size', category: 'chambres', featured: false, sortOrder: 17 },
  { url: '/images/ChambreLitKing-Size/king-3.jpg', alt: 'Chambre Lit King-Size', title: 'Chambre King-Size', category: 'chambres', featured: false, sortOrder: 18 },
  { url: '/images/ChambreLitKing-Size/king-4.jpg', alt: 'Chambre Lit King-Size', title: 'Chambre King-Size', category: 'chambres', featured: false, sortOrder: 19 },
  { url: '/images/ChambreLitKing-Size/king-5.jpg', alt: 'Chambre Lit King-Size', title: 'Chambre King-Size', category: 'chambres', featured: false, sortOrder: 20 },
  { url: '/images/ChambreLitKing-Size/king-6.jpg', alt: 'Chambre Lit King-Size', title: 'Chambre King-Size', category: 'chambres', featured: false, sortOrder: 21 },
  { url: '/images/ChambreLitKing-Size/king-7.jpg', alt: 'Chambre Lit King-Size', title: 'Chambre King-Size', category: 'chambres', featured: false, sortOrder: 22 },

  // ─── Chambre Triple de Base ──────────────────────────────────────────────────
  { url: '/images/ChambreTripleDeBase/triple-1.webp', alt: 'Chambre Triple de Base', title: 'Chambre Triple', category: 'chambres', featured: false, sortOrder: 23 },
  { url: '/images/ChambreTripleDeBase/triple-2.webp', alt: 'Chambre Triple de Base', title: 'Chambre Triple', category: 'chambres', featured: false, sortOrder: 24 },
  { url: '/images/ChambreTripleDeBase/triple-3.webp', alt: 'Chambre Triple de Base', title: 'Chambre Triple', category: 'chambres', featured: false, sortOrder: 25 },
  { url: '/images/ChambreTripleDeBase/triple-4.webp', alt: 'Chambre Triple de Base', title: 'Chambre Triple', category: 'chambres', featured: false, sortOrder: 26 },
  { url: '/images/ChambreTripleDeBase/triple-5.webp', alt: 'Chambre Triple de Base', title: 'Chambre Triple', category: 'chambres', featured: false, sortOrder: 27 },
]

async function main() {
  await prisma.galleryImage.deleteMany()
  console.log('Anciennes images supprimées')

  for (const img of galleryImages) {
    await prisma.galleryImage.create({ data: img })
  }

  console.log(`✅ ${galleryImages.length} photos insérées dans la galerie`)
}

main().catch(console.error).finally(() => prisma.$disconnect())
