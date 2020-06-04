module.exports = {
  collectCoverageFrom: [
    'src/**/*.ts',
    '!**/*.d.ts',
    '!**/types.ts',
    '!**/*.spec.*',
    '!dist/**/*',
    '!src/index.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 100,
      lines: 95,
    },
  },
  transform: {
    '^.+.(ts)$': 'ts-jest',
  },
  coverageReporters: ['lcov'],
  reporters: ['default', 'jest-junit'],
  // eslint-disable-next-line
  testRegex: '.*spec\.ts$'
}
