import globals from "globals";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  {
    languageOptions: {
      sourceType: 'module',
      globals: {
        ...globals.browser,
        geolocator: 'readonly'
      }
    },
  rules: {
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'never']
    }
  },
  eslintConfigPrettier
]
