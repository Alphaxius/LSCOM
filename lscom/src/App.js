

import React, { Component } from 'react';
import Nav from './Tabs';
import Content from './Content';
//import Footer from './Footer';
import wl from './Loc.js';
import './App.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav />
        <div id="contentSpacer" />
        <Content />
        <footer className="FooterContainer">
					<div id="footer_copyright">Copyright Jesella Laser Beam, Lasershaft.com 2022</div>
					<div id="footer_emailme"><a href="mailto:jess@lasershaft.com">Email Me</a></div>
				</footer>
      </div>
    );
  };
};

export default App;
