import React from 'react';
import logo from './logo.svg';
import './App.css';

import SimpleTypes from './components/SimpleTypes';
import ObjectTypes from './components/ObjectTypes';
import Fetch from './components/Fetch';
import FetchLOR from './components/FetchLOR';



function App() {

  const obj = { name: 'Susan', age: 42 };

  return (
    <div className="App">
      <header className="App-header">

        <h1> React TypeScript Explore </h1>
        <hr />
        <SimpleTypes />
        <ObjectTypes />
        {/* <Fetch /> */}
        <FetchLOR />

        {/* ...  STUFF SAVED FROM STARTER CODE ... */}
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      </header>
    </div>
  );
}

export default App;


