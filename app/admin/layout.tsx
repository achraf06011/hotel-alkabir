import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { authOptions } from '@/lib/auth'
import {
  Crown, LayoutDashboard, BedDouble, Calendar, Users, Image,
  FileText, MessageSquare, Star, Settings, LogOut, BarChart3
} from 'lucide-react'

const navItems = [
  { href: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/admin/bookings', icon: Calendar, label: 'Réservations' },
  { href: '/admin/rooms', icon: BedDouble, label: 'Chambres' },
  { href: '/admin/guests', icon: Users, label: 'Clients' },
  { href: '/admin/gallery', icon: Image, label: 'Galerie' },
  { href: '/admin/blog', icon: FileText, label: 'Blog' },
  { href: '/admin/messages', icon: MessageSquare, label: 'Messages' },
  { href: '/admin/reviews', icon: Star, label: 'Avis' },
  { href: '/admin/settings', icon: Settings, label: 'Paramètres' },
]

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'ADMIN') redirect('/')

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0A0A0A] text-white fixed inset-y-0 left-0 z-50 flex flex-col">
        {/* Logo */}
        <div className="p-5 border-b border-white/10">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gold flex items-center justify-center">
              <Crown className="h-5 w-5 text-black" />
            </div>
            <div>
              <div className="font-serif text-sm font-bold">Hotel Alkabir</div>
              <div className="text-xs text-white/50">Administration</div>
            </div>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map(({ href, icon: Icon, label }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/10 transition-colors group"
            >
              <Icon className="h-4 w-4 shrink-0 group-hover:text-gold transition-colors" />
              {label}
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 space-y-2">
          <Link href="/" className="flex items-center gap-2 text-xs text-white/50 hover:text-white/80 transition-colors px-3 py-2">
            ← Retour au site
          </Link>
          <Link href="/api/auth/signout" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/70 hover:text-red-400 hover:bg-red-400/10 transition-colors">
            <LogOut className="h-4 w-4" />
            Déconnexion
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 ml-64">
        {/* Top bar */}
        <header className="h-14 bg-background border-b border-border flex items-center px-6 sticky top-0 z-40">
          <div className="flex items-center justify-between w-full">
            <div className="text-sm text-muted-foreground">
              Connecté en tant que <span className="font-medium text-foreground">Admin</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center">
                <Crown className="h-4 w-4 text-gold" />
              </div>
            </div>
          </div>
        </header>

        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
