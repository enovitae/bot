import { commentToIssue } from '../bot'
import { checkFSAccess } from '../poller'
import { Context } from '@actions/github/lib/context'
import { readFileSync } from 'fs'

export default async function run(context: Context): Promise<string> {
  const template = readFileSync(`${__dirname}/../templates/polling.md`, 'utf8')
  const checkFS = checkFSAccess()
  await commentToIssue(context, template, {
    diff: 'check logs'
  })
  return checkFS ? 'ok' : 'ko'
}
