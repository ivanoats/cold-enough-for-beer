module.exports = {
  env: {
    browser: true,
    es6: true,
    jquery: true,
    node: true
  },
  globals: {
    geolocator: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  extends: ['prettier'],
  rules: {
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'never']
  }
}
