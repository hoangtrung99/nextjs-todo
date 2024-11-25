'use server'

import { auth } from '@/lib/auth'
import { actionClient } from '@/lib/safe-action'
import { APIError } from 'better-auth/api'
import { returnValidationErrors } from 'next-safe-action'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { SignUpSchema } from './schema'

export const signUpAction = actionClient.schema(SignUpSchema).action(
  async ({ parsedInput: { email, password, firstName, lastName, image } }) => {
    try {
      const user = await auth.api.signUpEmail({
        body: {
          email,
          password,
          name: `${firstName} ${lastName}`,
          image: image ? await image.text() : undefined
        },
        headers: await headers()
      })

      return user
    } catch (error) {
      if (error instanceof APIError) {
        returnValidationErrors(SignUpSchema, {
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
