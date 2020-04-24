import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { hot } from 'react-hot-loader';

// import { ThemeProvider } from 'styled-components';
import { RouteLoader } from '@zengenti/contensis-react-base/routing';
import { Loading } from '~/core/routes/Loading';
import NotFound from '~/pages/NotFound';
import { selectRouteLoading } from './core/redux/selectors';

const AppRoot = props => {
  const stateLoading = useSelector(selectRouteLoading);
  const [isLoading, setIsLoading] = useState(stateLoading);
  useEffect(() => {
    setIsLoading(stateLoading);
  }, [stateLoading]);
  return (
    <>
      {isLoading && <Loading {...props} />}
      <RouteLoader {...props} notFoundComponent={NotFound} />
    </>
  );
};

export default hot(module)(AppRoot);
