import { Button, Container, Group, Stack, Title } from '@mantine/core'
import { IconLogout } from '@tabler/icons-react'
import { Suspense } from 'react'
import { signOut } from './actions/sign-out'
import { TodoList } from './components/todo-list'

export default function TodosPage() {
  return (
    <Stack gap="xl">
      <Container size="sm">
        <Group justify="space-between" align="center">
          <Stack pt="md">
            <Title order={1}>Todo App</Title>
            <Button
              onClick={signOut}
              variant="subtle"
              color="red"
              leftSection={<IconLogout size={16} />}
            >
              Đăng xuất
            </Button>
          </Stack>
        </Group>
      </Container>

      <Suspense>
        <TodoList />
      </Suspense>
    </Stack>
  )
}
