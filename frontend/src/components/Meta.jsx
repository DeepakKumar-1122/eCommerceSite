import { Helmet } from "react-helmet-async";

const Meta = ({
  title = "Welcome to PlayShop",
  description = "Online Store for Quality Products",
  keywords = "Electronics, Quality Products, Shopping platform, User-friendly interface",
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
};

export default Meta;
