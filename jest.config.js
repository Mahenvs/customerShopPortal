export default {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  globals: {
    "import.meta": { VITE_PRODUCT_SEARCH: "https://mock-api-url.com/" }, // Mock `import.meta` for Jest
  },
  transformIgnorePatterns: [
    "/node_modules/(?!(axios)/)", // Ensure axios is transformed
  ],
  collectCoverage: true, // Enable coverage collection
  collectCoverageFrom: [
    "src/**/*.{js,jsx}", // Collect coverage from all JS/JSX files inside the src folder
    "!src/**/*.test.{js,jsx}", // Exclude test files from coverage collection
    "!src/**/node_modules/**", // Exclude node_modules folder
  ],
  coverageReporters: ["text", "lcov", "json"], // Formats for coverage reports
  coverageThreshold: {
    global: {
      branches: 80, // Require 80% branch coverage
      functions: 80, // Require 80% function coverage
      lines: 80, // Require 80% line coverage
      statements: 80, // Require 80% statement coverage
    },
  },
};
