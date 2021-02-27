module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
  },
  extends: [
    'airbnb-typescript',
    'plugin:@typescript-eslint/recommended',
    //'plugin:@typescript-eslint/recommended-requiring-type-checking'
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    'no-console': 'off',
    'import/prefer-default-export': 'off',
    'class-methods-use-this': 'off',
    '@typescript-eslint/lines-between-class-members': 'off',
  },
  settings: {
    react: {
      version: '999.999.999',
    },
  },
  overrides: [
    {
      files: [
        'src/entry/**/*.ts',
        'src/controller/**/*.ts',
      ],
      rules: {
        '@typescript-eslint/naming-convention': 'off',
      },
    },
    {
      files: ['src/migration/**/*.ts'],
      rules: {
        'max-len': 'off',
      },
    },
  ],
}
