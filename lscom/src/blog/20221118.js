

import HiderI from '../Hider';

const blogContent = (
  <div>
    <h2>1118</h2><br />
    <HiderI.HiderHeader headerText="This is the first section" idToHide="blog-section-first-section" />
    <span className="HiderNotHidden" id="blog-section-first-section">
      <p>Blog content</p>
    </span>
    <HiderI.HiderHeader headerText="This is the second section" idToHide="blog-section-second-section" />
    <span className="HiderNotHidden" id="blog-section-second-section">
      <p>Even more blog content! Did you know that there is just so much content?</p>
    </span>
  </div>
);
	
export default blogContent