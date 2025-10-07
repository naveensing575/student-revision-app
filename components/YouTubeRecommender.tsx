'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, Youtube, ExternalLink } from 'lucide-react'
import { extractTextFromPDF } from '@/lib/pdf-utils'

// Generate a color based on video index for placeholder
const getPlaceholderColor = (index: number) => {
  const colors = [
    'from-red-500 to-pink-500',
    'from-blue-500 to-cyan-500',
    'from-green-500 to-emerald-500',
    'from-purple-500 to-violet-500',
    'from-orange-500 to-amber-500',
    'from-indigo-500 to-blue-500',
  ]
  return colors[index % colors.length]
}

interface YouTubeVideo {
  id: string
  title: string
  description: string
  thumbnail: string
  channelTitle: string
  publishedAt: string
  url: string
  searchQuery?: string
}

interface YouTubeRecommenderProps {
  file: File
}

export default function YouTubeRecommender({ file }: YouTubeRecommenderProps) {
  const [videos, setVideos] = useState<YouTubeVideo[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>('')

  const handleGetRecommendations = async () => {
    setIsLoading(true)
    setError('')

    try {
      const pdfText = await extractTextFromPDF(file)

      const response = await fetch('/api/youtube-recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pdfText }),
      })

      if (!response.ok) {
        throw new Error('Failed to get video recommendations')
      }

      const data = await response.json()
      setVideos(data.videos)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Youtube className="h-5 w-5 text-red-500" aria-hidden="true" />
          YouTube Video Recommendations
        </CardTitle>
        <CardDescription>
          Discover educational videos related to your study material
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {!videos.length ? (
          <>
            {error && (
              <div
                role="alert"
                className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive text-sm"
              >
                {error}
              </div>
            )}

            <Button
              onClick={handleGetRecommendations}
              disabled={isLoading}
              className="w-full"
              size="lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                  Finding Videos...
                </>
              ) : (
                <>
                  <Youtube className="mr-2 h-4 w-4" aria-hidden="true" />
                  Get Video Recommendations
                </>
              )}
            </Button>
          </>
        ) : (
          <>
            <div className="mb-2">
              <p className="text-sm text-muted-foreground">
                AI-recommended educational videos based on your PDF content. Click to search on YouTube.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {videos.map((video, index) => (
                <a
                  key={video.id}
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <div className="h-full rounded-lg border border-border overflow-hidden hover:border-primary transition-all hover:shadow-lg">
                    <div className="relative w-full aspect-video overflow-hidden bg-gradient-to-br">
                      <div className={`absolute inset-0 bg-gradient-to-br ${getPlaceholderColor(index)} flex items-center justify-center`}>
                        <Youtube className="h-12 w-12 text-white/80" aria-hidden="true" />
                      </div>
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 rounded-full p-3">
                          <Youtube className="h-6 w-6 text-white" aria-hidden="true" />
                        </div>
                      </div>
                    </div>
                    <div className="p-3">
                      <h3 className="font-semibold text-sm text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                        {video.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{video.description}</p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span className="truncate">{video.channelTitle}</span>
                        <ExternalLink className="h-3 w-3 ml-2 flex-shrink-0" aria-hidden="true" />
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            <Button
              onClick={handleGetRecommendations}
              variant="outline"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                  Refreshing...
                </>
              ) : (
                'Refresh Recommendations'
              )}
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  )
}
