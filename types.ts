// Base Cosmic object interface
interface CosmicObject {
  id: string
  slug: string
  title: string
  content?: string
  metadata: Record<string, any>
  type: string
  created_at: string
  modified_at: string
}

// Post interface with typed metadata
export interface Post extends CosmicObject {
  type: 'posts'
  metadata: {
    content: string
    featured_image?: {
      url: string
      imgix_url: string
    }
    author?: Author
    category?: Category
    published_date?: string
  }
}

// Author interface with typed metadata
export interface Author extends CosmicObject {
  type: 'authors'
  metadata: {
    bio?: string
    avatar?: {
      url: string
      imgix_url: string
    }
    email?: string
    website?: string
  }
}

// Category interface with typed metadata
export interface Category extends CosmicObject {
  type: 'categories'
  metadata: {
    description?: string
    category_image?: {
      url: string
      imgix_url: string
    }
  }
}

// API response types
export interface CosmicResponse<T> {
  objects: T[]
  total: number
}