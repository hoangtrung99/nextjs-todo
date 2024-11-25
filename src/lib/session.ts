'use server'

import { headers } from 'next/headers'
import { auth } from './auth'

export const validateSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session) {
    throw new Error('Unauthorized')
  }

  return session
}

export const getUser = async () => {
  const session = await validateSession()
  return session.user
}
