import Link from 'next/link'
import { Crown, MailCheck, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/20 px-4">
      <div className="w-full max-w-md text-center">
        <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-[#0A0A0A] flex items-center justify-center">
              <Crown className="h-7 w-7 text-gold" />
            </div>
          </div>

          <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mx-auto mb-5">
            <MailCheck className="h-8 w-8 text-blue-500" />
          </div>

          <h1 className="font-serif text-2xl font-bold mb-3">Vérifiez votre email</h1>

          <p className="text-muted-foreground mb-6 leading-relaxed">
            Un email de vérification a été envoyé à votre adresse.<br />
            Cliquez sur le lien dans cet email pour activer votre compte.
          </p>

          <div className="bg-muted/40 rounded-xl p-4 mb-6 flex items-start gap-3 text-left">
            <Clock className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium">Le lien expire dans 24 heures</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Vérifiez aussi votre dossier spam si vous ne trouvez pas l&apos;email.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <Button variant="gold" className="w-full" asChild>
              <Link href="/login">Aller à la connexion</Link>
            </Button>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/">Retour à l&apos;accueil</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
