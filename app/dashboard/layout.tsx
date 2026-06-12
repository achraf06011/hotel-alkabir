import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { authOptions } from '@/lib/auth'
import { Crown, User, Calendar, FileText, LogOut, ChevronRight } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getInitials } from '@/lib/utils'

const navItems = [
  { href: '/dashboard', icon: User, label: 'Mon espace' },
  { href: '/dashboard/bookings', icon: Calendar, label: 'Mes réservations' },
  { href: '/dashboard/invoices', icon: FileText, label: 'Factures' },
  { href: '/dashboard/profile', icon: User, label: 'Mon profil' },
]

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  return (
    <div className="min-h-screen bg-muted/20 pt-0">
      {/* Header */}
      <div className="bg-[#0A0A0A] text-white py-4 px-4 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center">
              <Crown className="h-4 w-4 text-black" />
            </div>
            <span className="font-serif font-bold text-sm">Hotel Alkabir</span>
          </Link>
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={session.user.image || ''} />
              <AvatarFallback className="text-xs">{getInitials(session.user.name || 'U')}</AvatarFallback>
            </Avatar>
            <span className="text-sm text-white/80 hidden sm:block">{session.user.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-2xl p-4 sticky top-24">
              <div className="flex flex-col items-center text-center p-4 mb-4">
                <Avatar className="h-16 w-16 mb-3">
                  <AvatarImage src={session.user.image || ''} />
                  <AvatarFallback className="text-lg">{getInitials(session.user.name || 'U')}</AvatarFallback>
                </Avatar>
                <p className="font-semibold">{session.user.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{session.user.email}</p>
                <div className="mt-2 px-3 py-1 bg-gold/10 rounded-full text-xs text-gold font-medium">
                  Membre Gold
                </div>
              </div>

              <nav className="space-y-1">
                {navItems.map(({ href, icon: Icon, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm hover:bg-accent transition-colors group"
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="h-4 w-4 text-muted-foreground group-hover:text-gold" />
                      <span>{label}</span>
                    </div>
                    <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/50" />
                  </Link>
                ))}
                <Link href="/api/auth/signout" className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-destructive hover:bg-destructive/10 transition-colors">
                  <LogOut className="h-4 w-4" />
                  Déconnexion
                </Link>
              </nav>
            </div>
          </div>

          {/* Main content */}
          <div className="lg:col-span-3">{children}</div>
        </div>
      </div>
    </div>
  )
}
