import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Router } from '@reach/router';

import axios from 'axios';
import AuthContextProvider from './context/AuthContex';
import ContentWrap from './components/ContentWrap';
import Start from './components/Start';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import ProtectedRoute from './routes/ProtectedRoute';
import List from './components/List';
import Lists from './components/Lists';
import Departments from './components/Departments';
import Department from './components/Department';


axios.defaults.withCredentials = true;

function App() {
  return (
    <div>
      <AuthContextProvider>
        <Navbar />
        <ContentWrap start={Start}>
          <Router>

            <Departments component={Departments} path="/departments" />
            <Department component={Department} path="/departments/:departmentsId" />
            <Start path="/" />
            <Login path="/login" />
            <Register path="/register" />

            <ProtectedRoute component={Home} path="/home" />
            <ProtectedRoute component={Lists} path="/lists" />
            <ProtectedRoute component={List} path="/lists/:id" />


          </Router>
        </ContentWrap>
      </AuthContextProvider>

    </div>


  );
}

export default App;
