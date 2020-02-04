import React from 'react';
import Start from './components/Start';
import 'semantic-ui-css/semantic.min.css';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';


function App() {
  return (
    <div>
      <Navbar />
      <Start />
      <Login />
      <Register />
    </div>
  );
}

export default App;
