import React from 'react';
import { Link } from '@reach/router';


const Home = () => (
  <div>
    <Link to="/lists">Lists</Link>
    <br />
    <Link to="/list">list</Link>
    <Link to="/" />
    <br />
    <Link to="/departments">Deparments</Link>

  </div>
);

export default Home;
