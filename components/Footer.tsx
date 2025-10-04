export default function Footer() {
  return (
    <footer className="border-t border-green-100 bg-gradient-to-r from-green-50 to-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center text-gray-600">
          <p className="mb-2">
            © {new Date().getFullYear()} Modern Blog Platform. All rights reserved.
          </p>
          <p className="text-sm">
            Powered by{' '}
            <a 
              href="https://www.cosmicjs.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-green-600 hover:text-green-700 font-medium transition-colors"
            >
              Cosmic
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}