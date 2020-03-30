import React from 'react';
import { Grid } from 'semantic-ui-react';

const ContentWrap = ({ children }) => (
  <Grid stackable columns={16}>
    {children}
  </Grid>
);

export default ContentWrap;
