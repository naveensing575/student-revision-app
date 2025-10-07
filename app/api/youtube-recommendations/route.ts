import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

const apiKey = process.env.GOOGLE_GEMINI_API_KEY

if (!apiKey) {
  throw new Error('GOOGLE_GEMINI_API_KEY is not set')
}

const genAI = new GoogleGenerativeAI(apiKey)
const model = genAI.getGenerativeModel({
  model: 'gemini-2.0-flash-exp',
})

interface VideoRecommendation {
  id: string
  title: string
  description: string
  searchQuery: string
  channel: string
}

export async function POST(request: NextRequest) {
  try {
    const { pdfText } = await request.json()

    if (!pdfText) {
      return NextResponse.json(
        { error: 'PDF text is required' },
        { status: 400 }
      )
    }

    // Use Gemini to recommend videos
    const prompt = `Analyze the following educational content and recommend 6 educational YouTube videos that would help someone learn these topics better.

Content:
${pdfText.slice(0, 5000)}

For each video recommendation, provide:
1. A specific video title that is likely to exist on YouTube
2. A brief description of what the video should cover
3. A search query to find the video
4. A likely channel name that would have this content

Return the response as a JSON array with this exact structure:
[
  {
    "title": "video title",
    "description": "what this video covers",
    "searchQuery": "exact search terms for YouTube",
    "channel": "channel name"
  }
]

IMPORTANT: Return ONLY the JSON array, no additional text or markdown.`

    const result = await model.generateContent(prompt)
    const response = result.response
    let text = response.text().trim()

    // Clean up the response
    text = text.replace(/```json\s*/g, '').replace(/```\s*/g, '')

    // Extract JSON array
    let jsonMatch = text.match(/\[\s*\{[\s\S]*\}\s*\]/)

    if (!jsonMatch) {
      const startIndex = text.indexOf('[')
      const endIndex = text.lastIndexOf(']')

      if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
        jsonMatch = [text.substring(startIndex, endIndex + 1)]
      } else {
        throw new Error('Could not parse video recommendations')
      }
    }

    const recommendations: VideoRecommendation[] = JSON.parse(jsonMatch[0])

    // Convert to video format with YouTube search URLs
    const videos = recommendations.map((rec, index) => ({
      id: `vid-${index}`,
      title: rec.title,
      description: rec.description,
      thumbnail: `https://img.youtube.com/vi/0/hqdefault.jpg`, // Placeholder
      channelTitle: rec.channel,
      publishedAt: new Date().toISOString(),
      url: `https://www.youtube.com/results?search_query=${encodeURIComponent(rec.searchQuery)}`,
      searchQuery: rec.searchQuery,
    }))

    return NextResponse.json({ videos })
  } catch (error) {
    console.error('YouTube recommendation error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Failed to get recommendations'
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}
