import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

export function QuizGeneratorSkeleton() {
  return (
    <Card className="gradient-card glow-border">
      <CardHeader>
        <Skeleton className="h-6 w-40 mb-2" />
        <Skeleton className="h-4 w-full" />
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Skeleton className="h-5 w-32" />
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-20 w-full" />
          ))}
        </div>
        <div className="space-y-3">
          <Skeleton className="h-5 w-48" />
          <Skeleton className="h-8 w-full" />
        </div>
        <Skeleton className="h-12 w-full" />
      </CardContent>
    </Card>
  )
}

export function QuizDisplaySkeleton() {
  return (
    <Card className="gradient-card glow-border">
      <CardHeader>
        <div className="flex justify-between mb-4">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-6 w-20" />
        </div>
        <Skeleton className="h-2 w-full mb-4" />
        <Skeleton className="h-8 w-full" />
      </CardHeader>
      <CardContent className="space-y-6">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
        <Skeleton className="h-12 w-full mt-8" />
      </CardContent>
    </Card>
  )
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="gradient-card">
            <CardHeader className="pb-3">
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-8 w-16" />
            </CardHeader>
          </Card>
        ))}
      </div>

      <Card className="gradient-card">
        <CardHeader>
          <Skeleton className="h-6 w-32 mb-2" />
          <Skeleton className="h-4 w-48" />
        </CardHeader>
        <CardContent className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-24 w-full" />
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

export function ChatSkeleton() {
  return (
    <Card className="gradient-card glow-border">
      <CardHeader className="border-b border-border/40">
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-48" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-[500px] p-4 space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className={`flex gap-3 ${i % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
              <Skeleton className={`h-16 ${i % 2 === 0 ? 'w-3/4' : 'w-2/3'}`} />
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-border/40">
          <Skeleton className="h-10 w-full" />
        </div>
      </CardContent>
    </Card>
  )
}
