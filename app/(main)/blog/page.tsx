import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { formatDate } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Clock, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Blog | Hotel Alkabir',
  description: 'Découvrez nos articles sur Marrakech, la gastronomie marocaine, le bien-être et les actualités de l\'Hôtel Al Kabir.',
}

export default async function BlogPage() {
  const [posts, categories] = await Promise.all([
    prisma.blogPost.findMany({
      where: { published: true },
      include: { author: true, category: true },
      orderBy: [{ featured: 'desc' }, { publishedAt: 'desc' }],
    }),
    prisma.blogCategory.findMany({ orderBy: { name: 'asc' } }),
  ])

  const featuredPost = posts.find((p) => p.featured)
  const otherPosts = posts.filter((p) => !p.featured)

  return (
    <div className="pt-20">
      <div className="bg-[#0A0A0A] text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gold text-sm font-medium tracking-widest uppercase mb-3">Magazine</p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Blog & Actualités</h1>
          <p className="text-white/70 max-w-xl mx-auto">
            Inspirations voyages, gastronomie, bien-être et actualités de l&apos;Hotel Alkabir
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-10">
          <Link href="/blog" className="px-4 py-1.5 rounded-full text-sm bg-gold text-black font-medium">Tous</Link>
          {categories.map((cat) => (
            <Link key={cat.id} href={`/blog?category=${cat.slug}`} className="px-4 py-1.5 rounded-full text-sm bg-muted text-muted-foreground hover:bg-muted/80 transition-colors">
              {cat.name}
            </Link>
          ))}
        </div>

        {/* Featured post */}
        {featuredPost && (
          <Link href={`/blog/${featuredPost.slug}`} className="group block mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-border hover:border-gold/40 transition-colors">
              <div className="relative h-64 lg:h-80">
                {featuredPost.coverImage && (
                  <Image src={featuredPost.coverImage} alt={featuredPost.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                )}
                <div className="absolute top-4 left-4">
                  <Badge variant="gold">À la une</Badge>
                </div>
              </div>
              <div className="bg-card p-8 flex flex-col justify-center">
                {featuredPost.category && (
                  <p className="text-gold text-xs font-semibold uppercase tracking-wider mb-2">{featuredPost.category.name}</p>
                )}
                <h2 className="font-serif text-2xl md:text-3xl font-bold mb-4 group-hover:text-gold transition-colors">{featuredPost.title}</h2>
                <p className="text-muted-foreground mb-4 line-clamp-3">{featuredPost.excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  {featuredPost.publishedAt && <span>{formatDate(featuredPost.publishedAt)}</span>}
                  <div className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{featuredPost.readTime} min</div>
                </div>
                <div className="flex items-center gap-2 mt-4 text-gold text-sm font-medium">
                  <span>Lire l&apos;article</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Other posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group block hotel-card">
              <div className="relative h-48 overflow-hidden">
                {post.coverImage ? (
                  <Image src={post.coverImage} alt={post.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                ) : (
                  <div className="w-full h-full bg-muted flex items-center justify-center">
                    <span className="text-4xl font-serif text-muted-foreground">Al</span>
                  </div>
                )}
                {post.category && (
                  <div className="absolute top-3 left-3">
                    <Badge variant="secondary" className="text-xs">{post.category.name}</Badge>
                  </div>
                )}
              </div>
              <div className="p-5">
                <h3 className="font-serif text-lg font-semibold mb-2 group-hover:text-gold transition-colors line-clamp-2">{post.title}</h3>
                <p className="text-muted-foreground text-sm line-clamp-2 mb-3">{post.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  {post.publishedAt && <span>{formatDate(post.publishedAt)}</span>}
                  <div className="flex items-center gap-1"><Clock className="h-3 w-3" />{post.readTime} min</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
