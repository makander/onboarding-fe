import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useForm, ErrorMessage, Controller } from 'react-hook-form';

import {
  Form,
  Segment,
  Grid,
  Header,
  Message,
  Divider,
  Loader,
} from 'semantic-ui-react';
import * as yup from 'yup';
import DepartmentService from '../../services/DepartmentService';
import UserService from '../../services/UserService';
import { AuthContext } from '../../context/AuthContext';
import { MessageContext } from '../../context/MessageContext';

const DepartmentSchema = yup.object().shape({
  name: yup.string().required('You have to enter a title'),
});

const defaultValues = {
  name: '',
  description: '',
  members: '',
};

const Department = () => {
  const [departments, setDepartments] = useState([]);

  const [users, setUsers] = useState([]);

  const { dispatchMessage } = useContext(MessageContext);
  const [isLoading, setIsLoading] = useState(false);

  const { errors, handleSubmit, control, reset } = useForm({
    defaultValues,
    validationSchema: DepartmentSchema,
  });
  const {
    authStatus: { user },
  } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const getUsers = await UserService.findAll();
        const getDeps = await DepartmentService.all();

        setDepartments(getDeps);
        setUsers(getUsers);
      } catch (error) {
        dispatchMessage({
          type: 'ERROR',
          payload: error.response.data,
        });
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const onSubmit = (data, e) => {
    DepartmentService.create(data).then((res) => {
      setDepartments(departments.concat([res.data]));
    });
    e.target.reset();
    reset(defaultValues);
  };

  // mapping out values to be used in dropdown
  const options = users.map(({ id, firstName, lastName }) => ({
    value: id,
    text: `${firstName} ${lastName}`,
  }));

  return (
    <>
      {!isLoading ? (
        <>
          {user.admin ? (
            <Grid.Column width="13">
              <div style={{ margin: '2em 0' }}>
                <Message size="huge">
                  <Header as="h2" textAlign="left">
                    Departments
                  </Header>
                </Message>
              </div>
              <Segment attached>
                {departments !== null && departments.length !== 0 ? (
                  <Grid stackable columns={13} textAlign="left">
                    {departments.map((item) => (
                      <Grid.Row key={item.id} centered>
                        <Grid.Column verticalAlign="middle" computer="4">
                          <Link to={`/departments/${item.id}`}>
                            {item.name}
                          </Link>
                        </Grid.Column>
                        <Grid.Column
                          floated="right"
                          verticalAlign="middle"
                          computer="4"
                        >
                          {item.Users !== undefined ? (
                            <p>Members: {item.Users.length}</p>
                          ) : null}
                        </Grid.Column>
                      </Grid.Row>
                    ))}
                  </Grid>
                ) : (
                  <p>No departments available, please create one below</p>
                )}
              </Segment>
              <Divider hidden />
              {users.length > 0 ? (
                <Grid.Column width="13">
                  <Header as="h3" attached="top">
                    Create new department
                  </Header>
                  <Segment attached>
                    <Form.Group>
                      <Form onSubmit={handleSubmit(onSubmit)}>
                        <Controller
                          placeholder="Enter department name"
                          label="Name"
                          as={<Form.Input />}
                          control={control}
                          name="name"
                        />
                        <ErrorMessage
                          as={Message}
                          negative
                          errors={errors}
                          name="name"
                        />
                        {/*        <TextArea
                placeholder="Description"
                label="Description"
                value={description}
                setInputValue={setDescription}
                name="textarea"
              />
 */}

                        <Controller
                          label="Template"
                          as={<Form.Select options={options} multiple />}
                          placeholder="Use template"
                          clearable
                          control={control}
                          name="members"
                          onChange={(e) => e[1].value}
                        />

                        <Form.Button type="submit">Save</Form.Button>
                      </Form>
                    </Form.Group>
                  </Segment>
                </Grid.Column>
              ) : null}
            </Grid.Column>
          ) : (
            'Not authorized'
          )}
        </>
      ) : (
        <Segment style={{ margin: '2em 0' }}>
          <Loader active inline="centered" size="huge">
            Loading
          </Loader>
        </Segment>
      )}
    </>
  );
};

export default Department;
