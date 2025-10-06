'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { getQuizAttempts, getStats, clearAllAttempts } from '@/lib/storage'
import type { QuizAttempt } from '@/lib/storage'
import { BarChart3, Award, Target, TrendingUp, Trash2, Home } from 'lucide-react'

export default function DashboardPage() {
  const [attempts, setAttempts] = useState<QuizAttempt[]>([])
  const [stats, setStats] = useState({
    totalAttempts: 0,
    averageScore: 0,
    totalCorrect: 0,
    totalQuestions: 0,
    byType: { MCQ: 0, SAQ: 0, LAQ: 0 },
  })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = () => {
    setAttempts(getQuizAttempts().sort((a, b) => b.timestamp - a.timestamp))
    setStats(getStats())
  }

  const handleClearAll = () => {
    if (confirm('Are you sure you want to clear all quiz history?')) {
      clearAllAttempts()
      loadData()
    }
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <BarChart3 className="h-8 w-8 text-blue-600" aria-hidden="true" />
              Progress Dashboard
            </h1>
            <p className="text-gray-600 mt-2">
              Track your learning progress and quiz performance
            </p>
          </div>
          <Link href="/">
            <Button variant="outline">
              <Home className="mr-2 h-4 w-4" aria-hidden="true" />
              Back to Home
            </Button>
          </Link>
        </div>

        {stats.totalAttempts === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <BarChart3 className="h-16 w-16 text-gray-300 mx-auto mb-4" aria-hidden="true" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No quiz data yet</h3>
              <p className="text-gray-500 mb-6">
                Start taking quizzes to see your progress here!
              </p>
              <Link href="/">
                <Button>Take Your First Quiz</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Total Attempts</CardDescription>
                  <CardTitle className="text-3xl flex items-center gap-2">
                    <Target className="h-6 w-6 text-blue-600" aria-hidden="true" />
                    {stats.totalAttempts}
                  </CardTitle>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Average Score</CardDescription>
                  <CardTitle className="text-3xl flex items-center gap-2">
                    <Award className="h-6 w-6 text-green-600" aria-hidden="true" />
                    {stats.averageScore}%
                  </CardTitle>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Total Correct</CardDescription>
                  <CardTitle className="text-3xl flex items-center gap-2">
                    <TrendingUp className="h-6 w-6 text-purple-600" aria-hidden="true" />
                    {stats.totalCorrect}/{stats.totalQuestions}
                  </CardTitle>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Quiz Types</CardDescription>
                  <div className="flex gap-2 mt-2">
                    {stats.byType.MCQ > 0 && (
                      <Badge variant="secondary" className="text-xs">
                        MCQ: {stats.byType.MCQ}
                      </Badge>
                    )}
                    {stats.byType.SAQ > 0 && (
                      <Badge variant="secondary" className="text-xs">
                        SAQ: {stats.byType.SAQ}
                      </Badge>
                    )}
                    {stats.byType.LAQ > 0 && (
                      <Badge variant="secondary" className="text-xs">
                        LAQ: {stats.byType.LAQ}
                      </Badge>
                    )}
                  </div>
                </CardHeader>
              </Card>
            </div>

            {/* Recent Attempts */}
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <CardTitle>Quiz History</CardTitle>
                    <CardDescription>Your recent quiz attempts</CardDescription>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={handleClearAll}
                    aria-label="Clear all quiz history"
                    className="w-full sm:w-auto"
                  >
                    <Trash2 className="mr-2 h-4 w-4" aria-hidden="true" />
                    Clear All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {attempts.map((attempt) => (
                    <div
                      key={attempt.id}
                      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 rounded-lg border bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <p className="font-medium text-gray-900 truncate">{attempt.pdfName}</p>
                          <Badge variant="outline">{attempt.quizType}</Badge>
                        </div>
                        <p className="text-sm text-gray-600">
                          {attempt.correctAnswers} / {attempt.totalQuestions} correct
                          {' • '}
                          <span className="hidden sm:inline">{formatDate(attempt.timestamp)}</span>
                          <span className="sm:hidden">{new Date(attempt.timestamp).toLocaleDateString()}</span>
                        </p>
                      </div>
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="flex-1 sm:flex-initial sm:w-32">
                          <Progress value={attempt.score} className="h-2" aria-label={`Score: ${attempt.score}%`} />
                        </div>
                        <div
                          className={`text-xl sm:text-2xl font-bold w-12 sm:w-16 text-right flex-shrink-0 ${
                            attempt.score >= 80
                              ? 'text-green-600'
                              : attempt.score >= 60
                              ? 'text-yellow-600'
                              : 'text-red-600'
                          }`}
                        >
                          {attempt.score}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  )
}
