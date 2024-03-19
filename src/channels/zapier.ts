import axios from 'axios'
import { ZAPIER_API_URL } from '../config'
import { Message } from '.'

export async function zapier({ channel, message }: Message): Promise<string> {
  const { data } = await axios.post(
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
  return data.status
}
