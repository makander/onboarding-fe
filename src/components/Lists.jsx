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
    ListService.list().then((res) => setLists(res.data));
    DepartmentService.list().then((res) => setDepartment(res));
  }, [newList]);


  return (
    <>
      <Header>Lists</Header>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Tasks</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {lists.map((list) => (
            <Table.Row key={list.id}>
              <Table.Cell>
                <Link to={`${list.id}`}>{list.name}</Link>
              </Table.Cell>
              <Table.Cell>Tasks</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <Header>Create new list</Header>
      <CreateList setNewList={setNewList} options={options} />
    </>
  );
};

export default Lists;
