/* eslint no-underscore-dangle: "off" */

const Generator = require('yeoman-generator');
const dependencies = require('../app/dependencies');
const devDependencies = require('../app/devDependencies');
const extraPackages = require('../app/extraPackages');
const files = require('../app/files');
const helper = require('../app/helper');
const scripts = require('../app/scripts');

/**
 * Component generator instructions
 */
module.exports = class extends Generator {
  /**
   * To set required arguments.
   * @param {*} args
   * @param {*} opts
   */
  constructor(args, opts) {
    super(args, opts);

    // This makes `appname` a required argument.
    this.argument('name', {
      desc: 'Name of the package used for the name property in the package.json file and the construction of the repository URL of http://github.com.',
      type: String,
      required: false,
      default: this.appname.replace(/\s+/g, '-'),
    });
  }

  /**
   * Fetch inputs
   */
  async prompting() {
    const answers = await this.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Package name',
        default: this.options.name,
        validate: helper.required,
      },
      {
        type: 'input',
        name: 'description',
        message: 'Package description',
        validate: helper.required,
      },
      {
        type: 'input',
        name: 'version',
        message: 'Package version',
        default: '0.0.1',
        validate: helper.version,
      },
      {
        type: 'input',
        name: 'main',
        message: 'Package main',
        default: 'index.js',
        validate: helper.required,
      },
      {
        type: 'input',
        name: 'repository',
        message: 'Package repository',
        default: `https://github.com/control-fitness/${this.options.name}.git`,
        validate: helper.required,
      },
      {
        type: 'input',
        name: 'author',
        message: 'Package author',
        default: 'Paulo McNally <paulomcnally@gmail.com>',
        validate: helper.required,
      },
      {
        type: 'input',
        name: 'license',
        message: 'Package license',
        default: 'MIT',
        validate: helper.required,
      },
      {
        type: 'checkbox',
        name: 'packages',
        message: 'Extra dependencies',
        choices: Object.keys(extraPackages),
      },
      {
        type: 'input',
        name: 'className',
        message: 'Name of the main class',
        default: 'MyComponentName',
        validate: helper.className,
      },
    ]);

    // Copy template files
    this._copyTemplates(answers);

    // Create package.json file
    this._buildPackageJson(answers);
  }

  /**
   * Write a package.json based prompting answers
   */
  _buildPackageJson(answers) {
    const packageJson = {
      name: answers.name,
      version: answers.version,
      description: answers.description,
      main: answers.main,
      repository: answers.repository,
      author: answers.author,
      license: answers.license,
      files: [
        'dist',
      ],
      scripts,
      dependencies,
      devDependencies,
    };

    // Add more dependencies
    if (answers.packages.length > 0) {
      answers.packages.forEach((packageName) => {
        packageJson.dependencies[packageName] = extraPackages[packageName];
      });
    }

    // Extend or create package.json file in destination path
    this.fs.extendJSON(this.destinationPath('package.json'), packageJson);
  }

  /**
   * Copy template files
   * @param {Object} answers
   */
  _copyTemplates(answers) {
    files.build(answers).forEach((file) => {
      this.fs.copyTpl(
        this.templatePath(file.origin),
        this.destinationPath(file.destination),
        file.properties,
      );
    });
  }

  /**
   * Install package dependencies with yarn
   */
  install() {
    this.yarnInstall();
  }
};
