import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const result = await prisma.user.updateMany({
    where: { emailVerified: null },
    data: { emailVerified: new Date() },
  })
  console.log(`✅ ${result.count} utilisateur(s) marqué(s) comme vérifiés`)
  await prisma.$disconnect()
}

main().catch(console.error)
