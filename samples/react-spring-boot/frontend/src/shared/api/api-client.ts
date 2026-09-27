import { ApiError, type ApiErrorPayload } from './api-error'

export async function apiRequest<T>(
  url: string,
  init?: RequestInit
): Promise<T> {
  const response = await fetch(url, {
    ...init,
    headers: {
      Accept: 'application/json',
      ...(init?.body ? { 'Content-Type': 'application/json' } : {}),
      ...init?.headers
    }
  })

  if (!response.ok) {
    let payload: ApiErrorPayload = {
      message: `Request failed: HTTP ${response.status}`
    }

    try {
      payload = await response.json() as ApiErrorPayload
    }
    catch {
      // Backend 非 JSON error 時保留一般 HTTP 訊息即可。
    }

    throw new ApiError(response.status, payload)
  }

  if (response.status === 204) {
    return undefined as T
  }

  return await response.json() as T
}
