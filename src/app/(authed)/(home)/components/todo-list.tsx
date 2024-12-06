import { Container, Stack, Text, Title } from '@mantine/core'
import { getTodos } from '../actions/todo'
import { CreateTodoForm } from './create-todo-form'
import { TodoItem } from './todo-item'

export async function TodoList() {
  const todos = await getTodos()

  return (
    <Container size="sm" py="xl">
      <Stack gap="lg">
        <Title order={2} ta="center">
          Danh sách công việc
        </Title>

        <CreateTodoForm />

        <Stack gap="md">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              id={todo.id}
              title={todo.title}
              completed={todo.completed}
            />
          ))}

          {todos.length === 0 && (
            <Text c="dimmed" ta="center" fz="sm">
              Chưa có công việc nào. Hãy thêm công việc mới!
            </Text>
          )}
        </Stack>
      </Stack>
    </Container>
  )
}
