export default {
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js', 'json'],
  transform: {'^.+\\.ts$': '@swc/jest'},
  testMatch: ['<rootDir>/test/**/*.test.ts'],
};
