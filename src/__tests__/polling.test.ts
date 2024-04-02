import { server } from '../__mocks__/node'
import { context } from '../__mocks__/handlers'
import { Command } from '../bot'
import { runCommand } from '../commands'
beforeAll(() => {
  // Enable API mocking before all the tests.
  server.listen()
  // Debug
  // server.events.on('request:start', ({ request }) => {
  //   console.log('Outgoing:', request.method, request.url)
  // })
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
  CODE_PATH: '.',
  CONTENT_PATH: 'src/__mocks__/content',
  DB_FILE: 'src/__mocks__/db.json'
}))
describe('polling command', () => {
  test('should return valid mocked db', async () => {
    const command: Command = { command: 'polling', args: [] }
    expect(await runCommand(context, command)).not.toBeUndefined()
  })
})
