import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import ContentWrap from '../components/ContentWrap';
import Sidebar from '../components/Sidebar';
import { AuthContext } from '../context/AuthContex';
import MainWrap from '../components/MainWrap';

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
