import React from 'react';
import { Grid } from 'semantic-ui-react';

const MainWrap = ({ children }) => (
  <Grid stackable columns={1}>
    {children}
  </Grid>
);

export default MainWrap;
