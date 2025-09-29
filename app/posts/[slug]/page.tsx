// app/posts/[slug]/page.tsx
import { getPost, getPosts } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import type { Post } from '@/types'

export async function generateStaticParams() {
  const posts = await getPosts()
  
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function PostPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    notFound()
  }

  const publishedDate = post.metadata?.published_date 
    ? new Date(post.metadata.published_date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : null

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Featured Image */}
      {post.metadata?.featured_image && (
        <img
          src={`${post.metadata.featured_image.imgix_url}?w=1600&h=800&fit=crop&auto=format,compress`}
          alt={post.title}
          className="w-full h-96 object-cover rounded-lg mb-8"
        />
      )}

      {/* Post Header */}
      <header className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
        
        <div className="flex flex-wrap items-center gap-4 text-gray-600">
          {post.metadata?.author && (
            <Link 
              href={`/authors/${post.metadata.author.slug}`}
              className="flex items-center gap-2 hover:text-blue-600"
            >
              {post.metadata.author.metadata?.avatar && (
                <img
                  src={`${post.metadata.author.metadata.avatar.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                  alt={post.metadata.author.title}
                  className="w-10 h-10 rounded-full"
                />
              )}
              <span className="font-medium">{post.metadata.author.title}</span>
            </Link>
          )}
          
          {publishedDate && (
            <span>• {publishedDate}</span>
          )}
          
          {post.metadata?.category && (
            <>
              <span>•</span>
              <Link 
                href={`/categories/${post.metadata.category.slug}`}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                {post.metadata.category.title}
              </Link>
            </>
          )}
        </div>
      </header>

      {/* Post Content */}
      <div className="prose prose-lg max-w-none">
        <ReactMarkdown>{post.metadata.content}</ReactMarkdown>
      </div>

      {/* Author Bio */}
      {post.metadata?.author && post.metadata.author.metadata?.bio && (
        <div className="mt-12 p-6 bg-gray-50 rounded-lg">
          <div className="flex items-start gap-4">
            {post.metadata.author.metadata.avatar && (
              <img
                src={`${post.metadata.author.metadata.avatar.imgix_url}?w=160&h=160&fit=crop&auto=format,compress`}
                alt={post.metadata.author.title}
                className="w-20 h-20 rounded-full"
              />
            )}
            <div>
              <h3 className="text-xl font-bold mb-2">About {post.metadata.author.title}</h3>
              <p className="text-gray-600 mb-3">{post.metadata.author.metadata.bio}</p>
              <div className="flex gap-4">
                {post.metadata.author.metadata.website && (
                  <a 
                    href={post.metadata.author.metadata.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700"
                  >
                    Website
                  </a>
                )}
                {post.metadata.author.metadata.email && (
                  <a 
                    href={`mailto:${post.metadata.author.metadata.email}`}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    Email
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </article>
  )
}