'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { CheckCircle2, XCircle, ChevronRight, RotateCcw } from 'lucide-react'

interface Question {
  question: string
  options?: string[]
  correctAnswer: string
  explanation: string
}

interface QuizDisplayProps {
  quiz: Question[]
  quizType: 'MCQ' | 'SAQ' | 'LAQ'
  onRestart: () => void
}

export default function QuizDisplay({ quiz, quizType, onRestart }: QuizDisplayProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState<string[]>(Array(quiz.length).fill(''))
  const [showResults, setShowResults] = useState(false)
  const [submitted, setSubmitted] = useState<boolean[]>(Array(quiz.length).fill(false))

  const currentQuestion = quiz[currentQuestionIndex]
  const isLastQuestion = currentQuestionIndex === quiz.length - 1
  const progress = ((currentQuestionIndex + 1) / quiz.length) * 100

  const handleAnswerChange = (answer: string) => {
    const newAnswers = [...userAnswers]
    newAnswers[currentQuestionIndex] = answer
    setUserAnswers(newAnswers)
  }

  const handleSubmitAnswer = () => {
    const newSubmitted = [...submitted]
    newSubmitted[currentQuestionIndex] = true
    setSubmitted(newSubmitted)
  }

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      setShowResults(true)
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const calculateScore = () => {
    let correct = 0
    quiz.forEach((q, index) => {
      if (quizType === 'MCQ') {
        if (userAnswers[index].trim().toLowerCase() === q.correctAnswer.trim().toLowerCase()) {
          correct++
        }
      }
    })
    return correct
  }

  const handleRestart = () => {
    setCurrentQuestionIndex(0)
    setUserAnswers(Array(quiz.length).fill(''))
    setShowResults(false)
    setSubmitted(Array(quiz.length).fill(false))
    onRestart()
  }

  if (showResults) {
    const score = calculateScore()
    const percentage = Math.round((score / quiz.length) * 100)

    return (
      <Card>
        <CardHeader>
          <CardTitle>Quiz Results</CardTitle>
          <CardDescription>Here's how you performed</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center py-6">
            <div className="text-6xl font-bold text-blue-600 mb-2">
              {percentage}%
            </div>
            <p className="text-lg text-gray-700">
              {score} out of {quiz.length} correct
            </p>
          </div>

          <Progress value={percentage} className="h-3" aria-label={`Score: ${percentage}%`} />

          <div className="space-y-4">
            {quiz.map((q, index) => {
              const isCorrect = quizType === 'MCQ'
                ? userAnswers[index].trim().toLowerCase() === q.correctAnswer.trim().toLowerCase()
                : false

              return (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-2 ${
                    isCorrect ? 'border-green-300 bg-green-50' : 'border-red-300 bg-red-50'
                  }`}
                >
                  <div className="flex items-start gap-3 mb-2">
                    {isCorrect ? (
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" aria-hidden="true" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" aria-hidden="true" />
                    )}
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 mb-1">
                        Question {index + 1}: {q.question}
                      </p>
                      {quizType === 'MCQ' && (
                        <>
                          <p className="text-sm text-gray-600">
                            Your answer: <span className="font-medium">{userAnswers[index] || 'Not answered'}</span>
                          </p>
                          {!isCorrect && (
                            <p className="text-sm text-gray-600">
                              Correct answer: <span className="font-medium text-green-700">{q.correctAnswer}</span>
                            </p>
                          )}
                        </>
                      )}
                      <div className="mt-2 p-3 bg-white rounded border">
                        <p className="text-sm font-semibold text-gray-700 mb-1">Explanation:</p>
                        <p className="text-sm text-gray-600">{q.explanation}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <Button onClick={handleRestart} className="w-full" size="lg">
            <RotateCcw className="mr-2 h-4 w-4" aria-hidden="true" />
            Generate New Quiz
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <Badge variant="outline">
            Question {currentQuestionIndex + 1} of {quiz.length}
          </Badge>
          <Badge>{quizType}</Badge>
        </div>
        <Progress value={progress} className="h-2 mb-4" aria-label={`Quiz progress: ${Math.round(progress)}%`} />
        <CardTitle className="text-xl">{currentQuestion.question}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {quizType === 'MCQ' && currentQuestion.options ? (
          <RadioGroup
            value={userAnswers[currentQuestionIndex]}
            onValueChange={handleAnswerChange}
            className="space-y-3"
          >
            {currentQuestion.options.map((option, idx) => (
              <div
                key={idx}
                className="flex items-center space-x-3 rounded-lg border p-4 hover:bg-gray-50 transition-colors"
              >
                <RadioGroupItem
                  value={option}
                  id={`option-${idx}`}
                  disabled={submitted[currentQuestionIndex]}
                />
                <Label
                  htmlFor={`option-${idx}`}
                  className="flex-1 cursor-pointer text-base"
                >
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        ) : (
          <div className="space-y-3">
            <Label htmlFor="answer-text" className="text-base font-semibold">
              Your Answer:
            </Label>
            <textarea
              id="answer-text"
              value={userAnswers[currentQuestionIndex]}
              onChange={(e) => handleAnswerChange(e.target.value)}
              disabled={submitted[currentQuestionIndex]}
              className="w-full min-h-[150px] p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              placeholder={quizType === 'SAQ' ? 'Write a brief 2-3 sentence answer...' : 'Write a detailed paragraph answer...'}
              aria-label="Answer input"
            />
          </div>
        )}

        {submitted[currentQuestionIndex] && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg" role="region" aria-label="Answer explanation">
            <p className="text-sm font-semibold text-blue-900 mb-2">
              {quizType === 'MCQ' ? 'Correct Answer:' : 'Model Answer:'}
            </p>
            <p className="text-sm text-blue-800 mb-3">{currentQuestion.correctAnswer}</p>
            <p className="text-sm font-semibold text-blue-900 mb-1">Explanation:</p>
            <p className="text-sm text-blue-800">{currentQuestion.explanation}</p>
          </div>
        )}

        <div className="flex gap-3">
          {!submitted[currentQuestionIndex] ? (
            <Button
              onClick={handleSubmitAnswer}
              disabled={!userAnswers[currentQuestionIndex]}
              className="flex-1"
              size="lg"
            >
              Submit Answer
            </Button>
          ) : (
            <Button onClick={handleNextQuestion} className="flex-1" size="lg">
              {isLastQuestion ? 'View Results' : 'Next Question'}
              <ChevronRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
