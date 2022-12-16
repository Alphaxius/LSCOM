

import React, { Component } from 'react';
import Nav from './Tabs';
import Content from './Content';
import Footer from './Footer';
import wl from './Loc.js';
import './App.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav />
        <div id="contentSpacer" />
        <Content />
        <Footer />
      </div>
    );
  };
};

export default App;
