'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="border-b border-blue-100 bg-gradient-to-r from-blue-50 to-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            📝 ModernBlog
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-6">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Home
            </Link>
            <Link 
              href="/categories" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Categories
            </Link>
            <Link 
              href="/authors" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Authors
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-blue-100">
            <div className="flex flex-col space-y-3">
              <Link 
                href="/" 
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors py-2 px-4 rounded-md hover:bg-blue-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/categories" 
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors py-2 px-4 rounded-md hover:bg-blue-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Categories
              </Link>
              <Link 
                href="/authors" 
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors py-2 px-4 rounded-md hover:bg-blue-50"
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