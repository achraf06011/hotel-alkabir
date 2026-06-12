import { prisma } from '@/lib/prisma'
import { formatDate } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Plus, Edit, Trash2, Eye } from 'lucide-react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'


export default async function AdminBlogPage() {
  const posts = await prisma.blogPost.findMany({
    include: { category: true, author: true },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold">Gestion du blog</h1>
          <p className="text-muted-foreground text-sm">{posts.length} article{posts.length !== 1 ? 's' : ''}</p>
        </div>
        <Button variant="gold" size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          Nouvel article
        </Button>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/30 border-b border-border">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Article</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden md:table-cell">Catégorie</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden lg:table-cell">Auteur</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden xl:table-cell">Vues</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden lg:table-cell">Date</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Statut</th>
              <th className="text-right px-4 py-3 font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-muted/20 transition-colors">
                <td className="px-4 py-3">
                  <p className="font-medium line-clamp-1 max-w-xs">{post.title}</p>
                  <p className="text-xs text-muted-foreground">{post.slug}</p>
                </td>
                <td className="px-4 py-3 hidden md:table-cell">
                  {post.category && (
                    <Badge variant="secondary" className="text-xs">{post.category.name}</Badge>
                  )}
                </td>
                <td className="px-4 py-3 hidden lg:table-cell text-muted-foreground">{post.author?.name || '—'}</td>
                <td className="px-4 py-3 hidden xl:table-cell text-muted-foreground">{post.views}</td>
                <td className="px-4 py-3 hidden lg:table-cell text-muted-foreground">
                  {post.publishedAt ? formatDate(post.publishedAt) : '—'}
                </td>
                <td className="px-4 py-3">
                  <Badge variant={post.published ? 'success' : 'secondary'} className="text-xs">
                    {post.published ? 'Publié' : 'Brouillon'}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button variant="ghost" size="icon" asChild className="h-8 w-8">
                      <Link href={`/blog/${post.slug}`} target="_blank"><Eye className="h-3.5 w-3.5" /></Link>
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

