import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Conditions Générales d\'Utilisation | Hôtel Al Kabir',
}

export default function TermsPage() {
  return (
    <div className="pt-20">
      <div className="bg-[#0A0A0A] text-white py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-gold text-sm font-medium tracking-widest uppercase mb-3">Informations légales</p>
          <h1 className="font-serif text-4xl font-bold">Conditions Générales d&apos;Utilisation</h1>
          <p className="text-white/60 mt-3 text-sm">Dernière mise à jour : juin 2025</p>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-8 text-muted-foreground leading-relaxed">

        <section>
          <h2 className="font-serif text-2xl font-bold text-foreground mb-4">1. Présentation</h2>
          <p>Le présent site <strong className="text-foreground">hotel-alkabir.vercel.app</strong> est édité par l&apos;Hôtel Al Kabir, établissement hôtelier 3 étoiles immatriculé sous la licence n° 40000HT0556, situé au Boulevard Mohamed Zerktouni, Guéliz, Marrakech 40000, Maroc.</p>
          <p className="mt-3">Téléphone : <a href="tel:+212524439540" className="text-gold hover:underline">05244-39540</a> — Email : <a href="mailto:contact@hotelalkabir.com" className="text-gold hover:underline">contact@hotelalkabir.com</a></p>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-bold text-foreground mb-4">2. Accès au site</h2>
          <p>L&apos;accès au site est gratuit et ouvert à tout utilisateur disposant d&apos;un accès à Internet. L&apos;Hôtel Al Kabir se réserve le droit de modifier, suspendre ou interrompre l&apos;accès au site à tout moment, sans préavis.</p>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-bold text-foreground mb-4">3. Réservations en ligne</h2>
          <p>En effectuant une réservation via ce site, vous acceptez les conditions tarifaires et la politique d&apos;annulation applicables à votre offre. La réservation est considérée comme confirmée dès réception de l&apos;email de confirmation.</p>
          <ul className="list-disc list-inside mt-3 space-y-1">
            <li>L&apos;hôtel se réserve le droit de refuser toute réservation non conforme</li>
            <li>Les tarifs affichés sont en Dirhams Marocains (MAD), toutes taxes comprises</li>
            <li>Le check-in s&apos;effectue à partir de 14h00 et le check-out avant 12h00</li>
            <li>Une pièce d&apos;identité valide sera demandée à l&apos;arrivée</li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-bold text-foreground mb-4">4. Propriété intellectuelle</h2>
          <p>L&apos;ensemble des contenus présents sur ce site (textes, images, logo, graphismes) est la propriété exclusive de l&apos;Hôtel Al Kabir. Toute reproduction ou utilisation sans autorisation écrite préalable est interdite.</p>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-bold text-foreground mb-4">5. Responsabilité</h2>
          <p>L&apos;Hôtel Al Kabir s&apos;efforce d&apos;assurer l&apos;exactitude des informations diffusées sur ce site. Toutefois, il ne saurait être tenu responsable des erreurs ou omissions, ni des dommages directs ou indirects résultant de l&apos;utilisation du site.</p>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-bold text-foreground mb-4">6. Règlement intérieur</h2>
          <p>Les clients s&apos;engagent à respecter le règlement intérieur de l&apos;établissement :</p>
          <ul className="list-disc list-inside mt-3 space-y-1">
            <li>Silence respecté entre 22h00 et 8h00</li>
            <li>Interdiction de fumer dans les chambres et espaces communs couverts</li>
            <li>Animaux de compagnie non admis</li>
            <li>L&apos;hôtel décline toute responsabilité en cas de perte ou vol d&apos;objets personnels</li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-bold text-foreground mb-4">7. Droit applicable</h2>
          <p>Les présentes CGU sont soumises au droit marocain. Tout litige relatif à leur interprétation ou exécution relève de la compétence exclusive des tribunaux de Marrakech.</p>
        </section>

      </div>
    </div>
  )
}
