module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: ['@nuxtjs', 'plugin:nuxt/recommended'],
  plugins: [],
  // add your custom rules here
  rules: {
    'no-multiple-empty-lines': [1, { max: 2 }]
  }
}
