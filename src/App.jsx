import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import AuthContextProvider from './context/AuthContext';
import MessageProvider from './context/MessageContext';
import ProtectedRoute from './routes/ProtectedRoute';
import Start from './components/Start';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Home from './components/Home';
import Departments from './components/department/Departments';
import Department from './components/department/Department';
import CreateTemplate from './components/list/CreateTemplate';
import CreateEmployee from './components/list/CreateEmployee';
import EditList from './components/list/EditList';
import Users from './components/users/Users';
import User from './components/users/User';
import List from './components/list/List';
import Lists from './components/list/Lists';
import Notification from './components/Notification';
import Notifications from './components/messaging/Notifications';

axios.defaults.withCredentials = true;

function App() {
  return (
    <div>
      <MessageProvider>
        <Notification />
        <AuthContextProvider>
          <BrowserRouter>
            <Switch>
              <Route path="/" exact component={Start} />
              <Route path="/login" exact component={Login} />
              <Route path="/register" exact component={Register} />

              <ProtectedRoute path="/home" component={Home} />

              <ProtectedRoute path="/users" exact component={Users} />
              <ProtectedRoute path="/users/:id" exact component={User} />

              <ProtectedRoute path="/lists" exact component={Lists} />

              <ProtectedRoute
                path="/notifications"
                exact
                component={Notifications}
              />
              <ProtectedRoute
                path="/lists/create"
                exact
                component={CreateEmployee}
              />
              <ProtectedRoute
                path="/lists/edit/:id"
                exact
                component={EditList}
              />
              <ProtectedRoute path="/lists/:id" exact component={List} />

              <ProtectedRoute
                path="/templates/create"
                exact
                component={CreateTemplate}
              />

              <ProtectedRoute
                path="/departments"
                exact
                component={Departments}
              />
              <ProtectedRoute
                path="/departments/:id"
                exact
                component={Department}
              />
            </Switch>
          </BrowserRouter>
        </AuthContextProvider>
      </MessageProvider>
    </div>
  );
}

export default App;
