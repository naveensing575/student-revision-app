'use client'

import { useState } from 'react'
import SourceSelector from '@/components/SourceSelector'
import PDFViewer from '@/components/PDFViewer'

export default function HomePage() {
  const [selectedPDF, setSelectedPDF] = useState<File | null>(null)

  const handlePDFSelect = (file: File) => {
    setSelectedPDF(file)
    console.log('PDF selected:', file.name)
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

            {/* Actions Panel */}
            <div className="bg-white rounded-lg shadow p-6 border">
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Current Document
                </h3>
                <p className="text-sm text-gray-600">{selectedPDF.name}</p>
                <button
                  onClick={() => setSelectedPDF(null)}
                  className="mt-3 text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  ← Change document
                </button>
              </div>

              <div className="border-t pt-6">
                <p className="text-gray-500 text-center py-8">
                  Quiz generator coming next...
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
