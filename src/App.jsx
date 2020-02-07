import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Router } from '@reach/router';

import AuthContextProvider from './context/AuthContex';
import ContentWrap from './components/ContentWrap';
import Start from './components/Start';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';

function App() {
  return (
    <div>
      <AuthContextProvider>
        <Navbar />
        <ContentWrap start={Start}>
          <Router>
            <Navbar path="/Navbar" />
            <Start path="/" />
            <Login path="/login" />
            <Register path="/register" />
            <Home path="/home" />
          </Router>
        </ContentWrap>
      </AuthContextProvider>

    </div>


  );
}

export default App;
