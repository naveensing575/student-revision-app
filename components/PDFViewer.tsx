'use client'

import { useState, useEffect } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react'

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`

interface PDFViewerProps {
  file: File
}

export default function PDFViewer({ file }: PDFViewerProps) {
  const [numPages, setNumPages] = useState<number>(0)
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [scale, setScale] = useState<number>(1.0)
  const [fileUrl, setFileUrl] = useState<string>('')

  useEffect(() => {
    // Create object URL for the PDF file
    const url = URL.createObjectURL(file)
    setFileUrl(url)

    // Cleanup
    return () => {
      URL.revokeObjectURL(url)
    }
  }, [file])

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages)
    setPageNumber(1)
  }

  const goToPrevPage = () => {
    setPageNumber((prev) => Math.max(prev - 1, 1))
  }

  const goToNextPage = () => {
    setPageNumber((prev) => Math.min(prev + 1, numPages))
  }

  const zoomIn = () => {
    setScale((prev) => Math.min(prev + 0.2, 2.0))
  }

  const zoomOut = () => {
    setScale((prev) => Math.max(prev - 0.2, 0.6))
  }

  return (
    <div className="flex flex-col h-full bg-card/50 rounded-lg overflow-hidden border border-border">
      {/* Controls */}
      <div className="bg-card border-b border-border px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={goToPrevPage}
            disabled={pageNumber <= 1}
            className="p-2 rounded hover:bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed text-foreground"
            title="Previous page"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <span className="text-sm font-medium text-foreground">
            Page {pageNumber} of {numPages}
          </span>

          <button
            onClick={goToNextPage}
            disabled={pageNumber >= numPages}
            className="p-2 rounded hover:bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed text-foreground"
            title="Next page"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={zoomOut}
            disabled={scale <= 0.6}
            className="p-2 rounded hover:bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed text-foreground"
            title="Zoom out"
          >
            <ZoomOut className="h-5 w-5" />
          </button>

          <span className="text-sm font-medium text-foreground w-16 text-center">
            {Math.round(scale * 100)}%
          </span>

          <button
            onClick={zoomIn}
            disabled={scale >= 2.0}
            className="p-2 rounded hover:bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed text-foreground"
            title="Zoom in"
          >
            <ZoomIn className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* PDF Display */}
      <div className="flex-1 overflow-auto p-4 flex justify-center">
        {fileUrl && (
          <Document
            file={fileUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            className="shadow-lg"
          >
            <Page pageNumber={pageNumber} scale={scale} />
          </Document>
        )}
      </div>
    </div>
  )
}
