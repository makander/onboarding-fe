import React, { useEffect, useState, useContext } from 'react';
import { Grid, Header, List, Button, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import ListService from '../../services/ListService';

const AdminLists = ({ template, header }) => {
  const [lists, setLists] = useState([]);
  const [viewAll, setViewAll] = useState(false);
  const [viewCompleted, setViewCompleted] = useState(false);
  const [viewIncomplete, setViewIncomplete] = useState(true);

  useEffect(() => {
    ListService.all().then((res) => {
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
    let listContent;

    // eslint-disable-next-line no-unused-expressions

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
                    {item.Tasks != null && item.Tasks.length != null ? (
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
                        {item.Tasks.length ===
                        item.Tasks.filter((task) => task.status).length ? (
                          'Completed'
                        ) : (
                          <>
                            {!item.templateList ? (
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
      <p>{template ? 'No templates available' : 'No lists available'}</p>
    );
  };

  return (
    <>
      <div style={{ margin: '2em 0' }}>
        <Header float="left" textAlign="left">
          {header}
        </Header>
      </div>
      <Grid.Row>
        <Grid.Column>
          <>
            <Button.Group>
              <Button onClick={() => handleIncomplete()}>Templates</Button>
              <Button onClick={() => handleCompleted()}>Employee Lists</Button>
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
        </Grid.Column>
      </Grid.Row>
    </>
  );
};

export default AdminLists;
