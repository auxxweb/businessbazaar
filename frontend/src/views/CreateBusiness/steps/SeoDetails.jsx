import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { TextField } from "@mui/material";
import { updateBusinessDetails } from "../store/businessSlice";
import Loader from "../../../components/Loader/Loader";

const SeoDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const businessState = useSelector((state) => state.business);

  const [socialMediaLinks, setSocialMediaLinks] = useState([
    { tag: "instagram", link: "" },
    { tag: "facebook", link: "" },
    { tag: "twitter", link: "" },
    { tag: "youtube", link: "" },
    { tag: "linkedin", link: "" },
  ]);
  const [loading, setLoading] = useState(false)

  const [seoData, setSeoData] = useState({
    title: "",
    description: "",
    metaTags: [""],
  });

  // Handle tag change
  const handleTagChange = (index, value) => {
    const updatedTags = [...seoData.metaTags];
    updatedTags[index] = value;
    setSeoData((prevSeo) => ({
      ...prevSeo,
      metaTags: updatedTags,
    }));
  };

  // Add more tags
  const addTag = () => {
    setSeoData((prevSeo) => ({
      ...prevSeo,
      metaTags: [...prevSeo.metaTags, ""], // Add a new empty string for the new tag
    }));
  };

  // Remove a tag
  const removeTag = (index) => {
    setSeoData((prevSeo) => ({
      ...prevSeo,
      metaTags: prevSeo.metaTags.filter((_, i) => i !== index), // Remove tag at the specified index
    }));
  };

  // Handle changes in SEO data fields
  const handleSeoInputChange = (e) => {
    const { name, value } = e.target;
    setSeoData((prevSeo) => ({
      ...prevSeo,
      [name]: value,
    }));
  };

  // Handle social media input changes
  const handleSocialMediaChange = (index, value) => {
    const updatedLinks = [...socialMediaLinks];
    updatedLinks[index].link = value;
    setSocialMediaLinks(updatedLinks);
  };

  // Handle form submit and update formData with socialMediaLinks and seoData
  const handleSeoSubmit = () => {
    setLoading(true)
    dispatch(updateBusinessDetails({ socialMediaLinks, seoData }));
    navigate("/create-business/gallery");

    setLoading(false)
  };

  const handlePrevStep = () => navigate("/create-business/product");

  useEffect(() => {

    setSocialMediaLinks(
      JSON.parse(JSON.stringify(businessState?.socialMediaLinks))
    );
    setSeoData(JSON.parse(JSON.stringify(businessState?.seoData)));
  }, [businessState]);

  if (loading) {
    return (
      <div className="h-100vh">
        <div className="d-flex h-100 justify-content-center align-items-center">
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <div className="h-100vh create-business-div">
      <div className="row h-100 justify-content-center">
        {/* Right Form Section */}
        <div className="col-12 col-md-6 row align-items-end justify-content-center h-100 p-3 p-md-5 right-portion">
          <div className="col-12 text-start">
            <button
              className="btn btn-dark w-auto float-start"
              onClick={handlePrevStep}
            >
              <i className="bi bi-arrow-left"></i>
            </button>
          </div>
          <div className=" ">
            <div className="col-12 text-center text-md-start mt-4">
              <h1 className="fw-bold title-text">
                <span className="title-main">Add </span>
                <span className="title-highlight">SEO Details</span>
              </h1>
            </div>

            {/* Form Fields */}
            <div className="col-12">
              <div className="input-group mt-2 w-100">
                <TextField
                  fullWidth
                  label="Title (35 letters)"
                  id="title"
                  variant="filled"
                  name="title"
                  autoComplete="title"
                  value={seoData.title}
                  inputProps={{ maxLength: 35 }}
                  onChange={handleSeoInputChange}
                />
              </div>

              <div className="input-group mb-3 mt-4 w-100">
                <TextField
                  fullWidth
                  label="Description (200 letters) "
                  id="description"
                  variant="filled"
                  name="description"
                  autoComplete="description"
                  multiline // Makes the TextField behave like a textarea
                  rows={4} // You can adjus
                  inputProps={{ maxLength: 200 }}
                  value={seoData.description}
                  onChange={handleSeoInputChange}
                />
              </div>

              {/* Tags Section */}
              <div className="input-group mb-3 mt-4 w-100">
                {seoData.metaTags.map((tag, index) => (
                  <div className="input-group mb-2" key={index}>
                    <TextField
                      fullWidth
                      type="text "
                      label="Tag"
                      variant="filled"
                      inputProps={{ maxLength: 35 }}
                      value={tag}
                      onChange={(e) => handleTagChange(index, e.target.value)}
                    />
                    {seoData?.metaTags?.length > 1 && (
                      <div
                        onClick={() => removeTag(index)}
                        className="remove-button position-absolute"
                        style={{
                          top: "5px",
                          right: "10px",
                          cursor: "pointer",
                          color: "#ff4d4f",
                          fontSize: "18px",
                          fontWeight: "bold",
                          zIndex: 9,
                        }}
                      >
                        X
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <button
                className="text-decoration-none btn btn-primary w-100 mb-3"
                type="button"
                onClick={addTag}
              >
                Add More
              </button>
              <div className=" h-100">
                {/* Social Media Links */}
                {socialMediaLinks.map((link, index) => (
                  <div className="input-grou mb-3 mt-4 w-100 " key={index}>
                    <TextField
                      fullWidth
                      type="text"
                      id="link"
                      variant="filled"
                      name={link.tag}
                      label={link.tag}
                      value={link.link}
                      onChange={(e) =>
                        handleSocialMediaChange(index, e.target.value)
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Save & Next Button */}
          <div className="col-12 text-center p-3 p-md-5">
            <button
              className="btn btn-primary w-100 text-white p-2"
              onClick={handleSeoSubmit}
            >
              Save & Next
            </button>
          </div>
        </div>

        <div className="left-portion col-12 col-lg-6 h-100 p-3 row align-items-center">
          <div
            className="p-3"
            style={{ border: "1px dashed black", borderRadius: "16px" }}
          >
            <p className="text-center">
              Please provide the SEO information and social media links to
              enhance your business&apos;s online visibility. Accurate SEO data
              and active social media profiles can help improve your reach and
              engagement.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeoDetails;
