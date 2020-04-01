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
import { v4 as uuidv4 } from 'uuid';
import ListService from '../services/ListService';
import DepartmentService from '../services/DepartmentService';
import CreateTask from './CreateTask';
import TaskService from '../services/TaskService';
import TaskDropDown from './TaskDropDown';

const Lists = ({ history }) => {
  const [list, setList] = useState([]);
  const [options, setOptions] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [select, setSelect] = useState();

  const [task, setTask] = useState([]);

  const listsId = useParams();

  useEffect(() => {
    ListService.get(listsId.id).then((res) => {
      console.log(res);
      setList(res);
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

  const handleComplete = () => {
    const data = {
      name: list.name,
      description: list.description,
      status: true,
      templateList: list.templateList,
    };

    ListService.update(list.id, data).then((res) => {
      history.push('/lists');
    });
  };

  const deleteList = () => {
    ListService.destroy(listsId.id).then(() => history.push('/lists'));
  };

  const CompleteSegment = () => {
    return list.Tasks != null &&
      list.Tasks.length !== 0 &&
      list.status !== true ? (
      <>
        {list.Tasks.filter((item) => item.status).length ===
        list.Tasks.length ? (
          <Button positive fluid onClick={() => handleComplete()}>
            Complete list
          </Button>
        ) : (
          'No'
        )}
      </>
    ) : (
      ''
    );
  };

  return (
    <Grid.Column width="13">
      <div style={{ margin: '2em 0' }}>
        <Header as="h2" textAlign="left">
          {/* ? `Task for template:  ${list.name}`
            : `Tasks for:  ${list.name}` */}
          {list && list.templateList
            ? `Task for template:  ${list.name}`
            : `Tasks for:  ${list.name}`}
        </Header>
      </div>
      {list != null ? (
        <>
          <Segment>
            <Grid stackable columns={13} textAlign="left">
              {list.Tasks != null && list.Tasks.length !== 0 ? (
                list.Tasks.map((item) => (
                  <Grid.Row key={item.id} style={{ padding: '0' }}>
                    <Grid.Column verticalAlign="middle" computer="3">
                      {item.name}
                    </Grid.Column>
                    <Grid.Column verticalAlign="middle" computer="5">
                      {item.User != null && item.User != null ? (
                        <>
                          <p>
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
          <CompleteSegment />
        </>
      ) : null}
      <Header>Add task</Header>
      <CreateTask
        setTask={setTask}
        listsId={listsId.id}
        departments={departments}
      />
      <Button.Group floated="right">
        <Button secondary onClick={() => editList()}>
          Edit
        </Button>
        <Button negative onClick={() => deleteList()}>
          Delete
        </Button>
      </Button.Group>
    </Grid.Column>
  );
};

export default Lists;
