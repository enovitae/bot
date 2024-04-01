import { DbEntry, DbSchema } from 'src/utils/types'
import { commentToIssue } from '../bot'
import { readOrCreateDB, scanContent } from '../poller'
import { Context } from '@actions/github/lib/context'
import { readFileSync } from 'fs'

function printDbSchemaFields(dbSchema: DbSchema): string {
  let str = ''
  for (const key in dbSchema) {
    if (Object.prototype.hasOwnProperty.call(dbSchema, key)) {
      const entry = dbSchema[key] // Type assertion
      for (const field in entry) {
        if (Object.prototype.hasOwnProperty.call(entry, field)) {
          type e = keyof DbEntry
          str += `${field}: ${entry[field as e]}\n`
        }
      }
    }
  }
  return str
}

export default async function run(context: Context): Promise<string> {
  const template = readFileSync(`${__dirname}/../templates/polling.md`, 'utf8')
  const db = readOrCreateDB()
  if (db instanceof Error) {
    console.error('error accessing db', db)
    return 'ko'
  } else {
    const out = scanContent(db)
    if (!(out instanceof Error)) {
      await commentToIssue(context, template, {
        diff: printDbSchemaFields(out)
      })
    } else {
      console.error('error elaborating content', out)
      return 'ko'
    }
    return 'ok'
  }
}
