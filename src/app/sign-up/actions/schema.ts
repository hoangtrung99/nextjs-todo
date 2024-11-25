import { z } from 'zod'
import { zfd } from 'zod-form-data'

export const SignUpSchema = zfd
  .formData({
    firstName: zfd.text(
      z
        .string()
        .min(2, 'Tên phải có ít nhất 2 ký tự')
        .max(50, 'Tên không được vượt quá 50 ký tự')
    ),
    lastName: zfd.text(
      z
        .string()
        .min(2, 'Họ phải có ít nhất 2 ký tự')
        .max(50, 'Họ không được vượt quá 50 ký tự')
    ),
    email: zfd.text(z.string().email('Email không hợp lệ')),
    password: zfd.text(
      z
        .string()
        .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
          'Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường và 1 số'
        )
    ),
    passwordConfirmation: zfd.text(),
    image: zfd.file().optional()
  })
  .superRefine(({ password, passwordConfirmation }, ctx) => {
    if (password !== passwordConfirmation) {
      ctx.addIssue({
        code: 'custom',
        message: 'Mật khẩu xác nhận không khớp',
        path: ['passwordConfirmation']
      })
    }
  })
