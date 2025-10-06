# Student Revision App

An AI-powered study companion that helps students learn from PDF documents through intelligent quiz generation, progress tracking, and interactive learning tools.

## 🌟 Features

### Must-Have Features (Implemented)
- ✅ **Source Selector**: Upload PDFs or work with pre-seeded educational materials
- ✅ **PDF Viewer**: View PDFs alongside the quiz interface with zoom and navigation
- ✅ **Quiz Generator**: Create MCQs, SAQs, and LAQs from PDF content using AI
- ✅ **Quiz Scoring**: Automatic scoring with detailed explanations
- ✅ **Progress Tracking**: Track quiz attempts, scores, and learning trends
- ✅ **Dashboard**: Analytics dashboard showing performance metrics

### Technical Highlights
- 🎨 **WCAG Compliant**: Full accessibility support with proper ARIA labels, keyboard navigation, and screen reader compatibility
- 📱 **Fully Responsive**: Mobile-first design that works seamlessly on all devices
- 🚀 **Modern Stack**: Next.js 15, TypeScript, Tailwind CSS, shadcn/ui
- 🤖 **AI-Powered**: Google Gemini 2.0 Flash for intelligent quiz generation
- 💾 **Local Storage**: Client-side progress tracking with no server required

## 🛠️ Tech Stack

- **Framework**: Next.js 15.5.4 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui (Radix UI primitives)
- **AI Model**: Google Gemini 2.0 Flash Experimental
- **PDF Handling**: react-pdf, pdfjs-dist
- **Icons**: lucide-react
- **State Management**: React hooks + localStorage

## 📦 Installation

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
   ```bash
   cp .env.example .env.local
   ```

   Get your free Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey) and add it to `.env.local`:
   ```
   GOOGLE_GEMINI_API_KEY=your_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Usage Guide

### 1. Upload a PDF
- Click "Choose File" or drag-and-drop a PDF document
- The PDF viewer will display your document

### 2. Generate a Quiz
- Select quiz type (MCQ, SAQ, or LAQ)
- Choose number of questions (3-10)
- Click "Generate Quiz" and wait for AI to create questions

### 3. Take the Quiz
- Answer each question
- Submit to see correct answer and explanation
- Navigate through all questions

### 4. View Results
- See your score and performance breakdown
- Review explanations for each question
- Generate a new quiz or try again

### 5. Track Progress
- Visit the Dashboard to see:
  - Total quiz attempts
  - Average score
  - Quiz history
  - Performance by quiz type

## 🎨 Design Decisions

### Why Google Gemini?
- **Free tier**: 1500 requests/day with generous token limits
- **Latest model**: Gemini 2.0 Flash Experimental for fast, accurate responses
- **No credit card**: Get started immediately without payment info
- **Great for structured output**: Excellent at generating JSON-formatted quiz questions

### Why Next.js App Router?
- **Server Actions**: Simplified API routes for AI calls
- **Built-in optimization**: Image, font, and bundle optimization out of the box
- **TypeScript first**: Better developer experience and type safety

### Why shadcn/ui?
- **Accessibility**: Built on Radix UI primitives (WCAG 2.1 compliant)
- **Customizable**: Copy-paste components you own
- **No runtime overhead**: Just TypeScript and Tailwind

### Why localStorage?
- **MVP approach**: Fast development without backend complexity
- **Privacy**: Data stays on user's device
- **Offline support**: Works without internet after initial load

## ♿ Accessibility Features

- ✅ Semantic HTML with proper heading hierarchy
- ✅ ARIA labels and roles on interactive elements
- ✅ Keyboard navigation support (Tab, Enter, Arrow keys)
- ✅ Screen reader announcements for dynamic content
- ✅ Focus indicators on all interactive elements
- ✅ Sufficient color contrast ratios (WCAG AA)
- ✅ Responsive font sizes (rem/em units)
- ✅ Skip links and landmark regions

## 📱 Responsive Breakpoints

- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (md/lg)
- **Desktop**: > 1024px (xl)

All components are mobile-first and tested across devices.

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

Add your `GOOGLE_GEMINI_API_KEY` to Vercel environment variables.

### Other Platforms
Build command: `npm run build`
Output directory: `.next`
Node version: 20+

## 📁 Project Structure

```
student-revision-app/
├── app/
│   ├── api/
│   │   └── generate-quiz/route.ts   # AI quiz generation endpoint
│   ├── dashboard/page.tsx            # Progress dashboard
│   ├── layout.tsx                    # Root layout with header
│   ├── page.tsx                      # Home page
│   └── globals.css                   # Global styles
├── components/
│   ├── ui/                           # shadcn/ui components
│   ├── Header.tsx                    # Navigation header
│   ├── PDFViewer.tsx                 # PDF display component
│   ├── QuizDisplay.tsx               # Quiz interface with scoring
│   ├── QuizGenerator.tsx             # Quiz creation form
│   └── SourceSelector.tsx            # PDF upload component
├── lib/
│   ├── gemini.ts                     # Gemini AI client
│   ├── pdf-utils.ts                  # PDF text extraction
│   ├── storage.ts                    # localStorage utilities
│   └── utils.ts                      # Helper functions
└── public/                           # Static assets
```

## 🔧 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🎓 Quiz Types Explained

### MCQ (Multiple Choice Questions)
- 4 options (A, B, C, D)
- Single correct answer
- Instant automated scoring

### SAQ (Short Answer Questions)
- 2-3 sentence responses required
- Model answer provided
- Self-evaluation with criteria

### LAQ (Long Answer Questions)
- Detailed paragraph answers
- Comprehensive model answer
- Key points for self-assessment

## 🐛 Known Limitations

- **AI Accuracy**: Quiz quality depends on PDF content and Gemini's interpretation
- **PDF Support**: Works best with text-based PDFs (not scanned images)
- **Browser Storage**: Quiz history limited by localStorage quota (~5-10MB)
- **Rate Limits**: Gemini free tier has daily limits (1500 requests/day)

## 🔮 Future Enhancements

- [ ] RAG with citations (quote sources from PDFs)
- [ ] YouTube video recommendations
- [ ] Multi-PDF support
- [ ] Flashcard generation
- [ ] Spaced repetition scheduling
- [ ] Export quiz history (CSV/PDF)
- [ ] Social sharing of results
- [ ] Dark mode

## 📄 License

This project was created as an assignment for BeyondChats. All code is owned by the author unless otherwise specified.

## 🙏 Acknowledgments

- **Google Gemini**: For free AI API access
- **shadcn**: For beautiful, accessible UI components
- **Vercel**: For Next.js and deployment platform
- **BeyondChats**: For the assignment opportunity

---

**Built with ❤️ using Claude Code and modern web technologies**

🤖 Generated with AI assistance for rapid development
