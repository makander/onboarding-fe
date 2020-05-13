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
    return <Message positive>{message.error || message}</Message>;
  }

  if (status === 'negative' && message.name) {
    console.log(message);
    return <Message negative>{message.errors[0].message}</Message>;
  }
  if (status === 'negative') {
    console.log(message);
    return <Message negative>{message}</Message>;
  }

  if (status === 'info') {
    return <Message info>{message.error || message}</Message>;
  }
};

export default Notification;
