import fs, { Dirent, constants } from 'fs'

export const getDirectoryFiles = async (directory: string) => {
  return fs
    .readdirSync(directory, { withFileTypes: true })
    .filter(dirent => !dirent.isDirectory())
    .map(dirent => dirent.name)
}

describe('76733429', () => {
  test('should pass', async () => {
    const directory = new Dirent('directory', constants.UV_DIRENT_DIR)
    const fsMock = jest.spyOn(fs, 'readdirSync')
    fsMock.mockReturnValue([directory])
    const files = await getDirectoryFiles('/dir/stuff')
    expect(files).not.toBeNull
    fsMock.mockRestore()
  })
})
