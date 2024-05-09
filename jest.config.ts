// jest.config.js
export default {
  // Specify the test environment
  testEnvironment: 'jsdom',
  
  // Specify the file extensions for testing
  moduleFileExtensions: ['js', 'mjs', 'jsx', 'tsx', 'ts'],

  // Transform files with these extensions using babel-jest
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },

  // Ensure Jest runs in ESM mode
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
};
