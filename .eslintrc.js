// FILE: .eslintrc.js
module.exports = {
  extends: ['next/core-web-vitals'],
  rules: {
    // Text quotes inside JSX
    'react/no-unescaped-entities': 'off',
    // Allow plain <img> temporarily (or change to 'warn')
    '@next/next/no-img-element': 'off',

    // Common TypeScript hygiene: relax temporarily
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/ban-ts-comment': 'warn',
    '@typescript-eslint/no-unsafe-function-type': 'warn',
    '@typescript-eslint/no-unused-expressions': 'warn',

    // Style relaxations seen in logs
    'prefer-const': 'warn',
  },
};
