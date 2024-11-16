import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import CloseIcon from "@mui/icons-material/Close";
import Slider from "react-slick";
import axios from "axios";
import { updateBusinessDetails } from "../store/businessSlice";

const gallery = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const MoreImages = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const businessState = useSelector((state) => state.business);

  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([
    { file: null, fileType: "", fileName: "" },
  ]);
  // const [formData, setFormData] = useState({});

  const handleFileChange = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      const updatedImages = [...images];
      updatedImages[index] = {
        file,
        fileType: file.type,
        fileName: file.name,
      };
      setImages(updatedImages);
    }
  };

  const addImageInput = () => {
    setImages((prevImages) => [
      ...prevImages,
      { file: null, fileType: "", fileName: "" },
    ]);
  };

  const handleAddImageClick = (index) => {
    document.getElementById(`file-input-${index}`).click();
  };

  const removeImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
  };

  const handleGallerySubmit = async () => {
    if (images.length > 0 && images[0].file != null) {
      const imageFiles = images.map((image) => image?.file);
      setLoading(true);
      const requestBody = {
        files: imageFiles.map((file) => ({
          position: "gallery",
          file_type: file.type,
        })),
      };

      try {
        const baseUrl = import.meta.env.VITE_APP_BE_API_KEY ?? "";
        const url = ` ${baseUrl}/api/v1/s3url`;

        // Fetch pre-signed S3 URLs
        const response = await axios.post(url, requestBody, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        const s3Urls = response.data.data;

        // Upload each file to its respective S3 URL
        await Promise.all(
          s3Urls.map(async (data, index) => {
            const { url } = data;
            const file = imageFiles[index];

            await axios.put(url, file, {
              headers: { "Content-Type": file.type },
            });
          })
        );

        // Collect access links and store them in formData
        const accessLinks = s3Urls.map((s3Data) => s3Data.accessLink);

        dispatch(updateBusinessDetails({ gallery: accessLinks }));

        navigate("/create-business/subscription");
      } catch (error) {
        console.error("Error fetching S3 URLs or uploading files:", error);
      } finally {
        setLoading(false);
      }
    } else {
      navigate("/create-business/subscription"); // Proceed to the next step if there are no files to upload
    }
  };

  const handlePrevStep = () => navigate("/create-business/seo");

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

          <div className="row justify-content-start">
            <div className="col-12 text-center text-md-start mt-4">
              <h1 className="fw-bold title-text">
                <span className="title-main">Add </span>
                <span className="title-highlight">Gallery</span>
              </h1>
            </div>

            {/* Image Upload Fields */}
            <div className="col-12 p-md-12 flex justify-content-start">
              <div className="row mb-3 gap-2">
                {images.map((image, index) => (
                  <div className="col-4 col-md-3 mb-3 mx-2" key={index}>
                    <input
                      type="file"
                      hidden
                      id={`file-input-${index}`}
                      accept="image/*"
                      onChange={(e) => handleFileChange(index, e)}
                    />
                    <div className="p-2 add-logo-div">
                      {/* Remove Button for all except the first image */}
                      {images?.length > 1 || image.file ? (
                        <div className="d-flex justify-content-end">
                          <CloseIcon
                            style={{
                              top: "10px",
                              right: "10px",
                              cursor: "pointer",
                              color: "#ff4d4f",
                              fontSize: "18px",
                              fontWeight: "bold",
                              zIndex: 9,
                            }}
                            onClick={() => removeImage(index)}
                          />
                        </div>
                      ) : (
                        <div style={{ height: "1.5rem" }}></div>
                      )}
                      <div
                        className="text-center"
                        onClick={() => handleAddImageClick(index)}
                      >
                        <span style={{ color: "grey" }}>(Ratio 4 : 5)</span>
                        {image.file ? (
                          <img
                            src={URL.createObjectURL(image.file)}
                            alt={`Uploaded Preview ${index}`}
                            className="img-preview"
                            width="100"
                            height="80"
                            style={{ objectFit: "cover" }}
                          />
                        ) : (
                          <img
                            src="/src/assets/images/add_image.png"
                            width="50"
                            alt="Add Image"
                            style={{ height: "70px", objectFit: "contain" }}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="col-12 mb-3 text-center">
                <button
                  className="btn w-100 btn btn-primary"
                  onClick={addImageInput}
                >
                  + Add another image
                </button>
              </div>
            </div>
          </div>

          {/* Save & Next Button */}
          <div className="col-12 text-center p-3 p-md-5">
            {loading ? (
              <div className="spinner-border" role="status">
                <span className="sr-only"></span>
              </div>
            ) : (
              <button
                className="btn btn-primary w-100 text-white p-2"
                onClick={handleGallerySubmit}
              >
                Save & Next
              </button>
            )}
          </div>
        </div>

        {/* Left Image Section - Hidden on small screens */}
        <div className="d-none d-md-block left-portion p-0 col-md-6 h-100">
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap"
            rel="stylesheet"
          />
          <style>
            {" "}
            {`
                                ::-webkit-scrollbar {
                                    width: 12px; /* Width of the entire scrollbar */
                                }
            
                                /* Scrollbar track */
                                ::-webkit-scrollbar-track {
                                    background: rgb(243, 243, 244); /* Background of the scrollbar track */
                                }::-webkit-scrollbar-thumb {
                                    background-color: ${businessState?.theme}; /* Color of the scrollbar thumb */
                                    border-radius: 10px;     /* Rounded edges of the thumb */
                                    border: 3px solid  ${businessState?.theme}; /* Padding around the thumb */
                                }
                            .theme
                            {
                                background-color: ${businessState?.theme};
                                color: white;
                                border: none;
                            }.service-design.active{
                                background-color: ${businessState?.theme};
                            }.address-section{
                            background-color:${businessState?.theme};
                            }.address-logo i{
                            color: ${businessState?.theme};
                            }.cat-option{
                                border-right: 1px dashed ${businessState?.theme};
                            }.text-orange{
                                    color: ${businessState?.theme};
                                }.dish-div:hover{
                                    background-color: ${businessState?.theme};
                                    color:white;
                                }.product-section{
                                padding:20px;
                                border:1px solid ${businessState?.theme};
                                border-radius:16px;
                                    }.slick-dots .slick-active button{
                                        background-color: ${businessState?.theme};
                                        border-radius: 16px;
                                    }
                                `}
          </style>
          <section
            className="h-auto david-font"
            style={{ backgroundColor: "#F3F3F4" }}
          >
            <div className="container p-top">
              <div className="col-12 mb-5" id="gallery">
                <div className="col-12 mb-5 mt-5">
                  <h1 className="fw-bold text-center">Gallery</h1>
                </div>
                {images.length > 0 ? (
                  <Slider {...gallery} className="gallery-slider">
                    {images.map((image, index) =>
                      image.file ? (
                        <div key={index} className="p-2">
                          <img
                            src={URL.createObjectURL(image.file)}
                            alt=""
                            className="w-100 gallery-img"
                          />
                        </div>
                      ) : null
                    )}
                  </Slider>
                ) : null}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default MoreImages;
