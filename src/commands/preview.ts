import { readFileSync } from 'fs'
import { Context } from '@actions/github/lib/context'

import { reactToComment, commentToIssue, addLabels } from '../bot'
import gitdiffParser from 'gitdiff-parser'
import { ENABLED_CHANNELS } from '../config'
import { DbSchema } from '../utils/types'
import { getLastUpdatedDBElements, readDB } from '../poller'

export const analyzeDiff = (diff: string): string => {
  console.log(diff) // diff
  if (!diff) {
    return ''
  }
  const [diffText] = gitdiffParser
    .parse(diff)
    .map(f => f.hunks.map(h => h.changes.map(c => c.content)))
    .flat(2)
  return diffText
}

export function prettyPrint(dbSchema: Omit<DbSchema, 'last_update'>): string {
  let str = ''
  for (const k in dbSchema) {
    const entry = dbSchema[k]

    str += `<img src="https://enovitae.com/${entry.splash.replace('../../../', '')}" width="250" alt="${entry.alt}">
`
    str += `🍾 ${entry.title}
`
    str += `🥂 ${entry.description}
`
    str += `👉 [https://enovitae.com${entry.slug}](https://enovitae.com${entry.slug})`
    str += `

`
  }
  return str
}

export default async function run(context: Context): Promise<string> {
  const template = readFileSync(`${__dirname}/../templates/preview.md`, 'utf8')

  reactToComment(context)
  addLabels(context, ['preview'])
  const db = readDB()
  if (db instanceof Error) {
    //TODO comment error
    console.error(db.message)
  } else {
    const filteredDB = getLastUpdatedDBElements(db)
    if (filteredDB) {
      await commentToIssue(context, template, {
        diff: prettyPrint(filteredDB),
        channels: ENABLED_CHANNELS.join(' ')
      })
    }
  }

  return template
}
