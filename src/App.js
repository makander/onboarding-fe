import React from 'react';
import Start from './components/Start';
import 'semantic-ui-css/semantic.min.css';
import Navbar from './components/Navbar';
import Login from './components/Login';


function App() {
  return (
    <div>
      <Navbar />
      <Start />
      <Login />
    </div>
  );
}

export default App;
