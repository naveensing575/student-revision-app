'use client'

import { useState } from 'react'
import { Upload, FileText, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface SourceSelectorProps {
  onPDFSelect: (file: File) => void
}

export default function SourceSelector({ onPDFSelect }: SourceSelectorProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file)
      onPDFSelect(file)
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)

    const file = e.dataTransfer.files[0]
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file)
      onPDFSelect(file)
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const clearFile = () => {
    setSelectedFile(null)
  }

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold text-foreground mb-4">Select Study Material</h3>

      {!selectedFile ? (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
            isDragging
              ? 'border-primary bg-primary/10 glow-border'
              : 'border-border hover:border-primary/50 hover:bg-primary/5'
          }`}
        >
          <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-foreground font-medium mb-2">
            Drop your PDF here or click to browse
          </p>
          <p className="text-sm text-muted-foreground mb-4">
            Supports: PDF files only
          </p>

          <label className="inline-block">
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="hidden"
            />
            <Button type="button" asChild>
              <span className="cursor-pointer">
                Choose File
              </span>
            </Button>
          </label>
        </div>
      ) : (
        <div className="border border-border rounded-xl p-4 bg-card">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="h-8 w-8 text-primary" />
              <div>
                <p className="font-medium text-foreground">{selectedFile.name}</p>
                <p className="text-sm text-muted-foreground">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <button
              onClick={clearFile}
              className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full transition-colors"
              title="Remove file"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
