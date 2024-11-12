import { Terminal } from 'lucide-react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div>
        <Alert>
          <Terminal className="h-5 w-5" />
          <AlertTitle className="text-lg">Heads up!</AlertTitle>
          <AlertDescription className="text-xl">
            NextJS template with TailwindCSS, Shadcn/UI, Lucide Icons,
            TypeScript, and more.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  )
}
