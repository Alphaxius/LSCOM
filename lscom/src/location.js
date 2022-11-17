

const both = window.location.href.split('/')[3].split("?");
const where = both[0];

let xquery = [];
if ( both.length >= 2 ) {
  xquery = both[1].split('&');
} else {
  xquery = [];
}

const query = xquery;

const orientation = function() {
  let w = window.innerWidth;
  let h = window.innerHeight;
  console.log(w);
  console.log(h);
  if (w < h) return "portrait";
  else return "landscape";
}

export default where;
export { query };
export { orientation };