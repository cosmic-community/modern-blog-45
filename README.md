# Modern Blog Platform

![App Preview](https://imgix.cosmicjs.com/7d6f1e10-9d64-11f0-8dcc-651091f6a7c0-photo-1537996194471-e657df975ab4-1759171535705.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A modern, responsive blog platform built with Next.js 15 and Cosmic CMS. Features a clean design with posts, authors, and categories, all powered by your Cosmic content.

## ✨ Features

- 📝 **Dynamic Blog Posts** - Full post pages with markdown content rendering
- 👤 **Author Profiles** - Dedicated author pages with bio and all their posts
- 🏷️ **Category Organization** - Browse posts by category with filtering
- 🎨 **Modern UI/UX** - Clean, responsive design with Tailwind CSS
- 🖼️ **Image Optimization** - Automatic image optimization with imgix
- 📱 **Mobile Responsive** - Looks great on all devices
- ⚡ **Fast Performance** - Built with Next.js 15 App Router for optimal speed
- 🔍 **SEO Friendly** - Proper meta tags and semantic HTML

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](http://localhost:3040/projects/new?clone_bucket=68dad1f6bea3c37898ed7c61&clone_repository=68dad4a2b8eda1c34f8a2f71)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create a content model for a blog with posts, authors, and categories"

### Code Generation Prompt

> "Based on the content model I created for "Create a content model for a blog with posts, authors, and categories", now build a complete web application that showcases this content. Include a modern, responsive design with proper navigation, content display, and user-friendly interface."

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🛠️ Technologies

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Cosmic CMS** - Headless CMS for content management
- **React Markdown** - Markdown rendering for post content

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account with your blog content

### Installation

1. Clone this repository
2. Install dependencies:

```bash
bun install
```

3. Create a `.env.local` file in the root directory:

```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
```

4. Run the development server:

```bash
bun run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📖 Cosmic SDK Examples

### Fetching All Posts

```typescript
import { cosmic } from '@/lib/cosmic'

export async function getPosts() {
  try {
    const response = await cosmic.objects
      .find({ type: 'posts' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    const posts = response.objects as Post[]
    return posts.sort((a, b) => {
      const dateA = new Date(a.metadata?.published_date || '').getTime()
      const dateB = new Date(b.metadata?.published_date || '').getTime()
      return dateB - dateA
    })
  } catch (error) {
    if (error.status === 404) {
      return []
    }
    throw error
  }
}
```

### Fetching a Single Post

```typescript
export async function getPost(slug: string) {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'posts', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.object as Post
  } catch (error) {
    if (error.status === 404) {
      return null
    }
    throw error
  }
}
```

## 🎨 Cosmic CMS Integration

This application uses your Cosmic bucket with the following content structure:

### Object Types

- **Posts** - Blog posts with content, featured images, author, and category relationships
- **Authors** - Author profiles with bio, avatar, email, and website
- **Categories** - Content categories with descriptions and images

### Key Features

- Uses `depth(1)` parameter to include related objects (authors and categories) in post queries
- Implements proper error handling for empty results (404 errors)
- Optimizes images using imgix query parameters
- Maintains type safety with TypeScript interfaces

## 🚀 Deployment

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone)

1. Click the button above
2. Add your environment variables:
   - `COSMIC_BUCKET_SLUG`
   - `COSMIC_READ_KEY`
3. Deploy!

### Environment Variables

Make sure to set these environment variables in your deployment platform:

- `COSMIC_BUCKET_SLUG` - Your Cosmic bucket slug
- `COSMIC_READ_KEY` - Your Cosmic read key

<!-- README_END -->