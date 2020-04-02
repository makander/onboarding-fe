import React, { useEffect, useState } from 'react';
import { Grid, Header, List, Button, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import DepartmentService from '../services/DepartmentService';
import ListService from '../services/ListService';

const Lists = ({ history, template, header }) => {
  const [lists, setLists] = useState([]);
  const [viewAll, setViewAll] = useState(false);
  const [viewCompleted, setViewCompleted] = useState(false);
  const [viewIncomplete, setViewIncomplete] = useState(true);

  useEffect(() => {
    DepartmentService.allLists().then((res) => {
      setLists(res);
      console.log(res);
    });

    ListService.all((res) => console.log(res));
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

  // return <>Lists</>;
  const DisplayList = () => {
    let listContent;

    // const taskFilter = item.Tasks.filter((task) => task.status !== true).length;

    // eslint-disable-next-line no-unused-expressions
    template
      ? (listContent = lists[0].Lists.filter((item) => item.templateList))
      : (listContent = lists[0].Lists.filter((item) => !item.templateList));

    const completedLists = listContent.filter((item) => item.status);
    const incompleted = listContent.filter((item) => !item.status);

    return lists[0].Lists.length !== 0 ? (
      <List divided relaxed>
        {viewIncomplete
          ? incompleted.map((item) => (
              <List.Item key={item.id}>
                {console.log(item)}
                <List.Content floated="left">
                  <Link to={`/lists/${item.id}`}>{item.name}</Link>
                </List.Content>

                <List.Content floated="left">
                  <p>
                    {item.Tasks.length != null && !item.templateList ? (
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
        {viewCompleted
          ? completedLists.map((item) => (
              <List.Item key={item.id}>
                {console.log(item)}
                <List.Content floated="left">
                  <Link to={`/lists/${item.id}`}>{item.name}</Link>
                </List.Content>
                <List.Content floated="left">
                  <p>
                    {item.Tasks.length != null && !item.templateList ? (
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
        {viewAll
          ? listContent.map((item) => (
              <List.Item key={item.id}>
                {console.log(item)}
                <List.Content floated="left">
                  <Link to={`/lists/${item.id}`}>{item.name}</Link>
                </List.Content>
                <List.Content floated="left">
                  <p>
                    {item.Tasks.length != null && !item.templateList ? (
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
      <p>{template ? 'No templates available' : 'No lists available'}</p>
    );
  };

  return (
    <Grid.Column width="13">
      <div style={{ margin: '2em 0' }}>
        <Header float="left" textAlign="left">
          {header}
        </Header>
      </div>
      <Grid.Row>
        <Grid.Column>
          {// eslint-disable-next-line no-nested-ternary
          lists != null && lists.length !== 0 ? (
            <>
              <Button.Group>
                <Button onClick={() => handleIncomplete()}>Incomplete</Button>
                <Button onClick={() => handleCompleted()}>Completed</Button>
                <Button onClick={() => handleAll()}>All</Button>
              </Button.Group>
              <Segment>
                {' '}
                <DisplayList />
              </Segment>

              {template ? (
                <Link to="/templates/create">
                  <Button>New template</Button>
                </Link>
              ) : (
                <Link to="/lists/create">
                  <Button>New employee list</Button>
                </Link>
              )}
            </>
          ) : (
            'No lists available, please join a department first'
          )}
        </Grid.Column>
      </Grid.Row>
    </Grid.Column>
  );
};

export default Lists;
