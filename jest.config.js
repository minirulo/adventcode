const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig');

module.exports = {
  moduleFileExtensions: [
    'js',
    'ts',
    'json'
  ],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testMatch:[ "**/tests/**/*.ts",],
  coverageDirectory: "tests/.coverage-jest",
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' } )
};
