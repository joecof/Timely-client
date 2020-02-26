import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  componentDidMount() {


  fetch(`http://127.0.0.1:8080/timely/services/token`, {
      method: 'post',
      body: JSON.stringify({
        "userName": "test",
        "password": "test"
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      return res.json();
    }).then(data => console.log(data));
}
  

  render() {
    return(
      <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Make a change
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
    )
  }
}

export default App;
