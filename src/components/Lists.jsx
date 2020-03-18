import React, { useEffect, useState } from 'react';
import { Table, Header } from 'semantic-ui-react';
import { Link } from '@reach/router';
import ListService from '../services/ListService';
import CreateList from './CreateList';
import DepartmentService from '../services/DepartmentService';

const Lists = ({ history }) => {
  const [lists, setLists] = useState([]);
  const [newList, setNewList] = useState([]);
  const [department, setDepartment] = useState([]);

  const options = department.map(({ id, name }) => ({
    value: id,
    text: `${name}`,
  }));

  useEffect(() => {
    ListService.list().then((res) => {
      console.log(res);
      console.log(res[0].Lists);
      setLists(res[0].Lists);
    });
    DepartmentService.list().then((res) => setDepartment(res));
  }, [newList]);


  return (
    <>
      {lists !== undefined ? (
        <>
          {console.log(lists)}
          <Header>Lists</Header>
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
                <Table.HeaderCell></Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {lists.map((list) => (
                <Table.Row key={list.id}>
                  {list.Lists}
                  <Table.Cell>
                    <Link to={`${list.id}`}>
                      {list.name}

                    </Link>
                  </Table.Cell>
                  <Table.Cell>{list.status}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </>
      ) : null}
      <Header>Create new list</Header>
      <CreateList setNewList={setNewList} options={options} />
    </>
  );
};

export default Lists;
