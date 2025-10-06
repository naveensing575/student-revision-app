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

export async function POST(request: NextRequest) {
  try {
    const { message, pdfContext } = await request.json()

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    const prompt = pdfContext
      ? `You are a helpful study assistant. The student is studying from this PDF content:

${pdfContext.slice(0, 5000)}

Student question: ${message}

Provide a clear, concise, and helpful answer. If the question relates to the PDF content, reference specific parts when relevant.`
      : `You are a helpful study assistant. Answer the following question clearly and concisely:

${message}`

    const result = await model.generateContent(prompt)
    const response = result.response
    const text = response.text()

    return NextResponse.json({ message: text })
  } catch (error: any) {
    console.error('Chat error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to generate response' },
      { status: 500 }
    )
  }
}
