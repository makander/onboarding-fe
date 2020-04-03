import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import ContentWrap from '../components/ContentWrap';
import { AuthContext } from '../context/AuthContex';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const ProtectedRoute = ({ component: Component, ...props }) => {
  const { authStatus } = useContext(AuthContext);

  return (
    <Route
      {...props}
      render={(props) =>
        authStatus.userIsAuthenticated ? (
          <>
            <Grid stackable columns={16}>
              <Grid.Row only="mobile tablet">
                <Navbar />
              </Grid.Row>
              <Grid.Row>
                <Grid.Column only="computer" width={3}>
                  <Sidebar />
                </Grid.Column>

                <Grid.Column centered tablet={14} computer={12}>
                  <Component {...props} />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </>
        ) : (
          <Redirect to={props.redirectTo ? props.redirectTo : '/'} />
        )
      }
    />
  );
};

export default ProtectedRoute;
