import { NextRequest, NextResponse } from 'next/server'
import { generateQuiz } from '@/lib/gemini'

export async function POST(request: NextRequest) {
  try {
    const { pdfText, quizType, numberOfQuestions } = await request.json()

    if (!pdfText || !quizType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const quiz = await generateQuiz(pdfText, quizType, numberOfQuestions)

    return NextResponse.json({ quiz })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to generate quiz'
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}
