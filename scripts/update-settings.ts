import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const settings = [
    { key: 'hotel_name', value: 'Hôtel Al Kabir' },
    { key: 'hotel_stars', value: '3' },
    { key: 'hotel_description', value: 'Situé au cœur du quartier dynamique de Guéliz à Marrakech, l\'Hôtel Al Kabir est un établissement 3 étoiles qui accueille des voyageurs du monde entier dans une ambiance conviviale et authentique. Construit en 1983, l\'hôtel fait partie des établissements historiques de Guéliz.' },
    { key: 'contact_phone', value: '05244-39540' },
    { key: 'contact_email', value: 'contact@hotelalkabir.com' },
    { key: 'hotel_address', value: 'Boulevard Mohamed Zerktouni, Guéliz' },
    { key: 'hotel_city', value: 'Marrakech' },
    { key: 'hotel_country', value: 'Maroc' },
    { key: 'hotel_lat', value: '31.6295' },
    { key: 'hotel_lng', value: '-7.9811' },
    { key: 'checkin_time', value: '14:00' },
    { key: 'checkout_time', value: '12:00' },
    { key: 'currency', value: 'MAD' },
    { key: 'tax_rate', value: '10' },
  ]

  for (const setting of settings) {
    await prisma.setting.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: { key: setting.key, value: setting.value },
    })
    console.log(`✅ ${setting.key} = ${setting.value}`)
  }

  await prisma.$disconnect()
  console.log('\n🎉 Paramètres mis à jour avec succès !')
}

main().catch(console.error)
