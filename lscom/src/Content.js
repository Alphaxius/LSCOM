






//import './Content.css';
import React from 'react';
//import wowbox from './sillythings/wow-box';
//import HiderI from './Hider';
import wl, {url404} from './Loc';
import BlogReader, {blogIndex} from './blog/blogReader';
//import Utitle from './Utitle';
import {Utitle, Gimage} from './modgeuls';

const artids = require("./artids.json");

const blog = () => {
	const index = blogIndex();
	if (!index) return forofor; // should have ()?
	let blogContent = ""
	if (wl.p.length < 3) {
    let mostRecentLink = <p><a href={wl.o + "/Blog/"+index[0].year+"/"+index[0].name}>Most recent post</a></p>;
    index.splice(0,1);
    let details = [];
    for (const dex of index) {
      details.push(<p key={"blogdetail"+dex.index}><a href={wl.o + "/Blog/"+dex.year+"/"+dex.name}>{dex.year+"/"+dex.name}</a></p>);
    }
		return (
      <div className="ContentContainer">
        {mostRecentLink}
        {details}
      </div>
    )
	}
	try {
		blogContent = <BlogReader blogContent={require('./blog/'+index.file+'.json')} />;
	}
	catch (error) {
		return forofor; // should have ()?
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


const arts = (numarts) => {
  let artidsdexes = [];
  for (let artidsdex = 0; artidsdex < numarts; artidsdex += 1) {
    artidsdexes.push(Math.floor(artids.length * Math.random()));
  }
  let artsblock = [];
  for (const artsdex of artidsdexes) {
    let id = artids[artsdex];
    artsblock.push(<Gimage imageId={id} title={id} key={id}/>);
  }
  return artsblock;
}
/*
const replaceArts = (numarts) => {
  const artcontainer = document.getElementById("innerArtsContainer");
  const activearts = artcontainer.children;
  let maxIndex = 0;
  for (const activeart of activearts) {
      let index = 0;
      for (let indexChecker = 0; indexChecker <= 100; indexChecker += 1) {
	if (activeart.classList.contains("pageIndex"+indexChecker)) {
          index = indexChecker;
	}
      }
      if (index > maxIndex) {
	maxIndex = index;
      }
      activeart.style.display = "none";
  }
  const newarts = arts(numarts);
  for (const nart of newarts) { 
    artcontainer.append(nart);
  }
}
*/
class ArtGuy extends React.Component {
  numarts = 3;

  state = {
    artsContainer: arts(this.numarts)
  }
  
  init = () => {
    for (let n = 1; n < 17; n += 1) {
      if (Number(wl.q.n) === n) {
        this.numarts = n;
        break;
      }
    }
  }

  updateState = () => {
    this.setState({artsContainer: this.state.artsContainer.concat(arts(this.numarts))});
  }

  render = () => {
   return (
    <div className="ContentContainer">
     <h2>An art portfolio by Jess!</h2>
      
      <p>Load <a href={wl.o + "/art?n=1"}>1</a> / <a href={wl.o + "/art?n=4"}>4</a> / <a href={wl.o + "/art?n=16"}>16</a> images</p>
      {this.state.artsContainer}
      <br /><div className="next BlogLink" style={{"color": "black"}} onClick={this.updateState}>More</div>
      <p style={{"fontSize": "small", "marginLeft": "20vw", "marginRight": "20vw"}}>There is no correct order to viewing things that I make, so you can only get these randomly and often with multiplicity. Titles for these works are not provided. Enjoy only the pixels without other context.<br /> License for these pieces is, with great trust in you, <i>"feel free to use and profit from these images but don't do the thing where you claim copyright on them and sue me, Jesella Laser Beam Barrett, for using them on my website. I would also appreciate it if you credited me, but you don't have to."</i></p>
    </div>
  );
  }
}


const about = (
  <div className="ContentContainer">
	<h1>Hello, I'm Jess.</h1>
	<p>I go by Jess, but my middle name is Laser Beam so if you call me that, that's ok with me.</p>
	<p>I am a database administrator, IT manager, Google Workspace super admin, and network administrator at a middle school, for my own systems, and I help my friends as well. I mostly work with databases and IT management, but the rest of it falls under my management. I also run this website.</p>
	<p>I also have so many hobbies. I create <a href="https://www.lasershaft.com/art">art.</a> I make jewelry. I write letters to my pen pals. I help my friends with their IT needs.</p>
	<p>I happen to also be a trans woman and I am autistic. I am an ally to other queer folk, people of color, houseless people, and neurodivergent people. Though, generally, I'm pretty much up for standing up for anyone's rights. All people are people, and deserve thriving human rights. Trans women are women, black lives matter.</p>
  </div>
);

const homepage = (
  <div className="ContentContainer">
	<h1>Welcome to LS.</h1>
	<h2>Jesella Barrett's Internet Home</h2>
	<p>Jesella is a database administrator, IT manager, Google Workspace super admin, and network administrator specializing in education.</p>
	<p>Visit my <a href="https://www.lasershaft.com/linkedin">LinkedIn</a>.</p>
	<p>See some code on my <a href="https://www.lasershaft.com/github/">GitHub</a>.</p>
	<p>Go see my <a href="https://www.lasershaft.com/art">pictures</a>.</p>
	<p>Play this silly <a href="https://www.lasershaft.com/numbergame">game I made.</a></p>
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
	if (wl.i === "blog") return blog;
  if (wl.i === "art") return <ArtGuy />;
  if (wl.i === "about") return about;
};

export default Content;
