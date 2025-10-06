# Student Revision App

An AI-powered web application that helps students study effectively by generating quizzes from PDF materials and tracking their progress.

## Features

- **PDF Upload & Viewer** - Drag-and-drop upload with zoom and page navigation
- **AI Quiz Generation** - Generate MCQ, SAQ, or LAQ questions from PDF content using Google Gemini
- **Quiz Scoring** - Automatic scoring with detailed explanations
- **Progress Dashboard** - Track quiz attempts, scores, and performance analytics
- **AI Chat Assistant** - Ask questions about uploaded PDFs or study topics
- **Dark Theme** - Modern UI with OKLCH color space
- **Fully Responsive** - Mobile-first design with WCAG accessibility compliance

## Tech Stack

- **Framework**: Next.js 15.5.4 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 with custom OKLCH color system
- **UI Components**: shadcn/ui (Radix UI primitives)
- **AI**: Google Gemini 2.0 Flash Experimental (Free Tier)
- **PDF Handling**: react-pdf, pdfjs-dist
- **State Management**: React Hooks + localStorage
- **Deployment**: Vercel

## Setup Instructions

### Prerequisites
- Node.js 18+ and npm installed
- Google Gemini API key ([Get it here](https://ai.google.dev/))

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd student-revision-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## How to Use

### Creating a Quiz
1. Upload a PDF document by dragging and dropping or clicking the upload area
2. View your PDF using the built-in viewer with zoom and navigation controls
3. Select quiz type (MCQ, SAQ, or LAQ)
4. Choose the number of questions (3-10)
5. Click "Generate Quiz" and wait for AI to create personalized questions
6. Answer questions and submit to see explanations
7. View your final score and detailed feedback

### Using the Chat Feature
1. Navigate to the Chat page from the header
2. Optionally upload a PDF for context-aware answers
3. Ask questions about your study material or any topic
4. Receive AI-powered responses in real-time

### Tracking Progress
1. Visit the Dashboard from the header navigation
2. View your overall statistics and performance metrics
3. Browse through your quiz history
4. Clear history if needed

## Architecture

**Approach**: Next.js App Router with client-side state management via localStorage and Google Gemini AI integration.

**Why this approach**:
- App Router provides optimal performance with server/client component separation
- localStorage enables offline quiz history without backend complexity
- Gemini offers free tier API access with strong reasoning capabilities

**Tradeoffs**:
- localStorage limits cross-device sync (vs database)
- Client-side PDF processing increases bundle size (vs server-side)
- Free tier AI has rate limits (vs paid solutions)

**My Decision**: Prioritized rapid development and zero hosting costs while maintaining rich features. The tradeoffs are acceptable for a student-focused learning tool where most users work on a single device.

## Project Structure

```
student-revision-app/
├── app/
│   ├── api/
│   │   ├── generate-quiz/route.ts  # Quiz generation API
│   │   └── chat/route.ts            # Chat API
│   ├── chat/page.tsx                # Chat interface
│   ├── dashboard/page.tsx           # Progress dashboard
│   ├── layout.tsx                   # Root layout
│   ├── page.tsx                     # Home page
│   └── globals.css                  # Global styles & theme
├── components/
│   ├── ui/                          # shadcn components
│   ├── ErrorBoundary.tsx            # Error handling
│   ├── Header.tsx                   # Navigation
│   ├── PDFViewer.tsx                # PDF display
│   ├── QuizDisplay.tsx              # Quiz interface
│   ├── QuizGenerator.tsx            # Quiz creation
│   ├── SkeletonLoaders.tsx          # Loading states
│   └── SourceSelector.tsx           # File upload
├── lib/
│   ├── gemini.ts                    # Gemini AI integration
│   ├── pdf-utils.ts                 # PDF processing
│   └── storage.ts                   # localStorage utils
└── public/                          # Static assets
```

## Deployment

Deploy to Vercel with one click or use the Vercel CLI. Make sure to add your `GEMINI_API_KEY` environment variable in the Vercel dashboard.

## License

MIT
