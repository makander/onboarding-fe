/* eslint-disable no-nested-ternary */
import React, { useEffect, useState, useContext } from 'react';

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
} from 'semantic-ui-react';
import { useParams, Link, useHistory } from 'react-router-dom';
import ListService from '../../services/ListService';
import CreateTask from '../task/CreateTask';
import TaskService from '../../services/TaskService';
import TaskDropDown from '../task/TaskDropDown';
import { AuthContext } from '../../context/AuthContext';

const Lists = () => {
  const history = useHistory();
  const [list, setList] = useState([]);
  const [options, setOptions] = useState([]);

  const [task, setTask] = useState([]);

  const listsId = useParams();

  const {
    authStatus: { user },
  } = useContext(AuthContext);

  useEffect(() => {
    ListService.get(listsId.id).then((res) => {
      setList(res);
    });
  }, [task, listsId.id]);

  useEffect(() => {
    if (list.Departments != null) {
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
  }, [list]);

  const handleStatus = (taskStatus, taskId) => {
    const taskData = {
      status: !taskStatus,
    };

    TaskService.updateTask(taskId, taskData).then((res) => {
      setTask([res]);
    });
  };

  const removeUser = (id) => {
    const taskData = {
      UserId: null,
    };

    TaskService.updateTask(id, taskData).then((res) => {
      setTask([res]);
    });
  };

  const handleComplete = () => {
    const data = {
      name: list.name,
      description: list.description,
      status: true,
      templateList: list.templateList,
    };

    ListService.update(list.id, data).then(() => {
      list.Tasks.forEach((t) => {
        removeUser(t.id);
      });
      history.push('/lists');
    });
  };

  const deleteList = () => {
    ListService.destroy(listsId.id).then(() => history.push('/lists'));
  };

  const CompleteSegment = () => {
    return list.Tasks != null &&
      list.Tasks.length !== 0 &&
      list.status !== true ? (
      <>
        {list.Tasks.filter((item) => item.status).length ===
        list.Tasks.length ? (
          <Button positive fluid onClick={() => handleComplete()}>
            Complete list
          </Button>
        ) : (
          ''
        )}
      </>
    ) : list.status === true ? (
      <Message positive>This list has been completed</Message>
    ) : (
      <Loader />
    );
  };

  return (
    <Grid.Column centered={1} tablet={14} computer={12}>
      {list != null && list.length !== 0 ? (
        <>
          <div style={{ margin: '2em 0' }}>
            <Message size="huge">
              <Header as="h2" textAlign="left">
                {list.templateList
                  ? `Task for template:  ${list.name}`
                  : `Tasks for:  ${list.name}`}
              </Header>
            </Message>
          </div>

          {list.Tasks != null && list.Employee ? (
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
          <Header as="h3" attached="top">
            Tasks
          </Header>
          <Segment attached>
            <Grid
              relaxed="very"
              stackable
              textAlign="left"
              style={{ marginTop: '1em' }}
            >
              {list.Tasks != null && list.Tasks.length !== 0 ? (
                list.Tasks.map((item) => (
                  <Grid.Row key={item.id} style={{ padding: '0' }}>
                    <Grid.Column
                      verticalAlign="middle"
                      computer="3"
                      mobile="16"
                    >
                      {item.name}
                    </Grid.Column>
                    <>
                      {!list.templateList ? (
                        <>
                          <Grid.Column
                            verticalAlign="middle"
                            tablet="3"
                            computer="5"
                            mobile="16"
                          >
                            {item.User != null && item.User != null ? (
                              <>
                                <p>
                                  Assigned: {item.User.firstName}{' '}
                                  {item.User.lastName}
                                  <Button
                                    floated="right"
                                    compact
                                    onClick={() => removeUser(item.id)}
                                  >
                                    x
                                  </Button>
                                </p>
                              </>
                            ) : (
                              'No assigned user'
                            )}
                          </Grid.Column>
                          <Grid.Column
                            verticalAlign="middle"
                            computer="5"
                            mobile="16"
                          >
                            <TaskDropDown
                              options={options}
                              TaskServiceUpdateTask={TaskService.updateTask}
                              id={item.id}
                              setTask={setTask}
                            />
                          </Grid.Column>

                          <Grid.Column
                            verticalAlign="middle"
                            computer="2"
                            mobile="16"
                          >
                            <Form>
                              <Form.Checkbox
                                inline
                                label="completed"
                                checked={item.status}
                                onChange={() =>
                                  handleStatus(item.status, item.id)
                                }
                              />
                            </Form>
                          </Grid.Column>
                        </>
                      ) : (
                        ''
                      )}
                    </>
                  </Grid.Row>
                ))
              ) : (
                <>
                  <p>No tasks available for this list.</p>
                </>
              )}
            </Grid>
          </Segment>

          <CompleteSegment />
          <Divider hidden />
          <>
            <CreateTask setTask={setTask} listsId={listsId.id} />
            <Divider hidden />
            {user.admin ? (
              <>
                {list.templateList ? (
                  <Button positive onClick={() => history.push('/lists')}>
                    Save template
                  </Button>
                ) : (
                  ''
                )}
                <Button.Group floated="right">
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
              </>
            ) : (
              ''
            )}
          </>
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
