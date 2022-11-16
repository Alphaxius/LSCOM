

/* import */

import './Tabs.css';
import React from 'react';
import where from './location.js';


/* consts */

const lt = "<";
const gt = ">";


/* functions */

const dont = function(e) {};

const navTo = function(e) {
  let toWhere = e.target.value;
  if (toWhere === "LSCOM" || toWhere === "Lasershaft") toWhere = "Home";
  window.location.href = toWhere;
  closeTabs();
};

const createid = function(name) {
  return "tab-id-"+name;
}

const toggleTabs = function() {
  var nc = document.getElementById("navContainer");
  var th = document.getElementById("tabHider");
  var inout = nc.getAttribute("class");
  if (inout === "NavContainerIn") {
    nc.setAttribute("class", "NavContainerOut");
    th.setAttribute("value", gt);
  }
  else {
    nc.setAttribute("class", "NavContainerIn");
    th.setAttribute("value", lt);
  }
};

const closeTabs = function() {
  var nc = document.getElementById("navContainer");
  var th = document.getElementById("tabHider");
  nc.setAttribute("class", "NavContainerIn");
  th.setAttribute("value", lt);
};


/* elements */

const tabHider = (
    <input
      id="tabHider"
      type="button"
      className="TabHider"
      value={lt}
      onClick={toggleTabs}
      onChange={dont}
    />
);

const Tab = (tabName) => {
  let tn = tabName.tabName;
  let tabid = createid(tn);
  return (
    <span>
      <label htmlFor={tabid}>{tn}</label>
      <input
        id={tabid}
        type="button"
        className="Tab"
        value={tn}
        onClick={navTo}
        onChange={dont}
      />
    </span>
  );
};


const Tabs = () => {
  return (
    <div id="tabContainer">
      <Tab tabName="Lasershaft" />
      <Tab tabName="Blog" />
      <Tab tabName="Tools" />
      <Tab tabName="Workspace" />
    </div>
  );
};

const Nav = () => {
  
  let there = where;
  return (
    <span id="navContainer" className="NavContainerIn" >
      <span className="navBar">
        {tabHider}
        <header className="NavHeader">{there}</header>
        <Tab tabName="LSCOM" />
      </span>
      <Tabs />
    </span>
  );
};


export default Nav;














