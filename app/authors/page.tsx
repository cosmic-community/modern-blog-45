import { getAuthors } from '@/lib/cosmic'
import AuthorCard from '@/components/AuthorCard'

export default async function AuthorsPage() {
  const authors = await getAuthors()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Our Authors</h1>
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