import { readFileSync } from 'fs'
import { Context } from '@actions/github/lib/context'

import { reactToComment, commentToIssue, addLabels } from '../bot'
import { send } from '../channels'
import { ENABLED_CHANNELS } from '../config'
import { prettyPrint } from './preview'
import { getLastUpdatedDBElements, readDB } from '../poller'

export const runPublish = async (
  args: string[],
  whatChanged: string,
  context: Context,
  template: string
): Promise<boolean> => {
  if (args && args?.length > 0 && ENABLED_CHANNELS.some(c => c === args[0])) {
    console.log('channel', args[0])

    const res = await send({ channel: args[0], message: whatChanged })
    if (!('data' in res)) {
      console.error(res.message, res.status)
      const errorTpl = readFileSync(
        `${__dirname}/../templates/errors.md`,
        'utf8'
      )
      await commentToIssue(context, errorTpl, { errors: res.message })
      return false
    }

    await commentToIssue(context, template, {
      channels: ENABLED_CHANNELS.join(' ')
    })
    await addLabels(context, ['published'])
    return true
  } else {
    // FIXME, triggered when @enovitae-bot publish (no args)
    console.log(
      'something wrong publishing, maybe no or wrong channel specified',
      args
    )
    return false
  }
}

export default async function run(
  context: Context,
  args?: string[]
): Promise<boolean> {
  const template = readFileSync(`${__dirname}/../templates/publish.md`, 'utf8')

  reactToComment(context)

  const db = readDB()
  if (db instanceof Error) {
    await commentToIssue(context, template, {
      text: 'sorry, no db detected',
      channels: ENABLED_CHANNELS.join(' ')
    })
    console.error(db.message)
    return false
  } else {
    const filteredDB = getLastUpdatedDBElements(db)
    if (filteredDB) {
      // I expect channel as first parameter
      // TODO ugly
      let publishStatus = false
      if (args) {
        for (const k in filteredDB) {
          const entry = filteredDB[k]
          // FIXME understand how determine if publishing is a fail (for all records)
          publishStatus = await runPublish(
            args,
            prettyPrint({ [k]: entry }),
            context,
            template
          )
        }
        console.log('p', filteredDB, args, ENABLED_CHANNELS, publishStatus)
        if (publishStatus) {
          await commentToIssue(context, template, {
            text: prettyPrint(filteredDB),
            channels: ENABLED_CHANNELS.join(' ')
          })
          return true
        } else {
          await commentToIssue(context, template, {
            text: 'sorry, something wrong publishing, check logs',
            channels: ENABLED_CHANNELS.join(' ')
          })
          return false
        }
      } else {
        await commentToIssue(context, template, {
          text: 'sorry, argument specified for command is not valid',
          channels: ENABLED_CHANNELS.join(' ')
        })
        console.error('args not valid', args)
        return false
      }
    } else {
      await commentToIssue(context, template, {
        text: 'sorry, no new element detected, check last_update in db',
        channels: ENABLED_CHANNELS.join(' ')
      })
      console.error(db)
      return false
    }
  }
}
