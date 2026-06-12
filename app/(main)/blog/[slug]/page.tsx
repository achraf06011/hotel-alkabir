import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { formatDate } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Clock, ArrowLeft, CalendarDays, User } from 'lucide-react'

interface PageProps { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await prisma.blogPost.findUnique({ where: { slug } })
  if (!post) return {}
  return { title: `${post.title} | Blog Hotel Alkabir`, description: post.excerpt || '' }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = await prisma.blogPost.findUnique({
    where: { slug, published: true },
    include: { author: true, category: true },
  })

  if (!post) notFound()

  await prisma.blogPost.update({ where: { id: post.id }, data: { views: { increment: 1 } } })

  const relatedPosts = await prisma.blogPost.findMany({
    where: { published: true, categoryId: post.categoryId, NOT: { id: post.id } },
    take: 3,
    include: { category: true },
  })

  return (
    <div className="pt-20">
      {/* Hero */}
      {post.coverImage && (
        <div className="relative h-64 md:h-96 overflow-hidden">
          <Image src={post.coverImage} alt={post.title} fill className="object-cover" />
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 h-full flex flex-col items-start justify-end max-w-4xl mx-auto px-4 pb-8">
            {post.category && <Badge variant="gold" className="mb-3">{post.category.name}</Badge>}
            <h1 className="font-serif text-3xl md:text-5xl font-bold text-white">{post.title}</h1>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Back */}
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 group">
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Retour au blog
        </Link>

        {!post.coverImage && (
          <div className="mb-6">
            {post.category && <Badge variant="gold-outline" className="mb-3">{post.category.name}</Badge>}
            <h1 className="font-serif text-3xl md:text-4xl font-bold">{post.title}</h1>
          </div>
        )}

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8 pb-6 border-b border-border">
          {post.author && (
            <div className="flex items-center gap-1.5">
              <User className="h-4 w-4" />
              {post.author.name}
            </div>
          )}
          {post.publishedAt && (
            <div className="flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4" />
              {formatDate(post.publishedAt)}
            </div>
          )}
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            {post.readTime} min de lecture
          </div>
          <span>{post.views} vues</span>
        </div>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">#{tag}</Badge>
            ))}
          </div>
        )}

        {/* Content */}
        <div className="prose prose-slate dark:prose-invert max-w-none">
          {post.body.split('\n').map((line, i) => {
            if (line.startsWith('# ')) return <h1 key={i} className="font-serif">{line.slice(2)}</h1>
            if (line.startsWith('## ')) return <h2 key={i} className="font-serif">{line.slice(3)}</h2>
            if (line.startsWith('### ')) return <h3 key={i} className="font-serif">{line.slice(4)}</h3>
            if (line.trim() === '') return <br key={i} />
            return <p key={i}>{line}</p>
          })}
        </div>

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-16 pt-8 border-t border-border">
            <h3 className="font-serif text-2xl font-semibold mb-6">Articles similaires</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedPosts.map((related) => (
                <Link key={related.id} href={`/blog/${related.slug}`} className="group block">
                  <div className="bg-card border border-border rounded-xl p-4 hover:border-gold/40 transition-colors">
                    <p className="text-xs text-gold mb-1">{related.category?.name}</p>
                    <h4 className="font-semibold text-sm group-hover:text-gold transition-colors line-clamp-2">{related.title}</h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
