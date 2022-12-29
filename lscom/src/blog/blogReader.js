
import HiderI from '../Hider';

const TitleT = (value) => {
	return ( <h2>{value.value}</h2> );
}
/*
const interpretHtml = (content) => {
	const reactHtml = (innerValue, type) => {
		switch (type) {
			case "div":
				return <div>{innerValue}</div>;
			case "p":
				return <p>{innerValue}</p>;
			case "strong":
				return <strong>{innerValue}</strong>;
			case "span":
				return <span>{innerValue}</span>;
		}
	}
	let elements = []; //stack of reactHtmlElements
	let fakeElements = []; // stack of embedded element types to be turned into reactHtmlElements
	let contentSplit = content.split('<');
	for (splitBit of contentSplit) {
		if (splitBit.charAt(0) === '/') {
			//let lastElement = fakeElements.pop();
			if (lastElement === splitBit.slice(1).split('>')[0]) {
				elements.push(reactHtml());
			}
			else {
				throw "while parsing blog content, tag closed but it doesn't match last open";
			}
		} 
		else {
			const splitBitTypeContent = splitBit.split('>');
			if (splitBitTypeContent.length > 2) throw "while parsing blog content, found too many greater than";
			if (splitBitTypeContent.length < 2) {
				fakeElements[fakeElements.length-1].
			}
			const type = splitBitTypeContent[0];
			const content = splitBitTypeContent[1];
			fakeElements.push();
		}
	}
}
*/
const SectionT = (stuff) => {
	const id = "section"+HiderI.hiderHeaderButtonId(stuff.stuff.header);
	let isHidden = false;
	if (stuff.stuff.startshidden) isHidden = true;
	let hiddenClassName = "HiderNotHidden";
	if (isHidden) hiddenClassName = "HiderHidden";
	return (
		<div>
			<HiderI.HiderHeader headerText={stuff.stuff.header} idToHide={id} />
			<div className={hiddenClassName} id={id}>
			{stuff.stuff.content}
			</div>
		</div>
	);
}

const BlogReader = (blogContent) => {
	let sections = [];
	let keyDex = 0;
	for (const section of blogContent.blogContent.sections) {
		sections.push(<SectionT stuff={section} key={section.header+(keyDex++)}/>);
	}
	return (
		<div>
			<TitleT value={blogContent.blogContent.title} />
			{sections}
		</div>
	);
}

export default BlogReader;