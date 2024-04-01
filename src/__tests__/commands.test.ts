import { context } from '../__mocks__/handlers'
import { Command } from '../bot'
import { runCommand } from '../commands'

jest.mock('../commands/preview', () => jest.fn(() => 'preview'))
jest.mock('../commands/publish', () => jest.fn(() => 'publish'))
jest.mock('../commands/polling', () => jest.fn(() => 'polling'))
describe('test commands names', () => {
  const validCommands = ['polling', 'publish', 'preview', 'preview zapier']
  test.each(validCommands)('run valid commands', async c => {
    const command: Command = { command: c, args: [] }
    expect(await runCommand(context, command)).not.toBeUndefined()
  })

  const notValidCommands = ['', null, 'previeww', 'preview zapierr']
  test.each(notValidCommands)('run not valid commands', async c => {
    // @ts-ignore forced to check runtime
    const command: Command = { command: c, args: [] }
    expect(await runCommand(context, command)).toBeUndefined()
  })
})
