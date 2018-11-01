/**
 * To include redux folder structure.
 * @param {Object} answers
 */
const redux = function redux(answers) {
  const withRedux = answers.packages.includes('redux') && answers.packages.includes('react-redux');
  const templates = [];

  if (withRedux) {
    // store
    templates.push({
      origin: 'src/store.js.ejs',
      destination: 'src/store.js',
      properties: {},
    });

    // actions
    templates.push({
      origin: 'src/actions/index.js.ejs',
      destination: 'src/actions/index.js',
      properties: {},
    });

    // containers
    templates.push({
      origin: 'src/containers/index.js.ejs',
      destination: 'src/containers/index.js',
      properties: {},
    });

    // reducers
    templates.push({
      origin: 'src/reducers/index.js.ejs',
      destination: 'src/reducers/index.js',
      properties: {},
    });
  }

  return templates;
};

const files = {};

/**
 * Root files
 */
files.build = function root(answers) {
  const templates = [
    {
      origin: '.babelrc.ejs',
      destination: '.babelrc',
      properties: {},
    },
    {
      origin: '.eslintrc.json.ejs',
      destination: '.eslintrc.json',
      properties: {},
    },
    {
      origin: '.gitignore.ejs',
      destination: '.gitignore',
      properties: {},
    },
    {
      origin: '.npmignore.ejs',
      destination: '.npmignore',
      properties: {},
    },
    {
      origin: '.eslintignore.ejs',
      destination: '.eslintignore',
      properties: {},
    },
    {
      origin: 'index.js.ejs',
      destination: 'index.js',
      properties: {},
    },
    {
      origin: 'README.md.ejs',
      destination: 'README.md',
      properties: {
        name: answers.name,
        description: answers.description,
        repository: answers.repository,
      },
    },
    {
      origin: 'webpack.config.js.ejs',
      destination: 'webpack.config.js',
      properties: {},
    },
    {
      origin: 'LICENSE.ejs',
      destination: 'LICENSE',
      properties: {},
    },
    {
      origin: 'src/components/Base.js.ejs',
      destination: `src/components/${answers.className}.js`,
      properties: {
        className: answers.className,
        redux: answers.packages.includes('redux') && answers.packages.includes('react-redux'),
      },
    },
    {
      origin: 'src/index.js.ejs',
      destination: 'src/index.js',
      properties: {
        className: answers.className,
      },
    },
    {
      origin: 'docs/App.js.ejs',
      destination: 'docs/App.js',
      properties: {
        className: answers.className,
      },
    },
    {
      origin: 'docs/entry.js.ejs',
      destination: 'docs/entry.js',
      properties: {},
    },
    {
      origin: 'docs/index.html.ejs',
      destination: 'docs/index.html',
      properties: {
        name: answers.name,
        semanticUiReact: answers.packages.includes('semantic-ui-react'),
        reactCfHelperI18n: answers.packages.includes('react-cf-helper-i18n'),
      },
    },
  ];

  return templates.concat(redux(answers));
};

module.exports = files;
