module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: [
      '@typescript-eslint',
    ],
    extends: [
      'eslint:recommended',
      'plugin:@next/next/recommended',
      'plugin:@typescript-eslint/recommended',
      'prettier',
    ],
  };
