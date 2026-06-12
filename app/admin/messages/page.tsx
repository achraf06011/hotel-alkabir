import { prisma } from '@/lib/prisma'
import { formatDate } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MessageSquare, Mail, MailOpen, Archive } from 'lucide-react'

export const dynamic = 'force-dynamic'


export default async function AdminMessagesPage() {
  const contacts = await prisma.contact.findMany({
    orderBy: { createdAt: 'desc' },
  })

  const newCount = contacts.filter((c) => c.status === 'NEW').length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-bold">Messages de contact</h1>
        <p className="text-muted-foreground text-sm">
          {newCount > 0 ? (
            <span className="text-gold font-medium">{newCount} nouveau{newCount !== 1 ? 'x' : ''} message{newCount !== 1 ? 's' : ''} — </span>
          ) : null}
          {contacts.length} message{contacts.length !== 1 ? 's' : ''} au total
        </p>
      </div>

      {contacts.length === 0 ? (
        <div className="bg-card border border-border rounded-2xl p-12 text-center">
          <MessageSquare className="h-16 w-16 text-muted-foreground/20 mx-auto mb-4" />
          <p className="text-muted-foreground">Aucun message reçu</p>
        </div>
      ) : (
        <div className="space-y-3">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className={`bg-card border rounded-xl p-5 transition-colors ${
                contact.status === 'NEW' ? 'border-gold/40 bg-gold/5' : 'border-border'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    {contact.status === 'NEW' ? (
                      <Mail className="h-4 w-4 text-gold shrink-0" />
                    ) : (
                      <MailOpen className="h-4 w-4 text-muted-foreground shrink-0" />
                    )}
                    <span className="font-semibold">{contact.name}</span>
                    <span className="text-muted-foreground text-sm">&lt;{contact.email}&gt;</span>
                    {contact.phone && (
                      <span className="text-xs text-muted-foreground">{contact.phone}</span>
                    )}
                  </div>
                  <p className="font-medium text-sm mb-2">{contact.subject}</p>
                  <p className="text-muted-foreground text-sm line-clamp-2">{contact.message}</p>
                  <p className="text-xs text-muted-foreground/60 mt-2">{formatDate(contact.createdAt)}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Badge variant={
                    contact.status === 'NEW' ? 'warning' :
                    contact.status === 'READ' ? 'secondary' :
                    contact.status === 'REPLIED' ? 'success' : 'secondary'
                  } className="text-xs">
                    {contact.status === 'NEW' ? 'Nouveau' :
                     contact.status === 'READ' ? 'Lu' :
                     contact.status === 'REPLIED' ? 'Répondu' : 'Archivé'}
                  </Badge>
                  <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                    Répondre
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                    <Archive className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

