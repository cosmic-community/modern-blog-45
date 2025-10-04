import { getAuthors } from '@/lib/cosmic'
import AuthorCard from '@/components/AuthorCard'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Authors | Modern Blog',
  description: 'Meet the talented writers behind our content. Explore articles from our community of authors.',
  openGraph: {
    title: 'Authors | Modern Blog',
    description: 'Meet the talented writers behind our content.',
    type: 'website',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=630&fit=crop&auto=format,compress',
        width: 1200,
        height: 630,
        alt: 'Modern Blog Authors',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Authors | Modern Blog',
    description: 'Meet the talented writers behind our content.',
  },
}

export default async function AuthorsPage() {
  const authors = await getAuthors()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
          Our Authors
        </h1>
        <p className="text-xl text-gray-600">
          Meet the talented writers behind our content
        </p>
      </div>

      {authors.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No authors yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {authors.map((author) => (
            <AuthorCard key={author.id} author={author} />
          ))}
        </div>
      )}
    </div>
  )
}