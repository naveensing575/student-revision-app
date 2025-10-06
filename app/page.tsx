export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Welcome to Your Study Companion
        </h2>
        <p className="text-gray-600 mb-8">
          Upload PDFs, generate quizzes, and track your learning progress with AI-powered tools.
        </p>

        {/* Source Selector will go here */}
        <div className="bg-white rounded-lg shadow p-6 border">
          <p className="text-gray-500 text-center py-8">
            Source selector coming next...
          </p>
        </div>
      </div>
    </div>
  )
}
