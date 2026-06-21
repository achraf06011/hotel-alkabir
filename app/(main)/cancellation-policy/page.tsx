import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Politique d\'annulation | Hôtel Al Kabir',
}

export default function CancellationPolicyPage() {
  return (
    <div className="pt-20">
      <div className="bg-[#0A0A0A] text-white py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-gold text-sm font-medium tracking-widest uppercase mb-3">Informations</p>
          <h1 className="font-serif text-4xl font-bold">Politique d&apos;annulation</h1>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-8 text-muted-foreground leading-relaxed">

        <section>
          <h2 className="font-serif text-2xl font-bold text-foreground mb-4">Annulation gratuite</h2>
          <p>Toute réservation peut être annulée <strong className="text-foreground">gratuitement jusqu&apos;à 48 heures avant la date d&apos;arrivée</strong> (avant 14h00, heure de Marrakech). Aucun frais ne sera prélevé.</p>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-bold text-foreground mb-4">Annulation tardive</h2>
          <p>En cas d&apos;annulation dans les <strong className="text-foreground">48 heures précédant l&apos;arrivée</strong>, ou en cas de non-présentation (no-show), <strong className="text-foreground">une nuit sera facturée</strong> à titre de frais d&apos;annulation.</p>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-bold text-foreground mb-4">Réservations non remboursables</h2>
          <p>Certaines offres promotionnelles sont proposées à tarif réduit en contrepartie d&apos;une <strong className="text-foreground">politique non remboursable</strong>. Dans ce cas, aucun remboursement ne sera effectué quelle que soit la date d&apos;annulation. Cette condition est clairement mentionnée lors de la réservation.</p>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-bold text-foreground mb-4">Modification de réservation</h2>
          <p>Toute demande de modification (dates, type de chambre) est soumise à disponibilité et doit être effectuée au minimum <strong className="text-foreground">48 heures avant l&apos;arrivée</strong>. Contactez notre réception au <a href="tel:+212524439540" className="text-gold hover:underline">05244-39540</a> ou par email à <a href="mailto:reservation@hotelalkabir.com" className="text-gold hover:underline">reservation@hotelalkabir.com</a>.</p>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-bold text-foreground mb-4">Remboursements</h2>
          <p>Les remboursements éligibles sont traités dans un délai de <strong className="text-foreground">7 à 14 jours ouvrables</strong> sur le mode de paiement original utilisé lors de la réservation.</p>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-bold text-foreground mb-4">Cas de force majeure</h2>
          <p>En cas de circonstances exceptionnelles dûment justifiées (maladie grave, décès, catastrophe naturelle), l&apos;hôtel examinera chaque demande au cas par cas avec bienveillance. Un justificatif pourra être demandé.</p>
        </section>

        <section className="bg-gold/5 border border-gold/20 rounded-xl p-5">
          <h2 className="font-serif text-lg font-bold text-foreground mb-2">Contact</h2>
          <p>Pour toute question relative à votre réservation :</p>
          <ul className="mt-2 space-y-1">
            <li>Tél : <a href="tel:+212524439540" className="text-gold hover:underline">05244-39540</a></li>
            <li>Email : <a href="mailto:reservation@hotelalkabir.com" className="text-gold hover:underline">reservation@hotelalkabir.com</a></li>
            <li>Réception ouverte 24h/24</li>
          </ul>
        </section>
      </div>
    </div>
  )
}
