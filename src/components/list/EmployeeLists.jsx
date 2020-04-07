/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { Grid, Header, List, Button, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import DepartmentService from '../../services/DepartmentService';

const EmployeeLists = ({ history }) => {
  const [lists, setLists] = useState([]);
  const [viewAll, setViewAll] = useState(false);
  const [viewCompleted, setViewCompleted] = useState(false);
  const [viewIncomplete, setViewIncomplete] = useState(true);

  useEffect(() => {
    DepartmentService.allLists().then((res) => {
      setLists(res);
    });
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
    const listContent = lists[0].Lists.filter((item) => !item.templateList);

    const completedLists = listContent.filter((item) => item.status);
    const incompleted = listContent.filter((item) => !item.status);

    return lists[0].Lists.length !== 0 ? (
      <List divided relaxed>
        {viewIncomplete
          ? incompleted.map((item) => (
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
              </List.Item>
            ))
          : viewCompleted
          ? completedLists.map((item) => (
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
              </List.Item>
            ))
          : viewAll
          ? listContent.map((item) => (
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
              </List.Item>
            ))
          : ''}
      </List>
    ) : (
      <p> No lists available</p>
    );
  };

  return (
    <>
      <div style={{ margin: '2em 0' }}>
        <Header float="left" textAlign="left">
          Employee Lists
        </Header>
      </div>
      <Grid.Row>
        <Grid.Column>
          {lists != null && lists.length !== 0 ? (
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
          ) : (
            'No lists available, please contact your administrator'
          )}
        </Grid.Column>
      </Grid.Row>
    </>
  );
};

export default EmployeeLists;
