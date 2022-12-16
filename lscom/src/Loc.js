
let __o = window.location.origin;
let __pp = window.location.pathname.split('/').slice(1);
let __p = '/'+__pp[0];
if (__p === "/") __p = "/Home";
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

const wl = {
  o: __o,
  p: __p,
  pp: __pp,
  q: __q,
  h: __h,
};

export default wl;
