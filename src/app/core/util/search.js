import { Op, Query } from 'contensis-delivery-api';
import { selectVersionStatus } from '~/core/redux/selectors/version';

export function getSearchQuery(state, facet, pageIndex, pageSize = 10) {
  //const searchTerm = selectCurrentKeyword(state);
  const versionStatus = selectVersionStatus(state);
  let expressions = [
    ...getDefaultExpressions(versionStatus),
    //...getContentTypeExpression(facet),
    // ...getFilterExpressions(search)
  ];
  // Need to add study mode not sure about where data comes from...

  // let test = getCourseExpressions(state, facet);

  /* eslint-disable no-console */
  // console.log(test);
  /* eslint-enable no-console */

  const query = new Query(...expressions);
  query.pageIndex = pageIndex || 0;
  // query.fields = internalGetSearchFacetFields(facet);
  query.pageSize = pageSize;
  return query;
}
export function fixFreeTextForElastic(s) {
  let illegalChars = ['>', '<'];
  let encodedChars = [
    '+',
    '-',
    '=',
    '&',
    '|',
    '!',
    '(',
    ')',
    '{',
    '}',
    '[',
    ']',
    '^',
    '"',
    '~',
    '*',
    '?',
    ':',
    '\\',
    '/',
  ];

  let illegalRegEx = new RegExp(illegalChars.map(c => '\\' + c).join('|'), 'g');
  let encodedRegEx = new RegExp(encodedChars.map(c => '\\' + c).join('|'), 'g');

  s = s.replace(illegalRegEx, '');
  s = s.replace(encodedRegEx, ''); // (m) => '\\\\' + m);
  return s;
}

function getDefaultExpressions(versionStatus) {
  return [
    Op.equalTo('sys.versionStatus', versionStatus),
    // Op.or(
    //   Op.and(
    //     Op.exists('sys.metadata.includeInSearch', true),
    //     Op.equalTo('sys.metadata.includeInSearch', true)
    //   ),
    //   Op.exists('sys.metadata.includeInSearch', false)
    // ),
  ];
}
