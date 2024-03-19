import axios, { isAxiosError } from 'axios'
import type { AxiosResponse } from 'axios'
import { ZAPIER_API_URL } from '../config'
import { ApiError, ApiResponse, Message } from '.'

export async function zapier({
  channel,
  message
}: Message): Promise<AxiosResponse<ApiResponse> | ApiError> {
  try {
    const data = await axios.post<ApiResponse>(
      ZAPIER_API_URL,
      { message, channel },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }
    )

    // ex
    // {"attempt":"018e4eaa-4364-3c25-a3f5-49d29a5b5595","id":"018e4eaa-4364-3c25-a3f5-49d29a5b5595",
    // "request_id":"018e4eaa-4364-3c25-a3f5-49d29a5b5595","status":"success"}
    return data
  } catch (error) {
    if (isAxiosError(error)) {
      return {
        message: error.message,
        status: error?.response?.status || 999
      }
    } else {
      console.log('unexpected error: ', error)
      return {
        message: 'An unexpected error occurred',
        status: 999
      }
    }
  }
}
