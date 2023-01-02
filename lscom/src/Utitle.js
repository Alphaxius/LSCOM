


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

export default Utitle;