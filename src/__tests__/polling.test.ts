import { readFileSync } from 'fs'

beforeEach(() => jest.resetModules())
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

describe('fail scan content', () => {
  test('should fail gracefully scanning directory', () => {
    const CODE_PATH = '/tmp'
    const CONTENT_PATH = `${CODE_PATH}/unknown/folder`
    jest.mock('../config', () => ({
      CODE_PATH,
      CONTENT_PATH
    }))
    const { scanContent } = require('../poller')
    expect(scanContent({})).toBeInstanceOf(Error)
    jest.resetModules()
  })
  test('should scan directory', () => {
    const CODE_PATH = '.'
    const CONTENT_PATH = `${CODE_PATH}/src/__mocks__/content`
    jest.mock('../config', () => ({
      CODE_PATH,
      CONTENT_PATH
    }))
    const dbJson = readFileSync('./src/__mocks__/db.json', 'utf-8')
    const { scanContent } = require('../poller')
    const db = scanContent({})
    console.log('db', db)
    expect(db).toEqual(JSON.parse(dbJson))

    const newDb = scanContent(db)
    console.log('newDb', newDb)
    expect(newDb).toEqual(JSON.parse(dbJson))
    jest.resetModules()
  })
})
