import { accessSync, constants, readFileSync, writeFileSync } from 'fs'
import { CODE_PATH, CONTENT_PATH, DB_FILE } from './config'
import { DbEntry, DbSchema, Post } from './utils/types'
import { globSync } from 'glob'
import fm from 'front-matter'
import gitlog from 'gitlog'
import type { GitlogOptions } from 'gitlog'

const writeOrCreateDB = (db = {}): string => {
  writeFileSync(`${CODE_PATH}/${DB_FILE}`, JSON.stringify(db), 'utf8')
  return JSON.stringify(db)
}

function isErrnoException(e: unknown): e is NodeJS.ErrnoException {
  if ('code' in (e as Error)) return true
  else return false
}

export const readDB = (): DbSchema | Error => {
  try {
    const src = readFileSync(`${CODE_PATH}/${DB_FILE}`, 'utf8')
    // TODO check json integrity, otherwise reset it

    console.log('trying to read db file', src)
    const out: DbSchema = JSON.parse(src)
    return out
  } catch (e) {
    console.error(e)
    let error = ''
    if (typeof e === 'string') {
      error = e
    } else if (e instanceof Error) {
      error = e.message
    }
    return new Error(error)
  }
}

export const getLastUpdatedDBElements = (
  db: DbSchema
): Omit<DbSchema, 'last_update'> | undefined => {
  return db.last_update.map(x => ({ [x]: db[x] })).find(t => t)
}

export const readOrCreateDB = (): DbSchema | Error => {
  try {
    let src = readFileSync(`${CODE_PATH}/${DB_FILE}`, 'utf8')
    // TODO check json integrity, otherwise reset it

    console.log('trying to read db file', src)
    if (!src) {
      //create db
      console.log('db not found, creating one...')

      src = writeOrCreateDB()
    }
    const out: DbSchema = JSON.parse(src)

    return out
  } catch (e) {
    if (
      isErrnoException(e) &&
      e.code === 'ENOENT' &&
      checkFSAccess(CODE_PATH)
    ) {
      const out: DbSchema = JSON.parse(writeOrCreateDB())
      return out
    } else {
      console.error(e)
      let error = ''
      if (typeof e === 'string') {
        error = e
      } else if (e instanceof Error) {
        error = e.message
      }
      return new Error(error)
    }
  }
}

export const checkFSAccess = (path: string = CODE_PATH): boolean => {
  try {
    accessSync(`${path}`, constants.R_OK | constants.W_OK)
    return true
  } catch (err) {
    console.error('no access!', err)
    return false
  }
}

// TODO test it
export const compare = (
  post: Post,
  postDbFile: DbEntry,
  filePath: string,
  db: DbSchema
): boolean => {
  // update db whether content is new or publish_date is different
  // or slug is different
  return (
    !(filePath in db) ||
    post.publish_date !== postDbFile.publish_date ||
    post.slug !== postDbFile.slug
  )
}

// TODO test it
export const extractFrontmatter = (file: string): Post => {
  const content = readFileSync(file, 'utf-8')
  const attrs = fm(content).attributes as Post
  return attrs
}

export const getGitDataFromFile = (file: string): Date => {
  const options: GitlogOptions<'committerDate'> = {
    repo: CODE_PATH,
    file,
    fields: ['committerDate']
  }
  const committerDate = gitlog(options).at(0)
    ? gitlog(options).at(0)?.committerDate
    : ''
  const cd = committerDate ? new Date(committerDate) : new Date()
  return new Date(cd)
}

export const scanContent = (db: DbSchema): DbSchema | Error => {
  const contentPath = `${CODE_PATH}/${CONTENT_PATH}`
  console.log('content path', contentPath)
  try {
    accessSync(contentPath, constants.R_OK)
  } catch (error) {
    return new Error()
  }
  const files = globSync(`${contentPath}/**/*.mdx`)

  files.map(f => {
    if (!f.endsWith('.mdx')) {
      return
    }
    const post = extractFrontmatter(f)
    const lastModified = getGitDataFromFile(f)
    if (!(f in db) || db[f].last_modified !== lastModified.toJSON()) {
      if (!('last_update' in db)) {
        const last_update: string[] = []
        Object.assign(db, { last_update })
      }
      // new or updated content
      db['last_update'].push(f)
    }
    db[f] = { last_modified: lastModified.toJSON(), ...post }
  })

  return db
}

export const polling = (): DbSchema | Error => {
  const db = readOrCreateDB()
  if (db instanceof Error) {
    console.error('error accessing db', db)
    return db
  } else {
    const out = scanContent(db)
    if (!(out instanceof Error)) {
      writeOrCreateDB(out)
    }
    return out
  }
}
