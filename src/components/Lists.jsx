import React, { useEffect, useState } from 'react';
import { Table, Header, List } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import ListService from '../services/ListService';
import CreateList from './CreateList';
import CreateEmployee from './CreateEmployee';

import DepartmentService from '../services/DepartmentService';

const Lists = ({ history }) => {
  const [lists, setLists] = useState([]);
  const [newList, setNewList] = useState([]);
  const [department, setDepartment] = useState([]);
  const [templateList, setTemplateList] = useState([]);
  const [templates, setTemplates] = useState([]);

  const options = department.map(({ id, name }) => ({
    value: id,
    text: `${name}`,
  }));

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

    DepartmentService.findAllDepartmentLists().then((res) => {
      console.log(res);

      setLists(res);
    });

    DepartmentService.all().then((res) => setDepartment(res));
  }, [newList]);

  return (
    <div>
      {// eslint-disable-next-line no-nested-ternary
      lists !== undefined && lists.length !== 0 && templateList.length !== 0 ? (
        <>
          <List>
            {lists[0].Lists.map((item) => (
              <List.Item key={item.id}>
                <Link to={`${item.id}`}>
                  {item.name}
                  {console.log(templateOptions)}
                </Link>
              </List.Item>
            ))}
            <CreateEmployee
              setNewList={setNewList}
              templateOptions={templateOptions}
            />
          </List>
          <>
            <h2>Create new template</h2>
            <CreateList
              setNewList={setNewList}
              options={options}
              templateList
            />
          </>
        </>
      ) : lists !== undefined &&
        lists.length !== 0 &&
        templateList.length === 0 ? (
        <>
          <p>Please create a template list</p>
          <CreateList setNewList={setNewList} options={options} templateList />
        </>
      ) : (
        'No lists available, please join a department first'
      )}
    </div>
  );
};

export default Lists;
