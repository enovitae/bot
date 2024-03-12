import { readFileSync } from 'fs'
import { Context } from '@actions/github/lib/context'

import { reactToComment, commentToIssue, addLabels } from '../bot'

export default async function run(context: Context): Promise<string> {
  const template = readFileSync(`${__dirname}/../templates/publish.md`, 'utf8')

  reactToComment(context)
  addLabels(context, ['published'])

  await commentToIssue(context, template)
  return template
}
