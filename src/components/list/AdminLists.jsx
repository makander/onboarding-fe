import React, { useEffect, useState, useContext } from 'react';
import { Grid, Header, List, Button, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

import DepartmentService from '../../services/DepartmentService';
import ListService from '../../services/ListService';

const AdminLists = ({ history, template, header }) => {
  const [lists, setLists] = useState([]);
  const [viewAll, setViewAll] = useState(false);
  const [viewCompleted, setViewCompleted] = useState(false);
  const [viewIncomplete, setViewIncomplete] = useState(true);

  const {
    authStatus: { user },
  } = useContext(AuthContext);

  useEffect(() => {
    /*     DepartmentService.allLists().then((res) => {
      setLists(res);
      console.log(res);
    });
 */

    ListService.all().then((res) => {
      const templates = res.filter((item) => item.templateList);
      const employeeLists = res.filter((item) => !item.templateList);
      console.log(templates);
      console.log(employeeLists);
      console.log(res);
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
    /* 
    const completedLists = listContent.filter((item) => item.status);
    const incompleted = listContent.filter((item) => !item.status); */

    return lists.length !== 0 ? (
      <List divided relaxed>
        {viewIncomplete
          ? templates.map((item) => (
              <List.Item key={item.id}>
                {console.log(item)}
                <List.Content floated="left">
                  <Link to={`/lists/${item.id}`}>{item.name}</Link>
                </List.Content>
              </List.Item>
            ))
          : ''}
        {viewCompleted
          ? employeeLists.map((item) => (
              <List.Item key={item.id}>
                {console.log(item)}
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
              </List.Item>
            ))
          : ''}
        {viewAll
          ? lists.map((item) => (
              <List.Item key={item.id}>
                {console.log(item)}
                <List.Content floated="left">
                  <Link to={`/lists/${item.id}`}>{item.name}</Link>
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
