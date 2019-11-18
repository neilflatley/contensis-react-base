import ZengentiAppServer from 'zengenti-isomorphic-base';

import routes from '~/core/routes';
import withReducers from '~/core/redux/reducers';
import withSagas from '~/core/redux/sagas';

import ServerFeatures from './features/configure';

ZengentiAppServer.start(
  ZengentiAppServer.ReactApp,
  {
    routes,
    withReducers,
    withSagas,
    // The HTML templates we will render the app into
    templates: {
      html: 'dist/index.html',
      static: 'dist/index_static.html',
      fragment: 'dist/index_fragment.html',
    },
    dynamicPaths: [],
    reverseProxyPaths: Object.values(
      REVERSE_PROXY_PATHS /* global REVERSE_PROXY_PATHS */
    ),
    allowedGroups: ALLOWED_GROUPS /* global ALLOWED_GROUPS */,
    disableSsrRedux: DISABLE_SSR_REDUX /* global DISABLE_SSR_REDUX */,
    // Some information about the project and the build to pass to the start config
    packagejson: require('../../package.json'),
    stats: 'dist/static/react-loadable.json',
    versionData: 'dist/static/version.json',
  },
  // Configure any server-side features such as sitemap or REST api's
  ServerFeatures
);

const app = ZengentiAppServer.app;

app.emit('ready');

export { app };
