var prettierConfig = require('./prettier.config');

var config = {
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  env: {
    browser: true,
    node: true,
    es6: true
  }
};

if (process.env.NODE_ENV === 'lint') {
  config = Object.assign(
    config, {
    extends: [
      'airbnb',
      'prettier'
    ],
    plugins: ['prettier'],
    rules: {
      'import/extensions': 0,
      'import/no-extraneous-dependencies': 0,
      'import/no-unresolved': 0,
      'import/prefer-default-export': 0,
      'react/jsx-indent-props': 0,
      'react/jsx-indent': 0,
      'react/jsx-closing-bracket-location':0,
      'react/jsx-filename-extension': 0,
      'react/require-default-props': 0,
      'prettier/prettier': ['error', prettierConfig],
    },
  });
}

module.exports = config;