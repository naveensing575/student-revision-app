import Link from 'next/link'
import { BookOpen, BarChart3, Home } from 'lucide-react'

export default function Header() {
  return (
    <header className="border-b bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" aria-hidden="true" />
            <h1 className="text-base sm:text-xl font-bold text-gray-900">
              <span className="hidden sm:inline">Student Revision App</span>
              <span className="sm:hidden">Revision App</span>
            </h1>
          </div>

          <nav className="flex items-center gap-3 sm:gap-6" role="navigation" aria-label="Main navigation">
            <Link
              href="/"
              className="flex items-center gap-1 sm:gap-2 text-gray-700 hover:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-2 py-1"
              aria-label="Go to home page"
            >
              <Home className="h-4 w-4" aria-hidden="true" />
              <span className="font-medium text-sm sm:text-base">Home</span>
            </Link>
            <Link
              href="/dashboard"
              className="flex items-center gap-1 sm:gap-2 text-gray-700 hover:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-2 py-1"
              aria-label="Go to dashboard"
            >
              <BarChart3 className="h-4 w-4" aria-hidden="true" />
              <span className="font-medium text-sm sm:text-base">Dashboard</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
