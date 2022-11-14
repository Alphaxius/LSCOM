

import React, { Component } from 'react';
import Nav from './Tabs';
import Content from './Content';
import './App.css';


//        <nav where={location} />
class App extends Component {
  
  render() {
    var there = window.location.href.split('/')[3];
    if (there === "") window.location.href = "Home";
    return (
      <div className="App">
        <Nav />
        <div id="contentSpacer" />
        <Content />
      </div>
    );
  };
};

export default App;
