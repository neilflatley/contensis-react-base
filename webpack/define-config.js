const packagejson = require('../package.json');
require('custom-env').env(process.env.env || process.env.npm_config_env);

const { PUBLIC_URL, ALIAS, INTERNAL_VIP, ACCESS_TOKEN, PROJECT } = process.env;

const PROJECTS = env => [
  {
    id: env.PROJECT,
    publicUri: env.PUBLIC_URL,
  },
  // You only need to include extra projects in this array
  // if you wish to switch between projects at runtime,
  // or fetch data from another project
  // ˅˅˅˅˅˅˅˅
  {
    id: 'mock',
    publicUri: 'mock.ludlow.ac.uk',
  },
  // ˄˄˄˄˄˄˄˄
];

// any paths to proxy back to the classic IIS servers?
const REVERSE_PROXY_PATHS = [
  '/image-library/*',
  '/video-library/*',
  '/asset-library/*',
];

const ALLOWED_GROUPS = {
  // 1 is Everyone, -1 is false (no security)
  website: [-1],
  mock: [-1],
  intranet: [1],
};

// --------------------
// End of configuration
// --------------------

const url = () => {
  const alias = ALIAS;
  const project = PROJECT;
  const projectAndAlias =
    project && project != 'website' ? `${project}-${alias}` : alias;
  return {
    cms: `https://cms-${alias}.cloud.contensis.com`,
    previewWeb: `https://preview-${projectAndAlias}.cloud.contensis.com`,
    liveWeb: `https://live-${projectAndAlias}.cloud.contensis.com`,
    iisWeb: `https://iis-live-${projectAndAlias}.cloud.contensis.com`,
  };
};

const SERVERS = {
  alias: ALIAS,
  internalVip: INTERNAL_VIP,
  cms: url().cms,
  web: url().liveWeb,
  iis: url().iisWeb,
};

const DELIVERY_API_CONFIG = {
  rootUrl: url().cms,
  accessToken: ACCESS_TOKEN,
  projectId: PROJECTS(process.env)[0].id,
  livePublishingRootUrl: url().previewWeb,
};

const development = {
  __isBrowser__: true,
  DELIVERY_API_CONFIG,
  DISABLE_SSR_REDUX: false,
  PROJECTS: PROJECTS(process.env),
  ALLOWED_GROUPS,
  PROXY_DELIVERY_API: false,
  PUBLIC_URI: PUBLIC_URL,
  REVERSE_PROXY_PATHS,
  SERVERS,
  VERSION: packagejson.version,
};

const production = {
  __isBrowser__: false,
  DISABLE_SSR_REDUX: false,
  ALLOWED_GROUPS,
  PROXY_DELIVERY_API: false,
  REVERSE_PROXY_PATHS,
  VERSION: packagejson.version,
};

module.exports.build =
  process.env.NODE_ENV == 'production' ? production : development;

module.exports.PROJECTS = PROJECTS;
