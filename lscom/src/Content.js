
import './Content.css';

const homepage = (
  <p>Welcome to Lasershaft.com, a place for lasers and shafts. Coming soon to own on DVD and video.</p>
);

const blog = (
  <p>Blog</p>
);

const workspace = (
  <p>Workspace</p>
);

const tools = (
  <p>Tools</p>
);

const GetContent = () => {
  let there = window.location.href.split('/')[3];
  if (there === "Home") return homepage;
  if (there === "Blog") return blog;
  if (there === "Tools") return tools;
  if (there === "Workspace") return workspace;
}

const Content = () => {
  return (
    <div id="contentContainer" className="ContentContainer">
      <GetContent />
    </div>
  );
};

export default Content;