import axios, { isAxiosError } from 'axios'
import type { AxiosResponse } from 'axios'
import { TELEGRAM_API_URL, TELEGRAM_CHAT_ID } from '../config'
import { ApiError, ApiResponse, Message } from '.'

// curl --request POST \
//      --url https://api.telegram.org/bot{token}/sendMessage \
//      --header 'accept: application/json' \
//      --header 'content-type: application/json' \
//      --data '
// {
//   "text": "Required",
//   "parse_mode": "Optional",
//   "disable_web_page_preview": false,
//   "disable_notification": false,
//   "reply_to_message_id": null
// }
// '

export async function telegram({
  message
}: Message): Promise<AxiosResponse<ApiResponse> | ApiError> {
  try {
    const data = await axios.post<ApiResponse>(
      TELEGRAM_API_URL,
      {
        chat_id: TELEGRAM_CHAT_ID,
        text: Buffer.from(message, 'utf-8').toString(),
        parse_mode: 'MarkdownV2',
        disable_web_page_preview: false,
        reply_to_message_id: null,
        disable_notification: false
      },
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
