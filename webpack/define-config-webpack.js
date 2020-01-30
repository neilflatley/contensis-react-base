const defineConfig = require('./define-config').build;
const { stringifyStrings } = require('zengenti-isomorphic-base/util');

module.exports = {
  base: stringifyStrings(defineConfig),
  dev: {
    __isBrowser__: 'true',
  },
  prod: {
    __isBrowser__: 'false',
  },
};
