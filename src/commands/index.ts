import { Context } from '@actions/github/lib/context'
import preview from './preview'
import publish from './publish'
import polling from './polling'

import { Command } from '../bot'

interface CommandMap {
  name: string
  fn: (context: Context, args?: string[]) => Promise<string>
}

export const commandList: CommandMap[] = [
  { name: 'preview', fn: preview },
  { name: 'preview zapier', fn: preview },
  { name: 'preview whatsapp', fn: preview },
  { name: 'preview telegram', fn: preview },
  { name: 'preview pinterest', fn: preview },

  { name: 'publish', fn: publish },
  { name: 'publish zapier', fn: publish },
  { name: 'publish whatsapp', fn: publish },
  { name: 'publish telegram', fn: publish },
  { name: 'publish pinterest', fn: publish },
  { name: 'publish all', fn: publish },

  { name: 'polling', fn: polling }
]

export async function runCommand(
  context: Context,
  command: Command
): Promise<undefined | string> {
  console.log(
    `Running '${command.command}' with args '${command.args}' command for comment ${context.payload.comment?.html_url} ...`
  )

  const cmd = commandList.find(c => c.name === command.command)
  if (!cmd) {
    console.log(`Unknown command '${command.command}'`)
    return
  }

  return await cmd.fn(context, command.args)
}
