import Link from 'next/link'
import Image from 'next/image'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left: Image */}
      <div className="hidden lg:block relative">
        <Image
          src="https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1200&q=80"
          alt="Hotel Alkabir"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/40 to-black/60" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-12">
          <Image
            src="/logo.svg"
            alt="Logo Hôtel Al Kabir"
            width={80}
            height={80}
            className="rounded-full mb-6 drop-shadow-lg"
          />
          <h1 className="font-serif text-4xl font-bold mb-3">Hôtel Al Kabir</h1>
          <p className="text-gold text-sm tracking-widest mb-8">★★★ Guéliz, Marrakech</p>
          <p className="text-white/80 text-center max-w-sm leading-relaxed">
            &ldquo;Au cœur du quartier Guéliz à Marrakech, l&apos;Hôtel Al Kabir vous accueille dans une ambiance authentique depuis 1983.&rdquo;
          </p>
          <div className="mt-12 flex gap-4">
            {[
              { value: '~95', label: 'Chambres' },
              { value: '4.2', label: 'Note' },
              { value: '40+', label: 'Années' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-gold font-bold text-2xl font-serif">{stat.value}</div>
                <div className="text-white/60 text-xs">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right: Form */}
      <div className="flex flex-col">
        {/* Logo for mobile */}
        <div className="lg:hidden flex items-center gap-3 p-6 border-b border-border">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.svg" alt="Logo Hôtel Al Kabir" width={36} height={36} className="rounded-full" />
            <span className="font-serif font-bold text-lg">Hôtel Al Kabir</span>
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-center px-4 py-8">
          <div className="w-full max-w-md">
            <div className="hidden lg:flex items-center gap-2 mb-8">
              <Link href="/" className="flex items-center gap-2">
                <Image src="/logo.svg" alt="Logo Hôtel Al Kabir" width={32} height={32} className="rounded-full" />
                <span className="font-serif font-bold">Hôtel Al Kabir</span>
              </Link>
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
