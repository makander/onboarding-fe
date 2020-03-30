import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import ContentWrap from '../components/ContentWrap';
import { AuthContext } from '../context/AuthContex';
import Sidebar from '../components/Sidebar';

const ProtectedRoute = ({ component: Component, ...props }) => {
  const { authStatus } = useContext(AuthContext);

  return (
    <Route
      {...props}
      render={(props) =>
        authStatus.userIsAuthenticated ? (
          <ContentWrap>
            <Sidebar />

            <Component {...props} />
          </ContentWrap>
        ) : (
          <Redirect to={props.redirectTo ? props.redirectTo : '/'} />
        )
      }
    />
  );
};

export default ProtectedRoute;
