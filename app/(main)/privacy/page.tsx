import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Politique de confidentialité | Hôtel Al Kabir',
}

export default function PrivacyPage() {
  return (
    <div className="pt-20">
      <div className="bg-[#0A0A0A] text-white py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-gold text-sm font-medium tracking-widest uppercase mb-3">Informations légales</p>
          <h1 className="font-serif text-4xl font-bold">Politique de confidentialité</h1>
          <p className="text-white/60 mt-3 text-sm">Dernière mise à jour : juin 2025</p>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-8 text-muted-foreground leading-relaxed">

        <section>
          <h2 className="font-serif text-2xl font-bold text-foreground mb-4">1. Responsable du traitement</h2>
          <p>L&apos;Hôtel Al Kabir, situé au Boulevard Mohamed Zerktouni, Guéliz, Marrakech 40000, Maroc, est responsable du traitement des données personnelles collectées via ce site. Contact : <a href="mailto:contact@hotelalkabir.com" className="text-gold hover:underline">contact@hotelalkabir.com</a></p>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-bold text-foreground mb-4">2. Données collectées</h2>
          <p>Nous collectons les données suivantes :</p>
          <ul className="list-disc list-inside mt-3 space-y-1">
            <li>Nom, prénom, adresse email et numéro de téléphone (formulaires de réservation et de contact)</li>
            <li>Informations de paiement (traitées de manière sécurisée, non stockées sur nos serveurs)</li>
            <li>Données de navigation (cookies, adresse IP, pages visitées)</li>
            <li>Préférences de séjour et demandes spéciales</li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-bold text-foreground mb-4">3. Finalités du traitement</h2>
          <p>Vos données sont utilisées pour :</p>
          <ul className="list-disc list-inside mt-3 space-y-1">
            <li>Gérer vos réservations et votre séjour</li>
            <li>Vous envoyer des confirmations et informations relatives à votre réservation</li>
            <li>Répondre à vos demandes via le formulaire de contact</li>
            <li>Vous envoyer notre newsletter (avec votre consentement)</li>
            <li>Améliorer nos services et notre site web</li>
            <li>Respecter nos obligations légales</li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-bold text-foreground mb-4">4. Conservation des données</h2>
          <p>Vos données sont conservées pendant la durée nécessaire aux finalités pour lesquelles elles ont été collectées, et au maximum <strong className="text-foreground">3 ans</strong> après votre dernier séjour ou contact. Les données de facturation sont conservées <strong className="text-foreground">10 ans</strong> conformément aux obligations légales.</p>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-bold text-foreground mb-4">5. Vos droits</h2>
          <p>Conformément à la loi 09-08 relative à la protection des données personnelles au Maroc, vous disposez des droits suivants :</p>
          <ul className="list-disc list-inside mt-3 space-y-1">
            <li>Droit d&apos;accès à vos données</li>
            <li>Droit de rectification</li>
            <li>Droit à l&apos;effacement</li>
            <li>Droit d&apos;opposition au traitement</li>
            <li>Droit à la portabilité</li>
          </ul>
          <p className="mt-3">Pour exercer ces droits, contactez-nous à <a href="mailto:contact@hotelalkabir.com" className="text-gold hover:underline">contact@hotelalkabir.com</a>.</p>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-bold text-foreground mb-4">6. Cookies</h2>
          <p>Notre site utilise des cookies techniques nécessaires au bon fonctionnement du site (session, préférences). Nous n&apos;utilisons pas de cookies publicitaires tiers. Vous pouvez désactiver les cookies dans les paramètres de votre navigateur.</p>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-bold text-foreground mb-4">7. Sécurité</h2>
          <p>Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données contre tout accès non autorisé, perte ou divulgation. Notre site utilise le protocole HTTPS pour chiffrer toutes les communications.</p>
        </section>
      </div>
    </div>
  )
}
