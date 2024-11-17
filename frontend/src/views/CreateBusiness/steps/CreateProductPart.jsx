import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Cropper from "react-easy-crop";
import { TextField } from "@mui/material";
import { updateBusinessDetails } from "../store/businessSlice";
import { preRequestFun } from "../service/s3url";
import { Button } from "react-bootstrap";
import getCroppedImg from "../../../utils/cropper.utils";

const initialState = [
  {
    title: "",
    description: "",
    image: "",
    price: "",
    loadingImage: false, // Loader state for image preview
  },
];

const CreateProductPart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const businessState = useSelector((state) => state.business);

  const [productSection, setProductSection] = useState(initialState);
  const [error, setError] = useState("");
  const [imgFile, setImgFile] = useState(null);
  const [imgPrev, setImgPrev] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState(null);
  const [showCropper, setShowCropper] = useState(false);
  const [selectedProdIndex, setSelectedProdIndex] = useState(null);

  const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  };

  const handleCropSave = async () => {
    try {
      const { fileUrl, blob } = await getCroppedImg(imgPrev, croppedArea);

      const croppedFile = new File(
        [blob],
        imgFile?.name || "cropped-logo.png",
        {
          type: blob.type,
        }
      );

      const preReq = await preRequestFun(croppedFile, imgFile?.name);
      let accessLink = "";
      if (preReq && preReq.accessLink) {
        accessLink = preReq.accessLink;
        const updatedProducts = [...productSection];
        updatedProducts[selectedProdIndex].image = accessLink; // Update image URL
        updatedProducts[selectedProdIndex].loadingImage = false; // Stop loader after processing the image
        setProductSection(updatedProducts);
      } else {
        console.error("Access link not found in response.");
      }

      setImgPrev(fileUrl);
      setImgFile(croppedFile);
    } catch (e) {
      console.error("Error cropping image:", e);
    } finally {
      setShowCropper(false);
    }
  };

  useEffect(() => {
    setProductSection(
      businessState?.productSection?.length
        ? businessState.productSection
        : initialState
    );
  }, [businessState]);

  const handleFileChange = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      setImgFile(file);
      setSelectedProdIndex(index);

      const updatedProducts = [...productSection];
      updatedProducts[index].loadingImage = true; // Start loader when the file is selected
      setProductSection(updatedProducts);

      const reader = new FileReader();
      reader.onload = async (e) => {
        setImgPrev(e.target.result);
        setShowCropper(true);
      };

      reader.readAsDataURL(file);
    }
  };

  const uploadImage = (index) => {
    document.querySelectorAll(".menuImageInput")[index].click();
  };

  const handleProductSubmit = () => {
    const isValid = productSection.every((product) => {
      // If either title or description is provided, both must be filled
      if (product.title || product.description) {
        return product.title && product.description;
      }
      // Price is optional
      return true;
    });

    if (!isValid) {
      setError(
        "Please fill out both the title and description if either field is provided."
      );
      return;
    }

    // Proceed with submission if all fields are filled
    dispatch(
      updateBusinessDetails({
        productSection,
      })
    );

    navigate("/create-business/seo");
  };
  const removeProduct = (index) => {
    setProductSection((prev) => {
      const updatedProducts = prev?.filter((_, i) => i !== index);
      return updatedProducts;
    });
  };

  const handlePrevStep = () => navigate("/create-business/services");

  return (
    <div className="h-100vh create-business-div">
      {/* Cropper Modal */}
      {showCropper && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          role="dialog"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Crop Your Image</h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={() => setShowCropper(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div
                  className="cropper-container position-relative"
                  style={{ height: "400px" }}
                >
                  <Cropper
                    image={imgPrev}
                    crop={crop}
                    zoom={zoom}
                    aspect={1}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onCropComplete={onCropComplete}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <Button variant="primary" onClick={handleCropSave}>
                  Save Crop
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => setShowCropper(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="row h-100 justify-content-center">
        <div className="col-12 col-md-6 row align-items-end justify-content-center h-100 p-3 p-md-5 right-portion">
          <div className="col-12 text-start">
            <button
              className="btn btn-dark w-auto float-start"
              onClick={handlePrevStep}
            >
              <i className="bi bi-arrow-left"></i>
            </button>
          </div>
          <div className="row justify-content-center">
            <div className="col-12 text-center text-md-start mt-3">
              <h1 className="fw-bold title-text">
                <span className="title-main">Add </span>
                <span className="title-highlight">Product Details</span>
              </h1>
              {error && <p className="text-danger text-danger mt-3">{error}</p>}
            </div>

            <div className="col-12">
              <div className="col-12 text-center">
                <h5 className="fs-18 mb-4 p-1 text-center text-md-start text-dark fw-bold mt-3">
                  Add Products
                </h5>
              </div>
              {productSection?.map((item, index) => (
                <div
                  key={index}
                  className="mt-2 card p-3 pt-5 position-relative shadow-sm"
                  style={{ border: "1px solid #ddd", borderRadius: "8px" }}
                >
                  {productSection?.length > 1 && (
                    <div
                      onClick={() => removeProduct(index)}
                      className="remove-button position-absolute"
                      style={{
                        top: "10px",
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
                  <TextField
                    fullWidth
                    label="Product Title"
                    id="title"
                    variant="filled"
                    name="title"
                    autoComplete="title"
                    value={item.title}
                    onChange={(e) => {
                      const updatedProducts = [...productSection];
                      updatedProducts[index].title = e.target.value;
                      setProductSection(updatedProducts);
                    }}
                  />
                  <div className="input-group mb-3 mt-4 w-100">
                    <TextField
                      fullWidth
                      label="Description"
                      id="description"
                      variant="filled"
                      name="description"
                      autoComplete="description"
                      multiline // Makes the TextField behave like a textarea
                      rows={4} // You can adjust the number of rows (height) here
                      sx={{
                        "& .MuiInputBase-root": {
                          padding: "12px", // Padding inside the textarea
                        },
                        "& .MuiFilledInput-root": {
                          backgroundColor: "#f9f9f9", // Optional: Background color for the filled variant
                        },
                        "& .MuiFormLabel-root": {
                          top: "-6px", // Adjust label positioning if needed
                        },
                      }}
                      value={item.description}
                      onChange={(e) => {
                        const updatedProducts = [...productSection];
                        updatedProducts[index].description = e.target.value;
                        setProductSection(updatedProducts);
                      }}
                    />
                  </div>

                  <div className="col-12 col-md-3 mb-3">
                    <input
                      type="file"
                      hidden
                      className="menuImageInput"
                      onChange={(e) => handleFileChange(index, e)}
                    />
                    <div
                      onClick={() => uploadImage(index)}
                      className="p-2 mt-2 add-logo-div"
                    >
                      <span style={{ color: "grey" }}>(Ratio 1 : 1)</span>
                      <div className="text-center">
                        {item.loadingImage ? (
                          <div
                            className="spinner-border text-primary"
                            role="status"
                          ></div>
                        ) : (
                          <img
                            src={
                              item.image || "/src/assets/images/add_image.png"
                            } // Use the latest image URL
                            width="50"
                            alt="Add Product Image"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="input-group mb-3 mt-4 w-100">
                    <TextField
                      fullWidth
                      type="number"
                      id="price"
                      name="price"
                      variant="filled"
                      label="Price"
                      value={item.price}
                      onChange={(e) => {
                        const updatedProducts = [...productSection];
                        updatedProducts[index].price = e.target.value;
                        setProductSection(updatedProducts);
                      }}
                    />
                  </div>
                </div>
              ))}
              <a
                href="#"
                onClick={() =>
                  setProductSection((prev) => [
                    ...prev,
                    {
                      title: "",
                      description: "",
                      image: "",
                      price: "",
                      loadingImage: false,
                    },
                  ])
                }
                className="text-decoration-none mt-4 btn btn-primary w-100"
              >
                + Add More Product
              </a>
            </div>
          </div>

          <div className="col-12 mt-4 text-center">
            <button
              className="btn btn-primary w-100 text-center"
              onClick={handleProductSubmit}
            >
              Save & Next
            </button>
          </div>
        </div>

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

          <section className="bg-white h-auto david-font" id="menu">
            <div className="container  p-top">
              <div className="col-12 mb-5">
                <div className="row justify-content-center">
                  <div className="col-6 text-center">
                    <h1 className="text-dark fw-bold david-font banner-title fs-45">
                      Products
                    </h1>
                  </div>
                </div>
              </div>

              <div className="mt-5 david-font">
                <div className="mb-5">
                  <div className="row justify-content-center mb-3">
                    {productSection.map((item, index) => (
                      <div className="col-12 col-lg-6 mt-3" key={index}>
                        <div className="row  product-section align-items-center">
                          <div className="col-2">
                            <img src={item.image} alt="" className="w-100" />
                          </div>
                          <div className="col-8">
                            <h1 className="fs-20 fw-bold">{item.title}</h1>
                            <p className="mt-2">{item.description}</p>
                          </div>
                          <div className="col-2 p-0">
                            <span className="fw-bold">{item.price}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CreateProductPart;
