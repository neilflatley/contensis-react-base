export const DataFormats = {
  entry: 'entry',
  webpage: 'webpage',
};

const sys = {
  contentTypeId: 'sys.contentTypeId',
  dataFormat: 'sys.dataFormat',
  filename: 'sys.properties.filename',
  id: 'sys.id',
  includeInSearch: 'sys.metadata.includeInSearch',
  slug: 'sys.slug',
  uri: 'sys.uri',
  versionStatus: 'sys.versionStatus',
};

export const Fields = {
  entryTitle: 'entryTitle',
  keywords: 'keywords',
  metaContent: 'metaContent',
  sys,
  contentTypeId: 'sys.contentTypeId',
  wildcard: '*',
};

export const Projects = {
  website: 'website',
};

export const VersionStatus = {
  published: 'published',
  latest: 'latest',
};

export const ContentTypes = {
  contentPage: 'contentPage',
  event: 'event',
  landingPage: 'landingPage',
  listingPage: 'listingPage',
  news: 'news',
};

export const WebpageFormats = {};

export const FilterExpressionTypes = {
  contentType: 'contentType',
  field: 'field',
};

export const CardTypes = {
  Event: 'Event',
  News: 'News',
  Profile: 'Profile',
  Webpage: 'Webpage',
};

export const Listings = {
  events: 'events',
  news: 'news',
};

export const SearchFacets = {
  all: 'all',
  products: 'products',
  help: 'helpandsupport',
  caseStudies: 'casestudies',
  partners: 'partners',
  news: 'news',
  pages: 'pages',
};

export const SearchFilters = {};

export const FreeTextWeights = {
  title: 100,
  description: 50,
  keywords: 50,
  content: 10,
};

export const RoutingFields = [
  Fields.sys.contentTypeId,
  Fields.sys.slug,
  Fields.sys.uri,
  Fields.entryTitle,
];
