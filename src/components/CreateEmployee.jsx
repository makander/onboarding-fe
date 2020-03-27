import React, { useState, useEffect } from 'react';
import {
  Form,
  Segment,
  Input,
  Select,
  Button,
  Grid,
  Header,
} from 'semantic-ui-react';
// import { navigate } from '@reach/router';
import FormButton from './forms/FormButton';

import EmployeeService from '../services/EmployeeService';
import ListService from '../services/ListService';

const CreateEmployee = ({ setNewList, options }) => {
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
  const [templateList, setTemplateList] = useState([]);

  const templateOptions = templateList.map(({ id, name }) => ({
    value: id,
    text: `${name}`,
  }));

  const handleSelectTemplate = (e, { value }) => {
    setSelectTemplate(value);
  };

  useEffect(() => {
    ListService.list().then((res) => {
      const template = res.filter((item) => item.templateList);
      setTemplateList(template);
      console.log(template);
    });
  }, []);

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
    <Grid.Column width="10">
      <div style={{ margin: '2em 0' }}>
        <Header textAlign="left">Create new list</Header>
      </div>
      <Grid.Row>
        <Grid.Column>
          <Segment>
            <Form.Group textAlign="left">
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
                  label="Phone number"
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
                    clearable
                  />
                ) : null}

                <Button type="submit">Save</Button>
              </Form>
            </Form.Group>
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid.Column>
  );
};

export default CreateEmployee;
