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
    let text = response.text()

    text = text.replace(/```json\s*/g, '').replace(/```\s*/g, '')

    let jsonMatch = text.match(/\[\s*\{[\s\S]*\}\s*\]/)

    if (!jsonMatch) {
      const startIndex = text.indexOf('[')
      const endIndex = text.lastIndexOf(']')

      if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
        jsonMatch = [text.substring(startIndex, endIndex + 1)]
      } else {
        throw new Error('Could not find valid JSON array in response')
      }
    }

    let jsonString = jsonMatch[0]

    jsonString = jsonString
      .replace(/,\s*}/g, '}')
      .replace(/,\s*]/g, ']')

    const quiz = JSON.parse(jsonString)

    if (!Array.isArray(quiz) || quiz.length === 0) {
      throw new Error('Invalid quiz format: expected non-empty array')
    }

    return quiz
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    throw new Error(`Failed to generate quiz: ${errorMessage}`)
  }
}
