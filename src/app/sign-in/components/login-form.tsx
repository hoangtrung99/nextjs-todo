'use client'

import {
  Button,
  Card,
  Container,
  Group,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title
} from '@mantine/core'
import { IconBrandGoogle } from '@tabler/icons-react'
import { useAction } from 'next-safe-action/hooks'
import Link from 'next/link'
import { toast } from 'sonner'
import { signInAction } from '../actions/sign-in'

export function LoginForm() {
  const { execute, isExecuting } = useAction(signInAction, {
    onError(error) {
      toast.error(
        error.error.validationErrors?._errors?.[0] ?? 'Đã có lỗi xảy ra'
      )
    }
  })

  return (
    <Container size="xs">
      <Card withBorder radius="md" p="xl" mt="xl">
        <Stack gap="md">
          <div>
            <Title order={2}>Đăng nhập</Title>
            <Text size="sm" c="dimmed">
              Nhập email của bạn để đăng nhập
            </Text>
          </div>

          <form>
            <Stack gap="md">
              <TextInput
                label="Email"
                type="email"
                name="email"
                placeholder="m@example.com"
                required
              />

              <div>
                <Group justify="space-between" mb={4}>
                  <Text component="label" htmlFor="password" size="sm" fw={500}>
                    Mật khẩu
                  </Text>
                  <Text
                    component={Link}
                    href="#"
                    size="sm"
                    td="underline"
                    c="dimmed"
                  >
                    Quên mật khẩu?
                  </Text>
                </Group>
                <PasswordInput
                  id="password"
                  name="password"
                  placeholder="Mật khẩu"
                  required
                />
              </div>

              <Stack gap="xs">
                <Button
                  type="submit"
                  loading={isExecuting}
                  formAction={execute}
                >
                  Đăng nhập
                </Button>

                <Button
                  variant="light"
                  leftSection={<IconBrandGoogle size={16} />}
                >
                  Đăng nhập với Google
                </Button>
              </Stack>
            </Stack>
          </form>

          <Text ta="center" size="sm">
            Chưa có tài khoản?{' '}
            <Text component={Link} href="/sign-up" td="underline" c="blue" span>
              Đăng ký
            </Text>
          </Text>
        </Stack>
      </Card>
    </Container>
  )
}
