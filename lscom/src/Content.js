






//import './Content.css';
import React from 'react';
//import wowbox from './sillythings/wow-box';
//import HiderI from './Hider';
import wl, {url404, blogIndex} from './Loc';
import BlogReader from './blog/blogReader';
//import Utitle from './Utitle';
import {Utitle, Gimage} from './modgeuls';

const blog = () => {
	const index = blogIndex();
	if (!index) return forofor;
	let blogContent = ""
	try {
		blogContent = <BlogReader blogContent={require('./blog/'+index.file+'.json')} />;
	}
	catch (error) {
		return forofor();
	}
	finally {
		return (
			<div className="ContentContainer">
				{blogContent}
				<div className="pnBlogLinksContainer">
					<a className="previous BlogLink" href={wl.o+"/Blog"+index.prev}>Previous</a>
					<a className="perma BlogLink" href={wl.o+"/Blog/"+index.year+"/"+index.name}>Permalink</a>
					<a className="next BlogLink" href={wl.o+"/Blog"+index.next}>Next</a>
				</div>
			</div>
		);
	}
}

const art = () => {
  let numarts = 1;
  for (let n = 1; n < 17; n += 1) {
    if (Number(wl.q.n) === n) {
      numarts = n;
      break;
    }
  }
  const artids = require("./artids.json");
  let artidsdexes = [];
  for (let artidsdex = 0; artidsdex < numarts; artidsdex += 1) {
    artidsdexes.push(Math.floor(artids.length * Math.random()));
  }
  let arts = [];
  for (const artsdex of artidsdexes) {
    let id = artids[artsdex];
    arts.push(<Gimage imageId={id} title={id} key={id} />);
  }
  return (
    <div className="ContentContainer">
      <h2>This is a poorly made art portfolio. See up to 16 at a time!</h2>
      
      <p>Load <a href={wl.o + "/art?n=1"}>1</a> / <a href={wl.o + "/art?n=4"}>4</a> / <a href={wl.o + "/art?n=16"}>16</a> images</p>
      <p><a href={window.location.href}>Get different pictures</a></p>
      {arts}
      <p style={{"font-size": "small", "margin-left": "20vw", "margin-right": "20vw"}}>I say poorly made in that the portfolio is poorly made. I actually think some of my stuff isn't that bad, but who am I to judge? There is no correct order to viewing things that I make, so you can only get these randomly. Titles for these works is not provided. Enjoy only the pixels without other context.<br /> License for these pieces is, with great trust in you, <i>"feel free to use and profit from these images but don't do the thing where you claim copyright on them and sue me, Jesella Laser Beam Barrett, for using them on my website. I would also appreciate it if you credited me, but you don't have to."</i></p>
    </div>
  );
}


const about = (
  <div className="ContentContainer">
    <h2>Ollo, call me Laser</h2>
    <h3>About Me</h3>
    <p>I'm Jess, I know some stuff about electronics and computers and the like.
      I have a degree in electrical engineering, I minored in computer science and mathematics.
      I'm seeking my CCNA as I work in IT and Database management. I'm seeking training in data science
      (maybeee considering graduate programs).</p>
    <p>I like to talk about my hobbies and this is my website so you cannot stop me muahaha.
      I have a <s>secret</s> side interest in multimedia art and graphics. I am self taught
      in <Utitle text=" photography," title="except two classes (one in high school and one in college" /> watercolors, 
      charcoal drawing, calligraphy, ink/ pen drawings, <Utitle text="digital raster editing," title="I use GIMP" /> and
      sometimes I use crayons. And more, I have a love for music, tabletop roleplaying games, cooking, and baking.
    </p>
  </div>
);

const homepage = (
  <div className="ContentContainer">
    <h2>Welcome to <a href="https://lasershaft.com">Lasershaft.com!</a> where I put all my internet stuff.</h2>
    <h3><a href="https://lasershaft.com/about">Who am I?</a></h3>
    <h3>I write blog posts, it's a mishmash of whatever I feel like. <a href="https://lasershaft.com/blog">:0</a></h3>
    <h3>Go see some pictures on <a href="https://lasershaft.com/art">my art page</a></h3>
  </div>
);

const forofor = (
  <div className="ContentContainer">
    <header>404</header>
    <p>I don't know what you're looking for.</p>
		<p><i>{url404}</i> doesn't seem to exist</p>
    <a href="https://www.lasershaft.com/">Go home.</a>
  </div>
);

const Content = () => {
	if (wl.i === "404") return forofor;
	if (wl.i === "home") return homepage;
	if (wl.i === "blog") return blog();
  if (wl.i === "art") return art();
  if (wl.i === "about") return about;
};

export default Content;