import { polling } from '../poller'

export default async function run(): Promise<string> {
  const out = polling()
  if (!(out instanceof Error)) {
    return 'ok'
  } else {
    console.error('error elaborating content', out)
    return 'ko'
  }
}
