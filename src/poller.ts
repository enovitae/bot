import { readFileSync } from 'fs'

export const checkFSAccess = (): boolean => {
  const src = readFileSync(`${__dirname}/../code/global.css`, 'utf8')
  console.log('trying to read a sample project file', src)
  return !!src
}
