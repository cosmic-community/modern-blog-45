import Link from 'next/link'
import type { Category } from '@/types'

interface CategoryCardProps {
  category: Category
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link 
      href={`/categories/${category.slug}`}
      className="block bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-green-50 hover:border-green-200"
    >
      {category.metadata?.category_image && (
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-green-900/20 to-transparent z-10"></div>
          <img
            src={`${category.metadata.category_image.imgix_url}?w=800&h=400&fit=crop&auto=format,compress`}
            alt={category.title}
            className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 hover:bg-gradient-to-r hover:from-green-600 hover:to-green-800 hover:bg-clip-text hover:text-transparent transition-all duration-300">
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