module.exports = (resolve, rootDir) => {
  const config = {
    collectCoverageFrom: [
      'src/**/*.{js}',
    ],
    testEnvironment: 'node',
    testMatch: [
      '<rootDir>/src/**/?(*.)(spec|test).js?(x)',
    ],
    transform: {
      '^.+\\.(js)$': require.resolve('babel-jest'),
      '^(?!.*\\.(js|mjs|json)$)': resolve('config/jest/fileTransform.js'),
    },
    setupFilesAfterEnv: [resolve('config/jest/setupTests.js')],
    transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|mjs)$'],
    moduleFileExtensions: [
      'web.js',
      'js',
      'json',
      'node',
    ],
  }
  if (rootDir) {
    config.rootDir = rootDir
  }

  return config
}
