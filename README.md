# Student Revision App

A comprehensive web application built for the BeyondChats assignment that helps students revise their study materials through AI-powered quiz generation and interactive learning features.

## 🚀 Live Demo

[Live URL will be added after deployment]

## ✨ Features

### Core Features (Assignment Requirements)
- **📄 PDF Upload & Viewer**: Drag-and-drop PDF upload with a fully functional viewer featuring zoom controls and page navigation
- **🤖 AI Quiz Generation**: Generate three types of quizzes using Google Gemini AI:
  - **MCQ (Multiple Choice Questions)**: 4 options with one correct answer
  - **SAQ (Short Answer Questions)**: Brief 2-3 sentence responses
  - **LAQ (Long Answer Questions)**: Detailed paragraph responses
- **✅ Quiz Scoring**: Automatic scoring for MCQs with detailed explanations for all question types
- **📊 Progress Tracking Dashboard**: Comprehensive analytics showing:
  - Total quiz attempts
  - Average scores
  - Correct/total questions ratio
  - Performance breakdown by quiz type
  - Detailed quiz history with timestamps

### Additional Features
- **💬 AI Study Chat**: Interactive chat interface for asking questions about uploaded PDFs or general study topics
- **🎨 Dark Theme**: Modern dark UI with OKLCH color space for better visual comfort
- **📱 Responsive Design**: Fully mobile-responsive across all pages and components
- **♿ WCAG Compliance**: Accessibility features including ARIA labels, keyboard navigation, and proper focus indicators
- **⚡ Error Handling**: Comprehensive error boundaries and skeleton loaders for better UX
- **💾 Local Storage**: Client-side persistence for quiz history and progress

## 🛠️ Tech Stack

- **Framework**: Next.js 15.5.4 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 with custom OKLCH color system
- **UI Components**: shadcn/ui (Radix UI primitives)
- **AI**: Google Gemini 2.0 Flash Experimental (Free Tier)
- **PDF Handling**: react-pdf, pdfjs-dist
- **State Management**: React Hooks + localStorage
- **Deployment**: Vercel

## 📋 Setup Instructions

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

## 🎯 How to Use

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

## 🏗️ How It Was Built

### Development Journey

This project was built following a **real-world development workflow** with feature-by-feature commits:

1. **Project Scaffolding** - Set up Next.js with TypeScript and Tailwind CSS
2. **Core Components** - Built layout, header, and navigation
3. **PDF Integration** - Implemented upload and viewer functionality
4. **AI Integration** - Connected Google Gemini API for quiz generation
5. **Quiz System** - Developed quiz generator, display, and scoring logic
6. **Progress Tracking** - Added localStorage and dashboard analytics
7. **Chat Feature** - Built interactive AI chat interface
8. **Theming** - Applied dark theme with OKLCH colors and gradients
9. **Error Handling** - Added error boundaries and skeleton loaders
10. **Accessibility** - Ensured WCAG 2.1 AA compliance
11. **Mobile Optimization** - Fixed responsive issues across all pages

### Key Technical Decisions

**Next.js App Router**: Chosen for modern React patterns, built-in optimizations, and better developer experience.

**Google Gemini AI**: Selected for its generous free tier, fast response times, and good performance on educational content.

**shadcn/ui**: Used for accessible, customizable components built on Radix UI primitives, ensuring WCAG compliance out of the box.

**OKLCH Color Space**: Implemented for perceptually uniform colors and better dark mode aesthetics.

**Client-Side Storage**: Used localStorage instead of a database to keep the project simple and deployable without backend infrastructure.

**Dynamic Imports**: Employed for PDF viewer to avoid SSR issues with browser-only APIs.

## ✅ What's Implemented

- ✅ PDF upload with drag-and-drop
- ✅ PDF viewer with zoom and pagination
- ✅ AI quiz generation (MCQ, SAQ, LAQ)
- ✅ Quiz scoring with explanations
- ✅ Progress tracking dashboard
- ✅ Quiz history with timestamps
- ✅ AI chat interface
- ✅ Dark theme with modern UI
- ✅ Full mobile responsiveness
- ✅ WCAG accessibility compliance
- ✅ Error boundaries
- ✅ Loading states with skeletons
- ✅ Conventional commit messages
- ✅ Clean, maintainable code

## ⚠️ Known Limitations

- **No Backend Database**: Quiz history is stored in localStorage, so data is device-specific
- **SAQ/LAQ Scoring**: Only MCQs have automatic scoring; SAQ/LAQ show model answers for self-evaluation
- **PDF Size**: Very large PDFs (100+ pages) may cause slower processing times
- **API Rate Limits**: Google Gemini free tier has rate limits that may affect heavy usage

## 🤖 LLM Usage

This project was built **with significant assistance from Claude (Anthropic's AI assistant)**. Here's how LLMs were used:

### Code Generation
- Claude generated approximately **80-90% of the initial code** for components, API routes, and utilities
- All React components were scaffolded with AI assistance
- Gemini AI integration code was written with Claude's help

### Problem Solving
- **SSR Issues**: Claude helped resolve `DOMMatrix is not defined` error by suggesting dynamic imports
- **JSON Parsing**: Fixed Gemini API response parsing issues with improved regex patterns
- **Theme Implementation**: Designed and implemented the dark theme color system
- **Mobile Responsiveness**: Fixed overflow and layout issues on mobile devices

### Code Quality
- TypeScript types and interfaces were refined with AI assistance
- Accessibility features (ARIA labels, semantic HTML) were added based on AI recommendations
- Code organization and file structure were improved through AI suggestions

### Documentation
- This README was drafted with Claude's help
- Git commit messages follow conventional commits pattern suggested by AI
- Code comments and documentation were enhanced with AI assistance

### Human Contributions
- **Project Architecture**: Final decisions on tech stack and architecture
- **UI/UX Design**: Design choices, color schemes, and user flows
- **Testing**: Manual testing and bug fixes
- **Git Workflow**: Commit strategy and version control
- **Deployment**: Deployment configuration and environment setup

## 📁 Project Structure

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

## 🚀 Deployment

This app is designed to be deployed on Vercel:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables in Vercel dashboard
# GEMINI_API_KEY=your_key_here
```

## 📝 Git Commit History

All development was tracked with descriptive conventional commits:
- `feat:` - New features
- `fix:` - Bug fixes
- `chore:` - Maintenance tasks
- `docs:` - Documentation updates

View the commit history to see the complete development journey.

## 📄 License

This project was created for the BeyondChats assignment.

## 🙏 Acknowledgments

- **BeyondChats** for the assignment opportunity
- **Google Gemini** for providing free AI API access
- **shadcn/ui** for the excellent component library
- **Vercel** for Next.js and hosting platform
- **Claude AI** for development assistance

---

**Built with ❤️ for BeyondChats Assignment**
