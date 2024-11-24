import { Terminal } from 'lucide-react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export default function Home() {
  async function signOut() {
    'use server'
    await auth.api.signOut({
      headers: await headers()
    })

    redirect('/sign-in')
  }

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

        <form action={signOut}>
          <Button type="submit">Sign out</Button>
        </form>
      </div>
    </div>
  )
}
