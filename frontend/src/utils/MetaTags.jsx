/* eslint-disable react/prop-types */
import { Helmet } from "react-helmet-async";

const MetaTags = ({ title, description, keywords, url, image }) => {
  return (
    <Helmet>
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:keywords" content={keywords} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:type" content="website" />
    </Helmet>
  );
};

export default MetaTags;
