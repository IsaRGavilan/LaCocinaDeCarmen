import { Route, Redirect, RouteProps } from 'react-router-dom';
import React, { ComponentType } from 'react';


type ProtectedRouteProps = {
    component: ComponentType<any>;
    isAuthenticated: boolean;
  } & RouteProps;
  
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component, isAuthenticated, ...rest }) => {
  console.log('ProtectedRoute - isAuthenticated:', isAuthenticated);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthenticated) {
          return <Component {...props} />;
        } else {
          return <Redirect to="/inicioSesion" />;
        }
      }}
    />
  );
};

export default ProtectedRoute;
