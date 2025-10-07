export interface QuizAttempt {
  id: string
  pdfName: string
  quizType: 'MCQ' | 'SAQ' | 'LAQ'
  totalQuestions: number
  correctAnswers: number
  score: number
  timestamp: number
}

const STORAGE_KEY = 'quiz_attempts'

export function saveQuizAttempt(attempt: Omit<QuizAttempt, 'id' | 'timestamp'>): void {
  if (typeof window === 'undefined') return

  const attempts = getQuizAttempts()
  const newAttempt: QuizAttempt = {
    ...attempt,
    id: crypto.randomUUID(),
    timestamp: Date.now(),
  }

  attempts.push(newAttempt)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(attempts))
}

export function getQuizAttempts(): QuizAttempt[] {
  if (typeof window === 'undefined') return []

  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

export function getAttemptsByPDF(pdfName: string): QuizAttempt[] {
  return getQuizAttempts().filter((attempt) => attempt.pdfName === pdfName)
}

export function getStats() {
  const attempts = getQuizAttempts()

  if (attempts.length === 0) {
    return {
      totalAttempts: 0,
      averageScore: 0,
      totalCorrect: 0,
      totalQuestions: 0,
      byType: { MCQ: 0, SAQ: 0, LAQ: 0 },
    }
  }

  const totalCorrect = attempts.reduce((sum, a) => sum + a.correctAnswers, 0)
  const totalQuestions = attempts.reduce((sum, a) => sum + a.totalQuestions, 0)
  const averageScore = Math.round(
    attempts.reduce((sum, a) => sum + a.score, 0) / attempts.length
  )

  const byType = attempts.reduce(
    (acc, attempt) => {
      acc[attempt.quizType]++
      return acc
    },
    { MCQ: 0, SAQ: 0, LAQ: 0 }
  )

  return {
    totalAttempts: attempts.length,
    averageScore,
    totalCorrect,
    totalQuestions,
    byType,
  }
}

export function clearAllAttempts(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(STORAGE_KEY)
}
