import React, { useState, useContext } from 'react';
import { Form, Segment, Header } from 'semantic-ui-react';

import TaskService from '../../services/TaskService';
import { MessageContext } from '../../context/MessageContext';

const CreateTask = ({ setTask, listsId }) => {
  const { dispatchMessage } = useContext(MessageContext);
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

    TaskService.createTask(newTask)
      .then((res) => {
        setTask(res.data);
        setTitle('');
        setDescription('');
      })
      .catch((error) => {
        dispatchMessage({
          type: 'ERROR',
          payload: error.response.data,
        });
      });
  };

  return (
    <div>
      <Header as="h3" attached="top">
        Create task
      </Header>

      <Segment attached>
        <Form.Group>
          <Form onSubmit={handleNewTask}>
            <Form.Input
              placeholder="Title"
              label="Title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <Form.TextArea
              placeholder="Description"
              label="Description"
              onChange={(e) => setDescription(e.target.value)}
              name="textarea"
            />

            <Form.Button type="submit">Save</Form.Button>
          </Form>
        </Form.Group>
      </Segment>
    </div>
  );
};

export default CreateTask;
