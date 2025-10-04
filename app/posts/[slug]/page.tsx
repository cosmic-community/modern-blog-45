// app/posts/[slug]/page.tsx
import { getPost, getPosts } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import type { Post } from '@/types'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  const posts = await getPosts()
  
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  const ogImage = post.metadata?.featured_image?.imgix_url 
    ? `${post.metadata.featured_image.imgix_url}?w=1200&h=630&fit=crop&auto=format,compress`
    : 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=630&fit=crop&auto=format,compress'

  return {
    title: `${post.title} | Modern Blog`,
    description: post.metadata?.content?.substring(0, 160) || 'Read this article on Modern Blog Platform',
    authors: post.metadata?.author ? [{ name: post.metadata.author.title }] : [],
    openGraph: {
      title: post.title,
      description: post.metadata?.content?.substring(0, 160) || 'Read this article on Modern Blog Platform',
      type: 'article',
      publishedTime: post.metadata?.published_date || undefined,
      authors: post.metadata?.author ? [post.metadata.author.title] : [],
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.metadata?.content?.substring(0, 160) || 'Read this article on Modern Blog Platform',
      images: [ogImage],
    },
  }
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
        <div className="relative rounded-xl overflow-hidden mb-8 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-t from-green-900/20 to-transparent"></div>
          <img
            src={`${post.metadata.featured_image.imgix_url}?w=1600&h=800&fit=crop&auto=format,compress`}
            alt={post.title}
            className="w-full h-96 object-cover"
          />
        </div>
      )}

      {/* Post Header */}
      <header className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
          {post.title}
        </h1>
        
        <div className="flex flex-wrap items-center gap-4 text-gray-600">
          {post.metadata?.author && (
            <Link 
              href={`/authors/${post.metadata.author.slug}`}
              className="flex items-center gap-2 hover:text-green-600 transition-colors"
            >
              {post.metadata.author.metadata?.avatar && (
                <img
                  src={`${post.metadata.author.metadata.avatar.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                  alt={post.metadata.author.title}
                  className="w-10 h-10 rounded-full ring-2 ring-green-100"
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
                className="px-3 py-1 bg-gradient-to-r from-green-100 to-green-200 text-green-800 rounded-full font-medium hover:from-green-200 hover:to-green-300 transition-colors"
              >
                {post.metadata.category.title}
              </Link>
            </>
          )}
        </div>
      </header>

      {/* Post Content */}
      {/* Post Content */}
      <div className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-headings:bg-gradient-to-r prose-headings:from-green-600 prose-headings:to-green-800 prose-headings:bg-clip-text prose-headings:text-transparent prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-green-600 prose-a:font-medium prose-a:no-underline hover:prose-a:text-green-700 hover:prose-a:underline prose-strong:text-gray-900 prose-strong:font-semibold prose-em:text-gray-700 prose-code:text-green-700 prose-code:bg-green-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-code:text-sm prose-code:before:content-[''] prose-code:after:content-[''] prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:rounded-lg prose-pre:shadow-lg prose-blockquote:border-l-4 prose-blockquote:border-green-500 prose-blockquote:bg-green-50 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:italic prose-ul:list-disc prose-ul:pl-6 prose-ol:list-decimal prose-ol:pl-6 prose-li:text-gray-700 prose-li:my-1 prose-img:rounded-lg prose-img:shadow-md">
        <ReactMarkdown>{post.metadata.content}</ReactMarkdown>
      </div>

      {/* Author Bio */}
      {post.metadata?.author && post.metadata.author.metadata?.bio && (
        <div className="mt-12 p-6 bg-gradient-to-r from-green-50 to-white rounded-xl shadow-md border border-green-100">
          <div className="flex items-start gap-4">
            {post.metadata.author.metadata.avatar && (
              <img
                src={`${post.metadata.author.metadata.avatar.imgix_url}?w=160&h=160&fit=crop&auto=format,compress`}
                alt={post.metadata.author.title}
                className="w-20 h-20 rounded-full ring-2 ring-green-200"
              />
            )}
            <div>
              <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
                About {post.metadata.author.title}
              </h3>
              <p className="text-gray-600 mb-3">{post.metadata.author.metadata.bio}</p>
              <div className="flex gap-4">
                {post.metadata.author.metadata.website && (
                  <a 
                    href={post.metadata.author.metadata.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:text-green-700 font-medium transition-colors"
                  >
                    Website
                  </a>
                )}
                {post.metadata.author.metadata.email && (
                  <a 
                    href={`mailto:${post.metadata.author.metadata.email}`}
                    className="text-green-600 hover:text-green-700 font-medium transition-colors"
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