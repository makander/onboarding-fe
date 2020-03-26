import React from 'react';
import { Grid } from 'semantic-ui-react';

const MainWrap = ({ children }) => (
  <Grid.Column width={13} color="orange" relaxed container>
    <Grid>{children}</Grid>
  </Grid.Column>
);

export default MainWrap;
