import { prisma } from '@/lib/prisma'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Save } from 'lucide-react'

async function getSettingsMap() {
  const settings = await prisma.setting.findMany()
  return Object.fromEntries(settings.map((s) => [s.key, s.value]))
}

export default async function AdminSettingsPage() {
  const s = await getSettingsMap()

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="font-serif text-2xl font-bold">Paramètres de l'hôtel</h1>
        <p className="text-muted-foreground text-sm">Configuration générale et informations de contact</p>
      </div>

      <form className="space-y-8">
        {/* General info */}
        <section className="bg-card border border-border rounded-xl p-6 space-y-5">
          <h2 className="font-semibold text-base">Informations générales</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label>Nom de l'hôtel</Label>
              <Input defaultValue={s['hotel_name'] || 'Hotel Alkabir'} name="hotel_name" />
            </div>
            <div className="space-y-2">
              <Label>Étoiles</Label>
              <Input defaultValue={s['hotel_stars'] || '5'} name="hotel_stars" type="number" min="1" max="5" />
            </div>
            <div className="sm:col-span-2 space-y-2">
              <Label>Description</Label>
              <Textarea defaultValue={s['hotel_description'] || ''} name="hotel_description" rows={3} />
            </div>
            <div className="space-y-2">
              <Label>Email principal</Label>
              <Input defaultValue={s['contact_email'] || ''} name="contact_email" type="email" />
            </div>
            <div className="space-y-2">
              <Label>Téléphone</Label>
              <Input defaultValue={s['contact_phone'] || ''} name="contact_phone" />
            </div>
            <div className="space-y-2">
              <Label>WhatsApp</Label>
              <Input defaultValue={s['contact_whatsapp'] || ''} name="contact_whatsapp" />
            </div>
            <div className="space-y-2">
              <Label>Site web</Label>
              <Input defaultValue={s['contact_website'] || ''} name="contact_website" />
            </div>
          </div>
        </section>

        {/* Address */}
        <section className="bg-card border border-border rounded-xl p-6 space-y-5">
          <h2 className="font-semibold text-base">Adresse</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="sm:col-span-2 space-y-2">
              <Label>Adresse complète</Label>
              <Input defaultValue={s['hotel_address'] || ''} name="hotel_address" />
            </div>
            <div className="space-y-2">
              <Label>Ville</Label>
              <Input defaultValue={s['hotel_city'] || ''} name="hotel_city" />
            </div>
            <div className="space-y-2">
              <Label>Pays</Label>
              <Input defaultValue={s['hotel_country'] || 'Maroc'} name="hotel_country" />
            </div>
            <div className="space-y-2">
              <Label>Latitude</Label>
              <Input defaultValue={s['hotel_lat'] || ''} name="hotel_lat" />
            </div>
            <div className="space-y-2">
              <Label>Longitude</Label>
              <Input defaultValue={s['hotel_lng'] || ''} name="hotel_lng" />
            </div>
          </div>
        </section>

        {/* Policies */}
        <section className="bg-card border border-border rounded-xl p-6 space-y-5">
          <h2 className="font-semibold text-base">Politiques</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label>Check-in</Label>
              <Input defaultValue={s['checkin_time'] || '15:00'} name="checkin_time" placeholder="15:00" />
            </div>
            <div className="space-y-2">
              <Label>Check-out</Label>
              <Input defaultValue={s['checkout_time'] || '11:00'} name="checkout_time" placeholder="11:00" />
            </div>
            <div className="space-y-2">
              <Label>Devise</Label>
              <Input defaultValue={s['currency'] || 'MAD'} name="currency" />
            </div>
            <div className="space-y-2">
              <Label>Taux de taxe (%)</Label>
              <Input defaultValue={s['tax_rate'] || '10'} name="tax_rate" type="number" />
            </div>
          </div>
        </section>

        {/* Social */}
        <section className="bg-card border border-border rounded-xl p-6 space-y-5">
          <h2 className="font-semibold text-base">Réseaux sociaux</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {['facebook', 'instagram', 'twitter', 'linkedin'].map((platform) => (
              <div key={platform} className="space-y-2">
                <Label className="capitalize">{platform}</Label>
                <Input defaultValue={s[`social_${platform}`] || ''} name={`social_${platform}`} placeholder={`https://${platform}.com/...`} />
              </div>
            ))}
          </div>
        </section>

        <Button variant="gold" className="gap-2">
          <Save className="h-4 w-4" />
          Sauvegarder les paramètres
        </Button>
      </form>
    </div>
  )
}
