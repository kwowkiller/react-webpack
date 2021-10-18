module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  ignorePatterns: '*.js',
  extends: ['plugin:react/recommended', 'google'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'max-len': [1, 150],
    'space-before-function-paren': 0,
    'spaced-comment': 0,
    'require-jsdoc': 0,
  },
};
