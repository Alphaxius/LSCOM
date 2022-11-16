

const both = window.location.href.split('/')[3].split("?");
const where = both[0];

let xquery = [];
if ( both.length >= 2 ) {
  xquery = both[1].split('&');
} else {
  xquery = [];
}

const query = xquery;

export default where;
export { query };