import React, { useEffect, useState } from 'react';

import {
  Form,
  Header,
  Table,
  Button,
  Container,
  Grid,
} from 'semantic-ui-react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from 'react-router-dom';
import ListService from '../services/ListService';
import DepartmentService from '../services/DepartmentService';
import CreateTask from './CreateTask';
import TaskService from '../services/TaskService';
import FormSimpleDropDown from './forms/FormSimpleDropDown';
import TaskDropDown from './TaskDropDown';

const Lists = () => {
  const [list, setList] = useState([]);
  const [options, setOptions] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [select, setSelect] = useState();

  const [task, setTask] = useState([]);

  const listsId = useParams();

  useEffect(() => {
    ListService.get(listsId.id).then((res) => {
      setList(res.data);
    });
    DepartmentService.findAllDepartmentTasks(listsId.id).then((res) => {
      setDepartments(res);
    });
    DepartmentService.findAllDepartmentLists(listsId.id).then((res) => {
      const format = res.flatMap((user) =>
        user.Users.map(({ id, firstName, lastName }) => ({
          value: id,
          text: `${firstName} ${lastName}`,
        }))
      );

      const opts = format.filter(
        (v, i, a) => a.findIndex((t) => t.value === v.value) === i
      );
      setOptions(opts);
    });
  }, [task]);

  const handleSelect = (e, { value }) => {
    e.preventDefault();
    setSelect(value);
  };

  const handleStatus = (taskStatus, taskId) => {
    const taskData = {
      status: !taskStatus,
    };

    TaskService.updateTask(taskId, taskData).then((res) => {
      setTask([res]);
    });
  };

  return (
    <Grid.Column width="10">
      <div style={{ margin: '2em 0' }}>
        <Header as="h2" textAlign="left">
          {list.name ? `Tasks for:  ${list.name}` : 'List'}
        </Header>
      </div>
      {list !== undefined ? (
        <Container>
          <Grid stackable columns={1} textAlign="left">
            {list.Tasks !== undefined && list.Tasks.length !== 0
              ? list.Tasks.map((item) => (
                  <Grid.Row key={item.id} style={{ padding: '0' }}>
                    <Grid.Column verticalAlign="middle" computer="3">
                      {item.name}
                    </Grid.Column>
                    <Grid.Column verticalAlign="middle" computer="3">
                      <Form>
                        <Form.Checkbox
                          inline
                          label="completed"
                          checked={item.status}
                          onChange={() => handleStatus(item.status, item.id)}
                        />
                      </Form>
                    </Grid.Column>
                    <Grid.Column verticalAlign="middle" computer="6">
                      <TaskDropDown
                        options={options}
                        TaskServiceUpdateTask={TaskService.updateTask}
                        id={item.id}
                        setTask={setTask}
                      />
                    </Grid.Column>

                    {item.User !== undefined && item.User !== null ? (
                      <Grid.Column verticalAlign="middle" computer="3">
                        Assigned to: {item.User.firstName} {item.User.lastName}
                      </Grid.Column>
                    ) : null}
                  </Grid.Row>
                ))
              : null}
          </Grid>
        </Container>
      ) : null}
      <Header>Create new task</Header>
      <CreateTask
        setTask={setTask}
        listsId={listsId.id}
        departments={departments}
      />
    </Grid.Column>
  );
};

export default Lists;
