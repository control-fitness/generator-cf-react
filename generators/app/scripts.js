module.exports = {
  start: 'webpack-dev-server',
  eslint: 'node_modules/eslint/bin/eslint.js src/**',
  docs: 'NODE_ENV=production webpack -p',
  build: 'babel src -d dist',
  clean: 'rm -rf dist',
  dist: 'yarn run clean && yarn run build',
};
