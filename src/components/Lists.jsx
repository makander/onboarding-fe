import React, { useEffect, useContext, useState } from 'react';
import { navigate, Link } from '@reach/router';
import {
  Button, Form, Segment, Header,
} from 'semantic-ui-react';
import { AuthContext } from '../context/AuthContex';
import ListService from '../services/ListService';
import CreateList from './CreateList';
import DisplayCard from './DisplayCard';

const Lists = (props) => {
  const { authStatus: { user: { id } } } = useContext(AuthContext);
  const [lists, setLists] = useState([]);


  console.log(props);
  // const  user.  = useContext(AuthContext);
  useEffect(() => {
    ListService.fetchLists(id).then((res) => setLists(res.data));
  }, []);


  return (
    <div>
      {lists.map((list) => (
        <DisplayCard name={list.name} description={list.description} id={list.id} type="list" />
      ))}
      <p>Welcome to lists</p>
      {console.log(lists)}
      <CreateList />
    </div>
  );
};

export default Lists;
