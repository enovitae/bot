import { readFileSync } from 'fs'
import { Context } from '@actions/github/lib/context'

import {
  reactToComment,
  commentToIssue,
  addLabels,
  getPullDiff,
  Pull
} from '../bot'
import { OctokitResponse } from '@octokit/types'

export const analyzeDiff = (diff: Pull): string => {
  console.log(diff)

  return ''
}

export default async function run(context: Context): Promise<void> {
  const template = readFileSync(`${__dirname}/../templates/publish.md`, 'utf8')

  reactToComment(context)
  addLabels(context, ['published'])
  const diff = await (getPullDiff(context) as Promise<Pull>)
  analyzeDiff(diff)
  const diffRaw = await (getPullDiff(context) as Promise<
    OctokitResponse<string, number>
  >)
  console.log('raw', diffRaw, diffRaw.data)

  await commentToIssue(context, template)
}
