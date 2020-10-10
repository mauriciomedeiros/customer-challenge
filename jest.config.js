const { resolve } = require('path');

module.exports = {
  rootDir: resolve(__dirname),
  preset: 'ts-jest',
  testMatch: ['<rootDir>/test/**/*.spec.ts'],
  clearMocks: true,
  displayName: 'Test',
  moduleNameMapper: {
    '@src/(.*)': '<rootDir>/src/$1',
    '@test/(.*)': '<rootDir>/test/$1',
  },
  testEnvironment: 'node',
};