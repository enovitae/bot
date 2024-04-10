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
      CONTENT_PATH,
      DB_FILE: 'db.json'
    }))
    const dbJson = readFileSync('./src/__mocks__/db.json', 'utf-8')
    const { scanContent } = require('../poller')
    const db = scanContent({})
    console.log('db', db)
    expect(db).toEqual(JSON.parse(dbJson))

    const newDb = scanContent(db)
    console.log('newDb', newDb)
    const out = JSON.parse(dbJson)
    out['last_update'] = []
    expect(newDb).toEqual(out)
    jest.resetModules()
  })
  test('should scan directory and get correct post updated', () => {
    const CODE_PATH = '.'
    const CONTENT_PATH = `./src/__mocks__/content`
    jest.mock('../config', () => ({
      CODE_PATH,
      CONTENT_PATH,
      DB_FILE: './src/__mocks__/db_multiple.json'
    }))
    const dbJson = readFileSync('./src/__mocks__/db_multiple.json', 'utf-8')
    const poll = require('../poller')
    const spy = jest.spyOn(poll, 'getGitDataFromFile')
    const db = poll.readOrCreateDB()

    // setting wrong date to simulate the update process
    console.log(db)
    spy.mockImplementation(f => {
      if (f === 'src/__mocks__/content/guide/it/content1.mdx') {
        return new Date('2024-04-01T11:28:17.000Z')
      }
      if (f === 'src/__mocks__/content/guide/it/content2.mdx') {
        return new Date('2014-04-01T11:28:17.000Z')
      }
    })
    db['last_update'] = []

    const newDb = poll.scanContent(db)
    console.log('newDb', newDb)
    const out = JSON.parse(dbJson)
    out['src/__mocks__/content/guide/it/content2.mdx'].last_modified =
      '2014-04-01T11:28:17.000Z'
    out['last_update'] = ['src/__mocks__/content/guide/it/content2.mdx']
    expect(newDb).toEqual(out)
    jest.resetModules()
  })
  test('should return filtered last_update element in db', () => {
    const CODE_PATH = './src/__mocks__'
    const CONTENT_PATH = `${CODE_PATH}/src/__mocks__/content`
    jest.mock('../config', () => ({
      CODE_PATH,
      CONTENT_PATH,
      DB_FILE: 'db.json'
    }))
    const dbJson = readFileSync('./src/__mocks__/db.json', 'utf-8')
    const { readDB, getLastUpdatedDBElements } = require('../poller')
    const db = readDB()
    console.log('db', db)

    const filteredDB = getLastUpdatedDBElements(db)
    console.log('filteredDB', filteredDB)
    const dbJsonParsed = JSON.parse(dbJson)
    delete dbJsonParsed['last_update']
    expect(filteredDB).toEqual(dbJsonParsed)

    const emptyFilteredDB = getLastUpdatedDBElements(dbJsonParsed)
    expect(emptyFilteredDB).toEqual(undefined)
    jest.resetModules()
  })
  test('should return multiple filtered last_update element in db', () => {
    const CODE_PATH = './src/__mocks__'
    const CONTENT_PATH = `${CODE_PATH}/src/__mocks__/content`
    jest.mock('../config', () => ({
      CODE_PATH,
      CONTENT_PATH,
      DB_FILE: 'db_multiple.json'
    }))
    const dbJson = readFileSync('./src/__mocks__/db_multiple.json', 'utf-8')
    const { readDB, getLastUpdatedDBElements } = require('../poller')
    const db = readDB()
    console.log('db', db)

    const filteredDB = getLastUpdatedDBElements(db)
    console.log('filteredDB', filteredDB)
    const dbJsonParsed = JSON.parse(dbJson)
    delete dbJsonParsed['src/__mocks__/content/guide/it/content2.mdx'] //remove key not in update scope
    delete dbJsonParsed['last_update']
    expect(filteredDB).toEqual(dbJsonParsed)
  })
  test('should return multiple filtered last_update elements in db', () => {
    const CODE_PATH = './src/__mocks__'
    const CONTENT_PATH = `${CODE_PATH}/src/__mocks__/content`
    jest.mock('../config', () => ({
      CODE_PATH,
      CONTENT_PATH,
      DB_FILE: 'db_multiple_update.json'
    }))
    const dbJson = readFileSync(
      './src/__mocks__/db_multiple_update.json',
      'utf-8'
    )
    const { readDB, getLastUpdatedDBElements } = require('../poller')
    const db = readDB()
    console.log('db', db)

    const filteredDB = getLastUpdatedDBElements(db)
    console.log('filteredDB', filteredDB)
    const dbJsonParsed = JSON.parse(dbJson)
    delete dbJsonParsed['last_update']
    expect(filteredDB).toEqual(dbJsonParsed)
  })
})
