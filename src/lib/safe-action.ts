import {
  DEFAULT_SERVER_ERROR_MESSAGE,
  createSafeActionClient
} from 'next-safe-action'

class CustomError extends Error {}

export const actionClient = createSafeActionClient({
  // Can also be an async function.
  handleServerError(e) {
    console.error('Action error:', e.message)
    if (e instanceof CustomError) {
      return e.message
    }

    // Every other error that occurs will be masked with the default message.
    return DEFAULT_SERVER_ERROR_MESSAGE
  }
})
