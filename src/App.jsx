import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './components/Sidebar';
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
import CreateList from './components/CreateList';
import CreateEmployee from './components/CreateEmployee';

axios.defaults.withCredentials = true;

function App() {
  const routes = [{ path: '/home', sidebar: Sidebar, home: Home }];

  return (
    <div>
      <AuthContextProvider>
        <BrowserRouter>
          <Route path="/departments" exact component={Departments} />
          <Route path="/departments/:id" exact component={Department} />

          <Route path="/" exact component={Start} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />

          <ProtectedRoute path="/home" component={Home} />
          <ProtectedRoute path="/lists" exact component={Lists} />
          <ProtectedRoute
            path="/lists/create"
            exact
            component={CreateEmployee}
          />
          <ProtectedRoute path="/templates" exact component={Lists} />
          {/*           <ProtectedRoute path="/lists/:id" exact component={List} /> */}
        </BrowserRouter>
      </AuthContextProvider>
    </div>
  );
}

export default App;
