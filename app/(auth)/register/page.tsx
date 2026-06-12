'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Eye, EyeOff, Loader2, UserPlus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function RegisterPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm({
    defaultValues: { name: '', email: '', password: '', phone: '' },
  })

  const handleSubmit = async (data: { name: string; email: string; password: string; phone: string }) => {
    setIsLoading(true)
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await res.json()

      if (res.ok) {
        toast.success('Compte créé avec succès! Veuillez vous connecter.')
        router.push('/login')
      } else {
        toast.error(result.error || 'Erreur lors de la création du compte')
      }
    } catch {
      toast.error('Erreur de connexion')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold mb-2">Créer un compte</h1>
        <p className="text-muted-foreground">
          Rejoignez le programme de fidélité Hotel Alkabir et profitez d&apos;avantages exclusifs.
        </p>
      </div>

      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="name">Nom complet *</Label>
          <Input
            id="name"
            placeholder="Ahmed Benali"
            {...form.register('name', { required: 'Nom requis', minLength: { value: 2, message: 'Minimum 2 caractères' } })}
          />
          {form.formState.errors.name && (
            <p className="text-xs text-red-500">{form.formState.errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            placeholder="ahmed@example.com"
            {...form.register('email', { required: 'Email requis' })}
          />
          {form.formState.errors.email && (
            <p className="text-xs text-red-500">{form.formState.errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Téléphone</Label>
          <Input id="phone" type="tel" placeholder="+212 6XX XXX XXX" {...form.register('phone')} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Mot de passe *</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Minimum 8 caractères"
              {...form.register('password', {
                required: 'Mot de passe requis',
                minLength: { value: 8, message: 'Minimum 8 caractères' },
              })}
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {form.formState.errors.password && (
            <p className="text-xs text-red-500">{form.formState.errors.password.message}</p>
          )}
        </div>

        <div className="bg-muted/40 rounded-lg p-3 text-xs text-muted-foreground">
          En créant un compte, vous acceptez nos{' '}
          <Link href="/terms" className="text-gold hover:underline">conditions d&apos;utilisation</Link>{' '}
          et notre{' '}
          <Link href="/privacy" className="text-gold hover:underline">politique de confidentialité</Link>.
        </div>

        <Button type="submit" variant="gold" size="lg" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Création...</>
          ) : (
            <><UserPlus className="h-4 w-4 mr-2" />Créer mon compte</>
          )}
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground mt-6">
        Déjà un compte?{' '}
        <Link href="/login" className="text-gold font-medium hover:underline">
          Se connecter
        </Link>
      </p>
    </div>
  )
}
