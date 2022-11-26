






import './Content.css';
import wowbox from './sillythings/wow-box'


const hiderHeaderButtonId = (headerText) => {
  return "hhbid-id-" + headerText.split(" ").join("-");
};

const toggleElement = (idPassed) => {
  let id = idPassed.idPassed;
  let currClass = document.getElementById(id).getAttribute("class");
  if (currClass === "HiderNotHidden") {
    document.getElementById(id).setAttribute("class", "HiderHidden");
  } else {
    document.getElementById(id).setAttribute("class", "HiderNotHidden");
  }
};

const HiderHeader = (hiderHeader) => {
  let headerText = hiderHeader.headerText;
  let idToHide = hiderHeader.idToHide;
  let idToShow = hiderHeaderButtonId(headerText);
  return (
    <h3 className="HiderHeader" onDoubleClick={() => toggleElement({idPassed: idToShow})}>
      {headerText}
      <span className="HiderHidden" id={idToShow} onClick={() => toggleElement({idPassed: idToHide})}>...</span>
    </h3>
  )
};

const homepage = (
  <div>
    <h2>Welcome to <a href="https://lasershaft.com">Lasershaft.com!</a> where I put all my internet stuff.</h2>
    <br /><HiderHeader headerText="About Me" idToHide="aboutMeHider" />
    <span className="HiderNotHidden" id="aboutMeHider">
    <p>I'm Jess, I know some stuff about electronics and computers and the like.
    I have a degree in electrical engineering, I minored in computer science and mathematics.
    I'm seeking my CCNA as I work in IT and Database management. I'm seeking training in data science
    (maybeee considering graduate programs).</p>
    <p>I like to talk about my hobbies and this is my website so you cannot stop me muahaha.
      I have a <s>secret</s> side interest in multimedia art and graphics. I am self taught
      in <u title="except two classes (one in high school and one in college"> photography,</u> watercolors, 
      charcoal drawing, calligraphy, ink/ pen drawings, <u title="I use GIMP">digital raster editing,</u> and
      sometimes I use crayons. And more, I have a love for music, tabletop roleplaying games, cooking, and baking.
    </p>
    </span>
    {wowbox}
  </div>
);

const blog = (
  <p>Blog</p>
);

const tools = (
  <p>Tools</p>
);

const forofor = (
  <span>
    <header>404</header>
    <p>I don't know what you're looking for.</p>
    <a href="https://www.lasershaft.com/Home">Go home.</a>
  </span>
);
  

const GetContent = (wl) => {
  const there = wl.wl.p.toLowerCase();
  if (there === "/404") return forofor;
  if (there === "/home") return homepage;
  if (there === "/blog") return blog;
  if (there === "/tools") return tools;
  if (there === "/showqueries") { console.log(wl.wl.q); return <p>{wl.wl.q}</p>; };
  if (there === "/mail") { window.location.href = "https://mail.lasershaft.com"; return; };
  if (there === "/doc") { window.location.href = "https://doc.lasershaft.com"; return; };
  if (there === "/docs") { window.location.href = "https://doc.lasershaft.com"; return; };
  if (there === "/drive") { window.location.href = "https://doc.lasershaft.com"; return; };
  if (there === "/grp") { window.location.href = "https://grp.lasershaft.com"; return; };
  if (there === "/groups") { window.location.href = "https://grp.lasershaft.com"; return; };
  if (there === "/cal") { window.location.href = "https://cal.lasershaft.com"; return; };
  if (there === "/calendar") { window.location.href = "https://cal.lasershaft.com"; return; };
  if (there === "/site") { window.location.href = "https://site.lasershaft.com"; return; };
  if (there === "/sites") { window.location.href = "https://site.lasershaft.com"; return; };
  if (there === "/github") { window.location.href = "https://github.com/Alphaxius"; return; };
  if (there === "/email") { window.location.href = "https://mail.lasershaft.com"; return; };
  if (there === "/linkedin") { window.location.href = "https://linkedin.com/in/jesella-barrett"; return; };
  window.location.href = "404"; return;
} 

const Content = (wl) => {
  return (
    <div id="contentContainer" className="ContentContainer">
      <GetContent wl={wl.wl}/>
    </div>
  );
};

export default Content;