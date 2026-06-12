import { Metadata } from 'next'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { MessageSquare } from 'lucide-react'

export const metadata: Metadata = {
  title: 'FAQ | Hotel Alkabir',
  description: 'Réponses aux questions fréquemment posées sur l\'Hotel Alkabir: réservation, check-in, services, annulation et plus.',
}

const faqs = [
  {
    category: 'Réservation',
    items: [
      { q: 'Comment puis-je réserver une chambre?', a: 'Vous pouvez réserver directement sur notre site web en cliquant sur "Réserver", par téléphone au 05244-39540, ou par email à reservation@hotelalkabir.com. Notre service de réservation est disponible 24h/24.' },
      { q: 'Quelle est la politique d\'annulation?', a: 'Les annulations effectuées plus de 48h avant la date d\'arrivée sont gratuites avec remboursement intégral. Pour les annulations moins de 48h avant, une nuit vous sera facturée. Les réservations non remboursables sont signalées lors de la réservation.' },
      { q: 'Puis-je modifier ma réservation?', a: 'Oui, vous pouvez modifier votre réservation jusqu\'à 24h avant l\'arrivée, sous réserve de disponibilité. Connectez-vous à votre espace client ou contactez notre équipe.' },
      { q: 'Y a-t-il un minimum de nuits?', a: 'En général, il n\'y a pas de minimum de nuits. Cependant, pendant les périodes de forte demande (Ramadan, fêtes nationales, événements spéciaux), un minimum de 2 ou 3 nuits peut être requis.' },
    ],
  },
  {
    category: 'Arrivée & Départ',
    items: [
      { q: 'Quelle est l\'heure de check-in et check-out?', a: 'Le check-in est possible à partir de 14h00 et le check-out doit être effectué avant 12h00. Un check-in anticipé ou un late check-out peut être arrangé sur demande, selon disponibilité (supplément possible).' },
      { q: 'Proposez-vous un service de transfert aéroport?', a: 'Oui, nous proposons un service de transfert depuis et vers l\'aéroport Marrakech-Ménara. L\'hôtel se trouve à environ 15 minutes de l\'aéroport. Le tarif varie selon le type de véhicule. Réservez à l\'avance auprès de notre réception.' },
      { q: 'Y a-t-il un service de parking?', a: 'Oui, nous disposons d\'un parking couvert sécurisé avec service voiturier. La capacité est de 150 véhicules. Le service est inclus pour les résidents des suites, et facturé à 80 MAD/jour pour les autres.' },
    ],
  },
  {
    category: 'Services',
    items: [
      { q: 'Le petit-déjeuner est-il inclus?', a: 'Le petit-déjeuner n\'est pas automatiquement inclus dans nos tarifs de base, mais peut être ajouté à votre réservation. Nos suites supérieures incluent le petit-déjeuner pour deux personnes. Le buffet est servi de 6h30 à 10h30.' },
      { q: 'Y a-t-il une piscine accessible aux enfants?', a: 'Notre piscine principale (adultes) est ouverte à partir de 12 ans. De juin à août, une piscine séparée pour enfants est disponible. Les enfants de moins de 12 ans doivent toujours être accompagnés d\'un adulte.' },
      { q: 'Le Spa est-il accessible aux non-résidents?', a: 'Oui, le Spa Alkabir est accessible aux clients extérieurs sur réservation. Cependant, les résidents de l\'hôtel bénéficient d\'une priorité d\'accès et de tarifs préférentiels.' },
      { q: 'Y a-t-il une connexion WiFi dans les chambres?', a: 'Oui, le WiFi haut débit est gratuit et disponible dans toutes les chambres, suites et espaces communs. Les suites bénéficient d\'une connexion dédiée jusqu\'à 1 Gbps.' },
    ],
  },
  {
    category: 'Paiement & Politique',
    items: [
      { q: 'Quels modes de paiement acceptez-vous?', a: 'Nous acceptons les principales cartes de crédit (Visa, Mastercard, American Express), les virements bancaires et le paiement en espèces en dirhams marocains. Un dépôt de garantie est requis à l\'arrivée.' },
      { q: 'Les animaux de compagnie sont-ils acceptés?', a: 'Nous n\'acceptons pas les animaux de compagnie dans notre établissement, à l\'exception des chiens guides pour les personnes à mobilité réduite, avec présentation des documents requis.' },
      { q: 'L\'hôtel est-il adapté aux personnes à mobilité réduite?', a: 'Oui, l\'Hotel Alkabir dispose d\'ascenseurs, de rampes d\'accès et de chambres adaptées pour les personnes à mobilité réduite. Contactez-nous pour organiser votre séjour dans les meilleures conditions.' },
    ],
  },
]

export default function FAQPage() {
  return (
    <div className="pt-20">
      <div className="bg-[#0A0A0A] text-white py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-gold text-sm font-medium tracking-widest uppercase mb-3">FAQ</p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Questions fréquentes</h1>
          <p className="text-white/70">Retrouvez les réponses aux questions les plus posées sur notre hôtel et nos services.</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-10">
          {faqs.map((section) => (
            <div key={section.category}>
              <h2 className="font-serif text-xl font-semibold text-gold mb-4">{section.category}</h2>
              <Accordion type="single" collapsible className="space-y-2">
                {section.items.map((item, i) => (
                  <AccordionItem key={i} value={`${section.category}-${i}`} className="bg-card border border-border rounded-xl px-5 data-[state=open]:border-gold/30">
                    <AccordionTrigger className="text-sm font-medium hover:no-underline hover:text-gold">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>

        {/* Still have questions */}
        <div className="mt-16 bg-gold/10 border border-gold/20 rounded-2xl p-8 text-center">
          <MessageSquare className="h-10 w-10 text-gold mx-auto mb-4" />
          <h3 className="font-serif text-xl font-semibold mb-2">Vous n&apos;avez pas trouvé votre réponse?</h3>
          <p className="text-muted-foreground mb-6">Notre équipe est à votre disposition 24h/24 pour répondre à toutes vos questions.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="gold" asChild>
              <Link href="/contact">Nous contacter</Link>
            </Button>
            <Button variant="outline" asChild>
              <a href="tel:+212522000001">Appeler maintenant</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
