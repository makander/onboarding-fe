import React, { useState } from 'react';
import {
  Button, Form,
} from 'semantic-ui-react';
import FormSimpleDropDown from './forms/FormSimpleDropDown';


const selectStyle = {
  width: 200,
};

const TaskDropDown = ({
  options, TaskServiceUpdateTask, id, setTask,
}) => {
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

      <Form.Group>
        <div style={selectStyle}>
          <FormSimpleDropDown


            placeholder="Assign User"
            options={options}
            onChange={handleSelect}
              // value={select}
            inputValue={select}
          />
        </div>
        <Button onClick={() => handleClick(id)}>Save</Button>
      </Form.Group>
    </Form>


  );
};

export default TaskDropDown;
