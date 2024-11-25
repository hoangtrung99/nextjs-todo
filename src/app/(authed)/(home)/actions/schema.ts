import { z } from 'zod'
import { zfd } from 'zod-form-data'

export interface Todo {
  id: string
  title: string
  completed: boolean
}

export const CreateTodoSchema = zfd.formData({
  title: zfd.text(
    z.string().min(1, 'Tiêu đề không được để trống').max(100, 'Tiêu đề quá dài')
  )
})

export const UpdateTodoSchema = zfd.formData({
  id: zfd.text(),
  title: zfd.text(
    z.string().min(1, 'Tiêu đề không được để trống').max(100, 'Tiêu đề quá dài')
  ),
  completed: zfd.checkbox()
})

export const DeleteTodoSchema = z.object({
  id: z.string()
})

export const ToggleTodoSchema = z.object({
  id: z.string(),
  completed: z.boolean()
})
