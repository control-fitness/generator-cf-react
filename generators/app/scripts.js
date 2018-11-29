module.exports = {
  start: 'webpack-dev-server',
  eslint: 'node_modules/eslint/bin/eslint.js . --ext .js',
  docs: 'NODE_ENV=production webpack -p',
  build: `babel src -d dist --ignore '**/*.test.js'`,
  clean: 'rm -rf dist',
  dist: 'npm run clean && npm run build',
  test: 'yarn run dist && jest'
};
