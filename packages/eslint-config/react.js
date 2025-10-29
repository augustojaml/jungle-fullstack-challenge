// react.js
import { defineConfig } from 'eslint/config'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

import base from './base.js'

export default defineConfig([
  // herda tudo do base
  ...base,

  // bloco específico para React + TS
  {
    files: ['**/*.{ts,tsx}'],

    // tipagem e presets de React
    extends: [
      ...tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      // preset do Vite para impedir falsas-positivas no HMR
      reactRefresh.configs.vite,
    ],

    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },

    rules: {
      // ok exportar qualquer coisa; HMR lida bem
      'react-refresh/only-export-components': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
])
