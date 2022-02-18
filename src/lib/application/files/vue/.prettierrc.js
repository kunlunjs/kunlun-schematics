/**
 * @returns {import('prettier')}
 * @see https://prettier.io/docs/en/options.html
 */
module.exports = {
  parser: 'babel',
  semi: false,
  singleQuote: true,
  quoteProps: 'consistent',
  trailingComma: 'none',
  arrowParens: 'avoid',
  rangeStart: 0,
  rangeEnd: Infinity,
  endOfLine: 'auto',
  overrides: [
    {
      files:
        '*.{babelrc,eslintrc,huskyrc,lintstagedrc,json,prettierrc,stylelintrc}',
      options: {
        parser: 'json'
      }
    },
    {
      files: '*.{ts,tsx}',
      options: {
        parser: 'typescript'
      }
    },
    {
      files: '*.{ejs,hbs,html}',
      options: {
        parser: 'html'
      }
    },
    {
      files: '*.vue',
      options: {
        parser: 'vue'
      }
    },
    {
      files: '*.md',
      options: {
        parser: 'markdown'
      }
    },
    {
      files: '*.mdx',
      options: {
        parser: 'mdx'
      }
    },
    {
      files: '*.css',
      options: {
        parser: 'css'
      }
    },
    {
      files: '*.less',
      options: {
        parser: 'less'
      }
    },
    {
      files: '*.scss',
      options: {
        parser: 'scss'
      }
    },
    {
      files: '*.yaml',
      options: {
        parser: 'yaml'
      }
    },
    {
      files: ['*.yml'],
      options: {
        singleQuote: false
      }
    },
    {
      files: ['*.json5'],
      options: {
        singleQuote: false,
        quoteProps: 'preserve'
      }
    }
  ]
}
