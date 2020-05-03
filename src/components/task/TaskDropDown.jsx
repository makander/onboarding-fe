import React, { useState, useContext } from 'react';
import { Form, Grid } from 'semantic-ui-react';
import { MessageContext } from '../../context/MessageContext';

const DropDownStyle = {
  paddingTop: '1em',
  paddingBottom: '1em',
};

const TaskDropDown = ({ options, TaskServiceUpdateTask, id, setTask }) => {
  const [select, setSelect] = useState('');
  const { dispatchMessage } = useContext(MessageContext);
  const handleClick = (taskId) => {
    const taskData = {
      userId: select,
    };
    TaskServiceUpdateTask(taskId, taskData)
      .then((res) => {
        setTask([res]);
      })
      .catch((error) => {
        dispatchMessage({
          type: 'ERROR',
          payload: error.response.data,
        });
      });
    setSelect('');
  };

  const handleSelect = (e, { value }) => {
    setSelect(value);
  };

  return (
    <Form style={DropDownStyle} unstackable>
      <Form.Group>
        <Form.Select
          placeholder="Assign User"
          options={options}
          onChange={handleSelect}
          value={select}
          width="11"
        />

        <Form.Button onClick={() => handleClick(id)} content="Save" />
      </Form.Group>
    </Form>
  );
};

export default TaskDropDown;
