

import HiderI from '../Hider';

const blogContent = (
  <div>
    <h2>Blog page title</h2>
    <br /><HiderI.HiderHeader headerText="Blog Section" idToHide="blog-section-body-id" />
    <span className="HiderNotHidden" id="blog-section-body-id">
      <p>Blog content</p>
    </span>
  </div>
);

export default blogContent;