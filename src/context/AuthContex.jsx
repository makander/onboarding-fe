import React, { createContext, useReducer } from 'react';
import authReducer from '../reducers/AuthReducer';

export const AuthContext = createContext();


const AuthContextProvider = ({ children }) => {
  const [authStatus, dispatch] = useReducer(
    authReducer, {
      userIsAuthenticated: false,
      user: {},
    },
  );

  return (
    <AuthContext.Provider value={{ authStatus, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
