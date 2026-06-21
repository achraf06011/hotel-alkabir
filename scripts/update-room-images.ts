import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const roomImages: Record<string, string[]> = {
  'chambre-double': [
    '/images/ChambreDouble/double-1.webp',
    '/images/ChambreDouble/double-2.webp',
    '/images/ChambreDouble/double-3.webp',
    '/images/ChambreDouble/double-4.webp',
    '/images/ChambreDouble/double-5.webp',
    '/images/ChambreDouble/double-6.webp',
    '/images/ChambreDouble/double-7.webp',
    '/images/ChambreDouble/double-8.webp',
  ],
  'chambre-queen-size': [
    '/images/ChambreLitQueenSize/queen-1.webp',
    '/images/ChambreLitQueenSize/queen-2.webp',
    '/images/ChambreLitQueenSize/queen-3.webp',
    '/images/ChambreLitQueenSize/queen-4.webp',
    '/images/ChambreLitQueenSize/queen-5.webp',
  ],
  'chambre-king-size': [
    '/images/ChambreLitKing-Size/king-1.jpg',
    '/images/ChambreLitKing-Size/king-2.jpg',
    '/images/ChambreLitKing-Size/king-3.jpg',
    '/images/ChambreLitKing-Size/king-4.jpg',
    '/images/ChambreLitKing-Size/king-5.jpg',
    '/images/ChambreLitKing-Size/king-6.jpg',
    '/images/ChambreLitKing-Size/king-7.jpg',
  ],
  'chambre-triple': [
    '/images/ChambreTripleDeBase/triple-1.webp',
    '/images/ChambreTripleDeBase/triple-2.webp',
    '/images/ChambreTripleDeBase/triple-3.webp',
    '/images/ChambreTripleDeBase/triple-4.webp',
    '/images/ChambreTripleDeBase/triple-5.webp',
  ],
}

async function main() {
  for (const [slug, images] of Object.entries(roomImages)) {
    const room = await prisma.room.findUnique({ where: { slug } })
    if (!room) { console.log(`Room not found: ${slug}`); continue }

    await prisma.roomImage.deleteMany({ where: { roomId: room.id } })

    for (let i = 0; i < images.length; i++) {
      await prisma.roomImage.create({
        data: {
          roomId: room.id,
          url: images[i],
          alt: `${room.name} - Photo ${i + 1}`,
          isPrimary: i === 0,
          sortOrder: i,
        },
      })
    }
    console.log(`✅ ${room.name}: ${images.length} photos mises à jour`)
  }
  console.log('\nTerminé.')
}

main().catch(console.error).finally(() => prisma.$disconnect())
