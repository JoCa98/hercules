import React from 'react';
import logo from './logo.svg';
import './App.css';
import ActCodeForm from './components/ActCodeForm';


function App() {
  return (

    <div className="App">

      <header className="App-body">
        <ActCodeForm />
      </header>

      <div className="App-body">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

      </div>
    </div>
  );
}

export default App;
