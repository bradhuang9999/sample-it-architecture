import { ApiError } from './api-error'

export function toErrorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    return error.message
  }

  if (error instanceof Error) {
    return error.message
  }

  return '發生未預期錯誤。'
}
