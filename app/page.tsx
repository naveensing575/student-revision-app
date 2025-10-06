'use client'

import { useState } from 'react'
import SourceSelector from '@/components/SourceSelector'

export default function HomePage() {
  const [selectedPDF, setSelectedPDF] = useState<File | null>(null)

  const handlePDFSelect = (file: File) => {
    setSelectedPDF(file)
    console.log('PDF selected:', file.name)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Welcome to Your Study Companion
        </h2>
        <p className="text-gray-600 mb-8">
          Upload PDFs, generate quizzes, and track your learning progress with AI-powered tools.
        </p>

        <div className="bg-white rounded-lg shadow p-6 border">
          <SourceSelector onPDFSelect={handlePDFSelect} />
        </div>

        {selectedPDF && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800">
              ✓ Ready to work with: <span className="font-semibold">{selectedPDF.name}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
