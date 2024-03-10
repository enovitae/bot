import { readFileSync } from 'fs'
import { Context } from '@actions/github/lib/context'

import { reactToComment, commentToIssue, addLabels, getPullDiff } from '../bot'

export default async function run(context: Context): Promise<void> {
  const template = readFileSync(`${__dirname}/../templates/publish.md`, 'utf8')

  reactToComment(context)
  addLabels(context, ['published'])
  getPullDiff(context)

  await commentToIssue(context, template)
}
