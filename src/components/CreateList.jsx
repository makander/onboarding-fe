import React, { useState } from 'react';
import { Form, Segment } from 'semantic-ui-react';
// import { navigate } from '@reach/router';
import FormInput from './forms/FormInput';
import FormButton from './forms/FormButton';
import TextArea from './forms/FormTextArea';
import FormDropDown from './forms/FormDropDown';
import ListService from '../services/ListService';

const CreateList = ({ setNewList, options, templateList, templateOptions }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [select, setSelect] = useState();
  const [selectTemplate, setSelectTemplate] = useState();

  const handleSelectTemplate = (e, { value }) => {
    setSelectTemplate(value);
  };

  const handleSelect = (e, { value }) => {
    setSelect(value);
  };

  const handleNewList = (e) => {
    e.preventDefault();
    console.log('select tempalte in handleNewList', selectTemplate);

    if (selectTemplate !== undefined) {
      const data = {
        listId: selectTemplate,
        name: title,
        description,
        departments: select,
        status: false,
      };
      ListService.create(data).then((res) => {
        setNewList(res);
        setTitle('');
        setDescription('');
        setSelect([]);
        setSelectTemplate([]);
        // navigate('/lists');
      });
    } else {
      const data = {
        name: title,
        description,
        departments: select,
        status: false,
        templateList,
      };

      console.log('data in createList', data);

      ListService.create(data).then((res) => {
        console.log('response in listservice without template', res);
        setNewList(res);
        if (res.templateList) {
          // navigate(`/lists/${res.id}`);
        }
        setTitle('');
        setDescription('');
        setSelect([]);
      });
      /*     setTitle('');
      setDescription('');
      setSelect([]);
   */
      /*     if (templateList) {
        navigate('/home');
      } */
    }
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

            {options ? (
              <FormDropDown
                placeholder="Select departments"
                options={options}
                onChange={handleSelect}
                // value={select}
                inputValue={select}
                defaultValue="Select departments"
              />
            ) : null}

            {templateOptions ? (
              <FormDropDown
                placeholder="Use template"
                options={templateOptions}
                onChange={handleSelectTemplate}
                // value={select}
                inputValue={select}
                defaultValue="Use template"
              />
            ) : null}

            <FormButton title="Save" type="submit" />
          </Form>
        </Form.Group>
      </Segment>
    </>
  );
};

export default CreateList;
