import { navigation, routing, version } from 'zengenti-isomorphic-base/redux';

export const {
  hasNavigationTree,
  selectNavigationRoot,
  selectNavigationDepends,
} = navigation.selectors;

export const {
  selectCurrentAncestors,
  selectCurrentPath,
  selectCurrentProject,
  selectIsNotFound,
  selectRouteEntry,
  selectRouteEntryContentTypeId,
  selectRouteEntryDepends,
  selectRouteEntryEntryId,
  selectRouteEntryID,
  selectRouteEntrySlug,
  selectRouteLoading,
} = routing.selectors;

export const {
  selectCommitRef,
  selectBuildNumber,
  selectVersionStatus,
} = version.selectors;
