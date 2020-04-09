import React, { createContext, useReducer } from 'react';
import { Message } from 'semantic-ui-react';
import messageReducer from '../reducers/messageReducer';

export const MessageContext = createContext();


const MessageProvider = ({ children }) => {
  const [state, dispatchMessage] = useReducer(messageReducer, {
    message: '',
    status: '',
  });

  return (
    <MessageContext.Provider value={{ state, dispatchMessage }}>
      {children}
    </MessageContext.Provider>
  );
};

export default MessageProvider;
