import type { Path } from '@angular-devkit/core'
import { basename, dirname, relative } from '@angular-devkit/core'

export class PathSolver {
  public relative(from: Path, to: Path): string {
    const placeholder = '/placeholder'
    const relativeDir = relative(
      dirname((placeholder + from) as Path),
      dirname((placeholder + to) as Path)
    )
    return (
      relativeDir.startsWith('.') ? relativeDir : './' + relativeDir
    ).concat(relativeDir.length === 0 ? basename(to) : '/' + basename(to))
  }
}
