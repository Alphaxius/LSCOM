

/* import */

//import './Tabs.css';
import React from 'react';
import wl from './Loc';



/* consts */

const lt = "<";
const gt = "/>";


/* functions */

const dont = function(e) {};

const navTo = function(e) {
  closeTabs();
  let toWhere = e.target.value;
  if (toWhere === "LS") toWhere = "Home";
  window.location.replace(wl.o+"/"+toWhere);
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
    title="Select navigation"
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
				title={tn}
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
        title="Go home"
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
      <Tab tabName="Art" />
      <Tab tabName="GitHub" />
      <Tab tabName="LinkedIn" />
      <Tab tabName="About" />
    </div>
  );
};

const Nav = () => {
  
  let title = wl.i;
  title = title.charAt(0).toUpperCase() + title.slice(1);
	if (title === "Blog") title = "Blog 1118";

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














