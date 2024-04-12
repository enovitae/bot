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

const sanitizeForMarkdownV2 = (str: string): string =>
  str.replaceAll('.', '').replaceAll('-', '')

export function prettyPrint(
  dbSchema: Omit<DbSchema, 'last_update'>,
  github: boolean
): string {
  let str = ''
  for (const k in dbSchema) {
    const entry = dbSchema[k]
    const image = entry.splash
      .replace('../../../assets/images/', 'assets/images/thumbnails/')
      .replace('.jpg', '.webp')

    if (github) {
      str += `![${entry.alt}](https://enovitae.com/${image})
`
    }
    str += `\u{1F37E} ${sanitizeForMarkdownV2(entry.title)}

`
    str += `\u{1F942} ${sanitizeForMarkdownV2(entry.description)}
`
    str += `\u{1F449} [link](https://enovitae.com${entry.slug})`
    str += `

`
  }
  return str
}

export default async function run(context: Context): Promise<boolean> {
  const template = readFileSync(`${__dirname}/../templates/preview.md`, 'utf8')

  reactToComment(context)
  addLabels(context, ['preview'])
  const db = readDB()
  if (db instanceof Error) {
    await commentToIssue(context, template, {
      diff: 'sorry, no db detected',
      channels: ENABLED_CHANNELS.join(' ')
    })
    console.error(db.message)
    return false
  } else {
    const filteredDB = getLastUpdatedDBElements(db)
    if (filteredDB) {
      await commentToIssue(context, template, {
        diff: prettyPrint(filteredDB, true),
        channels: ENABLED_CHANNELS.join(' ')
      })
      return true
    } else {
      await commentToIssue(context, template, {
        diff: 'sorry, no new element detected, check last_update in db',
        channels: ENABLED_CHANNELS.join(' ')
      })
      console.error(db)
      return false
    }
  }
}
