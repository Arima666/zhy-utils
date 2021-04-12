module.exports = {
  extends: ['taro/react'],
  parser: '@typescript-eslint/parser',
  rules: {
    'no-shadow': 'off',
    camelcase: 'off',
    '@typescript-eslint/camelcase': 0,
    '@typescript-eslint/no-unused-vars': [
      'warn',
      { varsIgnorePattern: 'Taro', args: 'none' }
    ],
    'no-unused-vars': ['warn', { varsIgnorePattern: 'Taro', args: 'none' }],
    'react/jsx-filename-extension': [
      1,
      { extensions: ['.js', '.jsx', '.tsx'] }
    ],
    'react-hooks/exhaustive-deps': [
      'warn',
      {
        additionalHooks: 'useUploadEffect'
      }
    ],

    '@typescript-eslint/member-delimiter-style': [
      'error',
      {
        multiline: {
          delimiter: 'semi',
          requireLast: true
        },
        singleline: {
          delimiter: 'semi',
          requireLast: false
        }
      }
    ],
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/no-empty-function': ['warn'],
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-var-requires': 0,
    'import/no-commonjs': 1,
    'import/prefer-default-export': 0,
    'react/sort-comp': 0,
    'jsx-quotes': 0
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    useJSXTextNode: true,
    project: './tsconfig.json'
  }
};
