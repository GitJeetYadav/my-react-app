export default {
  preset: "./node_modules/vite-jest/index.js",
  testEnvironment: 'jest-environment-jsdom',
  transform: {
      '^.+\\.jsx?$': 'babel-jest',
  },
  moduleDirectories: ['node_modules'],
  moduleFileExtensions: ['js', 'jsx'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    "\\.(css|less|scss|sass|jpg)$": "identity-obj-proxy", // Mock CSS imports
  },
};

