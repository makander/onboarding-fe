import React, { useState } from 'react';
import { Form, Segment } from 'semantic-ui-react';
import FormInput from './forms/FormInput';
import FormButton from './forms/FormButton';
import TextArea from './forms/FormTextArea';
import FormDropDown from './forms/FormDropDown';
import ListService from '../services/ListService';

const CreateList = ({ setNewList, options }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [select, setSelect] = useState();

  const handleSelect = (e, { value }) => {
    setSelect(value);
  };

  const handleNewList = () => {
    const data = {
      name: title,
      description,
      departments: select,
      status: false,
    };

    ListService.create(data)
      .then((res) => setNewList(res))
      .then(() => {});
    setTitle('');
    setDescription('');
    setSelect([]);
  };

  return (
    <>
      <Segment>
        <Form.Group>
          <Form onSubmit={handleNewList}>
            <FormInput
              placeholder="Title"
              label="Title"
              type="text"
              inputValue={title}
              setInputValue={setTitle}
            />

            <FormDropDown
              placeholder="Select departments"
              options={options}
              onChange={handleSelect}
              // value={select}
              inputValue={select}
              defaultValue=""
            />

            <FormButton title="Save" type="submit" />
          </Form>
        </Form.Group>
      </Segment>
    </>
  );
};

export default CreateList;
