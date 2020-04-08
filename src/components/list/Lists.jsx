import React, { useEffect, useState, useContext } from 'react';
import { Grid, Header, List, Button, Segment } from 'semantic-ui-react';
import AdminLists from './AdminLists';
import EmployeeLists from './EmployeeLists';
import { AuthContext } from '../../context/AuthContext';

const Lists = () => {
  const {
    authStatus: { user },
  } = useContext(AuthContext);

  return <>{user.admin ? <AdminLists /> : <EmployeeLists />}</>;
};

export default Lists;
