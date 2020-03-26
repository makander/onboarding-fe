import React from 'react';
import { Grid } from 'semantic-ui-react';

const MainWrap = ({ children }) => (
  <Grid.Column width={13} textAlign="center" color="orange">
    {children}
  </Grid.Column>
);

export default MainWrap;
