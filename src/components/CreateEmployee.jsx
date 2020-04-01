import React, { useState, useEffect } from 'react';
import { Form, Segment, Input, Button, Grid, Header } from 'semantic-ui-react';
// import { navigate } from '@reach/router';

import EmployeeService from '../services/EmployeeService';
import ListService from '../services/ListService';

const CreateEmployee = ({ history }) => {
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
  const [templateList, setTemplateList] = useState([]);

  const templateOptions = templateList.map(({ id, name }) => ({
    value: id,
    text: `${name}`,
  }));

  const handleSelectTemplate = (e, { value }) => {
    setSelectTemplate(value);
  };

  useEffect(() => {
    ListService.all().then((res) => {
      const template = res.filter((item) => item.templateList);
      setTemplateList(template);
    });
  }, []);

  const handleNewList = (e) => {
    e.preventDefault();
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

      EmployeeService.create(data).then(() => {
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
        history.push('/lists');
      });
    }
  };

  return (
    <Grid.Column width="13">
      <div style={{ margin: '2em 0' }}>
        <Header textAlign="left">Create new list</Header>
      </div>
      <Grid.Row>
        <Grid.Column>
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
