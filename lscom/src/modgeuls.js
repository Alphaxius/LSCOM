




const Utitle = (content) => {
	const text = content.text;
	const title = content.title;
	return (
		<span className="UtitleContainer">
			<span className="UtitleText">{text}</span>{" "}
			<span className="UtitleTitle">{title}</span>
		</span>
	);
}

const Gimage = (content) => {
  let iframewidth = 0;
  let iframeheight = 0;
  if (window.innerWidth < window.innerHeight) {
    iframewidth = window.innerWidth * 0.800;
    iframeheight = window.innerWidth * 0.450;
  }
  else {
    if (Math.random() > 0.3) {
      iframewidth = window.innerWidth * 0.400;
      iframeheight = window.innerWidth * 0.225;
    } else if (Math.random() > 0.3) {
      iframewidth = window.innerWidth * 0.600;
      iframeheight = window.innerWidth * 0.3375;
    } else {
      iframewidth = window.innerWidth * 0.800;
      iframeheight = window.innerWidth * 0.450;
    }
  }
  iframewidth *= (Math.random()/10+0.95);
  iframeheight *= (Math.random()/10+0.95);
  return (
    <iframe
      className="Gimage"
      title={content.title}
      src={"https://drive.google.com/file/d/"+content.imageId+"/preview"}
      width={iframewidth}
      height={iframeheight}
    >
    </iframe>
  );
}


class Hider {
  
  hhbidcount = 0;
  
  hiderHeaderId = function(headerText) {
  		return "hhbid-id-" + headerText.split(" ").join("-")
  };
  
  hiderHeaderButtonId = function(headerText) {
     return this.hiderHeaderId(headerText) + (this.hhbidcount++);
  };

  toggleElement = function(idPassed) {
    let id = idPassed.idPassed;
	 let contentElement = document.getElementById(id);
	 let secretElipsis = document.getElementById(id+"elipsis");
    let currClass = contentElement.getAttribute("class");
    if (currClass === "HiderNotHidden") {
      contentElement.setAttribute("class", "HiderHidden");
		secretElipsis.setAttribute("class", "HiderNotHidden");
    } else {
      contentElement.setAttribute("class", "HiderNotHidden");
		secretElipsis.setAttribute("class", "HiderHidden");
    };
  };

  hideElement = function(idPassed) {
    let id = idPassed.idPassed;
    document.getElementById(id).setAttribute("class", "HiderHidden");
  }

  showElement = function(idPassed) {
    let id = idPassed.idPassed;
    document.getElementById(id).setAttribute("class", "HiderNotHidden");
  }

  HiderHeader = (hiderHeader) => {
    let headerText = hiderHeader.headerText;
	 let headerId = this.hiderHeaderId(headerText);
    let idToHide = hiderHeader.idToHide;
    let idToShowE = this.hiderHeaderButtonId(headerText);
    let idToShowH = this.hiderHeaderButtonId(headerText); 
    return (
	 	<div>
			<h3 className="HiderHeader"
			  title={headerText}
			  onMouseEnter={() => {
				 this.showElement({idPassed: idToShowE});
				 this.showElement({idPassed: idToShowH});
			  }}
			  onMouseLeave={() => {
				 this.hideElement({idPassed: idToShowE})
				 this.hideElement({idPassed: idToShowH})
			  }}
			  id={headerId}
			>
			  <span
				 title="Toggle view this section"
				 className="HiderHidden"
				 id={idToShowE}
				 onClick={() => this.toggleElement({idPassed: idToHide})}
				 style={{cursor: "pointer"}}
			  >...</span>
			  {"\t"}{headerText}{"\t"}
			  <a
				 href={window.location.href.split('#')[0]+'#'+headerId}
				 title="Link to this section"
				 className="HiderHidden"
				 id={idToShowH}
				 style={{cursor: "pointer"}}
			  >{"#"}</a>
			</h3>
		</div>
    );
  };
};

const HiderI = new Hider();


export default HiderI;
export {Utitle, Gimage};
