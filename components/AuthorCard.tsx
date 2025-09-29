import Link from 'next/link'
import type { Author } from '@/types'

interface AuthorCardProps {
  author: Author
}

export default function AuthorCard({ author }: AuthorCardProps) {
  return (
    <Link 
      href={`/authors/${author.slug}`}
      className="block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 p-6"
    >
      <div className="flex flex-col items-center text-center">
        {author.metadata?.avatar && (
          <img
            src={`${author.metadata.avatar.imgix_url}?w=320&h=320&fit=crop&auto=format,compress`}
            alt={author.title}
            className="w-32 h-32 rounded-full mb-4"
          />
        )}
        
        <h3 className="text-xl font-bold mb-2 hover:text-blue-600 transition-colors">
          {author.title}
        </h3>
        
        {author.metadata?.bio && (
          <p className="text-gray-600 line-clamp-3 mb-3">
            {author.metadata.bio}
          </p>
        )}
        
        <div className="flex gap-4 text-sm">
          {author.metadata?.website && (
            <span className="text-blue-600">Website</span>
          )}
          {author.metadata?.email && (
            <span className="text-blue-600">Email</span>
          )}
        </div>
      </div>
    </Link>
  )
}