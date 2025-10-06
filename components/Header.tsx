import Link from 'next/link'
import { BookOpen, BarChart3, Home } from 'lucide-react'

export default function Header() {
  return (
    <header className="border-b bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-900">Student Revision App</h1>
          </div>

          <nav className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors">
              <Home className="h-4 w-4" />
              <span className="font-medium">Home</span>
            </Link>
            <Link href="/dashboard" className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors">
              <BarChart3 className="h-4 w-4" />
              <span className="font-medium">Dashboard</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
