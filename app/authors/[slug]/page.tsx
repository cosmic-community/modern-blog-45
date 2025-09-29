// app/authors/[slug]/page.tsx
import { getAuthor, getPostsByAuthor, getAuthors } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import PostCard from '@/components/PostCard'

export async function generateStaticParams() {
  const authors = await getAuthors()
  
  return authors.map((author) => ({
    slug: author.slug,
  }))
}

export default async function AuthorPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params
  const author = await getAuthor(slug)

  if (!author) {
    notFound()
  }

  const posts = await getPostsByAuthor(author.id)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Author Profile */}
      <div className="mb-12">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
          {author.metadata?.avatar && (
            <img
              src={`${author.metadata.avatar.imgix_url}?w=320&h=320&fit=crop&auto=format,compress`}
              alt={author.title}
              className="w-40 h-40 rounded-full"
            />
          )}
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold mb-4">{author.title}</h1>
            {author.metadata?.bio && (
              <p className="text-xl text-gray-600 mb-4">{author.metadata.bio}</p>
            )}
            <div className="flex gap-4 justify-center md:justify-start">
              {author.metadata?.website && (
                <a 
                  href={author.metadata.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Website
                </a>
              )}
              {author.metadata?.email && (
                <a 
                  href={`mailto:${author.metadata.email}`}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Email
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Author's Posts */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Posts by {author.title}</h2>
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No posts yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}