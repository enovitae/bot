import { telegram } from './telegram'
import { zapier } from './zapier'
import type { AxiosResponse } from 'axios'

export type Message = {
  message: string
  channel?: string
  // channel: (typeof CHANNELS)[number]
}
export interface ApiResponse {
  data: {
    attempt: string
    id: string
    request_id: string
    status: string
  }
  status: number
}

export interface ApiError {
  message: string
  status: number
}

const send = async ({
  channel,
  message
}: Message): Promise<AxiosResponse<ApiResponse> | ApiError> => {
  switch (channel) {
    case 'zapier':
      return zapier({ channel, message })
    case 'pinterest':
    case 'telegram':
      return telegram({ message })
    case 'whatsapp':
      return Promise.resolve({
        message: 'channel not yet implemented',
        status: 999
      })
  }
  return Promise.resolve({ message: 'unknown channel specified', status: 999 })
}
export { send }
