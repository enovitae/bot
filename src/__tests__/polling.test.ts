describe('manage db file', () => {
  jest.mock('../config', () => ({ CODE_PATH: '/tmp', DB_FILE: 'db.json' }))
  const { checkFSAccess, readOrCreateDB } = require('../poller')

  test('check fs access', () => {
    expect(checkFSAccess()).toBeTruthy()
  })
  test('open or create db', () => {
    expect(readOrCreateDB()).toEqual({})
  })
  jest.resetModules()
})
describe('manage failure db file', () => {
  jest.mock('../config', () => ({ CODE_PATH: '/root', DB_FILE: 'db.json' }))
  const { checkFSAccess, readOrCreateDB } = require('../poller')

  test('check fs access', () => {
    expect(checkFSAccess()).toBeFalsy()
  })
  test('open or create db', () => {
    expect(readOrCreateDB()).toBeInstanceOf(Error)
  })
  jest.resetModules()
})
