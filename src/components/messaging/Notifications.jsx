import React, { useState, useEffect, useContext } from 'react';

import { useForm, ErrorMessage, Controller } from 'react-hook-form';
import {
  Segment,
  Grid,
  Header,
  Message,
  Divider,
  Loader,
  List,
  Button,
  Form,
} from 'semantic-ui-react';

import * as yup from 'yup';
import { MessageContext } from '../../context/MessageContext';
import NotificationServices from '../../services/NotificationServices';

const ServiceSchema = yup.object().shape({
  email: yup.string().email('Must be a valid email address'),
  slackUri: yup.string().url('Must be a valid url'),
});

const Notfications = () => {
  const { control, errors, handleSubmit } = useForm({
    validationSchema: ServiceSchema,
  });

  const { dispatchMessage } = useContext(MessageContext);

  const [isLoading, setIsLoading] = useState(false);
  const [mail, setMail] = useState([]);
  const [slack, setSlack] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const getMail = await NotificationServices.findAllEmail();
        const getSlack = await NotificationServices.findAllSlack();

        setMail(getMail);
        setSlack(getSlack);
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

  const deleteEmail = async (id) => {
    try {
      await NotificationServices.destroyEmail(id);
      const getMail = await NotificationServices.findAllEmail();
      setMail(getMail);
    } catch (error) {
      dispatchMessage({
        type: 'ERROR',
        payload: error.response.data,
      });
    }
  };

  const deleteSlack = async (id) => {
    try {
      await NotificationServices.destroySlack(id);
      const getSlack = await NotificationServices.findAllSlack();
      setSlack(getSlack);
    } catch (error) {
      dispatchMessage({
        type: 'ERROR',
        payload: error.response.data,
      });
    }
  };

  const changeEmailStatus = async (id, status) => {
    try {
      const updatedStatus = { status: !status };
      await NotificationServices.updateEmail(id, updatedStatus);
      const getMail = await NotificationServices.findAllEmail();
      setMail(getMail);
    } catch (error) {
      dispatchMessage({
        type: 'ERROR',
        payload: error.response.data,
      });
    }
  };

  const changeSlackStatus = async (id, status) => {
    try {
      const updatedStatus = { status: !status };
      await NotificationServices.updateEmail(id, updatedStatus);
      const getMail = await NotificationServices.findAllEmail();
      setMail(getMail);
    } catch (error) {
      dispatchMessage({
        type: 'ERROR',
        payload: error.response.data,
      });
    }
  };

  const onSubmitEmail = async (data, e) => {
    try {
      await NotificationServices.createMail(data);
      const getMail = await NotificationServices.findAllEmail();
      setMail(getMail);
      e.target.reset();
    } catch (error) {
      dispatchMessage({
        type: 'ERROR',
        payload: error.response.data,
      });
    }
  };

  const onSubmitToken = async (data, e) => {
    try {
      await NotificationServices.createSlack(data);
      const getSlack = await NotificationServices.findAllSlack();
      setSlack(getSlack);

      e.target.reset();
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
              <Message size="huge">
                <Header as="h2" textAlign="left">
                  Notifications
                </Header>
              </Message>
            </div>
            <Message positive>
              <p>
                If you want to receieve notifications by email or slack, please
                enter an email address or slack token.
              </p>
            </Message>
            <>
              {mail !== null && mail.length !== 0 ? (
                <Segment>
                  <List divided>
                    {mail.map((service) => (
                      <List.Item>
                        <List.Content floated="left">
                          {service.email}
                        </List.Content>
                        <List.Content>
                          {service.status ? 'active' : 'inactive'}
                        </List.Content>
                        {!service.status ? (
                          <List.Content floated="right">
                            <Button
                              compact
                              onClick={() =>
                                changeEmailStatus(service.id, service.status)
                              }
                            >
                              Enable
                            </Button>
                          </List.Content>
                        ) : (
                          <List.Content floated="right">
                            <Button
                              compact
                              onClick={() =>
                                changeEmailStatus(service.id, service.status)
                              }
                            >
                              Disable
                            </Button>
                          </List.Content>
                        )}
                        <List.Content floated="right">
                          <Button
                            compact
                            onClick={() => deleteEmail(service.id)}
                          >
                            Delete
                          </Button>{' '}
                        </List.Content>
                      </List.Item>
                    ))}
                  </List>
                </Segment>
              ) : null}
            </>
            <>
              {slack !== null && slack.length !== 0 ? (
                <Segment>
                  <List divided>
                    {slack.map((service) => (
                      <List.Item>
                        <List.Content floated="left">
                          {service.slackUri}
                        </List.Content>
                        <List.Content>
                          {service.status ? 'active' : 'inactive'}
                        </List.Content>
                        {!service.status ? (
                          <List.Content floated="right">
                            <Button
                              compact
                              onClick={() =>
                                changeSlackStatus(service.id, service.status)
                              }
                            >
                              Enable
                            </Button>
                          </List.Content>
                        ) : (
                          <List.Content floated="right">
                            <Button
                              compact
                              onClick={() =>
                                changeSlackStatus(service.id, service.status)
                              }
                            >
                              Disable
                            </Button>
                          </List.Content>
                        )}
                        <List.Content floated="right">
                          <Button
                            compact
                            onClick={() => deleteSlack(service.id)}
                          >
                            Delete
                          </Button>{' '}
                        </List.Content>
                      </List.Item>
                    ))}
                  </List>
                </Segment>
              ) : null}
            </>

            <Divider hidden />

            <Grid.Column width="13">
              <Header as="h3" attached="top">
                Add new mail service
              </Header>
              <Segment attached>
                <Form onSubmit={handleSubmit(onSubmitEmail)}>
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
                  <Button type="submit">Submit</Button>
                </Form>
              </Segment>
              <Header as="h3" attached="top">
                Add new slack service
              </Header>
              <Segment attached>
                <Form onSubmit={handleSubmit(onSubmitToken)}>
                  <Controller
                    placeholder="Enter token"
                    label="Slack token"
                    as={<Form.Input />}
                    control={control}
                    name="slackUri"
                  />

                  <ErrorMessage
                    as={Message}
                    negative
                    errors={errors}
                    name="slackUri"
                  />

                  <Button type="submit">Submit</Button>
                </Form>
              </Segment>
            </Grid.Column>
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
export default Notfications;
