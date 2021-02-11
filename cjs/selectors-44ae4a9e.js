'use strict';

var immutable = require('immutable');
var reducers = require('./reducers-0387eb16.js');
var selectors = require('./selectors-975b9ec9.js');
var redux = require('redux');
var reduxImmutable = require('redux-immutable');
var thunk = require('redux-thunk');
var createSagaMiddleware = require('redux-saga');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var thunk__default = /*#__PURE__*/_interopDefaultLegacy(thunk);
var createSagaMiddleware__default = /*#__PURE__*/_interopDefaultLegacy(createSagaMiddleware);

const ACTION_PREFIX = '@NAVIGATION/';
const GET_NODE_TREE = `${ACTION_PREFIX}_GET_NODE_TREE`;
const SET_NODE_TREE = `${ACTION_PREFIX}_SET_NODE_TREE`;
const GET_NODE_TREE_ERROR = `${ACTION_PREFIX}_GET_NODE_TREE_ERROR`;

var navigationTypes = /*#__PURE__*/Object.freeze({
  __proto__: null,
  GET_NODE_TREE: GET_NODE_TREE,
  SET_NODE_TREE: SET_NODE_TREE,
  GET_NODE_TREE_ERROR: GET_NODE_TREE_ERROR
});

const initialState = immutable.Map({
  root: null,
  treeDepends: new immutable.List([]),
  isError: false,
  isReady: false
});
var NavigationReducer = ((state = initialState, action) => {
  switch (action.type) {
    case SET_NODE_TREE:
      {
        return state.set('root', immutable.fromJS(action.nodes)).set('isReady', true);
      }

    case GET_NODE_TREE_ERROR:
      {
        return state.set('isError', true);
      }

    default:
      return state;
  }
});

let initialState$1 = immutable.OrderedMap({
  contentTypeId: null,
  currentPath: '/',
  currentNode: [],
  currentNodeAncestors: immutable.List(),
  currentProject: 'unknown',
  entryID: null,
  entry: null,
  currentTreeId: null,
  entryDepends: immutable.List(),
  isLoading: false,
  location: null,
  mappedEntry: immutable.OrderedMap(),
  nodeDepends: immutable.List(),
  notFound: false,
  staticRoute: null
});
var RoutingReducer = ((state = initialState$1, action) => {
  switch (action.type) {
    case selectors.SET_ANCESTORS:
      {
        if (action.ancestors) {
          return state.set('currentNodeAncestors', immutable.fromJS(action.ancestors));
        }

        return state.set('currentNodeAncestors', immutable.fromJS(action.ancestors));
      }

    case selectors.SET_ENTRY:
      {
        const {
          entry,
          mappedEntry,
          node = {},
          isLoading = false,
          notFound = false
        } = action;
        let nextState;

        if (!entry) {
          nextState = state.set('entryID', null).set('entry', null).set('mappedEntry', immutable.OrderedMap()).set('isLoading', isLoading).set('notFound', notFound);
        } else {
          nextState = state.set('entryID', action.id).set('entry', immutable.fromJS(entry)).set('isLoading', isLoading).set('notFound', notFound);
          if (mappedEntry && Object.keys(mappedEntry).length > 0) nextState = nextState.set('mappedEntry', immutable.fromJS(mappedEntry)).set('entry', immutable.fromJS({
            sys: entry.sys
          }));
        }

        if (!node) {
          return nextState.set('nodeDepends', null).set('currentNode', null);
        } else {
          // On Set Node, we reset all dependants.
          return nextState.set('currentNode', immutable.fromJS(node)).removeIn(['currentNode', 'entry']); // We have the entry stored elsewhere, so lets not keep it twice.
        }
      }

    case selectors.UPDATE_LOADING_STATE:
      {
        return state.set('isLoading', action.isLoading);
      }

    case selectors.SET_NAVIGATION_PATH:
      {
        let staticRoute = false;

        if (action.staticRoute) {
          staticRoute = { ...action.staticRoute
          };
        }

        if (action.path) {
          // Don't run a path update on initial load as we allready should have it in redux
          const entryUri = state.getIn(['entry', 'sys', 'uri']);

          if (entryUri != action.path) {
            return state.set('currentPath', immutable.fromJS(action.path)).set('location', immutable.fromJS(action.location)).set('staticRoute', immutable.fromJS({ ...staticRoute,
              route: { ...staticRoute.route,
                component: null
              }
            })).set('isLoading', typeof window !== 'undefined');
          } else {
            return state.set('location', immutable.fromJS(action.location)).set('staticRoute', immutable.fromJS({ ...staticRoute,
              route: { ...staticRoute.route,
                component: null
              }
            }));
          }
        }

        return state;
      }

    case selectors.SET_ROUTE:
      {
        return state.set('nextPath', action.path);
      }

    case selectors.SET_SIBLINGS:
      {
        // Can be null in some cases like the homepage.
        let currentNodeSiblingParent = null;
        let siblingIDs = [];

        if (action.siblings && action.siblings.length > 0) {
          currentNodeSiblingParent = action.siblings[0].parentId;
          siblingIDs = action.siblings.map(node => {
            return node.id;
          });
        }

        let currentNodeDepends = state.get('nodeDepends');
        const allNodeDepends = immutable.Set.union([immutable.Set(siblingIDs), currentNodeDepends]);
        return state.set('nodeDepends', allNodeDepends).set('currentNodeSiblings', immutable.fromJS(action.siblings)).set('currentNodeSiblingsParent', currentNodeSiblingParent);
      }

    case selectors.SET_SURROGATE_KEYS:
      {
        return state.set('surrogateKeys', action.keys);
      }

    case selectors.SET_TARGET_PROJECT:
      {
        return state.set('currentProject', action.project).set('currentTreeId', '') //getTreeID(action.project))
        .set('allowedGroups', immutable.fromJS(action.allowedGroups));
      }

    default:
      return state;
  }
});

