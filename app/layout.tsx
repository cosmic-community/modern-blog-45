import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CosmicBadge from '@/components/CosmicBadge'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Modern Blog Platform | Stories, Insights & Ideas',
  description: 'Discover stories, insights, and ideas from our community of writers. Explore articles on technology, travel, lifestyle and more.',
  keywords: ['blog', 'articles', 'stories', 'technology', 'travel', 'lifestyle'],
  authors: [{ name: 'Modern Blog Platform' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://modernblog.com',
    siteName: 'Modern Blog Platform',
    title: 'Modern Blog Platform | Stories, Insights & Ideas',
    description: 'Discover stories, insights, and ideas from our community of writers.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=630&fit=crop&auto=format,compress',
        width: 1200,
        height: 630,
        alt: 'Modern Blog Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Modern Blog Platform | Stories, Insights & Ideas',
    description: 'Discover stories, insights, and ideas from our community of writers.',
    images: ['https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=630&fit=crop&auto=format,compress'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG as string
  
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📝</text></svg>" />
      </head>
      <body className={inter.className}>
        <script src="/dashboard-console-capture.js"></script>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <CosmicBadge bucketSlug={bucketSlug} />
      </body>
    </html>
  )
}