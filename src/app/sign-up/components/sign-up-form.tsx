'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useHookFormAction } from '@next-safe-action/adapter-react-hook-form/hooks'
import { Label } from '@radix-ui/react-label'
import { Loader2, X } from 'lucide-react'
import Image from 'next/image'
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
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
    <Card className="z-50 rounded-md rounded-t-none max-w-md">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">Đăng ký</CardTitle>
        <CardDescription className="text-xs md:text-sm">
          Nhập thông tin của bạn để tạo tài khoản
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmitWithAction} className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="first-name">Tên</Label>
              <Input
                id="first-name"
                placeholder="Max"
                {...form.register('firstName')}
              />
              {form.formState.errors.firstName && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.firstName.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="last-name">Họ</Label>
              <Input
                id="last-name"
                placeholder="Robinson"
                {...form.register('lastName')}
              />
              {form.formState.errors.lastName && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.lastName.message}
                </p>
              )}
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              {...form.register('email')}
            />
            {form.formState.errors.email && (
              <p className="text-sm text-red-500">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Mật khẩu</Label>
            <Input
              id="password"
              type="password"
              autoComplete="new-password"
              placeholder="Mật khẩu"
              {...form.register('password')}
            />
            {form.formState.errors.password && (
              <p className="text-sm text-red-500">
                {form.formState.errors.password.message}
              </p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Xác nhận mật khẩu</Label>
            <Input
              id="password_confirmation"
              type="password"
              autoComplete="new-password"
              placeholder="Xác nhận mật khẩu"
              {...form.register('passwordConfirmation')}
            />
            {form.formState.errors.passwordConfirmation && (
              <p className="text-sm text-red-500">
                {form.formState.errors.passwordConfirmation.message}
              </p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="image">Ảnh đại diện (tùy chọn)</Label>
            <div className="flex items-end gap-4">
              {imagePreview && (
                <div className="relative w-16 h-16 rounded-sm overflow-hidden">
                  <Image
                    src={imagePreview}
                    alt="Profile preview"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              )}
              <div className="flex items-center gap-2 w-full">
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full"
                />
                {imagePreview && (
                  <X
                    className="cursor-pointer"
                    onClick={() => {
                      form.setValue('image', undefined)
                      setImagePreview(null)
                    }}
                  />
                )}
              </div>
            </div>
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={action.status === 'executing'}
          >
            {action.status === 'executing' ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              'Tạo tài khoản'
            )}
          </Button>

          {form.formState.errors.root && (
            <p className="text-sm text-red-500">
              {form.formState.errors.root.message}
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  )
}
