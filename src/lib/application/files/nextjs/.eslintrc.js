// @ts-check
const { defineConfig } = require('eslint-define-config')

module.exports = defineConfig({
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module'
  },
  env: {
    es6: true,
    jest: true,
    node: true,
    mocha: true,
    browser: true
  },
  extends: [
    // 'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    // 'plugin:node/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:tailwindcss/recommended',
    'next/core-web-vitals',
    // Note: Please keep this as the last config to make sure that this (and by extension our .prettierrc file) overrides all configuration above it
    // https://www.npmjs.com/package/eslint-plugin-prettier#recommended-configuration
    'plugin:prettier/recommended'
  ],
  plugins: ['import', 'unused-imports', 'prettier', 'react', 'react-hooks'],
  rules: {
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/consistent-indexed-object-style': 'warn',
    '@typescript-eslint/consistent-type-assertions': 'off',
    '@typescript-eslint/consistent-type-definitions': 'off',
    '@typescript-eslint/consistent-type-imports': 1,
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/comma-dangle': 'off', // Avoid conflict rule between Eslint and Prettier
    'class-methods-use-this': 'off', // _document.tsx use render method without `this` keyword
    'tailwindcss/no-custom-classname': 'off', // Disabled otherwise nightmare to allow each custom tailwind classes
    'import/prefer-default-export': 'off', // Named export is easier to refactor automatically
    'import/no-webpack-loader-syntax': 'off',
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
          'object'
          // 'type'
        ],
        alphabetize: {
          order: 'asc'
        },
        pathGroups: [
          {
            pattern: '@/**',
            group: 'internal'
          }
        ]
      }
    ],
    'unused-imports/no-unused-imports': 'warn',
    'react/destructuring-assignment': 'off', // Vscode doesn't support automatically destructuring, it's a pain to add a new variable
    'jsx-a11y/anchor-is-valid': 'off', // Next.js use his own internal link system
    'react/require-default-props': 'off', // Allow non-defined react props as undefined
    'react/jsx-props-no-spreading': 'off', // _app.tsx uses spread operator and also, react-hook-form
    '@next/next/no-img-element': 'off' // We currently not using next/image because it isn't supported with SSG mode
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx']
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts']
      },
      typescript: {
        alwaysTryTypes: true
      }
    }
  },
  overrides: [
    {
      files: ['*.js'],
      rules: {
        'import/no-commonjs': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off'
      }
    },
    {
      files: ['*.d.ts'],
      rules: {
        '@typescript-eslint/triple-slash-reference': 'off'
      }
    }
  ]
})
