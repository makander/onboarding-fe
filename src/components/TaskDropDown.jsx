import React, { useState } from 'react';
import { Button, Form, Container } from 'semantic-ui-react';

const selectStyle = {
  width: 200,
  marginTop: '0.5em',
};

const TaskDropDown = ({ options, TaskServiceUpdateTask, id, setTask }) => {
  const [select, setSelect] = useState('');

  const handleClick = (taskId) => {
    const taskData = {
      userId: select,
    };
    TaskServiceUpdateTask(taskId, taskData).then((res) => {
      setTask([res]);
    });
    setSelect('');
  };

  const handleSelect = (e, { value }) => {
    setSelect(value);
  };

  return (
    <Form>
      <Form.Group inline style={selectStyle}>
        <Form.Select
          placeholder="Assign User"
          options={options}
          onChange={handleSelect}
          value={select}
        />

        <Button onClick={() => handleClick(id)}>Save</Button>
      </Form.Group>
    </Form>
  );
};

export default TaskDropDown;
