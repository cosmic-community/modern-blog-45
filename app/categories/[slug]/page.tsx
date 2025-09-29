// app/categories/[slug]/page.tsx
import { getCategory, getPostsByCategory, getCategories } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import PostCard from '@/components/PostCard'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  const categories = await getCategories()
  
  return categories.map((category) => ({
    slug: category.slug,
  }))
}

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params
  const category = await getCategory(slug)

  if (!category) {
    return {
      title: 'Category Not Found',
    }
  }

  const ogImage = category.metadata?.category_image?.imgix_url 
    ? `${category.metadata.category_image.imgix_url}?w=1200&h=630&fit=crop&auto=format,compress`
    : 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=630&fit=crop&auto=format,compress'

  return {
    title: `${category.title} | Modern Blog`,
    description: category.metadata?.description || `Browse ${category.title} articles`,
    openGraph: {
      title: category.title,
      description: category.metadata?.description || `Browse ${category.title} articles`,
      type: 'website',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: category.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: category.title,
      description: category.metadata?.description || `Browse ${category.title} articles`,
      images: [ogImage],
    },
  }
}

export default async function CategoryPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params
  const category = await getCategory(slug)

  if (!category) {
    notFound()
  }

  const posts = await getPostsByCategory(category.id)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Category Header */}
      <div className="mb-12">
        {category.metadata?.category_image && (
          <div className="relative rounded-xl overflow-hidden mb-6 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent"></div>
            <img
              src={`${category.metadata.category_image.imgix_url}?w=2400&h=600&fit=crop&auto=format,compress`}
              alt={category.title}
              className="w-full h-64 object-cover"
            />
          </div>
        )}
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
          {category.title}
        </h1>
        {category.metadata?.description && (
          <p className="text-xl text-gray-600">{category.metadata.description}</p>
        )}
      </div>

      {/* Posts Grid */}
      <div>
        <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
          Posts in {category.title}
        </h2>
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No posts in this category yet.</p>
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