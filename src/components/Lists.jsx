import React, { useEffect, useState } from 'react';
import { Grid, Header, List, Button, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import DepartmentService from '../services/DepartmentService';

const Lists = ({ history, template, header }) => {
  const [lists, setLists] = useState([]);
  useEffect(() => {
    DepartmentService.findAllDepartmentLists().then((res) => {
      setLists(res);
    });
  }, []);

  const DisplayList = () => {
    let listContent;

    // eslint-disable-next-line no-unused-expressions
    template
      ? (listContent = lists[0].Lists.filter((item) => item.templateList))
      : (listContent = lists[0].Lists.filter((item) => !item.templateList));

    return (
      <List divided relaxed>
        {listContent.map((item) => (
          <List.Item key={item.id}>
            <List.Content floated="left">
              <Link to={`/lists/${item.id}`}>{item.name}</Link>
            </List.Content>
          </List.Item>
        ))}
      </List>
    );
  };

  return (
    <Grid.Column width="10">
      <div style={{ margin: '2em 0' }}>
        <Header float="left" textAlign="left">
          {header}
        </Header>
      </div>
      <Grid.Row>
        <Grid.Column>
          {// eslint-disable-next-line no-nested-ternary
          lists !== undefined && lists.length !== 0 ? (
            <>
              <Segment>
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
          ) : lists !== undefined && lists.length !== 0 ? (
            <>
              <p>Please create a template list</p>
              <Link to="/templates/create">
                <Button>New template</Button>
              </Link>
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
