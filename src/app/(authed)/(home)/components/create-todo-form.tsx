'use client'

import { Button, Center, Input } from '@mantine/core'
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
    <Center component="form" action={createTodo}>
      <Input
        mr={4}
        name="title"
        w={400}
        placeholder="Thêm việc cần làm..."
        error={result.validationErrors?.title?._errors?.[0]}
      />

      <Button
        type="submit"
        loading={status === 'executing'}
        disabled={status === 'executing'}
      >
        Thêm
      </Button>
    </Center>
  )
}
