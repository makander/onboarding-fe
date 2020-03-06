import React, { useState, useEffect } from 'react';
import { Form } from 'semantic-ui-react';
import DepartmentService from '../services/DepartmentService';
import FormInput from './forms/FormInput';
import FormButton from './forms/FormButton';
import FormWrapper from './forms/FormWrapper';
import TextArea from './forms/FormTextArea';
import FormDropDown from './forms/FormDropDown';
import UserService from '../services/UserService';

const Department = () => {
  const [departments, setDepartments] = useState('');
  const [departmentName, setDeparmentName] = useState('');
  const [departmentDescription, setDepartmentDescription] = useState('');

  useEffect(() => {
    UserService.fetchUsers().then((res) => setUsers(res));
  }, []);

  const handleSubmit = () => {
    console.log('woop');
  };

  const opts = [
    { key: 'angular', text: 'Angular', value: 'angular' },
    { key: 'css', text: 'CSS', value: 'css' },
    { key: 'design', text: 'Graphic Design', value: 'design' },
    { key: 'ember', text: 'Ember', value: 'ember' },
    { key: 'html', text: 'HTML', value: 'html' },
    { key: 'ia', text: 'Information Architecture', value: 'ia' },
    { key: 'javascript', text: 'Javascript', value: 'javascript' },
    { key: 'mech', text: 'Mechanical Engineering', value: 'mech' },
    { key: 'meteor', text: 'Meteor', value: 'meteor' },
    { key: 'node', text: 'NodeJS', value: 'node' },
    { key: 'plumbing', text: 'Plumbing', value: 'plumbing' },
    { key: 'python', text: 'Python', value: 'python' },
    { key: 'rails', text: 'Rails', value: 'rails' },
    { key: 'react', text: 'React', value: 'react' },
    { key: 'repair', text: 'Kitchen Repair', value: 'repair' },
    { key: 'ruby', text: 'Ruby', value: 'ruby' },
    { key: 'ui', text: 'UI Design', value: 'ui' },
    { key: 'ux', text: 'User Experience', value: 'ux' },
  ];

  return (
    <div>
      <Form.Group>
        <Form onSubmit={handleSubmit}>
          <FormInput placeholder="Department name" label="Name" type="text" inputValue={departments} setInputValue={setDepartments} />

          <TextArea placeholder="Description" label="hej" inputValue={departments} setInputValue={setDepartments} name="textarea" />

          <FormDropDown placeholder="D" options={opts} />
          <FormButton title="Save" type="submit" />
        </Form>

      </Form.Group>
      {departments}
    </div>
  );
};


export default Department;
