import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import AuthContextProvider from './context/AuthContext';
import Start from './components/Start';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Home from './components/Home';
import ProtectedRoute from './routes/ProtectedRoute';
import List from './components/list/List';
import Departments from './components/department/Departments';
import Department from './components/department/Department';
import CreateTemplate from './components/list/CreateTemplate';
import CreateEmployee from './components/list/CreateEmployee';
import TemplateList from './components/list/TemplateList';
import EmployeeList from './components/list/EmployeeLists';
import EditList from './components/list/EditList';
import Users from './components/Users';
import User from './components/User';

axios.defaults.withCredentials = true;

function App() {
  return (
    <div>
      <AuthContextProvider>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Start} />
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />

            <ProtectedRoute path="/home" component={Home} />

            <ProtectedRoute path="/users" exact component={Users} />
            <ProtectedRoute path="/users/:id" exact component={User} />

            <ProtectedRoute path="/lists" exact component={EmployeeList} />
            <ProtectedRoute
              path="/lists/create"
              exact
              component={CreateEmployee}
            />
            <ProtectedRoute path="/lists/edit/:id" exact component={EditList} />
            <ProtectedRoute path="/lists/:id" exact component={List} />

            <ProtectedRoute
              path="/templates/create"
              exact
              component={CreateTemplate}
            />
            <ProtectedRoute path="/templates" exact component={TemplateList} />

            <ProtectedRoute path="/departments" exact component={Departments} />
            <ProtectedRoute
              path="/departments/:id"
              exact
              component={Department}
            />
          </Switch>
        </BrowserRouter>
      </AuthContextProvider>
    </div>
  );
}

export default App;
