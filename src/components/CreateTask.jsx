import React, { useState } from 'react';
import {
  Button, Form, Segment, Header, TextArea, Select,
} from 'semantic-ui-react';

import TaskService from '../services/TaskService';

const CreateTask = ({ setTask, ListId }) => {
  const [list, setList] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [department, setDepartment] = useState('');
  // const [user, setUser] = useState('');


  const handleNewTask = () => {
    const newTask = {
      name: title,
      description,
      department,
      ListId,
      status: false,
    };

    TaskService.createTask(newTask).then((res) => {
      setTask(res.data);
      setTitle('');
      setDescription('');
      console.log(res);
    });
  };

  return (

    <Segment stacked>
      <Header textAlign="center">
        Create new task:
      </Header>
      <Form onSubmit={handleNewTask}>
        <Form.Field inline>
          <label>Title</label>
          <input name="title" placeholder="enter title" required onChange={(e) => setTitle(e.target.value)} />
        </Form.Field>
        <Form.Field inline>
          <label>Description</label>
          <TextArea placeholder="description" required onChange={(e) => setDescription(e.target.value)} />
        </Form.Field>
        <Form.Field inline>
          <label>Department</label>

          <Select placeholder="Select department or user" options={department} />
        </Form.Field>

        <Button type="submit">Submit</Button>
      </Form>
    </Segment>
  );
};

export default CreateTask;
