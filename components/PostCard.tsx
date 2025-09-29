import Link from 'next/link'
import type { Post } from '@/types'

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  const publishedDate = post.metadata?.published_date 
    ? new Date(post.metadata.published_date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    : null

  return (
    <article className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
      <Link href={`/posts/${post.slug}`}>
        {post.metadata?.featured_image && (
          <img
            src={`${post.metadata.featured_image.imgix_url}?w=800&h=450&fit=crop&auto=format,compress`}
            alt={post.title}
            className="w-full h-48 object-cover"
          />
        )}
        
        <div className="p-6">
          <div className="flex items-center gap-2 mb-3 text-sm text-gray-600">
            {post.metadata?.category && (
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
                {post.metadata.category.title}
              </span>
            )}
            {publishedDate && <span>• {publishedDate}</span>}
          </div>
          
          <h2 className="text-xl font-bold mb-3 hover:text-blue-600 transition-colors">
            {post.title}
          </h2>
          
          {post.metadata?.author && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              {post.metadata.author.metadata?.avatar && (
                <img
                  src={`${post.metadata.author.metadata.avatar.imgix_url}?w=64&h=64&fit=crop&auto=format,compress`}
                  alt={post.metadata.author.title}
                  className="w-8 h-8 rounded-full"
                />
              )}
              <span>By {post.metadata.author.title}</span>
            </div>
          )}
        </div>
      </Link>
    </article>
  )
}