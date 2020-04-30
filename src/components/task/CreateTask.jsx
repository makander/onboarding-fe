import React, { useState, useContext, useEffect } from 'react';
import { Form, Segment, Header, Message } from 'semantic-ui-react';
import * as yup from 'yup';
import { useForm, ErrorMessage, Controller } from 'react-hook-form';

import TaskService from '../../services/TaskService';
import { MessageContext } from '../../context/MessageContext';

const TaskSchema = yup.object().shape({
  name: yup.string().min(5).required('You have to enter a title'),
});

const defaultValues = {
  name: '',
  description: '',
};

const CreateTask = ({ setTask, listsId }) => {
  const { register, errors, handleSubmit, control, reset } = useForm({
    validationSchema: TaskSchema,
    defaultValues,
  });
  const { dispatchMessage } = useContext(MessageContext);

  useEffect(() => {
    register({ name: 'name' });
    register({ name: 'description' });
  }, []);

  const handleNewTask = async (data, e) => {
    try {
      const newTask = {
        name: data.name,
        description: data.description,
        ListId: listsId,
      };
      const added = await TaskService.createTask(newTask);
      setTask(added);
    } catch (error) {
      dispatchMessage({
        type: 'ERROR',
        payload: error.response.data,
      });
    }
    e.target.reset();
    reset(defaultValues);
  };

  return (
    <div>
      <Header as="h3" attached="top">
        Create task
      </Header>

      <Segment attached>
        <Form.Group>
          <Form onSubmit={handleSubmit(handleNewTask)}>
            <Controller
              name="name"
              control={control}
              label="Title"
              type="text"
              placeholder="Enter title"
              fluid
              as={<Form.Input />}
            />
            <ErrorMessage as={Message} negative errors={errors} name="name" />

            <Controller
              name="description"
              control={control}
              label="Description"
              type="text"
              placeholder="Enter description"
              as={<Form.TextArea />}
            />
            <Form.Button type="submit">Save</Form.Button>
          </Form>
        </Form.Group>
      </Segment>
    </div>
  );
};

export default CreateTask;
