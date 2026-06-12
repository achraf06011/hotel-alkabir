'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Loader2, Save, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { getInitials } from '@/lib/utils'

export default function ProfilePage() {
  const { data: session, update } = useSession()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm({
    defaultValues: {
      name: session?.user.name || '',
      phone: '',
      city: '',
      country: 'MA',
      address: '',
    },
  })

  const handleSubmit = async (data: typeof form._defaultValues) => {
    setIsLoading(true)
    try {
      const res = await fetch('/api/users/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        await update({ name: data.name })
        toast.success('Profil mis à jour avec succès!')
      } else {
        toast.error('Erreur lors de la mise à jour')
      }
    } catch {
      toast.error('Erreur de connexion')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-bold">Mon profil</h1>
        <p className="text-muted-foreground text-sm">Gérez vos informations personnelles</p>
      </div>

      <div className="bg-card border border-border rounded-2xl p-6">
        {/* Avatar section */}
        <div className="flex items-center gap-5 mb-8 pb-6 border-b border-border">
          <Avatar className="h-20 w-20">
            <AvatarImage src={session?.user.image || ''} />
            <AvatarFallback className="text-2xl">{getInitials(session?.user.name || 'U')}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-lg">{session?.user.name}</h3>
            <p className="text-muted-foreground text-sm">{session?.user.email}</p>
            <p className="text-gold text-xs mt-1">Membre Gold</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="name">Nom complet</Label>
              <Input id="name" {...form.register('name')} />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input value={session?.user.email || ''} disabled className="bg-muted" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Téléphone</Label>
              <Input id="phone" type="tel" placeholder="+212 6XX XXX XXX" {...form.register('phone')} />
            </div>
            <div className="space-y-2">
              <Label>Pays</Label>
              <Select onValueChange={(v) => form.setValue('country', v)} defaultValue="MA">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MA">🇲🇦 Maroc</SelectItem>
                  <SelectItem value="FR">🇫🇷 France</SelectItem>
                  <SelectItem value="ES">🇪🇸 Espagne</SelectItem>
                  <SelectItem value="US">🇺🇸 États-Unis</SelectItem>
                  <SelectItem value="GB">🇬🇧 Royaume-Uni</SelectItem>
                  <SelectItem value="OTHER">Autre</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">Ville</Label>
              <Input id="city" placeholder="Casablanca" {...form.register('city')} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Adresse</Label>
              <Input id="address" placeholder="123 Rue de l'Exemple" {...form.register('address')} />
            </div>
          </div>

          <Button type="submit" variant="gold" disabled={isLoading} className="gap-2">
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Sauvegarder les modifications
          </Button>
        </form>
      </div>
    </div>
  )
}
