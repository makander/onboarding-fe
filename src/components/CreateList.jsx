import React, { useState, useContext } from 'react';
import { navigate } from '@reach/router';
import {
  Button, Form, Segment, Header, Card,
} from 'semantic-ui-react';
import { AuthContext } from '../context/AuthContex';

import ListService from '../services/ListService';
// import DepartmentService from './.../services/DepartmentService';

const CreateList = () => {
  const { authStatus: { user: { id } } } = useContext(AuthContext);

  const [department, setDepartment] = useState([]);
  const [list, setList] = useState([]);


  const handleNewList = () => {
    ListService.createList(id).then((res) => console.log(res));
  };

  return (
    <Segment stacked>
      <Header textAlign="center">
        Create new list
      </Header>
      <Form onSubmit={handleNewList}>
        <Form.Field>
          <input name="list" placeholder="Enter list name" required onChange={(e) => setList(e.target.value)} />
        </Form.Field>
        <Button type="submit">Create</Button>
      </Form>
    </Segment>
  );
};

export default CreateList;
