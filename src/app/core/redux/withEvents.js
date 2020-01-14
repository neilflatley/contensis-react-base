// import { put } from 'redux-saga/effects';
// import { GET_SITE_CONFIG } from '~/core/redux/siteConfig/types';

export default {
  onRouteLoad: function* onRouteLoad({
    path,
    // location,
    // staticRoute,
  }) {
    // eslint-disable-next-line no-console
    yield console.log('onRouteLoadEvent', path);
  },
  onRouteLoaded: function* onRouteLoaded({
    path,
    // entry,
    // location,
    // staticRoute,
  }) {
    // eslint-disable-next-line no-console
    yield console.log('onRouteLoadedEvent', path);

    // const siteConfig = yield select(hasSiteConfig);

    // if (!siteConfig) {
    //   yield put({ type: GET_SITE_CONFIG });
    // }
  },
};
