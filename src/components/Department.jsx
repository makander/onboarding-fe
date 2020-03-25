import React, { useEffect, useState } from 'react';
import {
  Segment, Form, Header, Button, Grid, Table, Dimmer, Loader, Image,
} from 'semantic-ui-react';
import { navigate } from '@reach/router';
import DepartmentService from '../services/DepartmentService';
import UserService from '../services/UserService';
import FormInput from './forms/FormInput';
import FormDropDown from './forms/FormDropDown';

const Department = ({ departmentsId }) => {
  const [departments, setDepartments] = useState([]);
  const [name, setName] = useState('');
  const [users, setUsers] = useState([]);
  const [select, setSelect] = useState([]);
  const [options, setOptions] = useState([]);
  const [loader, setLoader] = useState(true);


  useEffect(() => {
    DepartmentService.get(departmentsId).then((res) => {
      setDepartments(res);
    });
    UserService.findAll().then((data) => setUsers(data));
  }, []);

  useEffect(() => {
    const opts = users.filter((entry1) => departments.Users && !departments.Users.some((entry2) => entry1.id === entry2.id));
    const filterOptions = (opts.map(({ id, firstName, lastName }) => ({
      value: id,
      text: `${firstName} ${lastName}`,
    })));
    setOptions(filterOptions);
    setLoader(false);
  }, [users, departments]);

  const onSubmit = () => {
    if (name === '' && select.length === 0) {
      const updatedDepartment = {
        name: departments.name,
        users: departments.Users,
      };
      DepartmentService.update(departmentsId, updatedDepartment).then((res) => {
        setDepartments(res);
      });
    } else {
      const data = {
        name,
        users: select,
      };

      DepartmentService.update(departmentsId, data).then((res) => {
        setDepartments(res);
      });
    }
    setSelect([]);
    setName('');
  };


  const handleSelect = (e, { value }) => {
    setSelect(value);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    DepartmentService.destroy(departmentsId).then(() => navigate('/departments'));
  };

  const handleClick = (e, id) => {
    e.preventDefault();
    DepartmentService.removeUser(departmentsId, { UserId: id }).then((res) => {
      setDepartments(res);
    });
  };

  return (


    <div>
      {!loader ? (
        <>
          {' '}
          <Header>
            Update department:
            {' '}
            {departments.name}
          </Header>

          <Segment>
            <Form onSubmit={onSubmit}>

              <FormInput
                placeholder="Department name"
                label="Name"
                type="text"
                inputValue={name}
                setInputValue={setName}
              />
              <>
                <Table>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell rowSpan="2">Members</Table.HeaderCell>
                      <Table.HeaderCell></Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {departments.Users !== undefined && departments.Users.length !== 0 ? departments.Users.map((item) => (
                      <Table.Row key={item.id}>
                        <Table.Cell>
                          {item.firstName}
                          {' '}
                          {item.lastName}
                        </Table.Cell>
                        <Table.Cell textAlign="right">
                          <Button onClick={(e) => handleClick(e, item.id)}>Remove</Button>
                        </Table.Cell>
                      </Table.Row>
                    )) : (
                      <Table.Cell>
                        No users members in this department
                      </Table.Cell>
                    )}
                  </Table.Body>
                </Table>
              </>
              <FormDropDown
                placeholder="Select users"
                options={options}
                onChange={handleSelect}
                inputValue={select}
                required
                defaulltValue={select}
              />

              <br />
              <Grid centered>
                {' '}
                <Form.Group>
                  <Button floated="left" type="submit">Save</Button>
                  <Button floated="right" onClick={((e) => handleDelete(e))}>Delete</Button>
                </Form.Group>
              </Grid>

            </Form>
          </Segment>
        </>
      ) : (
        <Segment>
          <Dimmer active inverted>
            <Loader size="large">Loading</Loader>
          </Dimmer>

          <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
        </Segment>
      )}
    </div>
  );
};


export default Department;
