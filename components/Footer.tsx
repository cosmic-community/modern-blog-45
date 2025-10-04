export default function Footer() {
  return (
    <footer className="border-t border-green-100 bg-gradient-to-r from-green-50 to-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-bold mb-4 bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
              ModernBlog
            </h3>
            <p className="text-gray-600">
              A modern blogging platform built with Next.js and Cosmic CMS. Share your stories with the world.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-800">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-600 hover:text-green-600 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/categories" className="text-gray-600 hover:text-green-600 transition-colors">
                  Categories
                </a>
              </li>
              <li>
                <a href="/authors" className="text-gray-600 hover:text-green-600 transition-colors">
                  Authors
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-800">Connect</h3>
            <p className="text-gray-600 mb-2">
              Follow us for the latest updates and insights.
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-green-100 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} ModernBlog. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}