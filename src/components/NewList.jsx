import React, { useState, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';

import CreateEmployee from './CreateEmployee';
import ListService from '../services/ListService';

const NewList = () => {
  const [templateList, setTemplateList] = useState([]);
  const [newList, setNewList] = useState([]);

  const templateOptions = templateList.map(({ id, name }) => ({
    value: id,
    text: `${name}`,
  }));

  useEffect(() => {
    ListService.list().then((res) => {
      const template = res.filter((item) => item.templateList);
      setTemplateList(template);
      console.log(template);
    });
  });
  return (
    <Grid container centered columns={1}>
      <Grid.Row centered>
        <CreateEmployee
          setNewList={setNewList}
          templateOptions={templateOptions}
        />
        <Grid.Column width={10} />
      </Grid.Row>
    </Grid>
  );
};

export default NewList;
