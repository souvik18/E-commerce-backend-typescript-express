// eslint.config.cjs
const tsParser = require('@typescript-eslint/parser');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const prettierPlugin = require('eslint-plugin-prettier');

module.exports = [
  // Ignore unwanted files
  {
    ignores: ['node_modules/**', 'dist/**', 'uploads/**'],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    languageOptions: {
      parser: tsParser, // ✅ must be the imported parser object
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': 'error',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
];
