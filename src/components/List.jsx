import React, { useEffect, useState } from 'react';

import {
  Form,
  Container,
  Grid,
  Segment,
  Header,
  Button,
} from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import ListService from '../services/ListService';
import DepartmentService from '../services/DepartmentService';
import CreateTask from './CreateTask';
import TaskService from '../services/TaskService';
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

  const removeUser = (id) => {
    const taskData = {
      UserId: null,
    };

    TaskService.updateTask(id, taskData).then((res) => {
      setTask([res]);
    });
  };

  return (
    <Grid.Column width="13">
      <div style={{ margin: '2em 0' }}>
        <Header as="h2" textAlign="left">
          {list.templateList
            ? `Task for template:  ${list.name}`
            : `Tasks for:  ${list.name}`}
        </Header>
      </div>
      {list !== undefined ? (
        <Segment>
          <Grid stackable columns={13} textAlign="left">
            {list.Tasks !== undefined && list.Tasks.length !== 0 ? (
              list.Tasks.map((item) => (
                <Grid.Row key={item.id} style={{ padding: '0' }}>
                  <Grid.Column verticalAlign="middle" computer="3">
                    {item.name}
                  </Grid.Column>
                  <Grid.Column verticalAlign="middle" computer="5">
                    {item.User !== undefined && item.User !== null ? (
                      <>
                        <p textAlign="left">
                          Assigned: {item.User.firstName} {item.User.lastName}
                          <Button
                            floated="right"
                            compact
                            onClick={() => removeUser(item.id)}
                          >
                            x
                          </Button>
                        </p>
                      </>
                    ) : (
                      'No assigned user'
                    )}
                  </Grid.Column>
                  <Grid.Column verticalAlign="middle" computer="5">
                    <TaskDropDown
                      options={options}
                      TaskServiceUpdateTask={TaskService.updateTask}
                      id={item.id}
                      setTask={setTask}
                    />
                  </Grid.Column>

                  <Grid.Column verticalAlign="middle" computer="2">
                    <Form>
                      <Form.Checkbox
                        inline
                        label="completed"
                        checked={item.status}
                        onChange={() => handleStatus(item.status, item.id)}
                      />
                    </Form>
                  </Grid.Column>
                </Grid.Row>
              ))
            ) : (
              <>
                <p>No tasks available for this list.</p>
              </>
            )}
          </Grid>
        </Segment>
      ) : null}
      <Header>Add task</Header>
      <CreateTask
        setTask={setTask}
        listsId={listsId.id}
        departments={departments}
      />
    </Grid.Column>
  );
};

export default Lists;
