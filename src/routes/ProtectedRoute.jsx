/* eslint-disable react/jsx-boolean-value */
import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Grid, Container } from 'semantic-ui-react';
import { AuthContext } from '../context/AuthContext';
import Sidebar from '../components/navigation/Sidebar';
/* import Navbar from '../components/navigation/Navbar';
 */
const ProtectedRoute = ({ component: Component, ...props }) => {
  const { authStatus } = useContext(AuthContext);

  return (
    <Route
      {...props}
      render={(props) =>
        authStatus.userIsAuthenticated ? (
          <>
            <Sidebar />
            <Container>
              <Component {...props} />
            </Container>
          </>
        ) : (
          <Redirect to={props.redirectTo ? props.redirectTo : '/'} />
        )
      }
    />
  );
};

export default ProtectedRoute;
