import { readFileSync } from 'fs'
import { Context } from '@actions/github/lib/context'

import { reactToComment, commentToIssue, addLabels, getPullDiff } from '../bot'
import gitdiffParser from 'gitdiff-parser'
import { ENABLED_CHANNELS } from '../config'

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

export default async function run(context: Context): Promise<string> {
  const template = readFileSync(`${__dirname}/../templates/preview.md`, 'utf8')

  reactToComment(context)
  addLabels(context, ['preview'])
  const diff = await (getPullDiff(context) as Promise<string>)
  // TODO remove
  console.log(diff)

  const whatChanged = analyzeDiff(diff)

  await commentToIssue(context, template, {
    diff: whatChanged,
    channels: ENABLED_CHANNELS.join(' ')
  })
  return template
}
