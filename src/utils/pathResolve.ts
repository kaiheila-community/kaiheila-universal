import * as path from 'path'

const dir = path.join(__dirname, '../')

export function pathResolve(x: string): string {
  return path.join(dir, x)
}
