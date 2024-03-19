import { readFileSync } from 'fs'
import { Context } from '@actions/github/lib/context'

import { reactToComment, commentToIssue, addLabels, getPullDiff } from '../bot'
import { send } from '../channels'
import { CHANNELS } from '../config'
import { analyzeDiff } from './preview'

export const runPublish = async (
  args: string[],
  whatChanged: string,
  context: Context,
  template: string
): Promise<boolean> => {
  if (args && args?.length > 0 && CHANNELS.some(c => c === args[0])) {
    const res = await send({ channel: args[0], message: whatChanged })
    if ('data' in res) {
      console.log(res.data, res.status)
    } else {
      console.error(res.message, res.status)
      const errorTpl = readFileSync(
        `${__dirname}/../templates/errors.md`,
        'utf8'
      )
      await commentToIssue(context, errorTpl, { errors: res.message })
      return false
    }

    await commentToIssue(context, template)
    await addLabels(context, ['published'])
    return true
  } else {
    console.log('something wrong publishing', args)
    return false
  }
}

export default async function run(
  context: Context,
  args?: string[]
): Promise<string> {
  const template = readFileSync(`${__dirname}/../templates/publish.md`, 'utf8')

  reactToComment(context)
  const diff = await (getPullDiff(context) as Promise<string>)
  // TODO remove
  console.log(diff)
  const whatChanged = analyzeDiff(diff)

  // I expect channel as first parameter
  if (args) {
    runPublish(args, whatChanged, context, template)
  } else {
    console.log('args not valid', args)
  }
  return template
}
