import React, { useEffect, useContext, useState } from 'react';

import { AuthContext } from '../context/AuthContex';
import ListService from '../services/ListService';
import CreateList from './CreateList';
import DisplayCard from './DisplayCard';

const Lists = ({ history }) => {
  // const { authStatus: { user: { id } } } = useContext(AuthContext);
  const [lists, setLists] = useState([]);
  const [newList, setNewList] = useState([]);


  // const  user.  = useContext(AuthContext);
  useEffect(() => {
    ListService.fetchLists().then((res) => setLists(res.data));
  }, [newList]);


  return (
    <div>
      <h2>Lists view</h2>
      {lists.map((list) => (
        <DisplayCard history={history} name={list.name} description={list.description} id={list.id} type="list" />
      ))}
      {console.log(lists)}
      <CreateList setNewList={setNewList} />
    </div>
  );
};

export default Lists;
