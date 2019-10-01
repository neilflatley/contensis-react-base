// import React from 'react';
import Loadable from 'react-loadable';
import { Loading } from './Loading';
import Homepage from '~/pages/Home/Homepage';

export default [
  {
    path: '/',
    exact: true,
    component: Homepage,
  },
  {
    path: '/404',
    exact: true,
    component: Loadable({
      loader: () => import('~/pages/NotFound'),
      loading: Loading,
    }),
  },
  {
    path: '/zenInfo',
    exact: true,
    component: Loadable({
      loader: () => import('~/pages/VersionInfo'),
      loading: Loading,
    }),
  },
];
