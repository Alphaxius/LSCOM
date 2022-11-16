





import where, { query } from './location.js';
import './Content.css';


const homepage = (
  <p>Welcome to Lasershaft.com, a place for lasers and shafts. Coming soon to own on DVD and video.</p>
);

const blog = (
  <p>Blog</p>
);

const workspace = (
  <span>
  <li><a href="github.com/Alphaxius">Github</a></li>
  <li><a href="mail.lasershaft.com">Mail</a></li>
  <li><a href="cal.lasershaft.com">Calendar</a></li>
  <li><a href="grp.lasershaft.com">Groups</a></li>
  <li><a href="doc.lasershaft.com">Drive</a></li>
  <li><a href="site.lasershaft.com">Site</a></li>
  </span>
);

const tools = (
  <p>Tools</p>
);

const GetContent = () => {
  let there = where;
  if (there.toLowerCase() === "home") return homepage;
  if (there.toLowerCase() === "blog") return blog;
  if (there.toLowerCase() === "tools") return tools;
  if (there.toLowerCase() === "workspace") return workspace;
  if (there.toLowerCase() === "showqueries") { console.log(query); return <p>{query}</p>; };
  if (there.toLowerCase() === "mail") { window.location.href = "https://mail.lasershaft.com"; return; };
  if (there.toLowerCase() === "doc") { window.location.href = "https://doc.lasershaft.com"; return; };
  if (there.toLowerCase() === "grp") { window.location.href = "https://grp.lasershaft.com"; return; };
  if (there.toLowerCase() === "cal") { window.location.href = "https://cal.lasershaft.com"; return; };
  if (there.toLowerCase() === "site") { window.location.href = "https://site.lasershaft.com"; return; };
  if (there.toLowerCase() === "github") { window.location.href = "https://github.com/Alphaxius"; return; };
} 

const Content = () => {
  return (
    <div id="contentContainer" className="ContentContainer">
      <GetContent />
    </div>
  );
};

export default Content;