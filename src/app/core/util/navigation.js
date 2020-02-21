import queryString from 'query-string';

export function queryParams(search) {
  return queryString.parse(
    typeof window != 'undefined' ? window.location.search : search
  );
}
export const routeParams = staticRoute =>
  staticRoute && staticRoute.match ? staticRoute.match.params : {};

export const buildUrl = (route, params) => {
  const qs = queryString.stringify(params);
  const path = qs ? `${route}?${qs}` : route;
  return path;
};
