# Student Revision App

An AI-powered web application that helps students study effectively by generating quizzes from PDF materials and tracking their progress.

## Features

### Implemented Features
- **PDF Upload & Viewer** - Drag-and-drop upload with zoom and page navigation
- **AI Quiz Generation** - Generate MCQ, SAQ, or LAQ questions from PDF content using Google Gemini
- **Quiz Scoring** - Automatic scoring with detailed explanations
- **Progress Dashboard** - Track quiz attempts, scores, and performance analytics
- **AI Chat Assistant** - Ask questions about uploaded PDFs or study topics
- **YouTube Video Recommendations** - AI-powered educational video recommendations based on PDF content
- **Dark Theme** - Modern UI with OKLCH color space
- **Fully Responsive** - Mobile-first design with WCAG accessibility compliance

### Features Not Yet Implemented
- **Spaced Repetition System** - Scheduling quizzes based on learning curve
- **Multi-user Support** - User authentication and cloud data sync
- **Export Functionality** - Export quiz results as PDF or CSV
- **Collaborative Features** - Share quizzes with other students

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
   GOOGLE_GEMINI_API_KEY=your_gemini_api_key_here
   ```

   Get your free API key from [Google AI Studio](https://ai.google.dev/)

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

### Getting Video Recommendations
1. After uploading a PDF on the home page
2. Scroll down to the "YouTube Video Recommendations" section
3. Click "Get Video Recommendations"
4. Browse AI-recommended educational videos
5. Click any video card to search for it on YouTube

## How the Project Was Built

### Development Process
1. **Initial Setup** - Created Next.js 15 project with TypeScript and Tailwind CSS v4
2. **UI Foundation** - Integrated shadcn/ui components for consistent design system
3. **PDF Processing** - Implemented react-pdf for client-side PDF rendering and text extraction
4. **AI Integration** - Connected Google Gemini 2.0 Flash for quiz generation and chat
5. **State Management** - Built localStorage-based persistence for quiz history
6. **YouTube Feature** - Added AI-powered video recommendations using Gemini analysis
7. **Testing & Refinement** - Fixed TypeScript errors, optimized performance, ensured accessibility

### Architecture Decisions

**Approach**: Next.js App Router with client-side state management via localStorage and Google Gemini AI integration.

**Why this approach**:
- App Router provides optimal performance with server/client component separation
- localStorage enables offline quiz history without backend complexity
- Gemini offers free tier API access with strong reasoning capabilities
- Dynamic imports prevent SSR issues with browser-only libraries (pdfjs-dist)

**Tradeoffs**:
- localStorage limits cross-device sync (vs database)
- Client-side PDF processing increases bundle size (vs server-side)
- Free tier AI has rate limits (vs paid solutions)
- No real YouTube API integration (generates search links instead)

**My Decision**: Prioritized rapid development and zero hosting costs while maintaining rich features. The tradeoffs are acceptable for a student-focused learning tool where most users work on a single device.

## LLM Tool Usage

### Tools Used: Claude Code (Anthropic)

**Purposes:**
1. **Code Generation** - Generated components, API routes, and utility functions
2. **TypeScript Error Fixing** - Resolved type errors and ESLint warnings
3. **Architecture Decisions** - Provided guidance on Next.js best practices and App Router patterns
4. **Bug Fixing** - Fixed SSR issues with PDF libraries, resolved build errors
5. **Feature Implementation** - Built YouTube recommendations, quiz generator, chat interface
6. **Code Refactoring** - Improved error handling, removed unused code, optimized imports

**Impact:**
- **Productivity**: ~70% faster development compared to manual coding
- **Quality**: Caught TypeScript errors early, enforced best practices
- **Learning**: Gained insights into Next.js 15 features and modern React patterns

**Human Oversight:**
- Reviewed all AI-generated code for correctness
- Made architectural decisions (localStorage vs database, Gemini vs OpenAI)
- Customized UI/UX based on user experience considerations
- Tested features manually to ensure quality

## Project Structure

```
student-revision-app/
├── app/
│   ├── api/
│   │   ├── generate-quiz/route.ts       # Quiz generation API
│   │   ├── chat/route.ts                # Chat API
│   │   └── youtube-recommendations/     # YouTube video recommendations API
│   ├── chat/page.tsx                    # Chat interface
│   ├── dashboard/page.tsx               # Progress dashboard
│   ├── layout.tsx                       # Root layout with header
│   ├── page.tsx                         # Home page (main app)
│   └── globals.css                      # Global styles & OKLCH theme
├── components/
│   ├── ui/                              # shadcn/ui components
│   ├── ErrorBoundary.tsx                # Error handling wrapper
│   ├── Header.tsx                       # Navigation header
│   ├── PDFViewer.tsx                    # PDF display with zoom
│   ├── QuizDisplay.tsx                  # Quiz taking interface
│   ├── QuizGenerator.tsx                # Quiz creation form
│   ├── YouTubeRecommender.tsx           # Video recommendations
│   ├── SkeletonLoaders.tsx              # Loading states
│   └── SourceSelector.tsx               # File upload UI
├── lib/
│   ├── gemini.ts                        # Gemini AI integration
│   ├── pdf-utils.ts                     # PDF text extraction
│   ├── storage.ts                       # localStorage utils
│   └── youtube.ts                       # YouTube helper (not used)
└── public/                              # Static assets
```

## Building for Production

```bash
npm run build
```

This will:
- Compile TypeScript
- Run ESLint checks
- Generate optimized production build
- Output to `.next` directory

## Deployment

Deploy to Vercel with one click or use the Vercel CLI:

```bash
npm install -g vercel
vercel
```

Make sure to add your `GOOGLE_GEMINI_API_KEY` environment variable in the Vercel dashboard.

## Known Issues

1. **YouTube Thumbnails** - Using gradient placeholders instead of actual video thumbnails (to avoid YouTube Data API quota limits)
2. **PDF Processing Speed** - Large PDFs (>50 pages) may take longer to process
3. **Mobile PDF Viewer** - Pinch-to-zoom may conflict with page scrolling on some devices
4. **localStorage Limits** - Quiz history limited by browser storage (~5-10MB)

## License

MIT
