module.exports = {
  '*.{js,jsx,ts,tsx}': [
    // https://eslint.org/docs/user-guide/command-line-interface
    'eslint --config ./.eslintrc.js --ignore-path ./.eslintignore --fix --color --'
  ],
  // https://prettier.io/docs/en/cli.html
  '*': ['pretty-quick --staged --verbose']
}
