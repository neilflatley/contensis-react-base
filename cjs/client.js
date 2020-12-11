'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('isomorphic-fetch');
var Loadable = require('react-loadable');
var React = require('react');
var require$$9 = require('react-router-dom');
var require$$4 = require('react-redux');
var require$$0 = require('immutable');
require('history');
var App = require('./App-625b19b8.js');
require('contensis-delivery-api');
var routing = require('./routing-2e5b7b4f.js');
require('redux');
require('redux-immutable');
require('redux-thunk');
require('redux-saga');
var version = require('./version-b0defd1b.js');
var login = require('./login-cfa2f42f.js');
var queryString = require('query-string');
require('redux-saga/effects');
require('loglevel');
require('./ToJs-caf909b4.js');
require('contensis-management-api');
require('jsonpath-mapper');
require('await-to-js');
require('js-cookie');
require('react-router-config');
var require$$10 = require('react-hot-loader');
require('prop-types');
require('./RouteLoader-e8575dfd.js');
var reactDom = require('react-dom');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var queryString__default = /*#__PURE__*/_interopDefaultLegacy(queryString);

const fromJSLeaveImmer = (js, immerFeatureRootProps = null) => {
  console.info(js);
  if (typeof js !== 'object' || js === null) return js;
  if (!immerFeatureRootProps || !Object.keys(immerFeatureRootProps).length) return login.fromJSOrdered(js);
  const convertedObject = require$$0.OrderedMap();
  const keys = Object.keys(js);
  keys.forEach(key => {
    if (immerFeatureRootProps.indexOf(key) > -1) {
      convertedObject.set(key, js[key]);
      console.info(`LOOK! - immer untouched bar root key "${key}"`);
    } else {
      console.info(`LOOK! - normal immutable feature "${key}"`);
      convertedObject.set(key, login.fromJSOrdered(js));
    }
  });
};

class ClientApp {
  constructor(ReactApp, config) {
    const documentRoot = document.getElementById('root');
    const {
      routes,
      withReducers,
      withReducersImmer,
      withSagas,
      withEvents
    } = config;

    const GetClientJSX = store => {
      const ClientJsx = React__default['default'].createElement(require$$10.AppContainer, null, React__default['default'].createElement(require$$4.Provider, {
        store: store
      }, React__default['default'].createElement(require$$9.Router, {
        history: App.browserHistory
      }, React__default['default'].createElement(ReactApp, {
        routes: routes,
        withEvents: withEvents
      }))));
      return ClientJsx;
    };

    const isProduction = !(process.env.NODE_ENV != 'production');
    /**
     * Webpack HMR Setup.
     */

    const HMRRenderer = Component => {
      Loadable.preloadReady().then(() => {
        isProduction ? reactDom.hydrate(Component, documentRoot) : reactDom.render(Component, documentRoot);
      });
    };

    let store = null;
    const qs = queryString__default['default'].parse(window.location.search);
    const versionStatusFromHostname = App.deliveryApi.getClientSideVersionStatus();

    if (window.isDynamic || window.REDUX_DATA || process.env.NODE_ENV !== 'production') {
      store = App.createStore(withReducers, fromJSLeaveImmer(window.REDUX_DATA, withReducersImmer ? Object.keys(withReducersImmer) : null), App.browserHistory, withReducersImmer);
      store.dispatch(version.setVersionStatus(qs.versionStatus || versionStatusFromHostname));
      /* eslint-disable no-console */

      console.log('Hydrating from inline Redux');
      /* eslint-enable no-console */

      store.runSaga(App.rootSaga(withSagas));
      store.dispatch(routing.setCurrentProject(App.pickProject(window.location.hostname, qs)));
      delete window.REDUX_DATA;
      HMRRenderer(GetClientJSX(store));
    } else {
      fetch(`${window.location.pathname}?redux=true`).then(response => response.json()).then(data => {
        /* eslint-disable no-console */
        //console.log('Got Data Back');
        // console.log(data);

        /* eslint-enable no-console */
        const ssRedux = JSON.parse(data);
        store = App.createStore(withReducers, fromJSLeaveImmer(ssRedux, withReducersImmer ? Object.keys(withReducersImmer) : null), App.browserHistory, withReducersImmer); // store.dispatch(setVersionStatus(versionStatusFromHostname));

        store.runSaga(App.rootSaga(withSagas));
        store.dispatch(routing.setCurrentProject(App.pickProject(window.location.hostname, queryString__default['default'].parse(window.location.search)))); // if (typeof window != 'undefined') {
        //   store.dispatch(checkUserLoggedIn());
        // }

        HMRRenderer(GetClientJSX(store));
      });
    } // webpack Hot Module Replacement API


    if (module.hot) {
      module.hot.accept(ReactApp, () => {
        // if you are using harmony modules ({modules:false})
        HMRRenderer(GetClientJSX(store));
      });
    }
  }

}

exports.ReactApp = App.AppRoot;
exports.default = ClientApp;
//# sourceMappingURL=client.js.map
