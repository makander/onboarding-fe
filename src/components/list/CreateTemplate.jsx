/* eslint-disable no-nested-ternary */
import React, { useState, useEffect, useContext } from 'react';
import { useForm, ErrorMessage, Controller } from 'react-hook-form';
import {
  Form,
  Segment,
  Grid,
  Button,
  Header,
  Loader,
  Message,
} from 'semantic-ui-react';
import * as yup from 'yup';
import { useHistory } from 'react-router-dom';
import { MessageContext } from '../../context/MessageContext';
import ListService from '../../services/ListService';
import DepartmentService from '../../services/DepartmentService';
import Notification from '../Notification';

const TemplateSchema = yup.object().shape({
  name: yup.string().required('You have to enter a title'),
  departments: yup.array().required('You have to add a department'),
});

const defaultValues = {
  name: '',
  departments: [],
};

const CreateTemplate = ({ setListId, setStep }) => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [department, setDepartment] = useState([]);
  const [list, setList] = useState([]);
  const [options, setOptions] = useState([]);
  const { dispatchMessage } = useContext(MessageContext);
  const { errors, handleSubmit, control, reset } = useForm({
    validationSchema: TemplateSchema,
    defaultValues,
  });
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const deps = await DepartmentService.all();
        const lists = await ListService.all();
        const filtered = lists.filter((item) => item.templateList);
        setDepartment(deps);
        setList(filtered);
      } catch (error) {
        dispatchMessage({
          type: 'ERROR',
          payload: error.response.data,
        });
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const opts = department.map(({ id, name }) => ({
      value: id,
      text: `${name}`,
    }));
    setOptions(opts);
    setIsLoading(false);
  }, [department]);

  const handleNewList = async (data, e) => {
    try {
      const finalData = { ...data, ...{ templateList: true } };

      const newTemplate = await ListService.create(finalData);

      console.log(newTemplate);
      if (newTemplate.templateList && !setStep) {
        history.push(`/lists/${newTemplate.id}`);
      } else {
        setListId(newTemplate.id);
        setStep((prevStep) => prevStep + 1);
      }
    } catch (error) {
      dispatchMessage({
        type: 'ERROR',
        payload: error.response.data,
      });
    }
    e.target.reset();
    reset(defaultValues);
  };

  return (
    <>
      {!isLoading && department.length !== 0 ? (
        <Grid.Column width="10">
          <div style={{ margin: '2em 0' }}>
            <Message size="huge">
              <Header as="h2" textAlign="left">
                Create new template
              </Header>
            </Message>
            <Message positive>
              <p>
                A template is the boilerplate that will be used for all employee
                lists. Add all reoccuring tasks for it. You could for instance
                create a template for:{' '}
              </p>
              <ul>
                <li>Onboarding</li>
                <li>Offboarding</li>
                <li>Onboading by role, like: Onboarding Designer</li>
              </ul>
            </Message>
          </div>
          {setStep ? <Notification /> : ''}
          <Grid.Row>
            <Grid.Column>
              <Segment>
                <Form.Group>
                  <Form onSubmit={handleSubmit(handleNewList)}>
                    <Controller
                      as={<Form.Input />}
                      control={control}
                      name="name"
                      placeholder="Enter title"
                      label="Title"
                    />

                    <ErrorMessage
                      as={Message}
                      negative
                      errors={errors}
                      name="name"
                    />

                    <Controller
                      label="Departments"
                      as={<Form.Select options={options} />}
                      placeholder="Add departments"
                      clearable
                      control={control}
                      name="departments"
                      onChange={(e) => e[1].value}
                      multiple
                    />
                    <ErrorMessage
                      as={Message}
                      negative
                      errors={errors}
                      name="departments"
                    />

                    <div style={{ marginTop: '1em' }}>
                      <Button type="submit">Save</Button>
                    </div>
                  </Form>
                </Form.Group>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid.Column>
      ) : !isLoading ? (
        <Message style={{ margin: '2em 0' }}>
          Please create a department first
        </Message>
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

export default CreateTemplate;
