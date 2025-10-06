'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import SourceSelector from '@/components/SourceSelector'
import QuizGenerator from '@/components/QuizGenerator'
import QuizDisplay from '@/components/QuizDisplay'

const PDFViewer = dynamic(() => import('@/components/PDFViewer'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full bg-card/50 rounded-2xl border border-border/40">
      <div className="text-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-3"></div>
        <p className="text-muted-foreground text-sm">Loading PDF viewer...</p>
      </div>
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
    <div className="min-h-screen gradient-bg">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-6xl font-bold text-foreground mb-4 text-glow">
              Your AI Study Companion
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              Upload PDFs, generate intelligent quizzes, and track your learning progress with{' '}
              <span className="text-primary font-semibold">AI-powered tools</span>
            </p>
          </div>

          {!selectedPDF ? (
            <div className="gradient-card rounded-2xl shadow-2xl p-8 glow-border">
              <SourceSelector onPDFSelect={handlePDFSelect} />
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="h-[600px] rounded-2xl overflow-hidden shadow-2xl glow-border">
                <PDFViewer file={selectedPDF} />
              </div>

              <div className="space-y-6">
                <div className="gradient-card rounded-2xl shadow-2xl p-6 glow-border">
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Current Document
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3 truncate">{selectedPDF.name}</p>
                  <button
                    onClick={() => setSelectedPDF(null)}
                    className="text-sm text-primary hover:text-primary/80 font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded-lg px-3 py-2 hover:bg-primary/10 transition-all"
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
