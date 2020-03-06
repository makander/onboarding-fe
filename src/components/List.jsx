import React, { useEffect, useContext, useState } from 'react';

import {
  Dropdown,
  Button,
  Form,
  Segment,
  Header,
  Select,
  Item,
  Label,
} from 'semantic-ui-react';
import ListService from '../services/ListService';
import DepartmentService from '../services/DepartmentService';
import CreateTask from './CreateTask';
import TaskService from '../services/TaskService';

const Lists = ({ id }) => {
  const [list, setList] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [departments, setDepartments] = useState('');
  const [user, setUser] = useState('');
  const [status, setStatus] = useState(null);
  const [task, setTask] = useState([]);

  useEffect(() => {
    ListService.fetchAList(id).then((res) => setList(res.data.Tasks));
    DepartmentService.fetchDepartments().then(((res) => {
      console.log(res);
      setDepartments(res);
    }));
  }, [task]);


  const handleStatus = (taskStatus, taskId) => {
    const taskData = {
      status: !taskStatus,
    };

    TaskService.updateTask(taskId, taskData).then((res) => {
      console.log(res);
      setTask([]);
    });
  };


  const RenderList = () => list.map((item) => (item.status ? null : (
    <Item key={item.id}>
      <Item.Content>
        <Item.Header as="a">{item.name}</Item.Header>
        <Item.Description>{item.description}</Item.Description>
        <Item.Extra>
          <Form>
            <Form.Checkbox
              inline
              label="completed"
              checked={item.status}
              required
              onChange={() => handleStatus(item.status, item.id)}
            />
          </Form>
        </Item.Extra>
      </Item.Content>
    </Item>
  )));

  return (
    <div>
      <Item.Group divided>
        <RenderList />
      </Item.Group>
      <h2>Lists view</h2>
      <CreateTask setTask={setTask} ListId={id} departments={departments} />
    </div>
  );
};

export default Lists;
