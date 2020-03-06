import React from 'react';
import { Form } from 'semantic-ui-react';


const FormWrapper = ({ handleSubmit, children }) => <Form onSubmit={handleSubmit}>{children}</Form>;

export default FormWrapper;
