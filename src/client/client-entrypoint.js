import 'core-js';

// the entry point for the rest of the app
import ClientApp, { ReactApp } from 'zengenti-isomorphic-base/client';

import routes from '~/core/routes';
import withReducers from '~/core/redux/reducers';
import withSagas from '~/core/redux/sagas';
import withEvents from '~/core/redux/withEvents';

const config = {
  routes,
  withReducers,
  withSagas,
  withEvents,
};

new ClientApp(ReactApp, config);