const VERSION_PREFIX = '@VERSION/';
const SET_VERSION = `${VERSION_PREFIX}SET_VERSION`;
const SET_VERSION_STATUS = `${VERSION_PREFIX}SET_VERSION_STATUS`;

var versionTypes = /*#__PURE__*/Object.freeze({
  __proto__: null,
  SET_VERSION: SET_VERSION,
  SET_VERSION_STATUS: SET_VERSION_STATUS
});

let initialState$2 = immutable.Map({
  commitRef: null,
  buildNo: null,
  contensisVersionStatus: 'published'
});
var VersionReducer = ((state = initialState$2, action) => {
  switch (action.type) {
    case SET_VERSION_STATUS:
      {
        return state.set('contensisVersionStatus', action.status);
      }

    case SET_VERSION:
      {
        return state.set('commitRef', action.commitRef).set('buildNo', action.buildNo);
      }

    default:
      return state;
  }
});

/**
 * This middleware captures CALL_HISTORY_METHOD actions to redirect to the
 * provided history object. This will prevent these actions from reaching your
 * reducer or any middleware that comes after this one.
 */

/* eslint-disable no-unused-vars */

const routerMiddleware = history => store => next => action => {
  if (action.type !== selectors.CALL_HISTORY_METHOD) {
    return next(action);
  }

  const {
    payload: {
      method,
      args
    }
  } = action;
  history[method](...args);
};

exports.reduxStore = null;
var createStore = ((featureReducers, initialState, history) => {
  const thunkMiddleware = [thunk__default['default']];

  let reduxDevToolsMiddleware = f => f;

  if (typeof window != 'undefined') {
    reduxDevToolsMiddleware = window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f;
  }

  const sagaMiddleware = createSagaMiddleware__default['default']();
  const middleware = redux.compose(redux.applyMiddleware(...thunkMiddleware, sagaMiddleware, routerMiddleware(history)), reduxDevToolsMiddleware);
  let reducers$1 = {
    navigation: NavigationReducer,
    routing: RoutingReducer,
    user: reducers.UserReducer,
    version: VersionReducer,
    ...featureReducers
  };
  const combinedReducers = reduxImmutable.combineReducers(reducers$1);

  const store = initialState => {
    const store = redux.createStore(combinedReducers, initialState, middleware);
    store.runSaga = sagaMiddleware.run;

    store.close = () => store.dispatch(createSagaMiddleware.END);

    return store;
  };

  exports.reduxStore = store(initialState);
  return exports.reduxStore;
});

const setVersion = (commitRef, buildNo) => selectors.action(SET_VERSION, {
  commitRef,
  buildNo
});
const setVersionStatus = status => selectors.action(SET_VERSION_STATUS, {
  status
});

var versionActions = /*#__PURE__*/Object.freeze({
  __proto__: null,
  setVersion: setVersion,
  setVersionStatus: setVersionStatus
});

const hasNavigationTree = state => {
  return state.getIn(['navigation', 'isReady']);
};
const selectNavigationRoot = state => {
  return state.getIn(['navigation', 'root']);
};
const selectNavigationDepends = state => {
  return state.getIn(['navigation', 'treeDepends']);
};

var navigationSelectors = /*#__PURE__*/Object.freeze({
  __proto__: null,
  hasNavigationTree: hasNavigationTree,
  selectNavigationRoot: selectNavigationRoot,
  selectNavigationDepends: selectNavigationDepends
});

exports.GET_NODE_TREE = GET_NODE_TREE;
exports.GET_NODE_TREE_ERROR = GET_NODE_TREE_ERROR;
exports.SET_NODE_TREE = SET_NODE_TREE;
exports.createStore = createStore;
exports.hasNavigationTree = hasNavigationTree;
exports.navigationSelectors = navigationSelectors;
exports.navigationTypes = navigationTypes;
exports.setVersion = setVersion;
exports.setVersionStatus = setVersionStatus;
exports.versionActions = versionActions;
exports.versionTypes = versionTypes;
//# sourceMappingURL=selectors-44ae4a9e.js.map
