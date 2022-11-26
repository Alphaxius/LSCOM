

import React, { Component } from 'react';
import Nav from './Tabs';
import Content from './Content';
import Footer from './Footer';
import './App.css';


class App extends Component {
  
  render() {
    
    let __o = window.location.origin;
    let __p = window.location.pathname;
    if (__p === "/") __p = "/Home";
    let __q = window.location.search;
    let __h = window.location.hash;

    const wl = {
      o: __o,
      p: __p,
      q: __q,
      h: __h,
    };
    
    return (
      <div className="App">
        <Nav wl={wl}/>
        <div id="contentSpacer" />
        <Content wl={wl}/>
        <Footer />
      </div>
    );
  };
};

export default App;
