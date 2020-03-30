import React, { useState } from 'react';
import { Form, Segment } from 'semantic-ui-react';

import TaskService from '../services/TaskService';

const CreateTask = ({ setTask, listsId }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // const [user, setUser] = useState('');

  const handleNewTask = () => {
    const newTask = {
      name: title,
      description,
      ListId: listsId,
      status: false,
    };

    TaskService.createTask(newTask).then((res) => {
      setTask(res.data);
      setTitle('');
      setDescription('');
    });
  };

  return (
    <>
      <Segment>
        <Form.Group>
          <Form onSubmit={handleNewTask}>
            <Form.Input
              placeholder="Title"
              label="Title"
              type="text"
              value={title}
              onChange={setTitle}
            />

            <Form.TextArea
              placeholder="Description"
              label="Description"
              inputValue={description}
              setInputValue={setDescription}
              name="textarea"
            />

            <Form.Button type="submit">Save</Form.Button>
          </Form>
        </Form.Group>
      </Segment>
    </>
  );
};

export default CreateTask;
