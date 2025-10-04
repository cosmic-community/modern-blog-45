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
    <article className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-green-50 hover:border-green-200">
      <Link href={`/posts/${post.slug}`}>
        {post.metadata?.featured_image && (
          <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-green-900/20 to-transparent z-10"></div>
            <img
              src={`${post.metadata.featured_image.imgix_url}?w=800&h=450&fit=crop&auto=format,compress`}
              alt={post.title}
              className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        
        <div className="p-6">
          <div className="flex items-center gap-2 mb-3 text-sm text-gray-600">
            {post.metadata?.category && (
              <span className="bg-gradient-to-r from-green-100 to-green-200 text-green-800 px-3 py-1 rounded-full font-medium">
                {post.metadata.category.title}
              </span>
            )}
            {publishedDate && <span>• {publishedDate}</span>}
          </div>
          
          <h2 className="text-xl font-bold mb-3 hover:bg-gradient-to-r hover:from-green-600 hover:to-green-800 hover:bg-clip-text hover:text-transparent transition-all duration-300">
            {post.title}
          </h2>
          
          {post.metadata?.author && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              {post.metadata.author.metadata?.avatar && (
                <img
                  src={`${post.metadata.author.metadata.avatar.imgix_url}?w=64&h=64&fit=crop&auto=format,compress`}
                  alt={post.metadata.author.title}
                  className="w-8 h-8 rounded-full ring-2 ring-green-100"
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