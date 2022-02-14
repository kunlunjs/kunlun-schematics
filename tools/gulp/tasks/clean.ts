import { src, task } from 'gulp'
import * as clean from 'gulp-clean'
import { sources } from '../config'

/**
 * Cleans the build output assets from the packages folders
 */
function cleanSrc() {
  const files = sources.map(fold => [
    `${fold}/**/*.js`,
    `${fold}/**/*.d.ts`,
    `${fold}/**/*.js.map`,
    `${fold}/**/*.d.ts.map`
  ])
  return src(
    files.reduce((a, b) => a.concat(b), []),
    {
      read: false,
      ignore: ['**/files/**/*', '**/*.schema.d.ts', '**/workspace/**/*']
    }
  ).pipe(clean())
}

task('clean:src', cleanSrc)
