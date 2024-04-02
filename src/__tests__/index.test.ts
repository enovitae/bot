import { server } from '../__mocks__/node'
import { Pull, getPullDiff } from '../bot'
import { analyzeDiff } from '../commands/preview'
import { runPublish } from '../commands/publish'
import {
  context,
  diffJSON,
  diffJSONResponse,
  dittTextMock
} from '../__mocks__/handlers'
import { OctokitResponse } from '@octokit/types'

// jest.mock('../__mocks__/node')
// jest.mock('../__mocks__/handlers')

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

it('receives a mocked response to a REST API request', async () => {
  expect(await getPullDiff(context)).toEqual(diffJSONResponse.data)
})

it('receives a mocked response to a REST API request using custom type', async () => {
  const diff = await (getPullDiff(context) as Promise<
    OctokitResponse<string, number>
  >)
  expect(diff.data).toEqual(diffJSON.data)

  const diffText = analyzeDiff(diff.data)
  expect(diffText).toEqual(dittTextMock)

  const diffText2 = analyzeDiff('')
  expect(diffText2).toEqual('')
})

it('receives a mocked response to a REST API request accessing to data', async () => {
  const diff = await (getPullDiff(context) as Promise<Pull>)
  expect(diff).toEqual(diffJSON)
  const diff2 = await (getPullDiff(context) as Promise<OctokitResponse<string>>)
  expect(diff2.data).toEqual(diffJSON.data)
})

it('test publish commands', async () => {
  expect(await runPublish([''], diffJSON.data, context, '')).toBeFalsy()
  expect(
    await runPublish(['telegramd'], diffJSON.data, context, '')
  ).toBeFalsy()
  expect(await runPublish([], diffJSON.data, context, '')).toBeFalsy()
  // test runtime skipping compile errors
  // @ts-ignore
  expect(await runPublish(undefined, diffJSON.data, context, '')).toBeFalsy()
  // @ts-ignore
  expect(await runPublish(null, diffJSON.data, context, '')).toBeFalsy()
  // @ts-ignore
  expect(await runPublish('null', diffJSON.data, context, '')).toBeFalsy()
  expect(await runPublish(['whatsapp'], diffJSON.data, context, '')).toBeFalsy()
  expect(
    await runPublish(['pinterest'], diffJSON.data, context, '')
  ).toBeFalsy()
  expect(await runPublish(['telegram'], diffJSON.data, context, '')).toBeFalsy()
  expect(await runPublish(['zapier'], diffJSON.data, context, '')).toBeTruthy()
})
