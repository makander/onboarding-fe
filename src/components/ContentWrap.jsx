import React from 'react';
import { Grid } from 'semantic-ui-react';
import Sidebar from './Sidebar';

const ContentWrap = ({ children }) => (
  <Grid stackable columns={16} style={{ height: '100vh' }}>
    {children}
  </Grid>
);

export default ContentWrap;
