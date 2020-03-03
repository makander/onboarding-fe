import React, { useEffect, useContext, useState } from 'react';

import { AuthContext } from '../context/AuthContex';
import ListService from '../services/ListService';
import CreateList from './CreateList';
import DisplayCard from './DisplayCard';

const Lists = (props) => {
  const { authStatus: { user: { id } } } = useContext(AuthContext);
  const [list, setList] = useState([]);
  // const [newList, setNewList] = useState([]);
  console.log(props.id);
  console.log(id);
  // const  user.  = useContext(AuthContext);
  useEffect(() => {
    ListService.fetchAList(props.id, id).then((res) => setList(res.data));
  }, []);


  return (
    <div>
      <h2>Lists view</h2>
      {console.log(list)}
    </div>
  );
};

export default Lists;
