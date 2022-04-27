module.exports = {
  '*.{js,jsx,ts,tsx}': [
    // https://eslint.org/docs/user-guide/command-line-interface
    'eslint --config ./.eslintrc.js --ignore-path ./.eslintignore --fix --color --'
    // https://prettier.io/docs/en/cli.html
  ],
  '*.{css,less,sass,scss,styl}': [
    // https://stylelint.io/user-guide/usage/cli
    'stylelint --config ./stylelint.config.js -i ./.stylelintignore  **/*.{css,less,sass,scss,styl} --fix'
  ]
}
