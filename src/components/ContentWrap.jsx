import React from 'react';
import { Grid } from 'semantic-ui-react';
import Sidebar from './Sidebar';

const ContentWrap = ({ children }) => <Grid columns={1}>{children}</Grid>;

export default ContentWrap;
