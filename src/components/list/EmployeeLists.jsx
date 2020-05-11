/* eslint-disable no-nested-ternary */
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

const EmployeeLists = () => {
  const [lists, setLists] = useState([]);
  const [viewAll, setViewAll] = useState(false);
  const [viewCompleted, setViewCompleted] = useState(false);
  const [viewIncomplete, setViewIncomplete] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatchMessage } = useContext(MessageContext);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const getLists = await DepartmentService.allLists();
        setLists(getLists);
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
    const listContent = lists[0].Lists.filter((item) => !item.templateList);

    const completedLists = listContent.filter((item) => item.status);
    const incompleted = listContent.filter((item) => !item.status);

    return lists[0].Lists.length !== 0 ? (
      <List divided relaxed>
        {viewIncomplete && incompleted.length !== 0 ? (
          incompleted.map((item) => (
            <List.Item key={item.id}>
              <List.Content floated="left">
                <Link to={`/lists/${item.id}`}>{item.name}</Link>
              </List.Content>

              <List.Content floated="left">
                <p>
                  {item.Tasks != null && item.Tasks.length !== 0 ? (
                    <>
                      Completed tasks:{' '}
                      {item.Tasks.filter((task) => task.status).length} {' / '}
                      {item.Tasks.length}
                    </>
                  ) : (
                    <p>
                      There are no incompleted lists. Please create a new
                      employee list
                    </p>
                  )}
                </p>
              </List.Content>
            </List.Item>
          ))
        ) : viewCompleted && completedLists.length !== 0 ? (
          completedLists.map((item) => (
            <List.Item key={item.id}>
              <List.Content floated="left">
                <Link to={`/lists/${item.id}`}>{item.name}</Link>
              </List.Content>
              <List.Content floated="left">
                <p>
                  {item.Tasks != null && item.Tasks.length !== 0 ? (
                    <>
                      Completed tasks:{' '}
                      {item.Tasks.filter((task) => task.status).length} {' / '}
                      {item.Tasks.length}
                    </>
                  ) : (
                    <p>There are no completed lists.</p>
                  )}
                </p>
              </List.Content>
            </List.Item>
          ))
        ) : viewAll && listContent.length !== 0 ? (
          listContent.map((item) => (
            <List.Item key={item.id}>
              <List.Content floated="left">
                <Link to={`/lists/${item.id}`}>{item.name}</Link>
              </List.Content>
              <List.Content floated="left">
                <p>
                  {item.Tasks != null && item.Tasks.length !== 0 ? (
                    <>
                      Completed tasks:{' '}
                      {item.Tasks.filter((task) => task.status).length} {' / '}
                      {item.Tasks.length}
                    </>
                  ) : (
                    <p>There are no lists. Please create a new employee list</p>
                  )}
                </p>
              </List.Content>
            </List.Item>
          ))
        ) : (
          <p>There are no lists. Please create a new employee list</p>
        )}
      </List>
    ) : (
      <p>There are no lists. Please create a new employee list</p>
    );
  };

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
