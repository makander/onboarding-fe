import React, { useContext } from 'react';
import { Redirect } from '@reach/router';
import { AuthContext } from '../context/AuthContex';

const ProtectedRoute = ({ component: Component, ...props }) => {
  const { authStatus } = useContext(AuthContext);

  return authStatus.userIsAuthenticated ? <Component {...props} /> : <Redirect noThrow to="/" />;
};

export default ProtectedRoute;
