'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader2 } from 'lucide-react'
import { useAction } from 'next-safe-action/hooks'
import { toast } from 'sonner'
import { createTodoAction } from '../actions/todo'

export function CreateTodoForm() {
  const {
    execute: createTodo,
    status,
    result
  } = useAction(createTodoAction, {
    onError: (error) => {
      error.error.serverError && toast.error(error.error.serverError)
    }
  })

  return (
    <form action={createTodo} className="flex gap-2">
      <div className="flex-1">
        <Input
          name="title"
          placeholder="Thêm việc cần làm..."
          className="w-full"
        />

        {status === 'hasErrored' && (
          <p className="text-sm text-red-500 mt-1">
            {result.validationErrors?.title?._errors?.[0]}
          </p>
        )}
      </div>

      <Button type="submit" disabled={status === 'executing'}>
        {status === 'executing' ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          'Thêm'
        )}
      </Button>
    </form>
  )
}
