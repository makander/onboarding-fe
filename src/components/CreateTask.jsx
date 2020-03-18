import React, { useState } from 'react';
import {
  Form, Segment,
} from 'semantic-ui-react';
import FormInput from './forms/FormInput';
import FormButton from './forms/FormButton';
import TextArea from './forms/FormTextArea';
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
            <FormInput
              placeholder="Title"
              label="Title"
              type="text"
              inputValue={title}
              setInputValue={setTitle}
            />

            <TextArea
              placeholder="Description"
              label="Description"
              inputValue={description}
              setInputValue={setDescription}
              name="textarea"
            />

            <FormButton title="Save" type="submit" />
          </Form>
        </Form.Group>
      </Segment>
    </>
  );
};

export default CreateTask;
