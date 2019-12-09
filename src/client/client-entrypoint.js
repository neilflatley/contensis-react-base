import loadPolyfills from './loadPolyFills';
// the entry point for the rest of the app
import ClientApp from 'zengenti-isomorphic-base/client';

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

if (process.env.NODE_ENV == 'development') {
  new ClientApp(config);
} else {
  loadPolyfills().then(new ClientApp(config));
}
