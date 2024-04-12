import { server } from '../__mocks__/node'
import { context } from '../__mocks__/handlers'
import { Command } from '../bot'
import { runCommand } from '../commands'

beforeAll(() => {
  // Enable API mocking before all the tests.
  server.listen()
  // Debug
  server.events.on('request:start', ({ request }) => {
    console.log('Outgoing:', request.method, request.url)
    // it cause unusable error on axios, consuming payload twice
    // request.json().then(console.log)
  })
})

afterEach(() => {
  // Reset the request handlers between each test.
  // This way the handlers we add on a per-test basis
  // do not leak to other, irrelevant tests.
  server.resetHandlers()
})

afterAll(() => {
  // Finally, disable API mocking after the tests are done.
  server.close()
})

jest.mock('../config', () => ({
  ENABLED_CHANNELS: ['zapier', 'telegram'],
  TELEGRAM_CHAT_ID: '-999999999999',
  CODE_PATH: '.',
  CONTENT_PATH: 'src/__mocks__/content',
  DB_FILE: 'src/__mocks__/db_multiple.json',
  TELEGRAM_API_URL: 'https://api.telegram.org/botXXXXX',
  ZAPIER_API_URL: 'https://api.zapier.org'
}))
describe('publish command', () => {
  test('should fail for no channel specified publish routine', async () => {
    const command: Command = { command: 'publish', args: [] }
    expect(await runCommand(context, command)).toBeFalsy()
  })
  test('should try publish routine with zapier', async () => {
    const command: Command = { command: 'publish', args: ['zapier'] }
    expect(await runCommand(context, command)).toBeTruthy()
  })
  test('should try publish routine with telegram', async () => {
    const command: Command = { command: 'publish', args: ['telegram'] }
    expect(await runCommand(context, command)).toBeTruthy()
  })
})
