import { getPosts, getCategories } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'
import CategoryCard from '@/components/CategoryCard'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Modern Blog Platform | Home',
  description: 'Discover stories, insights, and ideas from our community of writers. Explore articles on technology, travel, lifestyle and more.',
  openGraph: {
    title: 'Modern Blog Platform | Home',
    description: 'Discover stories, insights, and ideas from our community of writers.',
    type: 'website',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=630&fit=crop&auto=format,compress',
        width: 1200,
        height: 630,
        alt: 'Modern Blog Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Modern Blog Platform | Home',
    description: 'Discover stories, insights, and ideas from our community of writers.',
  },
}

export default async function Home() {
  const posts = await getPosts()
  const categories = await getCategories()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16 relative">
        <div className="absolute inset-0 gradient-green opacity-5 blur-3xl rounded-full"></div>
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent relative z-10">
          Welcome to Our Blog
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto relative z-10">
          Discover stories, insights, and ideas from our community of writers
        </p>
      </div>

      {/* Categories Section */}
      {categories.length > 0 && (
        <div className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
              Browse by Category
            </h2>
            <Link 
              href="/categories" 
              className="text-green-600 hover:text-green-700 font-medium transition-colors"
            >
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.slice(0, 3).map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      )}

      {/* Latest Posts Section */}
      <div>
        <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
          Latest Posts
        </h2>
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No posts yet. Check back soon!</p>
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