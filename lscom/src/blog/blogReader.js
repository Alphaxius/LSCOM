
import HiderI from '../Hider';
import Utitle from '../Utitle';

const TitleT = (value) => {
	return ( <h2 title={value.value}>{value.value}</h2> );
}

/*
1. get string
2. split string by '<'
3. loop for each bit of the split string array
4. if the bit is a start tag, push object {type(string), content(array)} to array1
5. if the bit is an end tag, pop array1 to temp object, append content to new final element content array
	5.1. if array is empty after popping, throw content away
6. convert temp object to reactHtml object with type stored in temp object
	6.1. if content array has length > 1, insert array2 objects between content elements and remove those from array2
7. store reactHtml object into array2
8. end loop
*/
const interpretHtml = (content) => {
	let keyNumber = 0;
	const keyMaker = () => {
		return "contentKey"+(keyNumber++);
	}
	const reactHtml = (innerValues, type) => {
		let dex = 0;
		while(dex < innerValues.length) {
			if (innerValues[dex] === 0) innerValues.splice(dex, 1);
			else dex++;
		}
		let splitInnerValues = ["",""];
		if (innerValues.length > 0 && typeof(innerValues[0])==="string") {
			splitInnerValues = innerValues[0].split('#');
		}
		switch (type) {
			case "div":
				return <div key={keyMaker()}>{innerValues}</div>;
			case "p":
				return <p key={keyMaker()}>{innerValues}</p>;
			case "strong":
				return <strong key={keyMaker()}>{innerValues}</strong>;
			case "span":
				return <span key={keyMaker()}>{innerValues}</span>;
			case "i":
				return <i key={keyMaker()}>{innerValues}</i>;
			case "b":
				return <b key={keyMaker()}>{innerValues}</b>;
			case "u":
				return <u key={keyMaker()}>{innerValues}</u>;
			case "code":
				return <code key={keyMaker()}>{innerValues}</code>;
			case "pre":
				return <pre key={keyMaker()}>{innerValues}</pre>;
			case "hovertext":
				return <Utitle text={splitInnerValues[0]} title={splitInnerValues[1]} key={keyMaker()} />;
			case "image":
				return (
					<iframe
						key={keyMaker()}
						title={splitInnerValues[1]}
						src={"https://drive.google.com/file/d/"+splitInnerValues[0]+"/preview"}
						width="90%"
						height="600vh"
					>
					</iframe>
				);
			default:
				return <div key={keyMaker()}>Unknown tag type</div>;
		}
	}
	let elements = []; //stack of reactHtmlElements
	let primordialElements = [];
	let contentSplit = content.split('<').slice(1);
	for (const splitBit of contentSplit) {
		const bitInProcess = splitBit.split('>');
		let parsedBit = {type: "", content: []};
		parsedBit.type = bitInProcess[0];
		if (bitInProcess[1] === "") {
			parsedBit.content.push(0);
		}
		else {
			parsedBit.content.push(bitInProcess[1]);
		}
		if (splitBit.charAt(0) === '/') {
			const lastPrimordialElement = primordialElements.pop();
			if (primordialElements.length !== 0) {
				for (const bitOfContent of parsedBit.content) {
					primordialElements[primordialElements.length-1].content.push(bitOfContent);
				}
			}
			for (let dex = lastPrimordialElement.content.length - 1; dex > 0; dex -= 1) {
				lastPrimordialElement.content.splice(dex,0,elements.pop());
			}
			elements.push(reactHtml(lastPrimordialElement.content, lastPrimordialElement.type));
		}
		else {
			primordialElements.push(parsedBit)
		}
	}
	return elements;
}

const SectionT = (stuff) => {
	const id = "section"+HiderI.hiderHeaderButtonId(stuff.stuff.header);
	let isHidden = false;
	if (stuff.stuff.startshidden) isHidden = true;
	let hiddenClassName = "HiderNotHidden";
	let otherClassName = "HiderHidden";
	if (isHidden) {
		hiddenClassName = "HiderHidden";
		otherClassName = "HiderNotHidden";
	}
	return (
		<div>
			<HiderI.HiderHeader headerText={stuff.stuff.header} idToHide={id} />
			<div className={hiddenClassName} id={id}>
				{interpretHtml(stuff.stuff.content)}
			</div>
			<p className={otherClassName} id={id+"elipsis"}>...</p>
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
			<p style={{fontSize: "small"}} >DATED {blogContent.blogContent.date}</p>
		</div>
	);
}

export default BlogReader;
