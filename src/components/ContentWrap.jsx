import React from 'react';
import {
  Grid,
} from 'semantic-ui-react';

const ContentWrap = ({ children }) => (
  <Grid columns={1} textAlign="center" centered>
    <Grid.Column width={12} textAlign="center">
      {children}
    </Grid.Column>
  </Grid>
);

export default ContentWrap;
