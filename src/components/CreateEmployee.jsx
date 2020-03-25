import React, { useState } from 'react';
import {
  Form, Segment, Input, Select, Button,
} from 'semantic-ui-react';
import { navigate } from '@reach/router';
import FormButton from './forms/FormButton';

import EmployeeService from '../services/EmployeeService';


const CreateEmployee = ({
  setNewList, options, templateList, templateOptions,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [select, setSelect] = useState();
  const [selectTemplate, setSelectTemplate] = useState();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [office, setOffice] = useState('');
  const [listName, setListName] = useState('');

  const handleSelectTemplate = (e, { value }) => {
    setSelectTemplate(value);
  };


  const handleNewList = (e) => {
    e.preventDefault();
    console.log('select tempalte in handleNewList', selectTemplate);
    if (selectTemplate !== undefined) {
      const data = {
        listId: selectTemplate,
        description,
        departments: select,
        status: false,
        firstName,
        lastName,
        email,
        phoneNumber,
        address,
        office,
        title,
      };

      console.log(data.name);
      EmployeeService.create(data)
        .then((res) => {
          setNewList(res);
          setTitle('');
          setDescription('');
          setSelect([]);
          setSelectTemplate([]);
          setFirstName('');
          setLastName('');
          setOffice('');
          setAddress('');
          setEmail('');
          setPhoneNumber('');
          navigate('/lists');
        });
    }
  };

  return (
    <>
      <Segment>
        <Form.Group>
          <Form onSubmit={handleNewList}>


            <Form.Input
              placeholder="First name"
              label="First name"
              type="text"
              inputValue={firstName}
              setInputValue={setFirstName}
            />


            <Form.Input
              placeholder="Last name"
              label="Last name"
              type="text"
              inputValue={lastName}
              setInputValue={setLastName}
            />

            <Form.Input
              placeholder="Title"
              label="Title"
              type="text"
              inputValue={title}
              setInputValue={setTitle}
            />

            <Form.Input
              placeholder="Email"
              label="Email"
              type="text"
              inputValue={email}
              setInputValue={setEmail}
            />

            <Form.Input
              placeholder="Adress"
              label="Adress"
              type="text"
              inputValue={address}
              setInputValue={setAddress}
            />

            <Form.Input
              placeholder="Phone Number"
              label="PhoneNumber"
              control={Input}
              type="text"

              inputValue={phoneNumber}
              setInputValue={setPhoneNumber}

            />


            <Form.Input
              placeholder="Office"
              label="Office"
              type="text"
              inputValue={office}
              setInputValue={setOffice}
            />

            {templateOptions ? (
              <Form.Select
                placeholder="Use template"
                options={templateOptions}
                onChange={handleSelectTemplate}
                value={select}
                defaultValue="Use template"
                clearable
              />
            ) : null}

            <Button type="submit">Save</Button>
          </Form>
        </Form.Group>
      </Segment>
    </>
  );
};

export default CreateEmployee;
