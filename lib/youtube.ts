export interface YouTubeVideo {
  id: string
  title: string
  description: string
  thumbnail: string
  channelTitle: string
  publishedAt: string
  url: string
}

export async function searchYouTubeVideos(
  query: string,
  maxResults: number = 5
): Promise<YouTubeVideo[]> {
  const apiKey = process.env.YOUTUBE_API_KEY

  if (!apiKey) {
    throw new Error('YouTube API key is not configured')
  }

  const searchUrl = new URL('https://www.googleapis.com/youtube/v3/search')
  searchUrl.searchParams.set('part', 'snippet')
  searchUrl.searchParams.set('q', query)
  searchUrl.searchParams.set('type', 'video')
  searchUrl.searchParams.set('maxResults', maxResults.toString())
  searchUrl.searchParams.set('key', apiKey)
  searchUrl.searchParams.set('videoCategoryId', '27') // Education category
  searchUrl.searchParams.set('videoDefinition', 'high')
  searchUrl.searchParams.set('relevanceLanguage', 'en')

  const response = await fetch(searchUrl.toString())

  if (!response.ok) {
    throw new Error('Failed to fetch YouTube videos')
  }

  const data = await response.json()

  return data.items.map((item: { id: { videoId: string }; snippet: { title: string; description: string; thumbnails: { high: { url: string } }; channelTitle: string; publishedAt: string } }) => ({
    id: item.id.videoId,
    title: item.snippet.title,
    description: item.snippet.description,
    thumbnail: item.snippet.thumbnails.high.url,
    channelTitle: item.snippet.channelTitle,
    publishedAt: item.snippet.publishedAt,
    url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
  }))
}
