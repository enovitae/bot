import { Context } from '@actions/github/lib/context'
import preview from './preview'

import { Command } from '../bot'

interface CommandMap {
  name: string
  fn: (context: Context, args?: string[]) => Promise<void>
}

export const commandList: CommandMap[] = [
  { name: 'preview', fn: preview },
  { name: 'preview whatsapp', fn: preview },
  { name: 'preview telegram', fn: preview },
  { name: 'preview pinterest', fn: preview }
]

export async function runCommand(
  context: Context,
  command: Command
): Promise<undefined> {
  console.log(
    `Running '${command.command}' command for comment ${context.payload.comment?.html_url} ...`
  )

  const cmd = commandList.find(c => c.name === command.command)
  if (!cmd) {
    console.log(`Unknown command '${command.command}'`)
    return
  }

  await cmd.fn(context, command.args)
}
