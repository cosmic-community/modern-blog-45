import { getCategories } from '@/lib/cosmic'
import CategoryCard from '@/components/CategoryCard'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Categories | Modern Blog',
  description: 'Browse posts by category. Explore articles on technology, travel, lifestyle and more.',
  openGraph: {
    title: 'Categories | Modern Blog',
    description: 'Browse posts by category.',
    type: 'website',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=630&fit=crop&auto=format,compress',
        width: 1200,
        height: 630,
        alt: 'Modern Blog Categories',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Categories | Modern Blog',
    description: 'Browse posts by category.',
  },
}

export default async function CategoriesPage() {
  const categories = await getCategories()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
          Categories
        </h1>
        <p className="text-xl text-gray-600">
          Browse posts by category
        </p>
      </div>

      {categories.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No categories yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      )}
    </div>
  )
}