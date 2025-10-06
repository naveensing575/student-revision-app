'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { MessageCircle, Send, Loader2, Sparkles, User, Upload, X } from 'lucide-react'
import Link from 'next/link'
import { extractTextFromPDF } from '@/lib/pdf-utils'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: number
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [pdfContext, setPdfContext] = useState<string | null>(null)
  const [pdfName, setPdfName] = useState<string | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handlePDFUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || file.type !== 'application/pdf') return

    try {
      const text = await extractTextFromPDF(file)
      setPdfContext(text)
      setPdfName(file.name)

      const welcomeMsg: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: `Great! I've loaded "${file.name}". I can now answer questions about this document. What would you like to know?`,
        timestamp: Date.now(),
      }
      setMessages([welcomeMsg])
    } catch (error) {
      console.error('PDF upload error:', error)
    }
  }

  const removePDF = () => {
    setPdfContext(null)
    setPdfName(null)
    setMessages([])
  }

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: input,
      timestamp: Date.now(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          pdfContext,
        }),
      })

      if (!response.ok) throw new Error('Failed to get response')

      const data = await response.json()

      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: data.message,
        timestamp: Date.now(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error('Chat error:', error)
      const errorMessage: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: Date.now(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="min-h-screen gradient-bg">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
                <MessageCircle className="h-8 w-8 text-primary" aria-hidden="true" />
                AI Study Chat
              </h1>
              <p className="text-muted-foreground mt-2">
                Ask questions about your study materials
              </p>
            </div>
            <Link href="/">
              <Button variant="secondary">Back to Home</Button>
            </Link>
          </div>

          <Card className="shadow-2xl border-white/20">
            <CardHeader className="gradient-card border-b">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" aria-hidden="true" />
                    Chat Assistant
                  </CardTitle>
                  <CardDescription>
                    {pdfName ? `Chatting about: ${pdfName}` : 'Upload a PDF or start chatting'}
                  </CardDescription>
                </div>

                {!pdfName ? (
                  <label>
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={handlePDFUpload}
                      className="hidden"
                    />
                    <Button variant="outline" size="sm" asChild>
                      <span className="cursor-pointer">
                        <Upload className="mr-2 h-4 w-4" aria-hidden="true" />
                        Upload PDF
                      </span>
                    </Button>
                  </label>
                ) : (
                  <Button variant="ghost" size="sm" onClick={removePDF}>
                    <X className="mr-2 h-4 w-4" aria-hidden="true" />
                    Remove PDF
                  </Button>
                )}
              </div>
            </CardHeader>

            <CardContent className="p-0">
              <ScrollArea className="h-[500px] p-4" ref={scrollRef}>
                {messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <MessageCircle className="h-16 w-16 text-muted-foreground mb-4" aria-hidden="true" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Start a conversation
                    </h3>
                    <p className="text-sm text-muted-foreground max-w-sm">
                      Upload a PDF to ask questions about it, or just start chatting about any study topic!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex gap-3 ${
                          message.role === 'user' ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        {message.role === 'assistant' && (
                          <Avatar className="h-8 w-8 bg-primary">
                            <AvatarFallback className="bg-primary text-primary-foreground">
                              <Sparkles className="h-4 w-4" />
                            </AvatarFallback>
                          </Avatar>
                        )}

                        <div
                          className={`max-w-[80%] rounded-lg px-4 py-2 ${
                            message.role === 'user'
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted'
                          }`}
                        >
                          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {new Date(message.timestamp).toLocaleTimeString()}
                          </p>
                        </div>

                        {message.role === 'user' && (
                          <Avatar className="h-8 w-8 bg-secondary">
                            <AvatarFallback className="bg-secondary text-secondary-foreground">
                              <User className="h-4 w-4" />
                            </AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    ))}

                    {isLoading && (
                      <div className="flex gap-3 justify-start">
                        <Avatar className="h-8 w-8 bg-primary">
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            <Sparkles className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                        <div className="bg-muted rounded-lg px-4 py-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </ScrollArea>

              <Separator />

              <div className="p-4">
                <div className="flex gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask a question..."
                    disabled={isLoading}
                    className="flex-1"
                    aria-label="Chat message input"
                  />
                  <Button
                    onClick={handleSend}
                    disabled={!input.trim() || isLoading}
                    size="icon"
                    aria-label="Send message"
                  >
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                    ) : (
                      <Send className="h-4 w-4" aria-hidden="true" />
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
