import React, { useState, useContext, useEffect } from 'react';
import {
  Grid,
  Header,
  List,
  Button,
  Segment,
  Message,
  Loader,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { MessageContext } from '../../context/MessageContext';

import DepartmentService from '../../services/DepartmentService';

import ListService from '../../services/ListService';

const AdminLists = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { dispatchMessage } = useContext(MessageContext);
  const [lists, setLists] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [viewAll, setViewAll] = useState(false);
  const [viewCompleted, setViewCompleted] = useState(false);
  const [viewIncomplete, setViewIncomplete] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const getLists = await ListService.all();
        setLists(getLists);
        const deps = await DepartmentService.all();
        setDepartments(deps);
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

  const handleIncomplete = () => {
    setViewIncomplete(true);
    setViewCompleted(false);
    setViewAll(false);
  };
  const handleCompleted = () => {
    setViewIncomplete(false);
    setViewCompleted(true);
    setViewAll(false);
  };
  const handleAll = () => {
    setViewIncomplete(false);
    setViewCompleted(false);
    setViewAll(true);
  };

  const DisplayList = () => {
    const templates = lists.filter((item) => item.templateList);
    const employeeLists = lists.filter((item) => !item.templateList);

    return lists.length !== 0 ? (
      <List divided relaxed>
        {viewIncomplete
          ? templates.map((item) => (
              <List.Item key={item.id}>
                <List.Content floated="left">
                  <Link to={`/lists/${item.id}`}>{item.name}</Link>
                </List.Content>
                <List.Content floated="right">
                  <p>Template</p>
                </List.Content>
              </List.Item>
            ))
          : ''}
        {viewCompleted
          ? employeeLists.map((item) => (
              <List.Item key={item.id}>
                <List.Content floated="left">
                  <Link to={`/lists/${item.id}`}>{item.name}</Link>
                </List.Content>
                <List.Content floated="left">
                  <p>
                    {item.Tasks != null && item.Tasks.length !== 0 ? (
                      <>
                        Completed tasks:{' '}
                        {item.Tasks.filter((task) => task.status).length}{' '}
                        {' / '}
                        {item.Tasks.length}
                      </>
                    ) : (
                      ''
                    )}
                  </p>
                </List.Content>
                <List.Content floated="right">
                  <p>Employee List</p>
                </List.Content>
              </List.Item>
            ))
          : ''}
        {viewAll
          ? lists.map((item) => (
              <List.Item key={item.id}>
                <List.Content floated="left">
                  <Link to={`/lists/${item.id}`}>{item.name}</Link>
                </List.Content>
                {item.templateList ? (
                  <List.Content floated="right">Template</List.Content>
                ) : (
                  <List.Content floated="right">Employee list</List.Content>
                )}
                <List.Content floated="left">
                  <div>
                    {item.Tasks != null && item.Tasks.length != null ? (
                      <>
                        {item.Tasks.length !== 0 &&
                        item.Tasks.length ===
                          item.Tasks.filter((task) => task.status).length ? (
                          'Completed'
                        ) : (
                          <>
                            {!item.templateList && item.Tasks.length !== 0 ? (
                              <p>
                                Completed tasks:{' '}
                                {
                                  item.Tasks.filter((task) => task.status)
                                    .length
                                }{' '}
                                {' / '}
                                {item.Tasks.length}
                              </p>
                            ) : (
                              ''
                            )}
                          </>
                        )}
                      </>
                    ) : (
                      ''
                    )}
                  </div>
                </List.Content>
              </List.Item>
            ))
          : ''}
      </List>
    ) : (
      <p>No lists available</p>
    );
  };

  return (
    <>
      <div style={{ margin: '2em 0' }}>
        <Message size="huge">
          <Header as="h2" textAlign="left">
            Admin lists
          </Header>
        </Message>
      </div>
      <Grid.Row>
        <Grid.Column>
          {!isLoading && departments.length !== 0 ? (
            <>
              <Button.Group>
                <Button onClick={() => handleIncomplete()}>Templates</Button>
                <Button onClick={() => handleCompleted()}>
                  Employee Lists
                </Button>
                <Button onClick={() => handleAll()}>All</Button>
              </Button.Group>
              <Segment>
                <DisplayList />
              </Segment>

              <Link to="/templates/create">
                <Button>New template</Button>
              </Link>

              <Link to="/lists/create">
                <Button>New employee list</Button>
              </Link>
            </>
          ) : !isLoading && departments.length === 0 ? (
            <Segment>Please create a department first</Segment>
          ) : (
            <Segment style={{ margin: '2em 0' }}>
              <Loader active inline="centered" size="huge">
                Loading
              </Loader>
            </Segment>
          )}
        </Grid.Column>
      </Grid.Row>
    </>
  );
};

export default AdminLists;

/* 
  return (
    <>
      <div style={{ margin: '2em 0' }}>
        <Message size="huge">
          <Header float="left" textAlign="left">
            Employee Lists
          </Header>
        </Message>
      </div>
      <Grid.Row>
        <Grid.Column>
          {!isLoading && lists.length !== 0 ? (
            <>
              <Button.Group>
                <Button onClick={() => handleIncomplete()}>Incomplete</Button>
                <Button onClick={() => handleCompleted()}>Completed</Button>
                <Button onClick={() => handleAll()}>All</Button>
              </Button.Group>
              <Segment>
                <DisplayList />
              </Segment>
              <Link to="/lists/create">
                <Button>New employee list</Button>
              </Link>
            </>
          ) : lists.length === 0 ? (
            <Message>
              No lists available, please contact your administrator
            </Message>
          ) : (
            <Segment style={{ margin: '2em 0' }}>
              <Loader active inline="centered" size="huge">
                Loading
              </Loader>
            </Segment>
          )}
        </Grid.Column>
      </Grid.Row>
    </>
  );
};

export default EmployeeLists;
 */
