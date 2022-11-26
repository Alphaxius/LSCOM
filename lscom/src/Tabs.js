

/* import */

import './Tabs.css';
import React from 'react';



/* consts */

const lt = "<";
const gt = ">";


/* functions */

const dont = function(e) {};

const navTo = function(e) {
  closeTabs();
  let toWhere = e.target.value;
  if (toWhere === "LS") toWhere = "Home";
  window.location.href = toWhere;
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
  /*
const navBarName = function() {
  if ( orientation() === "portrait" ) return "navBarP";
  else return "navBarL";
};
*/

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

const HomeTab = () => {
  return (
    <span>
      <label htmlFor="tab-id-LS">"Home"</label>
      <input
        id="tab-id-LS"
        type="button"
        className="HomeTab"
        value="LS"
        onClick={navTo}
        onChange={dont}
      />
    </span>
  );
};


const Tabs = () => {
  return (
    <div id="tabContainer">
      <Tab tabName="Home" />
      <Tab tabName="Tools" />
      <Tab tabName="Blog" />
      <Tab tabName="GitHub" />
      <Tab tabName="LinkedIn" />
    </div>
  );
};

const Nav = (wl) => {
  
  let title = wl.wl.p.slice(1).toLowerCase();
  title = title.charAt(0).toUpperCase() + title.slice(1);

  return (
    <span id="navContainer" className="NavContainerIn" >
      <span className="navBar">
        {tabHider}
        <header className="NavHeader">{title}</header>
        <HomeTab />
      </span>
      <Tabs />
    </span>
  );
};


export default Nav;














