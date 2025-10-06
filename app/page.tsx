'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import SourceSelector from '@/components/SourceSelector'
import QuizGenerator from '@/components/QuizGenerator'
import QuizDisplay from '@/components/QuizDisplay'

const PDFViewer = dynamic(() => import('@/components/PDFViewer'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full bg-gradient-to-br from-muted to-muted/50 rounded-xl border border-border">
      <p className="text-muted-foreground">Loading PDF viewer...</p>
    </div>
  ),
})

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
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/10">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent mb-4">
              Your AI Study Companion
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Upload PDFs, generate intelligent quizzes, and track your learning progress with AI-powered tools
            </p>
          </div>

          {!selectedPDF ? (
            <div className="gradient-card rounded-xl shadow-xl p-8 border border-white/20 backdrop-blur-sm">
              <SourceSelector onPDFSelect={handlePDFSelect} />
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* PDF Viewer */}
              <div className="h-[600px] rounded-xl overflow-hidden shadow-2xl">
                <PDFViewer file={selectedPDF} />
              </div>

              {/* Quiz Panel */}
              <div className="space-y-6">
                <div className="gradient-card rounded-xl shadow-xl p-6 border border-white/20 backdrop-blur-sm">
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Current Document
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">{selectedPDF.name}</p>
                  <button
                    onClick={() => setSelectedPDF(null)}
                    className="text-sm text-primary hover:text-primary/80 font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded px-2 py-1 transition-colors"
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
    </div>
  )
}
