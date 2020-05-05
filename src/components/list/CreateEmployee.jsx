import React, { useState, useContext, useEffect } from 'react';
import { useForm, ErrorMessage, Controller } from 'react-hook-form';

import {
  Form,
  Segment,
  Button,
  Grid,
  Header,
  Message,
  Loader,
  Divider,
} from 'semantic-ui-react';
import * as yup from 'yup';
import { useHistory } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { MessageContext } from '../../context/MessageContext';
import EmployeeService from '../../services/EmployeeService';
import ListService from '../../services/ListService';

const EmployeeSchema = yup.object().shape({
  title: yup.string().required('You have to enter a title'),
  firstName: yup.string().required('You have to enter a first name'),
  lastName: yup.string().required('You have to enter last name'),
  email: yup.string().email().required('You have to enter an email address'),
  phoneNumber: yup.string().min(6).required('You have to enter a phone number'),
  office: yup.string().required('You enter an office name'),
});

const dateLabel = {
  display: 'block',
  margin: '0em 0em 0.28571429rem 0em',
  color: 'rgba(0, 0, 0, 0.87)',
  fontSize: '0.92857143em',
  fontWeight: 'bold',
  textTransform: 'none',
};

const defaultValues = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  office: '',
  title: '',
  listId: '',
};

const CreateEmployee = () => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const { dispatchMessage } = useContext(MessageContext);

  const [templateList, setTemplateList] = useState([]);

  const { errors, handleSubmit, control } = useForm({
    validationSchema: EmployeeSchema,
    defaultValues,
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const template = await ListService.all();
        const filtered = template.filter((item) => item.templateList);
        setTemplateList(filtered);
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

  const templateOptions = templateList.map(({ id, name }) => ({
    value: id,
    text: `${name}`,
  }));

  const handleNewList = async (data) => {
    try {
      console.log(data);
      await EmployeeService.create(data);
      history.push('/lists');
    } catch (error) {
      dispatchMessage({
        type: 'ERROR',
        payload: error.response.data,
      });
    }
  };
  return (
    <>
      {!isLoading ? (
        <>
          <Grid.Column width="13">
            <div style={{ margin: '2em 0' }}>
              <Header textAlign="left">Create new list</Header>
            </div>
            <Grid.Row>
              <Grid.Column>
                <Segment>
                  <Form.Group>
                    <Form onSubmit={handleSubmit(handleNewList)}>
                      <Controller
                        as={<Form.Input />}
                        control={control}
                        name="firstName"
                        placeholder="Enter first name"
                        label="First name"
                      />

                      <ErrorMessage
                        as={Message}
                        negative
                        errors={errors}
                        name="firstName"
                      />

                      <Controller
                        placeholder="Enter last name"
                        label="Last name"
                        as={<Form.Input />}
                        control={control}
                        name="lastName"
                      />
                      <ErrorMessage
                        as={Message}
                        negative
                        errors={errors}
                        name="lastName"
                      />

                      <Controller
                        placeholder="Enter title"
                        label="Title"
                        as={<Form.Input />}
                        control={control}
                        name="title"
                      />
                      <ErrorMessage
                        as={Message}
                        negative
                        errors={errors}
                        name="title"
                      />

                      <Controller
                        placeholder="Enter email"
                        label="Email"
                        as={<Form.Input />}
                        name="email"
                        control={control}
                      />
                      <ErrorMessage
                        as={Message}
                        negative
                        errors={errors}
                        name="email"
                      />

                      <Controller
                        placeholder="Enter phonenumber"
                        label="Phone number"
                        as={<Form.Input />}
                        control={control}
                        name="phoneNumber"
                      />
                      <ErrorMessage
                        as={Message}
                        negative
                        errors={errors}
                        name="phoneNumber"
                      />

                      <Controller
                        placeholder="Enter office"
                        label="Office"
                        as={<Form.Input />}
                        control={control}
                        name="office"
                      />
                      <ErrorMessage
                        as={Message}
                        negative
                        errors={errors}
                        name="office"
                      />

                      <h5 style={dateLabel}>Start date / End date</h5>
                      <Controller
                        as={<DatePicker label="Start date" />}
                        control={control}
                        valueName="selected"
                        onChange={([selected]) => selected}
                        name="date"
                        className="input"
                        dateFormat="yyyy/MM/dd"
                        placeholderText="Select date"
                        style={{ marginTop: '1em' }}
                      />

                      {templateOptions.length ? (
                        <div style={{ marginTop: '1em', paddingBottom: '1em' }}>
                          <Controller
                            label="Template"
                            as={<Form.Select options={templateOptions} />}
                            placeholder="Use template"
                            clearable
                            control={control}
                            name="listId"
                            onChange={(e) => e[1].value}
                          />
                        </div>
                      ) : (
                        <Message>
                          <p>
                            No templates available. To use templates, contact
                            your administator
                          </p>
                        </Message>
                      )}

                      <Button type="submit">Save</Button>
                    </Form>
                  </Form.Group>
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid.Column>
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

export default CreateEmployee;
