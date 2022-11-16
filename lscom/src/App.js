

import React, { Component } from 'react';
import Nav from './Tabs';
import Content from './Content';
import where from './location';
import './App.css';


//        <nav where={location} />
class App extends Component {
  
  render() {
    var there = where;
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
