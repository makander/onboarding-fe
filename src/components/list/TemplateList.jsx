import React, { useEffect, useState, useContext } from 'react';
import { Grid, Header, List, Button, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

import DepartmentService from '../../services/DepartmentService';
import ListService from '../../services/ListService';

const TemplateList = ({ history }) => {
  const [lists, setLists] = useState([]);
  const [viewAll, setViewAll] = useState(false);
  const [viewCompleted, setViewCompleted] = useState(false);
  const [viewIncomplete, setViewIncomplete] = useState(true);

  const {
    authStatus: { user },
  } = useContext(AuthContext);

  useEffect(() => {
    /*     DepartmentService.allLists().then((res) => {
      const templates = res.filter((list) => list.templateList);
      setLists(templates);
      console.log(templates);
    }); */

    ListService.all().then((res) => {
      const templates = res.filter((list) => list.templateList);
      setLists(templates);
    });
  }, []);

  const handleAll = () => {
    setViewIncomplete(false);
    setViewCompleted(false);
    setViewAll(true);
  };

  const DisplayList = () => {
    let listContent;

    // eslint-disable-next-line no-unused-expressions
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
    <>
      <div style={{ margin: '2em 0' }}>
        <Header float="left" textAlign="left">
          Templates
        </Header>
      </div>
      <Grid.Row>
        <Grid.Column>
          <Segment>
            <List>
              {lists != null
                ? lists.map((item) => (
                    <List.Item key={item.id}>
                      {console.log(item)}
                      <List.Content floated="left">
                        <Link to={`/lists/${item.id}`}>{item.name}</Link>
                      </List.Content>
                      <List.Content floated="left">
                        <p>
                          {item.Tasks != null && item.Tasks.length !== 0 ? (
                            <>
                              <p>Contains: {item.Tasks.length} tasks</p>
                            </>
                          ) : (
                            ''
                          )}
                        </p>
                      </List.Content>
                    </List.Item>
                  ))
                : 'No templates exists, please create one'}
            </List>
          </Segment>
          <Link to="/templates/create">
            <Button>New template</Button>
          </Link>
        </Grid.Column>
      </Grid.Row>
    </>
  );
};

export default TemplateList;
