import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = (props) => (
  <ContentLoader
    speed={2}
    width={280}
    height={460}
    viewBox="0 0 280 460"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="140" cy="130" r="120" />
    <rect x="10" y="260" rx="0" ry="0" width="260" height="25" />
    <rect x="10" y="310" rx="0" ry="0" width="260" height="84" />
    <rect x="10" y="410" rx="0" ry="0" width="89" height="27" />
    <rect x="160" y="410" rx="0" ry="0" width="110" height="27" />
  </ContentLoader>
);

export default Skeleton;
