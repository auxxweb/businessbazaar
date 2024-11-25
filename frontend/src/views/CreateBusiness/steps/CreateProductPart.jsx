import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Cropper from "react-easy-crop";
import Slider from "react-slick";
import { TextField } from "@mui/material";
import { updateBusinessDetails } from "../store/businessSlice";
import { preRequestFun } from "../service/s3url";
import { Button, Spinner } from "react-bootstrap";
import getCroppedImg from "../../../utils/cropper.utils";

const CreateProductPart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const businessState = useSelector((state) => state.business);

  const [specialService, setSpecialService] = useState({
    title: "",
    description: "",
    data: [{ title: "", description: "", image: "", price: "" }],
  });
  const [isLoading, setIsLoading] = useState({
    specialService: {},
  });
  const [cropLoading,setCropLoading] = useState(false)
  const [loading,setLoading] = useState(false)
  const [errors] = useState([]);
  const [crop1, setCrop1] = useState({ x: 0, y: 0 });
  const [zoom1, setZoom1] = useState(1);
  const [croppedArea1, setCroppedArea1] = useState(null);
  const [showCropper1, setShowCropper1] = useState(false);
  const [spServiceFile, setSpServiceFile] = useState(null);
  const [spServiceImgPrev, setSpServiceImgPrev] = useState(null);
  const [selectedSpServiceIndex, setSelectedSpServiceIndex] = useState(null);

  const onCropComplete1 = (croppedAreaPercentage, croppedAreaPixels) => {
    setCroppedArea1(croppedAreaPixels);
  };


  const handleCropSave1 = async () => {
    try {
      setCropLoading(true)
      const { fileUrl, blob } = await getCroppedImg(
        spServiceImgPrev,
        croppedArea1
      );

      const croppedFile = new File(
        [blob],
        spServiceFile?.name || "cropped-logo.png",
        {
          type: blob.type,
        }
      );

      const preReq = await preRequestFun(croppedFile, "service");
      if (preReq?.accessLink) {
        setSpecialService((prevData) => {
          const updatedData = [...prevData.data];
          updatedData[selectedSpServiceIndex].image = preReq.accessLink;
          return { ...prevData, data: updatedData };
        });
      } else {
        console.error("Access link not found in response.");
      }

      setSpServiceImgPrev(fileUrl);
      setSpServiceFile(croppedFile);
    } catch (e) {
      setCropLoading(false)
      console.error("Error cropping image:", e);
    } finally {
      setCropLoading(false)
      setShowCropper1(false);
    }
  };

  // Handle change for individual special service fields
  const handleProductChange = (index, e) => {
    const { name, value } = e.target;
    setSpecialService((prevData) => {
      const updatedData = [...prevData.data];
      updatedData[index][name] = value;
      return { ...prevData, data: updatedData };
    });
  };


  const handleFileChange = async (type, index, e) => {
    const file = e.target.files[0];
    if (file) {
      // Set loading state
      setIsLoading((prevLoading) => ({
        ...prevLoading,
        [type]: { ...prevLoading[type], [index]: true },
      }));

      const reader = new FileReader();

      if (type === "specialService") {
        setSpServiceFile(file);
        setSelectedSpServiceIndex(index);
      }

      reader.onload = async (e) => {
        if (type === "specialService") {
          setSpServiceImgPrev(e.target.result);
          setShowCropper1(true);
        }
      };

      reader.readAsDataURL(file);

      // Remove loading state
      setIsLoading((prevLoading) => ({
        ...prevLoading,
        [type]: { ...prevLoading[type], [index]: false },
      }));
    }
  };

  // Trigger file upload for image input
  const uploadImage = (type, index) => {
    const inputClass =
      type === "specialService"
        ? ".specialServiceImageInput"
        : ".serviceImageInput";
    document.querySelectorAll(inputClass)[index].click();
  };

  // Submit function to store data
  const handleServiceSubmit = () => {
    setLoading(true)
    dispatch(
      updateBusinessDetails({
        productSection: specialService,
      })
    );
    navigate("/create-business/seo");
    setLoading(false)
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'description') {

    }
    setSpecialService((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const removeSpecialService = (index) => {
    setSpecialService((prevData) => {
      const updatedData = prevData.data.filter((_, i) => i !== index);
      return { ...prevData, data: updatedData };
    });
  };

  const settings4 = {
    dots: false,
    // infinite: true,
    autoplay: true,
    arrows: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
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
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 390,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handlePrevStep = () => navigate("/create-business/services");

  useEffect(() => {
    setSpecialService(
      JSON.parse(JSON.stringify(businessState?.productSection))
    );
  }, [businessState]);


  return (
    <>
      <div className="h-100vh create-business-div">
        {showCropper1 && (
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
                    onClick={() => setShowCropper1(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <div
                    className="cropper-container position-relative"
                    style={{ height: "400px" }}
                  >
                    <Cropper
                      image={spServiceImgPrev}
                      crop={crop1}
                      zoom={zoom1}
                      aspect={4 / 3}
                      onCropChange={setCrop1}
                      onZoomChange={setZoom1}
                      onCropComplete={onCropComplete1}
                    />
                  </div>
                </div>
                <div className="modal-footer">
                 {cropLoading ? <Spinner variant="primary"/> : <Button variant="primary" onClick={handleCropSave1}>
                    Save Crop
                  </Button>}
                  <Button
                    variant="outlined"
                    onClick={() => setShowCropper1(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}


        <div className="row h-100 justify-content-center">
          {/* Left Image Section */}

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

            <div className="row justify-content-center">
              <div className="col-12 mt-5 text-center text-md-start">
                <h1 className="fw-bold title-text title-main">
                  Add  <span className="title-highlight">Product Details</span>
                </h1>
              </div>

              <div className="col-12">
                {/* Special Service Title */}
                <div className="input-group mt-2 w-100">
                  <TextField
                    fullWidth
                    label="Title (8 words)"
                    id="title-1"
                    variant="filled"
                    name="title"
                    autoComplete="title-1"
                    onChange={handleChange}
                    inputProps={{ maxLength: 35 }}
                    error={specialService?.title?.split("")?.length >= 35 ? true : false}
                    helperText={specialService?.title?.split("")?.length >= 35 ? "exceeded the limit" : ""}
                    value={specialService.title}
                  />
                </div>
                <div className="input-group mb-3 mt-4 w-100">
                  <TextField
                    fullWidth
                    label="Description (50 words)"
                    id="description-1"
                    variant="filled"
                    name="description"
                    autoComplete="description-1"
                    multiline // Makes the TextField behave like a textarea
                    rows={4} // You can adjust the number of rows (height) here
                    value={specialService.description}
                    onChange={handleChange}
                    inputProps={{ maxLength: 250 }}
                    error={specialService?.description?.split("")?.length >= 250 ? true : false}
                    helperText={specialService?.description?.split("")?.length >= 250 ? "exceeded the limit" : ""}
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
                  />
                </div>

                <hr
                  style={{
                    border: "3px solid #105193",
                    borderRadius: "5px",
                    margin: "35px 0",
                  }}
                />

                {/* Special Services List */}
                <div className="col-12 text-center">
                  <h5 className="fs-18 mb-4 p-1 text-center text-md-start text-dark fw-bold mt-3">
                    Add Product Cards
                  </h5>
                </div>

                {specialService?.data?.map((p, index) => (
                  <div
                    key={`index-${index}`}
                    className="mt-2 card p-3 pt-5 position-relative shadow-sm"
                    style={{ border: "1px solid #ddd", borderRadius: "8px" }}
                  >
                    {/* Add "X" button to remove item from every card except the last one */}
                    {index < specialService?.data?.length - 1 && (
                      <div
                        onClick={() => removeSpecialService(index)}
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

                    {index !== 0 && <div className="divider"></div>}

                    <TextField
                      fullWidth
                      label="Title (8 words)"
                      id="title"
                      variant="filled"
                      name="title"
                      autoComplete="Service Name"
                      value={p.title}
                      inputProps={{ maxLength: 35 }}
                      onChange={(e) => handleProductChange(index, e)}
                      error={p?.title?.split("")?.length >= 35 ? true : false}
                      helperText={p?.title?.split("")?.length >= 35 ? "exceeded the limit" : ""}
                    />

                    <div className="input-group mb-3 mt-4 w-100">
                      <TextField
                        fullWidth
                        label="Description (50 words)"
                        id="description"
                        variant="filled"
                        name="description"
                        autoComplete="description"
                        multiline
                        rows={4}
                        inputProps={{ maxLength: 200 }}
                        error={p?.description?.split("")?.length >= 250 ? true : false}
                        helperText={p?.description?.split("")?.length >= 250 ? "exceeded the limit" : ""}
                        sx={{
                          "& .MuiInputBase-root": {
                            padding: "12px",
                          },
                          "& .MuiFilledInput-root": {
                            backgroundColor: "#f9f9f9",
                          },
                          "& .MuiFormLabel-root": {
                            top: "-6px",
                          },
                        }}
                        onChange={(e) => handleProductChange(index, e)}
                      />
                    </div>

                    <div className="input-group mb-3 mt-4 w-100">
                      <TextField
                        fullWidth
                        type="number"
                        id="price"
                        name="price"
                        variant="filled"
                        label="Price"
                        error={!!errors?.landingPageHeroDescription}
                        helperText={errors?.landingPageHeroDescription}
                        sx={{
                          "& .MuiInputBase-root": {
                            padding: "12px",
                          },
                          "& .MuiFilledInput-root": {
                            backgroundColor: "#f9f9f9",
                          },
                          "& .MuiFormLabel-root": {
                            top: "-6px",
                          },
                        }}
                        onChange={(e) => handleProductChange(index, e)}
                      />
                    </div>

                    <div className="col-12 col-md-3 mb-3">
                      <input
                        type="file"
                        hidden
                        className="specialServiceImageInput"
                        onChange={(e) =>
                          handleFileChange("specialService", index, e)
                        }
                      />
                      <div
                        onClick={() => uploadImage("specialService", index)}
                        className="p-2 mt-2 add-logo-div"
                      >
                        <span style={{ color: "grey" }}>(Ratio 4 : 3) </span>
                        <div className="text-center">
                          {isLoading?.specialService[index] ? (
                            <div
                              className="spinner-border text-primary"
                              role="status"
                            ></div>
                          ) : (
                            <img
                              src={
                                p.image || "/src/assets/images/add_image.png"
                              }
                              width="50"
                              alt="Add Service Image"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Add Service Button */}

                <a
                  href="#"
                  onClick={() =>
                    setSpecialService((prevData) => ({
                      ...prevData,
                      data: [
                        ...prevData?.data,
                        { title: "", description: "", image: "", price: "" },
                      ],
                    }))
                  }
                  className="text-decoration-none btn btn-primary w-100 mb-3"
                >
                  + Add More Products
                </a>

              </div>
              {errors && (
                <p className="text-danger text-danger mt-3">
                  {errors.toString()}
                </p>
              )}
            </div>

            {/* Save & Next Button */}
            <div className="col-12 mt-4 text-center">
             {loading ? <Spinner variant="primary"/> : <button
                className="btn btn-primary btn-md w-100"
                onClick={handleServiceSubmit}
              >
                Save & Next
              </button>}
            </div>
          </div>

          <div className="d-none d-md-block left-portion p-0 col-md-6 h-100">
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link
              rel="preconnect"
              href="https://fonts.gstatic.com"
              crossOrigin
            />
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
            <div>
              <section
                className="h-auto"
                style={{ backgroundColor: "#F3F3F4", overflowY: "scroll" }}
              >
                <div className="container p-top">
                  <div className="col-12 mb-5">
                    <div className="mt-5 text-center">
                      <div className="col-12">
                        <h1 className="text-center text-dark fw-bold david-font fw-bold banner-title fs-45">
                          {specialService.title}
                        </h1>
                      </div>
                      <div className="row justify-content-center">
                        <div className="col-6 mb-1">
                          <p className="text-secondary text-center">
                            {specialService.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="col-12 mb-5 row justify-content-center david-font">
                      {specialService?.data?.length > 2 ? (
                        <Slider {...settings4}>
                          {specialService.data.map((dish, index) => (
                            <div
                              key={index}
                              className="dish-div col-12 col-lg-6 text-center p-3"
                            >
                              <div className="col-12 position-relative">
                                <img
                                  src={dish.image}
                                  alt={dish.title}
                                  style={{
                                    width: "100%",
                                    height: "auto",
                                    maxWidth: "300px",
                                    objectFit: "cover",
                                  }}
                                />
                              </div>
                              <div className="col-12">
                                <h2 className="fs-20 fw-bold">{dish.title}</h2>
                              </div>
                              <div className="col-12 mt-3 mb-3">
                                <p>{dish.description}</p>
                              </div>
                              <div className="col-12 mt-3 mb-3">
                                <p>{dish.price}</p>
                              </div>
                            </div>
                          ))}
                        </Slider>
                      ) : (
                        specialService?.data?.map((dish, index) => (
                          <div
                            key={index}
                            className="dish-div col-12 col-lg-6 text-center p-3"
                          >
                            <div className="col-12 position-relative">
                              <img
                                src={dish.image}
                                alt={dish.title}
                                style={{
                                  width: "100%",
                                  height: "auto",
                                  maxWidth: "300px",
                                  objectFit: "cover",
                                }}
                              />
                            </div>
                            <div className="col-12">
                              <h2 className="fs-20 fw-bold">{dish.title}</h2>
                            </div>
                            <div className="col-12 mt-3 mb-3">
                              <p>{dish.description}</p>
                            </div>
                            <div className="col-12 mt-3 mb-3">
                              <p>{dish?.price}</p>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};


export default CreateProductPart;
