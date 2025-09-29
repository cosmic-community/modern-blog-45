import Link from 'next/link'
import type { Category } from '@/types'

interface CategoryCardProps {
  category: Category
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link 
      href={`/categories/${category.slug}`}
      className="block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
    >
      {category.metadata?.category_image && (
        <img
          src={`${category.metadata.category_image.imgix_url}?w=800&h=400&fit=crop&auto=format,compress`}
          alt={category.title}
          className="w-full h-48 object-cover"
        />
      )}
      
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 hover:text-blue-600 transition-colors">
          {category.title}
        </h3>
        {category.metadata?.description && (
          <p className="text-gray-600 line-clamp-2">
            {category.metadata.description}
          </p>
        )}
      </div>
    </Link>
  )
}