import 'isomorphic-fetch';
import { preloadReady } from 'react-loadable';
import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { OrderedMap } from 'immutable';
import 'history';
import { d as deliveryApi, c as createStore, r as rootSaga, p as pickProject, b as browserHistory } from './App-babb384c.js';
export { A as ReactApp } from './App-babb384c.js';
import 'contensis-delivery-api';
import { s as setCurrentProject } from './routing-920ca0ae.js';
import 'redux';
import 'redux-immutable';
import 'redux-thunk';
import 'redux-saga';
import { s as setVersionStatus } from './version-fea56161.js';
import { f as fromJSOrdered } from './login-684376c7.js';
import queryString from 'query-string';
import 'redux-saga/effects';
import 'loglevel';
import './ToJs-1c73b10a.js';
import 'contensis-management-api';
import 'jsonpath-mapper';
import 'await-to-js';
import 'js-cookie';
import 'react-router-config';
import { AppContainer } from 'react-hot-loader';
import 'prop-types';
import './RouteLoader-9bd2cf1a.js';
import { hydrate, render } from 'react-dom';

const fromJSLeaveImmer = (js, immerFeatureRootProps = null) => {
  console.info(js);
  if (typeof js !== 'object' || js === null) return js;
  if (!immerFeatureRootProps || !Object.keys(immerFeatureRootProps).length) return fromJSOrdered(js);
  const convertedObject = OrderedMap();
  const keys = Object.keys(js);
  keys.forEach(key => {
    if (immerFeatureRootProps.indexOf(key) > -1) {
      convertedObject.set(key, js[key]);
      console.info(`LOOK! - immer untouched bar root key "${key}"`);
    } else {
      console.info(`LOOK! - normal immutable feature "${key}"`);
      convertedObject.set(key, fromJSOrdered(js));
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
      const ClientJsx = React.createElement(AppContainer, null, React.createElement(Provider, {
        store: store
      }, React.createElement(Router, {
        history: browserHistory
      }, React.createElement(ReactApp, {
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
      preloadReady().then(() => {
        isProduction ? hydrate(Component, documentRoot) : render(Component, documentRoot);
      });
    };

    let store = null;
    const qs = queryString.parse(window.location.search);
    const versionStatusFromHostname = deliveryApi.getClientSideVersionStatus();

    if (window.isDynamic || window.REDUX_DATA || process.env.NODE_ENV !== 'production') {
      store = createStore(withReducers, fromJSLeaveImmer(window.REDUX_DATA, withReducersImmer ? Object.keys(withReducersImmer) : null), browserHistory, withReducersImmer);
      store.dispatch(setVersionStatus(qs.versionStatus || versionStatusFromHostname));
      /* eslint-disable no-console */

      console.log('Hydrating from inline Redux');
      /* eslint-enable no-console */

      store.runSaga(rootSaga(withSagas));
      store.dispatch(setCurrentProject(pickProject(window.location.hostname, qs)));
      delete window.REDUX_DATA;
      HMRRenderer(GetClientJSX(store));
    } else {
      fetch(`${window.location.pathname}?redux=true`).then(response => response.json()).then(data => {
        /* eslint-disable no-console */
        //console.log('Got Data Back');
        // console.log(data);

        /* eslint-enable no-console */
        const ssRedux = JSON.parse(data);
        store = createStore(withReducers, fromJSLeaveImmer(ssRedux, withReducersImmer ? Object.keys(withReducersImmer) : null), browserHistory, withReducersImmer); // store.dispatch(setVersionStatus(versionStatusFromHostname));

        store.runSaga(rootSaga(withSagas));
        store.dispatch(setCurrentProject(pickProject(window.location.hostname, queryString.parse(window.location.search)))); // if (typeof window != 'undefined') {
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

export default ClientApp;
//# sourceMappingURL=client.js.map
