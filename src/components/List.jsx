import React, { useEffect, useContext, useState } from 'react';

import {
  Dropdown, Button, Form, Segment, Header, Select, Item, Label,
} from 'semantic-ui-react';
import ListService from '../services/ListService';
import DepartmentService from '../services/DepartmentService';
import CreateList from './CreateList';
import DisplayCard from './DisplayCard';
import CreateTask from './CreateTask';
import TaskService from '../services/TaskService';

const Lists = ({ id }) => {
  const [list, setList] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [department, setDepartment] = useState('');
  const [user, setUser] = useState('');
  const [status, setStatus] = useState(null);
  const [task, setTask] = useState('');
  // const [task, setTask] = useState([]);

  useEffect(() => {
    ListService.fetchAList(id).then((res) => setList(res.data.Tasks));
  }, [task]);

  const handleTask = () => {
    console.log('lulz');
  };

  const handleStatus = (status, taskId) => {
    console.log('click');
    console.log(!status);
    console.log(status);
    // console.log(id);
    // TaskService.updateTask(props);
  };
  const RenderList = () => list.map((item) => (
    <Item>

      <Item.Content>
        <Item.Header as="a">{item.name}</Item.Header>
        {/*         <Item.Meta>
          <span className="cinema">Union Square 14</span>
        </Item.Meta> */}
        <Item.Description>{item.description}</Item.Description>
        <Item.Extra>
          {/*     <Form onSubmit={handleTask}>
            <Form.Checkbox
              inline
              label="completed"
              value={item.status}
              required
              onChange={() => handleStatus(item.status, item.id)}
            />

          </Form> */}
        </Item.Extra>
      </Item.Content>
    </Item>
  ));

  return (
    <div>
      <Item.Group divided>
        <RenderList />
      </Item.Group>
      <h2>Lists view</h2>
      <CreateTask setTask={setTask} ListId={id} />
      {console.log(list)}
    </div>
  );
};

export default Lists;
