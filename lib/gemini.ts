import { GoogleGenerativeAI } from '@google/generative-ai'

const apiKey = process.env.GOOGLE_GEMINI_API_KEY

if (!apiKey) {
  throw new Error('GOOGLE_GEMINI_API_KEY is not set in environment variables')
}

const genAI = new GoogleGenerativeAI(apiKey)

export const model = genAI.getGenerativeModel({
  model: 'gemini-2.0-flash-exp',
})

export async function generateQuiz(
  pdfText: string,
  quizType: 'MCQ' | 'SAQ' | 'LAQ',
  numberOfQuestions: number = 5
) {
  const prompt = `You are a helpful tutor creating quiz questions from educational content.

Based on the following text, generate ${numberOfQuestions} ${quizType} questions.

${quizType === 'MCQ' ? `For MCQ (Multiple Choice Questions):
- Provide 4 options (A, B, C, D)
- Mark the correct answer
- Provide a brief explanation` : ''}

${quizType === 'SAQ' ? `For SAQ (Short Answer Questions):
- Questions should require 2-3 sentence answers
- Provide model answer
- Provide evaluation criteria` : ''}

${quizType === 'LAQ' ? `For LAQ (Long Answer Questions):
- Questions should require detailed paragraph answers
- Provide comprehensive model answer
- Provide key points for evaluation` : ''}

Return the response as a JSON array with this exact structure:
[
  {
    "question": "question text",
    ${quizType === 'MCQ' ? '"options": ["A) option1", "B) option2", "C) option3", "D) option4"],' : ''}
    "correctAnswer": "correct answer or option",
    "explanation": "explanation of the answer"
  }
]

Content:
${pdfText.slice(0, 8000)}

IMPORTANT: Return ONLY the JSON array, no additional text.`

  try {
    const result = await model.generateContent(prompt)
    const response = result.response
    const text = response.text()

    // Extract JSON from response
    const jsonMatch = text.match(/\[[\s\S]*\]/)
    if (!jsonMatch) {
      throw new Error('Failed to parse quiz JSON from response')
    }

    const quiz = JSON.parse(jsonMatch[0])
    return quiz
  } catch (error) {
    console.error('Error generating quiz:', error)
    throw error
  }
}
