import React, { useEffect, useState } from 'react';
import { Table, Grid, Header, List, Button, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import ListService from '../services/ListService';
import CreateList from './CreateTemplate';
import CreateEmployee from './CreateEmployee';

import DepartmentService from '../services/DepartmentService';

const Lists = ({ history }) => {
  const [lists, setLists] = useState([]);
  const [newList, setNewList] = useState([]);
  const [department, setDepartment] = useState([]);
  const [templateList, setTemplateList] = useState([]);
  const [templates, setTemplates] = useState([]);

  const options = department.map(({ id, name }) => ({
    value: id,
    text: `${name}`,
  }));

  const templateOptions = templateList.map(({ id, name }) => ({
    value: id,
    text: `${name}`,
  }));

  useEffect(() => {
    ListService.list().then((res) => {
      const template = res.filter((item) => item.templateList);
      setTemplateList(template);
      console.log(template);
    });

    DepartmentService.findAllDepartmentLists().then((res) => {
      console.log(res);

      setLists(res);
    });

    DepartmentService.all().then((res) => setDepartment(res));
  }, [newList]);

  return (
    <Grid.Column width="10">
      <div style={{ margin: '2em 0' }}>
        <Header float="left" textAlign="left">
          Lists
        </Header>
      </div>
      <Grid.Row>
        <Grid.Column>
          {// eslint-disable-next-line no-nested-ternary
          lists !== undefined &&
          lists.length !== 0 &&
          templateList.length !== 0 ? (
            <>
              <Segment>
                <List divided relaxed>
                  {lists[0].Lists.map((item) => (
                    <List.Item key={item.id}>
                      <List.Content floated="left">
                        <Link to={`/lists/${item.id}`}>
                          {item.name}
                          {console.log(templateOptions)}
                        </Link>
                      </List.Content>
                    </List.Item>
                  ))}
                </List>
              </Segment>
              <Link>
                <Button floated="left">Mew template</Button>
              </Link>
            </>
          ) : lists !== undefined &&
            lists.length !== 0 &&
            templateList.length === 0 ? (
            <>
              <p>Please create a template list</p>
              <Link>
                <Button>Mew template</Button>
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
