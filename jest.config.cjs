module.exports = {
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'js', 'vue', 'json'],
  transform: {
    '^.+\.ts$': 'ts-jest',
    '^.+\.js$': 'babel-jest',
    '^.+\.vue$': 'vue-jest',
  },
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/app/$1',
    '^@/(.*)$': '<rootDir>/app/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/app/components/**/*.vue',
    '<rootDir>/app/pages/**/*.vue',
  ],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(js|ts)$',
};