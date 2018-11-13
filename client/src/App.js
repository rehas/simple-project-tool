import React, { Component } from 'react';
// import {withStyles} from '@material-ui/core'
import logo from './logo.svg';
import './App.css';
import {Route, withRouter } from 'react-router-dom'
import MainPage from './components/MainPage';
import Test from './components/Test';

class App extends Component {
  render() {
    return (
      <div className="App">
        <p className="App-intro"></p>
          <Route exact path='/demo' component={Test}/>
          <Route exact path='/' component={MainPage}/>
      </div>
    );
  }
}

export default App;
