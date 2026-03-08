const common = {
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js', 'json'],
  transform: {'^.+\\.ts$': '@swc/jest'},
};

export default {
  projects: [
    {
      ...common,
      displayName: 'unit',
      testMatch: [`<rootDir>/src/**/*.test?(s).ts`],
    },
    {
      ...common,
      displayName: 'e2e',
      testMatch: [`<rootDir>/test/**/*.test?(s).ts`],
    },
  ],
};
