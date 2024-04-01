import { commentToIssue } from '../bot'
import { readOrCreateDB, scanContent } from '../poller'
import { Context } from '@actions/github/lib/context'
import { readFileSync } from 'fs'

export default async function run(context: Context): Promise<string> {
  const template = readFileSync(`${__dirname}/../templates/polling.md`, 'utf8')
  const db = readOrCreateDB()
  if (db instanceof Error) {
    console.error('error accessing db', db)
    return 'ko'
  } else {
    const out = scanContent(db)
    await commentToIssue(context, template, {
      diff: JSON.stringify(out)
    })
    return 'ok'
  }
}
