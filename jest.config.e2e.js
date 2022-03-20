module.exports = {
  name: 'API integration tests',
  testMatch: ['**/?(*.)+(spec|test).e2e.js'],
  testEnvironment: 'node',
  coveragePathIgnorePatterns: ['<rootDir>/node_modules/'],
  transform: {},
  modulePathIgnorePatterns: ['.cache'],
};
