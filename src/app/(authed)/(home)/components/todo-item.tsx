'use client'

import { ActionIcon, Checkbox, Group, Paper, TextInput } from '@mantine/core'
import {
  IconCheck,
  IconLoader2,
  IconPencil,
  IconTrash
} from '@tabler/icons-react'
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
    <Paper shadow="xs" p="md" withBorder>
      <Group gap="md" wrap="nowrap">
        <Checkbox
          checked={completed}
          onChange={(event) =>
            toggleTodo({ id, completed: event.currentTarget.checked })
          }
          size="md"
        />

        {isEditing ? (
          <form className="flex-1" action={updateTodo}>
            <input type="hidden" name="id" value={id} />
            <TextInput
              name="title"
              defaultValue={title}
              size="sm"
              rightSection={
                <ActionIcon
                  type="submit"
                  variant="subtle"
                  color="blue"
                  size="sm"
                >
                  <IconCheck size={16} />
                </ActionIcon>
              }
            />
          </form>
        ) : (
          <span
            style={{
              flex: 1,
              textDecoration: completed ? 'line-through' : 'none',
              color: completed ? 'var(--mantine-color-gray-6)' : 'inherit'
            }}
            onDoubleClick={() => setIsEditing(true)}
          >
            {title}
          </span>
        )}

        <Group gap={4}>
          <ActionIcon
            variant="light"
            color="blue"
            onClick={() => setIsEditing(true)}
            disabled={isEditing}
            size="sm"
          >
            <IconPencil size={16} />
          </ActionIcon>

          <ActionIcon
            variant="light"
            color="red"
            onClick={() => deleteTodo({ id })}
            disabled={deleteStatus === 'executing'}
            size="sm"
          >
            {deleteStatus === 'executing' ? (
              <IconLoader2 size={16} className="animate-spin" />
            ) : (
              <IconTrash size={16} />
            )}
          </ActionIcon>
        </Group>
      </Group>
    </Paper>
  )
}
