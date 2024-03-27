import { readFileSync, readdirSync, writeFileSync } from 'fs'
import { CODE_PATH, DB_FILE } from './config'
import { DbSchema } from './utils/types'

export const readOrCreateDB = (): DbSchema => {
  const src = readFileSync(`${CODE_PATH}/${DB_FILE}`, 'utf8')
  // TODO check json integrity, otherwise reset it

  console.log('trying to read db file', src)
  if (!src) {
    //create db
    writeFileSync(`${CODE_PATH}/${DB_FILE}`, '{}', 'utf8')
    return {}
  }
  const out: DbSchema = JSON.parse(src)

  return out
}

export const checkFSAccess = (): boolean => {
  const dir = readdirSync(`${CODE_PATH}`, 'utf8')
  console.log(JSON.stringify(dir))
  return !!dir
}
