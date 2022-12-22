






import './Content.css';
import wowbox from './sillythings/wow-box';
import HiderI from './Hider';
import wl from './Loc';

const blog = (
	<p className="ContentContainer">blog</p>
);

const homepage = (
  <div className="ContentContainer">
    <h2>Welcome to <a href="https://lasershaft.com">Lasershaft.com!</a> where I put all my internet stuff.</h2>
    <br /><HiderI.HiderHeader headerText="About Me" idToHide="aboutMeHider" />
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
    <HiderI.HiderHeader headerText="Wow" idToHide="wowboxcontainer" />
    <span className="HiderHidden" id="wowboxcontainer">
    {wowbox}
    </span>
  </div>
);

const forofor = (
  <div className="ContentContainer">
    <header>404</header>
    <p>I don't know what you're looking for.</p>
		<p><i>{wl.foflast}</i> doesn't seem to exist</p>
    <a href="https://www.lasershaft.com/">Go home.</a>
  </div>
);

const Content = () => {
  if (wl.i === "404") return forofor;
	if (wl.i === "home") return homepage;
	if (wl.i === "blog") return blog;
};

export default Content;