import React, { useContext } from 'react';
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
