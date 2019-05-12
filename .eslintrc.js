module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true
  },
  extends: 'airbnb-base',
  globals: {
    __static: true
  },
  plugins: [
    'html'
  ],
  'rules': {
    'global-require': 0,
    'import/no-unresolved': 0,
    'no-param-reassign': 0,
    'no-shadow': 0,
    'import/extensions': 0,
    'import/newline-after-import': 0,
    'no-multi-assign': 0,
    // Custom
    'linebreak-style' :0,
    'quotes': 0,
    'spaced-comment': 0,
    'object-shorthand': 0,
    'no-unused-vars': 0,
    'no-trailing-spaces': 0,
    'no-plusplus': 0,
    'prefer-destructuring': 0,
    'quote-props': 0,
    'dot-notation': 0,
    'no-unused-expressions': 0,
    'max-len': 1,
    'no-empty': 1,
    'import/no-extraneous-dependencies': 1,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
