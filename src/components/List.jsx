import React, { useEffect, useState } from 'react';

import {
  Form,
  Header, Table,
} from 'semantic-ui-react';
import ListService from '../services/ListService';
import DepartmentService from '../services/DepartmentService';
import CreateTask from './CreateTask';
import TaskService from '../services/TaskService';

const Lists = ({ listsId }) => {
  const [list, setList] = useState([]);

  const [departments, setDepartments] = useState('');

  const [task, setTask] = useState([]);

  useEffect(() => {
    ListService.get(listsId).then((res) => { console.log(res.data.Tasks); setList(res.data); });
    DepartmentService.get(listsId).then(((res) => {
      setDepartments(res);
    }));
  }, [task]);


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
          {console.log(list)}
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
