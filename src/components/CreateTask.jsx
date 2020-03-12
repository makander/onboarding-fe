import React, { useState } from 'react';
import {
  Form, Segment,
} from 'semantic-ui-react';
import FormInput from './forms/FormInput';
import FormButton from './forms/FormButton';
import TextArea from './forms/FormTextArea';
import FormDropDown from './forms/FormDropDown';
import TaskService from '../services/TaskService';

const CreateTask = ({ setTask, ListId }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [department, setDepartment] = useState('');
  const [select, setSelect] = useState([]);

  // const [user, setUser] = useState('');

  const handleSelect = (e, { value }) => {
    console.log(typeof value);
    console.log(value);
    // value.map((item) => console.log(item));
    // setSelect(value);
    setSelect({ value });
  };


  const handleNewTask = () => {
    const newTask = {
      name: title,
      description,
      department: select,
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

          <FormDropDown
            placeholder="Select users"
            options={department}
            onChange={handleSelect}
          />

          <FormButton title="Save" type="submit" />
        </Form>
      </Form.Group>
    </Segment>
  );
};

export default CreateTask;
