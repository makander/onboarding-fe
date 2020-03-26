import React from 'react';
import { Grid } from 'semantic-ui-react';
import Sidebar from './Sidebar';

const ContentWrap = ({ children }) => (
  <Grid columns={1}>
    <Grid.Row>{children}</Grid.Row>
  </Grid>
);

export default ContentWrap;
