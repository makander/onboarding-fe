import React, { useState, useContext } from 'react';
import {
  Button, Form, Segment, Header, TextArea,
} from 'semantic-ui-react';
import { AuthContext } from '../context/AuthContex';

import ListService from '../services/ListService';
import DepartmentService from './.../services/DepartmentService';
import TaskService from '../services/Taskservice';

const CreateForm = ({ service }) => {
  const { authStatus: { user: { id } } } = useContext(AuthContext);

  const [select, setSelect] = useState([]);
  const [type, setType] = useState('');
  const [text, setText] = useState('');


  const handleSubmit = () => {
    const data = {
      name: type,
      text,
    };

    ListService.createList(id, data).then((res) => setNewList(res));
    setList('');
    setDescription('');
  };

  return (
    <Segment stacked>
      <Header textAlign="center">
        Create new list
      </Header>
      <Form onSubmit={handleNewList}>
        <Form.Field inline>
          <label>Title</label>

          <input name="list" placeholder="Enter list name" required onChange={(e) => setType(e.target.value)} />
        </Form.Field>
        <Form.Field inline>
          <label>Description</label>
          <TextArea placeholder="description" required onChange={(e) => setText(e.target.value)} />
        </Form.Field>
        <Button type="submit">Create</Button>
      </Form>
    </Segment>
  );
};

export default CreateList;
