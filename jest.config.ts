import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  collectCoverage: true,
  errorOnDeprecated: true,
  verbose: true,
  globalSetup: '<rootDir>/__tests__/setup.ts',
  transform: { '^.+\\.(t|j)s$': 'ts-jest' },
  testRegex: '/__tests__/*',
  testPathIgnorePatterns: [
    '<rootDir>/__tests__/setup.ts'
  ],
  moduleFileExtensions: [
    'ts',
    'js',
    'json'
  ]
};

export default config;
