import React, { lazy } from 'react';

let routeConfig = [
  {
    path: '/',
    component: lazy(() => import(/* webpackChunkName: "price" */'@/page/Dashboard'))
  }
];


export default routeConfig;
