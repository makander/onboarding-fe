import React, { useState } from 'react';
import { Form, Segment, Input, Select, Button } from 'semantic-ui-react';
// import { navigate } from '@reach/router';
import FormButton from './forms/FormButton';

import EmployeeService from '../services/EmployeeService';

const CreateEmployee = ({
  setNewList,
  options,
  templateList,
  templateOptions,
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
      EmployeeService.create(data).then((res) => {
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
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />

            <Form.Input
              placeholder="Last name"
              label="Last name"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />

            <Form.Input
              placeholder="Title"
              label="Title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <Form.Input
              placeholder="Email"
              label="Email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Form.Input
              placeholder="Adress"
              label="Adress"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <Form.Input
              placeholder="Phone Number"
              label="PhoneNumber"
              control={Input}
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />

            <Form.Input
              placeholder="Office"
              label="Office"
              type="text"
              value={office}
              onChange={(e) => setOffice(e.target.value)}
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
