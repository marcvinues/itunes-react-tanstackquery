import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],

  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/src/$1',

    // CSS / assets mock
    '\\.(css|scss|sass)$': 'identity-obj-proxy',
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/tests/__mocks__/fileMock.js',
  },

  setupFilesAfterEnv: ['<rootDir>/tests/setupTests.ts'],

  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: 'tsconfig.json' }],
  }
};

export default config;
