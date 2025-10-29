// base.js
import js from '@eslint/js'
import { defineConfig, globalIgnores } from 'eslint/config'
import configPrettier from 'eslint-config-prettier'
import pluginPrettier from 'eslint-plugin-prettier'
import simpleImportSort from 'eslint-plugin-simple-import-sort'

export default defineConfig([
  // ignores comuns ao monorepo
  globalIgnores(['dist', 'build', '.next', 'coverage', 'node_modules']),

  // bloco base para JS/TS (sem ambiente específico)
  {
    files: ['**/*.{js,mjs,cjs,ts,tsx}'],

    extends: [
      js.configs.recommended,
      // deixa o Prettier por último para desligar regras conflitantes
      configPrettier,
    ],

    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
    },

    plugins: {
      prettier: pluginPrettier,
      'simple-import-sort': simpleImportSort,
    },

    rules: {
      // ordenação de imports/exportações em todo o monorepo
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',

      // estilização centralizada pelo Prettier
      'prettier/prettier': [
        'error',
        {
          printWidth: 80,
          tabWidth: 2,
          singleQuote: true,
          trailingComma: 'all',
          arrowParens: 'always',
          semi: false,
          endOfLine: 'auto',
          // se usar Tailwind, pode ativar o plugin aqui:
          plugins: ['prettier-plugin-tailwindcss'],
        },
      ],
    },
  },
])
