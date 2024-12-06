'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import {
  Button,
  Card,
  Container,
  FileInput,
  Grid,
  Group,
  Image,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title
} from '@mantine/core'
import { useHookFormAction } from '@next-safe-action/adapter-react-hook-form/hooks'
import { IconPhoto, IconX } from '@tabler/icons-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { SignUpSchema } from '../actions/schema'
import { signUpAction } from '../actions/sign-up'

export function SignUp() {
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const { form, action, handleSubmitWithAction } = useHookFormAction(
    signUpAction,
    zodResolver(SignUpSchema),
    {
      actionProps: {
        onError: (error) => {
          toast.error(
            error.error.validationErrors?._errors?.[0] ?? 'Đã có lỗi xảy ra'
          )
        }
      }
    }
  )

  const handleImageChange = (file: File | null) => {
    if (file) {
      form.setValue('image', file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <Container size="xs">
      <Card withBorder radius="md" p="xl" mt="xl">
        <Stack gap="md">
          <div>
            <Title order={2}>Đăng ký</Title>
            <Text size="sm" c="dimmed">
              Nhập thông tin của bạn để tạo tài khoản
            </Text>
          </div>

          <form onSubmit={handleSubmitWithAction}>
            <Stack gap="md">
              <Grid gutter="md">
                <Grid.Col span={6}>
                  <TextInput
                    label="Tên"
                    placeholder="Max"
                    {...form.register('firstName')}
                    error={form.formState.errors.firstName?.message}
                  />
                </Grid.Col>
                <Grid.Col span={6}>
                  <TextInput
                    label="Họ"
                    placeholder="Robinson"
                    {...form.register('lastName')}
                    error={form.formState.errors.lastName?.message}
                  />
                </Grid.Col>
              </Grid>

              <TextInput
                label="Email"
                placeholder="m@example.com"
                {...form.register('email')}
                error={form.formState.errors.email?.message}
              />

              <PasswordInput
                label="Mật khẩu"
                placeholder="Mật khẩu"
                {...form.register('password')}
                error={form.formState.errors.password?.message}
              />

              <PasswordInput
                label="Xác nhận mật khẩu"
                placeholder="Xác nhận mật khẩu"
                {...form.register('passwordConfirmation')}
                error={form.formState.errors.passwordConfirmation?.message}
              />

              <Stack gap="xs">
                <Text size="sm" fw={500}>
                  Ảnh đại diện (tùy chọn)
                </Text>
                <Group align="flex-start">
                  {imagePreview && (
                    <Image
                      src={imagePreview}
                      w={80}
                      h={80}
                      radius="sm"
                      alt="Preview"
                    />
                  )}
                  <Stack gap={4} style={{ flex: 1 }}>
                    <FileInput
                      placeholder="Chọn ảnh"
                      accept="image/*"
                      onChange={handleImageChange}
                      leftSection={<IconPhoto size={16} />}
                    />
                    {imagePreview && (
                      <Button
                        variant="light"
                        color="red"
                        size="xs"
                        leftSection={<IconX size={16} />}
                        onClick={() => {
                          form.setValue('image', undefined)
                          setImagePreview(null)
                        }}
                      >
                        Xóa ảnh
                      </Button>
                    )}
                  </Stack>
                </Group>
              </Stack>

              <Button
                type="submit"
                loading={action.status === 'executing'}
                fullWidth
              >
                Tạo tài khoản
              </Button>

              {form.formState.errors.root && (
                <Text c="red" size="sm">
                  {form.formState.errors.root.message}
                </Text>
              )}
            </Stack>
          </form>
        </Stack>
      </Card>
    </Container>
  )
}
