import React ,{Suspense } from 'react';
import { Route,Switch,Redirect } from 'react-router-dom';

import routesMap from './routerConfig';
// import commonApi from '@/api/Common';
import Loading from '@/components/Loading';

export default function Routes() {

  return (
    <Suspense fallback={<Loading withwrap />}>
      <Switch>
        {routesMap.map((route,index) => {
          if(route.routeComp) {
            return route.routeComp;
          }

          if(route.redirect) {
            return <Redirect exact key={'redirect_'+index} from={route.from} to={route.to} />;
          }

          return <Route key={'route_'+index} path={route.path} exact component={route.component} />;

        })}
      </Switch>
    </Suspense>
  );

}
