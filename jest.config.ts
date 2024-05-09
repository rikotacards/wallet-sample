const config = {
  // Specify the test environment
  testEnvironment: 'jsdom',
  
  // Match files with these extensions for testing
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],

  // Transform files with these extensions using ts-jest
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest', // Add babel-jest for JS/JSX files if needed
  },

  // Test regex patterns to match test files
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',

  // Setup files to run before each test
};

export default config