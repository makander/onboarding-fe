import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import {
  Form,
  Segment,
  Button,
  Grid,
  Header,
  List,
  Message,
  Loader,
} from 'semantic-ui-react';


import ListService from '../../services/ListService';
import DepartmentService from '../../services/DepartmentService';
import { MessageContext } from '../../context/MessageContext';

const EditList = () => {
  const [list, setList] = useState([]);
  const listsId = useParams();

  const [departments, setDepartments] = useState([]);
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatchMessage } = useContext(MessageContext);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const getList = await ListService.get(listsId.id);
      setList(getList);

      const getDeps = await DepartmentService.all();
      setDepartments(getDeps);
    } catch (error) {
      dispatchMessage({
        type: 'ERROR',
        payload: error.response.data,
      });
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const opts = departments.filter((o1) =>
      list.Departments.some((o2) => o1.id !== o2.id)
    );
    const filterOptions = opts.map(({ id, name }) => ({
      value: id,
      text: name,
    }));

    setOptions(filterOptions);

    setIsLoading(false);
  }, [departments, list]);

  const defaultValues = {
    name: list.name,
    template: list.template,
    addedDepartment: list.departments,
  };

  const { handleSubmit, control, reset } = useForm({
    defaultValues,
  });

  const handleUpdate = async (data, e) => {
    await ListService.update(listsId.id, data);
    fetchData();
    e.target.reset();
    reset(defaultValues);
  };

  const deleteDepartment = async (id) => {
    const data = {
      departmentId: id,
    };

    await ListService.update(listsId.id, data);
    fetchData();
  };

  return (
    <>
      {!isLoading ? (
        <Grid.Column width="13">
          <div style={{ margin: '2em 0' }}>
            <Message size="huge">
              <Header textAlign="left" as="h2">
                Edit list: {list.name}
              </Header>
            </Message>
          </div>

          <Grid.Row>
            <Grid.Column>
              <Header as="h4" attached="top">
                Summary:
              </Header>
              <Segment attached>
                {list.description ? <p>Decription: {list.description}</p> : ''}
                <h5>Template:</h5>
                {list.templateList ? <p>Yes</p> : <p>No</p>}
                <Header as="h5">Departments:</Header>
                {list.Departments != null
                  ? list.Departments.map((item) => (
                      <List celled key={uuidv4()}>
                        <List.Item>
                          <List.Content verticalAlign="bottom" floated="left">
                            {item.name}
                          </List.Content>
                          <List.Content floated="right">
                            <Button
                              compact
                              onClick={() => deleteDepartment(item.id)}
                            >
                              X
                            </Button>
                          </List.Content>
                        </List.Item>
                      </List>
                    ))
                  : 'Please add a department to the list'}
              </Segment>

              <Segment>
                <Form.Group>
                  <Form onSubmit={handleSubmit(handleUpdate)}>
                    <Controller
                      as={<Form.Input />}
                      control={control}
                      name="listName"
                      placeholder="Enter name"
                      label="New name"
                    />

                    <Controller
                      label="Add department"
                      as={<Form.Select options={options} />}
                      placeholder="Add department"
                      clearable
                      control={control}
                      name="addedDepartment"
                      onChange={(e) => e[1].value}
                    />

                    <Controller
                      name="template"
                      control={control}
                      label="Template"
                      defaultValue={list.templateList}
                      as={Form.Checkbox}
                      valueName="checked"
                      onChange={([_, data]) => data.checked}
                    />

                    <Button type="submit">Save</Button>
                  </Form>
                </Form.Group>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid.Column>
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

export default EditList;
