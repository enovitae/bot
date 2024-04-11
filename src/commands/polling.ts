import { polling } from '../poller'

export default async function run(): Promise<boolean> {
  const out = polling()
  if (!(out instanceof Error)) {
    return true
  } else {
    console.error('error elaborating content', out)
    return false
  }
}
