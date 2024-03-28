import { accessSync, constants, readFileSync, writeFileSync } from 'fs'
import { CODE_PATH, DB_FILE } from './config'
import { DbSchema } from './utils/types'

const createDB = (): string => {
  writeFileSync(`${CODE_PATH}/${DB_FILE}`, '{}', 'utf8')
  return '{}'
}
function isErrnoException(e: unknown): e is NodeJS.ErrnoException {
  if ('code' in (e as Error)) return true
  else return false
}

export const readOrCreateDB = (): DbSchema | Error => {
  try {
    let src = readFileSync(`${CODE_PATH}/${DB_FILE}`, 'utf8')
    // TODO check json integrity, otherwise reset it

    console.log('trying to read db file', src)
    if (!src) {
      //create db
      src = createDB()
    }
    const out: DbSchema = JSON.parse(src)

    return out
  } catch (e) {
    if (isErrnoException(e) && e.code === 'ENOENT') {
      const out: DbSchema = JSON.parse(createDB())
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

export const checkFSAccess = (): boolean => {
  console.log(CODE_PATH)

  try {
    accessSync(`${CODE_PATH}`, constants.R_OK | constants.W_OK)
    return true
  } catch (err) {
    console.error('no access!', err)
    return false
  }
}
