/* eslint-disable no-nested-ternary */
import React, { useEffect, useState, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  Form,
  Grid,
  Segment,
  Header,
  Button,
  Message,
  Loader,
  List,
  Divider,
  Container,
  Card,
} from 'semantic-ui-react';
import { useParams, Link, useHistory } from 'react-router-dom';
import ListService from '../../services/ListService';
import CreateTask from '../task/CreateTask';
import TaskService from '../../services/TaskService';
import TaskDropDown from '../task/TaskDropDown';
import { AuthContext } from '../../context/AuthContext';
import { MessageContext } from '../../context/MessageContext';

const Lists = ({ listId, wizard }) => {
  const history = useHistory();
  const [list, setList] = useState([]);
  const [options, setOptions] = useState([]);
  const { dispatchMessage } = useContext(MessageContext);
  const [isLoading, setIsLoading] = useState(false);
  const [task, setTask] = useState([]);

  const listsId = useParams();

  const {
    authStatus: { user },
  } = useContext(AuthContext);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      if (listId) {
        const li = await ListService.get(listId);
        setList(li);
      }

      if (listsId.id) {
        const li = await ListService.get(listsId.id);
        setList(li);
      }
    } catch (error) {
      dispatchMessage({
        type: 'ERROR',
        payload: error.response.data,
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, [task, listsId.id, listId]);

  useEffect(() => {
    if (list.Departments != null && list.Departments[0] != null) {
      const format = list.Departments.flatMap((u) =>
        u.Users.map(({ id, firstName, lastName }) => ({
          value: id,
          text: `${firstName} ${lastName}`,
        }))
      );

      const opts = format.filter(
        (v, i, a) => a.findIndex((t) => t.value === v.value) === i
      );

      setOptions(opts);
    }

    setIsLoading(false);
  }, [list]);

  const handleStatus = async (taskStatus, taskId) => {
    try {
      const taskData = {
        status: !taskStatus,
      };

      const updatedTask = await TaskService.updateTask(taskId, taskData);
      setTask([updatedTask]);
    } catch (error) {
      dispatchMessage({
        type: 'ERROR',
        payload: error.response.data,
      });
    }
  };

  const removeUser = async (id) => {
    try {
      const removed = await TaskService.updateTask(id, { UserId: null });
      setTask([removed]);
    } catch (error) {
      dispatchMessage({
        type: 'ERROR',
        payload: error.response.data,
      });
    }
  };

  const handleComplete = async () => {
    try {
      const data = {
        name: list.name,
        description: list.description,
        status: true,
        templateList: list.templateList,
      };

      const updated = await ListService.update(list.id, data);

      updated.Tasks.forEach(async (t) => {
        await TaskService.updateTask(t.id);
      });
      history.push('/lists');
    } catch (error) {
      dispatchMessage({
        type: 'ERROR',
        payload: error.response.data,
      });
    }
  };

  const handleDeleteTask = async (id) => {
    await TaskService.deleteTask(id);
    fetchData();
  };

  const deleteList = () => {
    ListService.destroy(listsId.id).then(() => history.push('/lists'));
  };

  const CompleteSegment = () => {
    return list.Tasks != null && list.Tasks.length !== 0 && !list.status ? (
      <>
        {list.Tasks.filter((item) => item.status).length ===
        list.Tasks.length ? (
          <>
            <Divider hidden />
            <Button positive fluid onClick={() => handleComplete()}>
              Complete list
            </Button>
          </>
        ) : (
          ''
        )}
      </>
    ) : (
      ''
    );
  };

  return (
    <Grid.Column centered={1} tablet={14} computer={12}>
      {!isLoading && list != null ? (
        <>
          <div style={{ margin: '2em 0' }}>
            <Message size="huge">
              <Header as="h2" textAlign="left">
                {list.templateList ? `Template:  ${list.name}` : `${list.name}`}
              </Header>
            </Message>
            {list.status === true ? (
              <Message size="large" positive>
                This list has been completed
              </Message>
            ) : (
              ''
            )}
          </div>

          {list.Employee ? (
            <Grid.Row>
              <Grid.Column verticalAlign="middle">
                <Header as="h3" attached="top">
                  Employee information
                </Header>
                <Segment attached>
                  <List>
                    <List.Item>
                      <p>
                        Name: {list.Employee.firstName} {list.Employee.lastName}
                      </p>
                    </List.Item>
                    <List.Item>
                      <p>Title: {list.Employee.title}</p>
                    </List.Item>
                    <List.Item>
                      <p>Phone: {list.Employee.phoneNumber}</p>
                    </List.Item>
                    <List.Item>
                      <p>Office: {list.Employee.office}</p>
                    </List.Item>
                  </List>
                </Segment>
              </Grid.Column>
            </Grid.Row>
          ) : (
            ''
          )}
          {wizard ? (
            <>
              <Message positive>
                Add all reoccuring tasks and press next
              </Message>
              <Divider hidden />
            </>
          ) : (
            ''
          )}

          {!list.status ? (
            <>
              <Header as="h3" attached="top">
                Tasks
              </Header>
              <Segment attached>
                {list.Tasks != null && list.Tasks.length !== 0 ? (
                  list.Tasks.map((item) => (
                    <Card fluid key={uuidv4()}>
                      <Card.Content style={{ marginBottom: '-0.8em' }}>
                        <Header as="h2" style={{ display: 'inline-block' }}>
                          {item.name}
                        </Header>
                        <Button
                          width="2"
                          compact
                          floated="right"
                          onClick={() => handleDeleteTask(item.id)}
                        >
                          X
                        </Button>
                      </Card.Content>

                      {options.length !== 0 ? (
                        <Card.Content>
                          {item.User != null && item.User != null ? (
                            <>
                              <p>
                                Assigned: {item.User.firstName}{' '}
                                {item.User.lastName}
                                <Button
                                  style={{ marginLeft: '4em' }}
                                  compact
                                  onClick={() => removeUser(item.id)}
                                >
                                  x
                                </Button>
                              </p>
                            </>
                          ) : (
                            <p>No assigned user</p>
                          )}
                          <TaskDropDown
                            options={options}
                            TaskServiceUpdateTask={TaskService.updateTask}
                            id={item.id}
                            setTask={setTask}
                          />
                        </Card.Content>
                      ) : (
                        <Card.Content>
                          <Message negative>
                            This list is either missing a department or the
                            departments that are is assigned to it is empty.
                          </Message>
                        </Card.Content>
                      )}
                      <Card.Content extra>
                        <Form>
                          <Form.Checkbox
                            label="completed"
                            inline
                            checked={item.status}
                            onChange={() => handleStatus(item.status, item.id)}
                          />
                        </Form>
                      </Card.Content>
                    </Card>
                  ))
                ) : (
                  <Card>
                    <Card.Content>
                      <p>No tasks available for this list.</p>
                    </Card.Content>
                  </Card>
                )}
              </Segment>
            </>
          ) : (
            <Segment>
              <Header>Completed tasks</Header>
              {list.Tasks.map((item) => (
                <List divided key={uuidv4()}>
                  <List.Item>{item.name}</List.Item>
                </List>
              ))}
            </Segment>
          )}

          <CompleteSegment />
          <Divider hidden />
          <>
            {!list.status ? (
              <>
                <CreateTask setTask={setTask} listsId={list.id} />
              </>
            ) : (
              ''
            )}
            <Divider hidden />
            {user.admin && !wizard ? (
              <Container relaxed={1}>
                {list.templateList ? (
                  <Button positive onClick={() => history.push('/lists')}>
                    Save template
                  </Button>
                ) : (
                  ''
                )}
                <>
                  <Button.Group>
                    <Button secondary>
                      <Link
                        style={{ color: 'White' }}
                        to={`/lists/edit/${listsId.id}`}
                      >
                        Edit
                      </Link>
                    </Button>

                    <Button negative onClick={() => deleteList()}>
                      Delete
                    </Button>
                  </Button.Group>
                  <Divider hidden />
                </>
              </Container>
            ) : (
              ''
            )}
          </>
          <Divider hidden />
        </>
      ) : (
        <Segment style={{ margin: '2em 0' }}>
          <Loader active inline="centered" size="huge">
            Loading
          </Loader>
        </Segment>
      )}
    </Grid.Column>
  );
};

export default Lists;
