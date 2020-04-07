import React, { useState, useEffect } from 'react';
import {
  Form,
  Segment,
  Grid,
  Button,
  Header,
  Dropdown,
} from 'semantic-ui-react';
// import { navigate } from '@reach/router';

import ListService from '../../services/ListService';
import DepartmentService from '../../services/DepartmentService';

const CreateTemplate = ({ history }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [select, setSelect] = useState();

  const [department, setDepartment] = useState([]);

  useEffect(() => {
    DepartmentService.all().then((res) => setDepartment(res));
  }, []);

  const options = department.map(({ id, name }) => ({
    value: id,
    text: `${name}`,
  }));

  const handleSelect = (e, { value }) => {
    setSelect(value);
  };

  const handleNewList = (e) => {
    e.preventDefault();

    const data = {
      name: title,
      description,
      departments: select,
      status: false,
      templateList: true,
    };

    ListService.create(data).then((res) => {
      if (res.templateList) {
        history.push(`/lists/${res.id}`);
      }
      setTitle('');
      setDescription('');
      setSelect([]);
    });
    /*     setTitle('');
      setDescription('');
      setSelect([]);
   */
    /*     if (templateList) {
        navigate('/home');
      } */
  };

  return (
    <Grid.Column width="10">
      <div style={{ margin: '2em 0' }}>
        <Header textAlign="left">Create new template</Header>
      </div>
      <Grid.Row>
        <Grid.Column>
          <Segment>
            <Form.Group>
              <Form onSubmit={handleNewList}>
                <Form.Input
                  placeholder="Title"
                  label="Title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />

                {options ? (
                  <Dropdown
                    placeholder="Select departments"
                    fluid
                    label="Department"
                    multiple
                    // search
                    selection
                    value={select}
                    options={options}
                    onChange={handleSelect}
                    // defaultValue={[]}
                    clearable
                  />
                ) : null}
                <div style={{ marginTop: '1em' }}>
                  <Button type="submit">Save</Button>
                </div>
              </Form>
            </Form.Group>
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid.Column>
  );
};

export default CreateTemplate;
