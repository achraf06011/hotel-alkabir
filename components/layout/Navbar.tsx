'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Menu, X, Phone, ChevronDown, User, LogOut, Settings,
  Calendar, LayoutDashboard, Moon, Sun
} from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { cn, getInitials } from '@/lib/utils'

const navLinks = [
  { label: 'Accueil', href: '/' },
  { label: 'Chambres & Suites', href: '/rooms' },
  { label: 'Services', href: '/services' },
  { label: 'Galerie', href: '/gallery' },
  {
    label: 'Découvrir',
    href: '#',
    children: [
      { label: 'À propos', href: '/about' },
      { label: 'Blog', href: '/blog' },
      { label: 'FAQ', href: '/faq' },
    ],
  },
  { label: 'Contact', href: '/contact' },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const pathname = usePathname()
  const { data: session } = useSession()
  const { theme, setTheme } = useTheme()
  const isHomePage = pathname === '/'

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileOpen(false)
  }, [pathname])

  const isTransparent = isHomePage && !isScrolled

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isTransparent
          ? 'bg-transparent'
          : 'bg-background/95 backdrop-blur-md border-b border-border/50 shadow-sm'
      )}
    >
      {/* Top bar */}
      <div className={cn('hidden lg:block border-b py-1.5 px-6 transition-all duration-500', isTransparent ? 'border-white/20 bg-black/20' : 'border-border')}>
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs">
          <div className="flex items-center gap-6">
            <a href="tel:+212524439540" className={cn('flex items-center gap-1.5 hover:text-gold transition-colors', isTransparent ? 'text-white/80' : 'text-muted-foreground')}>
              <Phone className="h-3 w-3" />
              05244-39540
            </a>
            <span className={cn(isTransparent ? 'text-white/60' : 'text-muted-foreground/60')}>|</span>
            <a href="mailto:contact@hotelalkabir.com" className={cn('hover:text-gold transition-colors', isTransparent ? 'text-white/80' : 'text-muted-foreground')}>
              contact@hotelalkabir.com
            </a>
          </div>
          <div className={cn('flex items-center gap-3', isTransparent ? 'text-white/80' : 'text-muted-foreground')}>
            <span>Check-in: 14:00</span>
            <span>•</span>
            <span>Check-out: 12:00</span>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/logo.svg"
              alt="Logo Hôtel Al Kabir"
              width={42}
              height={42}
              className="rounded-full drop-shadow-sm"
              priority
            />
            <div>
              <div className={cn('font-serif text-xl font-bold leading-none transition-colors', isTransparent ? 'text-white' : 'text-foreground')}>
                Hôtel Al Kabir
              </div>
              <div className={cn('text-xs tracking-widest transition-colors', isTransparent ? 'text-gold/90' : 'text-gold')}>
                ★★★ Guéliz, Marrakech
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div key={link.href} className="relative">
                {link.children ? (
                  <div
                    className="relative"
                    onMouseEnter={() => setOpenDropdown(link.label)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <button className={cn(
                      'flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                      isTransparent ? 'text-white/90 hover:text-white hover:bg-white/10' : 'text-foreground/80 hover:text-foreground hover:bg-accent'
                    )}>
                      {link.label}
                      <ChevronDown className={cn('h-3.5 w-3.5 transition-transform', openDropdown === link.label && 'rotate-180')} />
                    </button>
                    <AnimatePresence>
                      {openDropdown === link.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full left-0 mt-1 w-48 bg-background border border-border rounded-lg shadow-xl overflow-hidden"
                        >
                          {link.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="block px-4 py-2.5 text-sm text-foreground/80 hover:text-gold hover:bg-gold/5 transition-colors"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    href={link.href}
                    className={cn(
                      'px-3 py-2 rounded-md text-sm font-medium transition-colors',
                      pathname === link.href
                        ? isTransparent ? 'text-gold' : 'text-gold'
                        : isTransparent ? 'text-white/90 hover:text-white hover:bg-white/10' : 'text-foreground/80 hover:text-foreground hover:bg-accent'
                    )}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className={cn(
                'hidden lg:flex p-2 rounded-md transition-colors',
                isTransparent ? 'text-white/80 hover:text-white hover:bg-white/10' : 'text-foreground/60 hover:text-foreground hover:bg-accent'
              )}
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </button>

            {/* Auth */}
            {session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 p-1 rounded-full hover:bg-accent transition-colors">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={session.user.image || ''} />
                      <AvatarFallback>{getInitials(session.user.name || 'U')}</AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="font-medium">{session.user.name}</div>
                    <div className="text-xs text-muted-foreground font-normal">{session.user.email}</div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {session.user.role === 'ADMIN' && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin" className="cursor-pointer">
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        Administration
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      Mon espace
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/bookings" className="cursor-pointer">
                      <Calendar className="mr-2 h-4 w-4" />
                      Mes réservations
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/profile" className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      Profil
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="text-destructive cursor-pointer"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Déconnexion
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden lg:flex items-center gap-2">
                <Button variant="ghost" size="sm" asChild className={cn(isTransparent && 'text-white hover:text-white hover:bg-white/10')}>
                  <Link href="/login">Connexion</Link>
                </Button>
                <Button variant="gold" size="sm" asChild>
                  <Link href="/booking">Réserver</Link>
                </Button>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className={cn(
                'lg:hidden p-2 rounded-md transition-colors',
                isTransparent ? 'text-white hover:bg-white/10' : 'text-foreground hover:bg-accent'
              )}
            >
              {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-background border-t border-border overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <div key={link.href}>
                  {link.children ? (
                    <>
                      <div className="px-3 py-2 text-sm font-medium text-muted-foreground">{link.label}</div>
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-6 py-2 text-sm text-foreground/80 hover:text-gold hover:bg-gold/5 rounded-md transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </>
                  ) : (
                    <Link
                      href={link.href}
                      className={cn(
                        'block px-3 py-2 rounded-md text-sm font-medium transition-colors',
                        pathname === link.href ? 'text-gold bg-gold/10' : 'text-foreground/80 hover:text-foreground hover:bg-accent'
                      )}
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}
              <div className="pt-3 pb-1 border-t border-border space-y-2">
                {session ? (
                  <>
                    <Link href="/dashboard" className="block px-3 py-2 rounded-md text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-accent">
                      Mon espace
                    </Link>
                    <button onClick={() => signOut()} className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-destructive hover:bg-destructive/10">
                      Déconnexion
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/login" className="block px-3 py-2 rounded-md text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-accent">
                      Connexion
                    </Link>
                    <Link href="/register" className="block px-3 py-2 rounded-md text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-accent">
                      Inscription
                    </Link>
                  </>
                )}
                <Button variant="gold" className="w-full" asChild>
                  <Link href="/booking">Réserver maintenant</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
