

let __o = window.location.origin;
let __p = decodeURIComponent(window.location.pathname).split('/').slice(1);
if (__p.length > 0 && __p[__p.length - 1] === "") __p.pop();
let __q = {};
window.location.search.slice(1).split('&').forEach((q) => {
  if (q.indexOf('=') !== -1) {
    let qa = q.split('=');
    __q[qa[0]] = qa[1];
  } else if (q !== "") {
    __q[q] = "";
  }
});
let __h = window.location.hash;
let __i;

const to404 = () => {
	window.location.href = __o + "/404" + window.location.pathname + window.location.search + __h;
}

if (__p.length === 0) {
	__i = "home";
} else if (__p[0] === "404") {
  document.title = "Wrong way Bradley";
	__i = "404";
} else if (__p[0] === "" ||
					 __p[0].toLowerCase() === "home") {
	if (__p.length > 1) {// && !(__p.length === 2 && __p[1] === "")) {
		to404();
	} else {
		__i = "home";
	}
} else if (__p[0].toLowerCase() === "art") {
  if (__p.length > 1) {// && !(__p.length === 2 && __p[1] === "")) {
		to404();
	} else {
    document.title="Laser Beam";
		__i = "art";
	}
} else if (__p[0].toLowerCase() === "about") {
  if (__p.length > 1) {// && !(__p.length === 2 && __p[1] === "")) {
		to404();
	} else {
		__i = "about";
	}
} else if (__p[0].toLowerCase() === "blog") {
	document.title="Blog 1118";
	__i = "blog";
} else if (__p[0].toLowerCase() === "mail" ||
					 __p[0].toLowerCase() === "email") {
	if (__p.length > 1) {// && !(__p.length === 2 && __p[1] === "")) {
		to404();
	} else {
		window.location.href = "https://mail.lasershaft.com";
	}
} else if (__p[0].toLowerCase() === "doc" ||
					 __p[0].toLowerCase() === "docs" ||
					 __p[0].toLowerCase() === "drive") {
	if (__p.length > 1) {// && !(__p.length === 2 && __p[1] === "")) {
		to404();
	} else {
		window.location.href = "https://doc.lasershaft.com";
	}
} else if (__p[0].toLowerCase() === "grp" ||
					 __p[0].toLowerCase() === "grps" ||
					 __p[0].toLowerCase() === "group" ||
					 __p[0].toLowerCase() === "groups") {
	if (__p.length > 1) {// && !(__p.length === 2 && __p[1] === "")) {
		to404();
	} else {
		window.location.href = "https://grp.lasershaft.com";
	}
} else if (__p[0].toLowerCase() === "cal") {
	if (__p.length > 1) {// && !(__p.length === 2 && __p[1] === "")) {
		to404();
	} else {
		window.location.href = "https://cal.lasershaft.com";
	}
} else if (__p[0].toLowerCase() === "site") {
	window.location.href = "https://site.lasershaft.com/";
} else if (__p[0].toLowerCase() === "github") {
	window.location.href = "https://www.github.com/Alphaxius";
} else if (__p[0].toLowerCase() === "linkedin") {
	if (__p.length > 1) {// && !(__p.length === 2 && __p[1] === "")) {
		to404(); 
	} else {
		window.location.href = "https://linkedin.com/in/jesella-barrett";
	}
} else {
	to404();
}

const wl = {
  o: __o,
  p: __p,
  q: __q,
  h: __h,
	i: __i,
};

const url404 = __o + "/" + __p.slice(1).join("/") + window.location.search + __h;

export default wl;
export {url404};
export {to404};
