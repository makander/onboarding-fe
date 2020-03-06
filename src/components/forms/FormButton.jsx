import React from 'react';
import { Button, Form } from 'semantic-ui-react';

const FormButton = ({ title, type }) => <Form.Field><Button>{title}</Button></Form.Field>;

export default FormButton;
