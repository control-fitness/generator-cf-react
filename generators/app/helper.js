const chalk = require('chalk');

// https://github.com/micromata/generator-http-fake-backend/blob/master/generators/app/promptingHelpers.js
const helper = {};

/**
 * Use to validate version in semver format
 * https://github.com/semver/semver/issues/232#issuecomment-405596809
 * @param {String} value
 */
helper.version = function version(value) {
  let returnValue = true;
  const check = value.match(/^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/g);

  if (check === null) {
    returnValue = chalk.red('Semantic versioning is required. More information at https://semver.org/');
  }
  return returnValue;
};

/**
 * Validate className format like MyComponent.
 * http://rubular.com/r/v5c8GPU562
 * @param {String} value
 */
helper.className = function className(value) {
  let returnValue = true;
  const check = value.match(/^((\d)|([A-Z0-9][a-z0-9]+))*([A-Z])?$/g);

  if (check === null) {
    returnValue = chalk.red('The correct format should be something like MyComponent');
  }
  return returnValue;
};

/**
 * Check if value is empty
 * @param {String} value
 */
helper.required = function required(value) {
  let returnValue = true;
  if (value === '') {
    returnValue = chalk.red('This field is required.');
  }
  return returnValue;
};

module.exports = helper;
