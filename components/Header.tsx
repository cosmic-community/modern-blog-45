'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, PenSquare } from 'lucide-react'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-green-100 bg-gradient-to-r from-green-50/95 to-white/95 backdrop-blur-md shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold">
            <PenSquare className="w-6 h-6 text-green-600" />
            <span className="bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
              ModernBlog
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-6">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-green-600 font-medium transition-colors"
            >
              Home
            </Link>
            <Link 
              href="/categories" 
              className="text-gray-700 hover:text-green-600 font-medium transition-colors"
            >
              Categories
            </Link>
            <Link 
              href="/authors" 
              className="text-gray-700 hover:text-green-600 font-medium transition-colors"
            >
              Authors
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-green-600 hover:bg-green-50 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-green-100">
            <div className="flex flex-col space-y-3">
              <Link 
                href="/" 
                className="text-gray-700 hover:text-green-600 font-medium transition-colors py-2 px-4 rounded-md hover:bg-green-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/categories" 
                className="text-gray-700 hover:text-green-600 font-medium transition-colors py-2 px-4 rounded-md hover:bg-green-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Categories
              </Link>
              <Link 
                href="/authors" 
                className="text-gray-700 hover:text-green-600 font-medium transition-colors py-2 px-4 rounded-md hover:bg-green-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Authors
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}