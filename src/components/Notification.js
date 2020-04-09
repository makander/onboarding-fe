import React, { useContext } from 'react';
import { Message } from 'semantic-ui-react';

import { MessageContext } from '../context/MessageContext';

const Notification = () => {
  const {
    dispatchMessage,
    state: { message, status },
  } = useContext(MessageContext);

  if (message === '') {
    return '';
  }
  setTimeout(() => {
    dispatchMessage({ type: 'CLEAR' });
  }, 5000);

  if (status === 'positive') {
    return <Message positive>{message}</Message>;
  }

  if (status === 'negative') {
    return <Message negative>{message}</Message>;
  }

  if (status === 'info') {
    return <Message info>{message}</Message>;
  }
};

export default Notification;
