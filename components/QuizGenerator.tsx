'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Badge } from '@/components/ui/badge'
import { Loader2, Sparkles } from 'lucide-react'
import { extractTextFromPDF } from '@/lib/pdf-utils'

interface QuizGeneratorProps {
  file: File
  onQuizGenerated: (quiz: any[], quizType: 'MCQ' | 'SAQ' | 'LAQ') => void
}

export default function QuizGenerator({ file, onQuizGenerated }: QuizGeneratorProps) {
  const [quizType, setQuizType] = useState<'MCQ' | 'SAQ' | 'LAQ'>('MCQ')
  const [numberOfQuestions, setNumberOfQuestions] = useState<number>(5)
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string>('')

  const handleGenerateQuiz = async () => {
    setIsGenerating(true)
    setError('')

    try {
      const pdfText = await extractTextFromPDF(file)

      const response = await fetch('/api/generate-quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pdfText,
          quizType,
          numberOfQuestions,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate quiz')
      }

      const data = await response.json()
      onQuizGenerated(data.quiz, quizType)
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.')
      console.error('Quiz generation error:', err)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" aria-hidden="true" />
          Generate Quiz
        </CardTitle>
        <CardDescription>
          Create personalized questions from your study material using AI
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Quiz Type Selection */}
        <div className="space-y-3">
          <Label htmlFor="quiz-type" className="text-base font-semibold">
            Question Type
          </Label>
          <RadioGroup
            id="quiz-type"
            value={quizType}
            onValueChange={(value) => setQuizType(value as 'MCQ' | 'SAQ' | 'LAQ')}
            className="space-y-2"
          >
            <div className="flex items-center space-x-3 rounded-lg border border-border p-4 hover:bg-primary/5 transition-colors">
              <RadioGroupItem value="MCQ" id="mcq" />
              <Label htmlFor="mcq" className="flex-1 cursor-pointer">
                <div className="font-medium text-foreground">Multiple Choice (MCQ)</div>
                <div className="text-sm text-muted-foreground">
                  4 options with one correct answer
                </div>
              </Label>
              <Badge variant="secondary">Quick</Badge>
            </div>

            <div className="flex items-center space-x-3 rounded-lg border border-border p-4 hover:bg-primary/5 transition-colors">
              <RadioGroupItem value="SAQ" id="saq" />
              <Label htmlFor="saq" className="flex-1 cursor-pointer">
                <div className="font-medium text-foreground">Short Answer (SAQ)</div>
                <div className="text-sm text-muted-foreground">
                  Brief 2-3 sentence responses
                </div>
              </Label>
              <Badge variant="secondary">Medium</Badge>
            </div>

            <div className="flex items-center space-x-3 rounded-lg border border-border p-4 hover:bg-primary/5 transition-colors">
              <RadioGroupItem value="LAQ" id="laq" />
              <Label htmlFor="laq" className="flex-1 cursor-pointer">
                <div className="font-medium text-foreground">Long Answer (LAQ)</div>
                <div className="text-sm text-muted-foreground">
                  Detailed paragraph responses
                </div>
              </Label>
              <Badge variant="secondary">Deep</Badge>
            </div>
          </RadioGroup>
        </div>

        {/* Number of Questions */}
        <div className="space-y-3">
          <Label htmlFor="num-questions" className="text-base font-semibold">
            Number of Questions: {numberOfQuestions}
          </Label>
          <input
            id="num-questions"
            type="range"
            min="3"
            max="10"
            step="1"
            value={numberOfQuestions}
            onChange={(e) => setNumberOfQuestions(parseInt(e.target.value))}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
            aria-valuemin={3}
            aria-valuemax={10}
            aria-valuenow={numberOfQuestions}
            aria-label="Number of questions slider"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>3 questions</span>
            <span>10 questions</span>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div
            role="alert"
            className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive text-sm"
          >
            {error}
          </div>
        )}

        {/* Generate Button */}
        <Button
          onClick={handleGenerateQuiz}
          disabled={isGenerating}
          className="w-full"
          size="lg"
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
              Generating Quiz...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" aria-hidden="true" />
              Generate {numberOfQuestions} {quizType} Questions
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
