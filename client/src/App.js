import React, { Component } from 'react';
import './App.css';
import {Route } from 'react-router-dom'
import MainPage from './components/MainPage';

class App extends Component {
  render() {
    return (
      <div className="App">
          <Route exact path='/' component={MainPage}/>
      </div>
    );
  }
}

export default App;
