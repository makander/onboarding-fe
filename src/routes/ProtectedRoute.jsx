import React, { useContext } from 'react';
import { Redirect } from '@reach/router';
import { AuthContext } from '../context/AuthContex';

const ProtectedRoute = ({ component: Component, ...props }) => {
  const { authStatus } = useContext(AuthContext);

  console.log(authStatus.userIsAuthenticated);
  console.log(props);
  console.log(Component);
  return authStatus.userIsAuthenticated ? <Component {...props} /> : <Redirect noThrow to="/" />;
};

export default ProtectedRoute;
