import React, { Component } from 'react';
// import {withStyles} from '@material-ui/core'
import logo from './logo.svg';
import './App.css';
import MainPage from './components/MainPage';

class App extends Component {
  render() {
    return (
      <div className="App">
        <p className="App-intro"></p>
          <MainPage/>
      </div>
    );
  }
}

export default App;
