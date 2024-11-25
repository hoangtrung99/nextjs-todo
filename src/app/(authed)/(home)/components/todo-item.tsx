'use client'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Check, Loader2, Pencil, Trash2 } from 'lucide-react'
import { useAction } from 'next-safe-action/hooks'
import { useState } from 'react'
import { toast } from 'sonner'
import {
  deleteTodoAction,
  toggleTodoAction,
  updateTodoAction
} from '../actions/todo'

interface TodoItemProps {
  id: string
  title: string
  completed: boolean
}

export function TodoItem({ id, title, completed }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false)

  const { execute: updateTodo } = useAction(updateTodoAction, {
    onSuccess: () => {
      setIsEditing(false)
      toast.success('Cập nhật thành công')
    },
    onError: ({ error }) => {
      toast.error(error.serverError || 'Có lỗi xảy ra')
    }
  })

  const { execute: toggleTodo } = useAction(toggleTodoAction)

  const { execute: deleteTodo, status: deleteStatus } =
    useAction(deleteTodoAction)

  return (
    <div className="flex items-center gap-4 p-4 border rounded-lg">
      <Checkbox
        checked={completed}
        onCheckedChange={(checked) =>
          toggleTodo({ id, completed: Boolean(checked) })
        }
      />

      {isEditing ? (
        <form className="flex items-center gap-2 flex-1" action={updateTodo}>
          <input type="hidden" name="id" value={id} />
          <Input name="title" defaultValue={title} className="flex-1" />
          <Button type="submit" variant="outline">
            <Check className="h-4 w-4" />
          </Button>
        </form>
      ) : (
        <span
          className={`flex-1 ${completed ? 'line-through text-muted-foreground' : ''}`}
          onDoubleClick={() => setIsEditing(true)}
        >
          {title}
        </span>
      )}

      <div className="flex gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsEditing(true)}
          disabled={isEditing}
        >
          <Pencil className="h-4 w-4" />
        </Button>

        <Button
          variant="destructive"
          size="icon"
          onClick={() => deleteTodo({ id })}
          disabled={deleteStatus === 'executing'}
        >
          {deleteStatus === 'executing' ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Trash2 className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  )
}
