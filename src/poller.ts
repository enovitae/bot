import { readFileSync } from 'fs'
import { CODE_PATH } from './config'

export const checkFSAccess = (): boolean => {
  const src = readFileSync(`${CODE_PATH}/global.css`, 'utf8')
  console.log('trying to read a sample project file', src)
  return !!src
}
