import React, { useEffect, useState } from 'react';

import {
  Form,
  Header, Table, Button,
} from 'semantic-ui-react';
import ListService from '../services/ListService';
import DepartmentService from '../services/DepartmentService';
import CreateTask from './CreateTask';
import TaskService from '../services/TaskService';
import FormSimpleDropDown from './forms/FormSimpleDropDown';
import TaskDropDown from './TaskDropDown';

const Lists = ({ listsId }) => {
  const [list, setList] = useState([]);
  const [options, setOptions] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [select, setSelect] = useState();

  const [task, setTask] = useState([]);

  useEffect(() => {
    ListService.get(listsId).then((res) => {
      setList(res.data);
    });
    DepartmentService.get(listsId).then(((res) => {
      setDepartments(res);
    }));
    DepartmentService.getForList(listsId).then((res) => {
      const format = res.flatMap((user) => user.Users.map(({ id, firstName, lastName }) => ({
        value: id,
        text: `${firstName} ${lastName}`,
      })));


      const opts = format.filter((v, i, a) => a.findIndex((t) => (t.value === v.value)) === i);
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
    <>

      {' '}
      {list !== undefined ? (
        <>

          <Header>
            Tasks for list:
            {' '}

            {list.name}
          </Header>
          debugger:
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Notes</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
                <Table.HeaderCell>Assigned User</Table.HeaderCell>
                <Table.HeaderCell>Assign User</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {list.Tasks !== undefined && list.Tasks.length !== 0 ? list.Tasks.map((item) => (!item.status
                ? (
                  <Table.Row key={item.id}>
                    <Table.Cell>
                      {item.name}
                    </Table.Cell>
                    <Table.Cell>
                      {item.description}
                    </Table.Cell>
                    <Table.Cell>
                      {' '}
                      <Form>
                        <Form.Checkbox
                          inline
                          label="completed"
                          checked={item.status}

                          onChange={() => handleStatus(item.status, item.id)}

                        />
                      </Form>
                    </Table.Cell>
                    <Table.Cell>
                      <TaskDropDown options={options} TaskServiceUpdateTask={TaskService.updateTask} id={item.id} setTask={setTask} />


                    </Table.Cell>
                    

                    <Table.Cell>
                      {item.User !== undefined && item.User !== null

                        ? (
                          <p>
                            {item.User.firstName}
                            {' '}
                            {item.User.lastName}
                          </p>
                        )
                        : ''}
                    </Table.Cell>

                  </Table.Row>
                )
                : null)) : null}
            </Table.Body>
          </Table>
        </>
      ) : null}


      <Header>Create new task</Header>
      <CreateTask setTask={setTask} listsId={listsId} departments={departments} />
    </>
  );
};

export default Lists;
