
let __o = window.location.origin;
let __p = window.location.pathname.split('/').slice(1);
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
	window.location.href = __o + "/404" + window.location.pathname + window.location.search + window.location.hash;
}

if (__p.length === 0) {
	__i = "home";
} else if (__p[0] === "404") {
	__i = "404";
} else if (__p[0] === "" ||
					 __p[0].toLowerCase() === "home") {
	if (__p.length > 1 && !(__p.length === 2 && __p[1] === "")) {
		to404();
	} else {
		__i = "home";
	}
} else if (__p[0].toLowerCase() === "blog") {
	__i = "blog";
} else if (__p[0].toLowerCase() === "mail" ||
					 __p[0].toLowerCase() === "email") {
	if (__p.length > 1 && !(__p.length === 2 && __p[1] === "")) {
		to404();
	} else {
		window.location.href = "https://mail.lasershaft.com";
	}
} else if (__p[0].toLowerCase() === "doc" ||
					 __p[0].toLowerCase() === "docs" ||
					 __p[0].toLowerCase() === "drive") {
	if (__p.length > 1 && !(__p.length === 2 && __p[1] === "")) {
		to404();
	} else {
		window.location.href = "https://doc.lasershaft.com";
	}
} else if (__p[0].toLowerCase() === "grp" ||
					 __p[0].toLowerCase() === "grps" ||
					 __p[0].toLowerCase() === "group" ||
					 __p[0].toLowerCase() === "groups") {
	if (__p.length > 1 && !(__p.length === 2 && __p[1] === "")) {
		to404();
	} else {
		window.location.href = "https://grp.lasershaft.com";
	}
} else if (__p[0].toLowerCase() === "cal") {
	if (__p.length > 1 && !(__p.length === 2 && __p[1] === "")) {
		to404();
	} else {
		window.location.href = "https://cal.lasershaft.com";
	}
} else if (__p[0].toLowerCase() === "site") {
	window.location.href = "https://site.lasershaft.com/" + window.location.pathname.split('/',1)[1] + 
		window.location.search + window.location.hash;
} else if (__p[0].toLowerCase() === "github") {
	window.location.href = "https://www.github.com/" + window.location.pathname.split('/',1)[1] + 
		window.location.search + window.location.hash;
} else if (__p[0].toLowerCase() === "linkedin") {
	if (__p.length > 1 && !(__p.length === 2 && __p[1] === "")) {
		to404(); 
	} else {
		window.location.href = "https://linkedin.com/in/jesella-barrett";
	}
} else {
	to404();
}

console.log(__i);

const wl = {
  o: __o,
  p: __p,
  q: __q,
  h: __h,
	i: __i,
	foflast: __o + "/" + __p.slice(1).join("/") + window.location.search + __h
};

export default wl;
