import { z } from 'zod'
import { zfd } from 'zod-form-data'

export const SignInSchema = zfd.formData({
  email: zfd.text(z.string().email()),
  password: zfd.text(z.string())
})
