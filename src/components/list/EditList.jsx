import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Form,
  Segment,
  Button,
  Grid,
  Header,
  List,
  Message,
} from 'semantic-ui-react';
import { v4 as uuidv4 } from 'uuid';
import ListService from '../../services/ListService';
import DepartmentService from '../../services/DepartmentService';

const EditList = () => {
  const [list, setList] = useState([]);
  const listsId = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [select, setSelect] = useState();
  const [listName, setListName] = useState();
  const [departments, setDepartments] = useState([]);
  const [options, setOptions] = useState([]);
  const [templateList, setTemplateList] = useState('');

  useEffect(() => {
    ListService.get(listsId.id).then((res) => {
      setList(res);
    });
    DepartmentService.all().then((res) => {
      setDepartments(res);
    });
  }, []);

  useEffect(() => {
    const opts = departments.filter((o1) =>
      list.Departments.some((o2) => o1.id !== o2.id)
    );
    const filterOptions = opts.map(({ id, name }) => ({
      value: id,
      text: name,
    }));

    setOptions(filterOptions);
  }, [departments, list.Departments]);

  const handleSelect = (e, { value }) => {
    setSelect(value);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (select !== undefined) {
      const data = {
        name: listName !== list.name ? listName : list.name,
        description:
          description !== list.description ? description : list.description,
        addedDepartment: select,
        status: false,
        templateList: templateList !== list.templateList ? templateList : title,
      };

      ListService.update(listsId.id, data).then((res) => {
        setTitle('');
        setDescription('');
        setSelect([]);
        setTemplateList('');
        setList(res);
      });
    }
  };

  const deleteDepartment = (id) => {
    /*     const filter = list.Departments.filter(
      (department) => department.id !== id
    ); */

    const data = {
      departmentId: id,
    };

    ListService.update(listsId.id, data).then((res) => {
      setList(res);
    });
  };

  return (
    <Grid.Column width="13">
      <div style={{ margin: '2em 0' }}>
        <Message size="huge">
          <Header textAlign="left" as="h2">
            Edit list: {list.name}
          </Header>
        </Message>
      </div>
      {list.name !== undefined && departments !== undefined ? (
        <Grid.Row>
          <Grid.Column>
            <Header as="h4" attached="top">
              Summary:
            </Header>
            <Segment attached>
              {list.description ? <p>Decription: {list.description}</p> : ''}

              <h5>Template:</h5>
              {list.templateList ? <p>Yes</p> : <p>No</p>}

              <Header as="h5">Departments:</Header>
              {list.Departments !== undefined
                ? list.Departments.map((item) => (
                    <List celled key={uuidv4()}>
                      <List.Item>
                        <List.Content verticalAlign="bottom" floated="left">
                          {item.name}
                        </List.Content>
                        <List.Content floated="right">
                          <Button
                            compact
                            onClick={() => deleteDepartment(item.id)}
                          >
                            X
                          </Button>
                        </List.Content>
                      </List.Item>
                    </List>
                  ))
                : ''}
              <Button floated="right">Delete</Button>
              <br />
              <br />
            </Segment>

            <Segment>
              <Form.Group>
                <Form onSubmit={handleUpdate}>
                  <Form.Input
                    placeholder="enter new name"
                    label="New name"
                    type="text"
                    value={listName}
                    onChange={(e) => setListName(e.target.value)}
                  />

                  <Form.TextArea
                    placeholder="Enter description"
                    label="New description"
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />

                  <Form.Select
                    placeholder="Add department"
                    options={options}
                    onChange={handleSelect}
                    value={select}
                    clearable
                  />

                  <Form.Checkbox
                    inline
                    label="Template"
                    checked={list.templateList}
                  />

                  <Button type="submit">Save</Button>
                </Form>
              </Form.Group>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      ) : (
        ''
      )}
    </Grid.Column>
  );
};

export default EditList;
