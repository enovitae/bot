import { readFileSync } from 'fs'
import { Context } from '@actions/github/lib/context'

import { reactToComment, commentToIssue, addLabels, getPullDiff } from '../bot'
import { OctokitResponse } from '@octokit/types'
import gitdiffParser from 'gitdiff-parser'

export const analyzeDiff = (diff: string): string => {
  console.log(diff) // diff
  const [diffText] = gitdiffParser
    .parse(diff)
    .map(f => f.hunks.map(h => h.changes.map(c => c.content)))
    .flat(2)
  return diffText
}

export default async function run(context: Context): Promise<void> {
  const template = readFileSync(`${__dirname}/../templates/preview.md`, 'utf8')

  reactToComment(context)
  addLabels(context, ['preview'])
  const diff = await (getPullDiff(context) as Promise<
    OctokitResponse<string, number>
  >)
  const whatChanged = analyzeDiff(diff.data)

  await commentToIssue(context, template, { diff: whatChanged })
}
