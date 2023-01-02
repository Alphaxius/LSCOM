
//import './Hider.css';



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
    let currClass = document.getElementById(id).getAttribute("class");
    if (currClass === "HiderNotHidden") {
      document.getElementById(id).setAttribute("class", "HiderHidden");
    } else {
      document.getElementById(id).setAttribute("class", "HiderNotHidden");
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
    );
  };
};

const HiderI = new Hider();



export default HiderI;