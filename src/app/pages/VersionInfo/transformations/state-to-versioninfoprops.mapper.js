import { default as mapJson } from '~/core/util/json-mapper';
import packagejson from '-/package.json';
import {
  selectBuildNumber,
  selectCommitRef,
  selectCurrentProject,
  selectVersionStatus,
} from '~/core/redux/selectors';

const versionInfoProps = {
  deliveryApi: () =>
    JSON.parse(
      JSON.stringify(DELIVERY_API_CONFIG /* global DELIVERY_API_CONFIG */)
    ),
  disabeSsrRedux: () => DISABLE_SSR_REDUX /* global DISABLE_SSR_REDUX*/,
  nodeEnv: () => process.env.NODE_ENV,
  packagejson: () => packagejson,
  projects: () => PROJECTS /* global PROJECTS */,
  proxyDeliveryApi: () => PROXY_DELIVERY_API /* global PROXY_DELIVERY_API */,
  publicUri: () => PUBLIC_URI /* global PUBLIC_URI */,
  project: state => selectCurrentProject(state),
  reverseProxyPaths: () => REVERSE_PROXY_PATHS /* global REVERSE_PROXY_PATHS */,
  servers: () => SERVERS /* global SERVERS */,
  version: {
    buildNumber: state => selectBuildNumber(state),
    commitRef: state => selectCommitRef(state),
    contensisVersionStatus: state => selectVersionStatus(state),
  },
};

const mapGlobalsToVersionInfo = state => mapJson(state, versionInfoProps);

export default mapGlobalsToVersionInfo;
