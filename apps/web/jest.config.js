const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  testEnvironment: 'jest-environment-jsdom',
  testMatch: ['**/__tests__/**/*.spec.[jt]s?(x)'],
};

module.exports = createJestConfig(customJestConfig);
