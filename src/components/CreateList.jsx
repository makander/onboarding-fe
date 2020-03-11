import React, { useState, useContext } from 'react';
import {
  Button, Form, Segment, Header, TextArea,
} from 'semantic-ui-react';
import { AuthContext } from '../context/AuthContex';

import ListService from '../services/ListService';
// import DepartmentService from './.../services/DepartmentService';

const CreateList = ({ setNewList }) => {
  const {
    authStatus: {
      user: { id },
    },
  } = useContext(AuthContext);

  const [department, setDepartment] = useState([]);
  const [list, setList] = useState('');
  const [description, setDescription] = useState('');

  const handleNewList = () => {
    const data = {
      name: list,
      description,
    };

    ListService.createList(id, data)
      .then((res) => setNewList(res))
      .then(() => {
        setList('');
        setDescription('');
      });
  };

  return (
    <Segment stacked>
      <Header textAlign="center">Create new list</Header>
      <Form onSubmit={handleNewList}>
        <Form.Field inline>
          <label>Title</label>

          <input
            name="list"
            placeholder="Enter list name"
            required
            value={list}
            onChange={(e) => setList(e.target.value)}
          />
        </Form.Field>
        <Form.Field inline>
          <label>Desciption</label>
          <TextArea
            placeholder="description"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Field>
        <Button type="submit">Create</Button>
      </Form>
    </Segment>
  );
};

export default CreateList;
