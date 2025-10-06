'use client'

import { useState } from 'react'
import SourceSelector from '@/components/SourceSelector'
import PDFViewer from '@/components/PDFViewer'
import QuizGenerator from '@/components/QuizGenerator'
import QuizDisplay from '@/components/QuizDisplay'

interface Question {
  question: string
  options?: string[]
  correctAnswer: string
  explanation: string
}

export default function HomePage() {
  const [selectedPDF, setSelectedPDF] = useState<File | null>(null)
  const [generatedQuiz, setGeneratedQuiz] = useState<Question[] | null>(null)
  const [quizType, setQuizType] = useState<'MCQ' | 'SAQ' | 'LAQ'>('MCQ')

  const handlePDFSelect = (file: File) => {
    setSelectedPDF(file)
    setGeneratedQuiz(null)
    console.log('PDF selected:', file.name)
  }

  const handleQuizGenerated = (quiz: Question[], type: 'MCQ' | 'SAQ' | 'LAQ') => {
    setGeneratedQuiz(quiz)
    setQuizType(type)
    console.log('Quiz generated:', quiz)
  }

  const handleRestartQuiz = () => {
    setGeneratedQuiz(null)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Welcome to Your Study Companion
        </h2>
        <p className="text-gray-600 mb-8">
          Upload PDFs, generate quizzes, and track your learning progress with AI-powered tools.
        </p>

        {!selectedPDF ? (
          <div className="bg-white rounded-lg shadow p-6 border">
            <SourceSelector onPDFSelect={handlePDFSelect} />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* PDF Viewer */}
            <div className="h-[600px]">
              <PDFViewer file={selectedPDF} />
            </div>

            {/* Quiz Panel */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow p-6 border">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Current Document
                </h3>
                <p className="text-sm text-gray-600">{selectedPDF.name}</p>
                <button
                  onClick={() => setSelectedPDF(null)}
                  className="mt-3 text-sm text-blue-600 hover:text-blue-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                  aria-label="Change document"
                >
                  ← Change document
                </button>
              </div>

              {!generatedQuiz ? (
                <QuizGenerator file={selectedPDF} onQuizGenerated={handleQuizGenerated} />
              ) : (
                <QuizDisplay
                  quiz={generatedQuiz}
                  quizType={quizType}
                  pdfName={selectedPDF.name}
                  onRestart={handleRestartQuiz}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
