import React, { useEffect, useState } from 'react';
import { Segment } from 'semantic-ui-react';
import DepartmentService from '../services/DepartmentService';

const Department = ({ departmentsId }) => {
  const [department, setDepartment] = useState();

  useEffect(() => {
    DepartmentService.get(departmentsId).then((res) => setDepartment(res.data));
  }, []);
  console.log(departmentsId);
  return (
    <Segment>
      {/* {department.map((item) => <li>{item.name}</li>)} */}
      {console.log(department)}
      {department ? department.name : null}
    </Segment>
  );
};


export default Department;
