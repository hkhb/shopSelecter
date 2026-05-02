/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: "node",
  testMatch: ["<rootDir>/tests/unit/**/*.spec.ts"],
  transform: {
    "^.+\\.ts$": ["babel-jest", { configFile: "./babel.config.cjs" }],
  },
  moduleNameMapper: {
    "^~/(.*)$": "<rootDir>/app/$1",
    "^@/(.*)$": "<rootDir>/app/$1",
  },
};