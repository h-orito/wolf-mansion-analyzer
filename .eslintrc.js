module.exports = {
  env: {
    es2021: true,
    node: true
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'prettier',
    'plugin:@typescript-eslint/recommended',
    'plugin:nuxt/recommended'
  ],
  parserOptions: {
    ecmaVersion: 13,
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: ['vue', '@typescript-eslint', '@typescript-eslint/eslint-plugin'],
  rules: {
    '@typescript-eslint/no-non-null-assertion': 'off',
    'vue/multi-word-component-names': 'off'
  }
}
