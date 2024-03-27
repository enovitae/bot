import { readFileSync, readdirSync } from 'fs'
import { CODE_PATH } from './config'

export const checkFSAccess = (): boolean => {
  const dir = readdirSync(`${CODE_PATH}`, 'utf8')
  console.log(JSON.stringify(dir))

  const src = readFileSync(`${CODE_PATH}/db.json`, 'utf8')
  console.log('trying to read a sample project file', src)
  return !!src
}
