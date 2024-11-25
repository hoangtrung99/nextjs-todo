'use server'

import { auth } from '@/lib/auth'
import { actionClient } from '@/lib/safe-action'
import { APIError } from 'better-auth/api'
import { returnValidationErrors } from 'next-safe-action'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { SignInSchema } from './schema'

export const signInAction = actionClient.schema(SignInSchema).action(
  async ({ parsedInput: { email, password } }) => {
    try {
      const user = await auth.api.signInEmail({
        body: { email, password },
        headers: await headers()
      })

      return user
    } catch (error) {
      if (error instanceof APIError) {
        returnValidationErrors(SignInSchema, {
          _errors: [error.message]
        })
      }
    }
  },
  {
    onSuccess() {
      redirect('/')
    }
  }
)
