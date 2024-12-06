'use server'

import { db } from '@/db/connection'
import { todos } from '@/db/schema'
import { actionClient } from '@/lib/safe-action'
import { getUser, validateSession } from '@/lib/session'
import { eq } from 'drizzle-orm'
import { unstable_cacheTag as cacheTag, revalidateTag } from 'next/cache'
import {
  CreateTodoSchema,
  DeleteTodoSchema,
  ToggleTodoSchema,
  UpdateTodoSchema
} from './schema'

const mutationOptions = {
  onSuccess() {
    revalidateTag('todos')
  }
}

export async function getTodos() {
  const user = await getUser()
  return getTodosByUserId(user.id)
}

export async function getTodosByUserId(userId: string) {
  'use cache'
  cacheTag('todos')

  const userTodos = await db
    .select()
    .from(todos)
    .where(eq(todos.userId, userId))
    .orderBy(todos.createdAt)

  return userTodos
}

export const createTodoAction = actionClient
  .schema(CreateTodoSchema)
  .action(async ({ parsedInput: { title } }) => {
    const session = await validateSession()

    const [todo] = await db
      .insert(todos)
      .values({
        id: crypto.randomUUID(),
        title,
        userId: session.user.id
      })
      .returning()

    return todo
  }, mutationOptions)

export const updateTodoAction = actionClient
  .schema(UpdateTodoSchema)
  .action(async ({ parsedInput: { id, title, completed } }) => {
    await validateSession()

    const [todo] = await db
      .update(todos)
      .set({ title, completed })
      .where(eq(todos.id, id))
      .returning()

    return todo
  }, mutationOptions)

export const toggleTodoAction = actionClient
  .schema(ToggleTodoSchema)
  .action(async ({ parsedInput: { id, completed } }) => {
    await validateSession()
    await db.update(todos).set({ completed }).where(eq(todos.id, id))
  }, mutationOptions)

export const deleteTodoAction = actionClient
  .schema(DeleteTodoSchema)
  .action(async ({ parsedInput: { id } }) => {
    await validateSession()
    await db.delete(todos).where(eq(todos.id, id))

    return { success: true }
  }, mutationOptions)
