import 'core-js';

import ClientApp from './client'; // the entry point for the rest of the app
import ReactApp from '~/App';
// import ClientApp, { ReactApp } from '../../client';

import routes from '~/core/routes';
import withReducers from '~/core/redux/reducers.js';
import withReducersImmer from '~/core/redux/reducersImmer.js';
import withSagas from '~/core/redux/sagas.js';
import withEvents from '~/core/redux/withEvents';

const config = {
  routes,
  withReducers,
  withReducersImmer,
  withSagas,
  withEvents,
};

new ClientApp(ReactApp, config);
