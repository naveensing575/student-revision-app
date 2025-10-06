import Link from 'next/link'
import { BookOpen, BarChart3, Home, MessageCircle } from 'lucide-react'

export default function Header() {
  return (
    <header className="border-b border-border/40 bg-card/60 backdrop-blur-xl shadow-2xl sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="p-2 rounded-lg bg-primary/20 border border-primary/30 group-hover:bg-primary/30 group-hover:glow-border transition-all duration-300">
              <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-primary" aria-hidden="true" />
            </div>
            <h1 className="text-base sm:text-xl font-bold text-foreground group-hover:text-primary transition-colors">
              <span className="hidden sm:inline">Student Revision App</span>
              <span className="sm:hidden">Revision</span>
            </h1>
          </Link>

          <nav className="flex items-center gap-2 sm:gap-3" role="navigation" aria-label="Main navigation">
            <Link
              href="/"
              className="flex items-center gap-1 sm:gap-2 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded-lg px-3 py-2"
              aria-label="Go to home page"
            >
              <Home className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline font-medium text-sm">Home</span>
            </Link>
            <Link
              href="/chat"
              className="flex items-center gap-1 sm:gap-2 text-muted-foreground hover:text-accent hover:bg-accent/10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background rounded-lg px-3 py-2"
              aria-label="Go to chat"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline font-medium text-sm">Chat</span>
            </Link>
            <Link
              href="/dashboard"
              className="flex items-center gap-1 sm:gap-2 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded-lg px-3 py-2"
              aria-label="Go to dashboard"
            >
              <BarChart3 className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline font-medium text-sm">Dashboard</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
