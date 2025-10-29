// node.js
import { defineConfig } from 'eslint/config'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import base from './base.js'

export default defineConfig([
  // herda tudo do base
  ...base,

  // bloco específico para Node + TS
  {
    files: ['**/*.{ts,tsx}'],

    extends: [
      ...tseslint.configs.recommended,
    ],

    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.node,
        ...globals.es2020,
      },
    },

    rules: {
      // em serviços, geralmente queremos logs permitidos
      'no-console': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
])
