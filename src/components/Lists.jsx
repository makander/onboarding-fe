import React, { useEffect, useContext, useState } from 'react';
import { Table } from 'semantic-ui-react';
import { Link } from '@reach/router';
import ListService from '../services/ListService';
import CreateList from './CreateList';

const Lists = ({ history }) => {
  // const { authStatus: { user: { id } } } = useContext(AuthContext);
  const [lists, setLists] = useState([]);
  const [newList, setNewList] = useState([]);


  // const  user.  = useContext(AuthContext);
  useEffect(() => {
    ListService.list().then((res) => setLists(res.data));
  }, [newList]);


  return (
    <Table basic="very">
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
        {console.log(lists)}
        <CreateList setNewList={setNewList} />
      </Table.Body>
    </Table>
  );
};

export default Lists;
