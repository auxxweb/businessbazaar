import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { updateBusinessDetails } from "../store/businessSlice";
import Slider from "react-slick";
import { TextField } from "@mui/material";
import { preRequestFun } from "../service/s3url";

const CreateServices = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const businessState = useSelector((state) => state.business);

  const [specialService, setSpecialService] = useState({
    title: "",
    description: "",
    data: [{ title: "", description: "", image: "" }],
  });
  const [services, setServices] = useState([
    { title: "", description: "", image: "" },
  ]);
  const [isLoading, setIsLoading] = useState({
    specialService: {},
    service: {},
  });
  const [errors] = useState([]);

  // Handle change for individual special service fields
  const handleProductChange = (index, e) => {
    const { name, value } = e.target;
    setSpecialService((prevData) => {
      const updatedData = [...prevData.data];
      updatedData[index][name] = value;
      return { ...prevData, data: updatedData };
    });
  };

  // Handle change for services
  const handleServiceChange = (index, e) => {
    const { name, value } = e.target;
    setServices((prevServices) => {
      const updatedServices = [...prevServices];
      updatedServices[index][name] = value;
      return updatedServices;
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

      const preReq = await preRequestFun(file, "service");
      if (preReq && preReq.accessLink) {
        const imageUrl = preReq.accessLink;
        if (type === "specialService") {
          setSpecialService((prevData) => {
            const updatedData = [...prevData.data];
            updatedData[index].image = imageUrl;
            return { ...prevData, data: updatedData };
          });
        } else {
          setServices((prevServices) => {
            const updatedServices = [...prevServices];
            updatedServices[index].image = imageUrl;
            return updatedServices;
          });
        }
      } else {
        console.error("Access link not found in response.");
      }

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
    dispatch(
      updateBusinessDetails({
        specialServices: specialService,
        service: services,
      })
    );
    navigate("/create-business/product");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
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
  const removeService = (index) => {
    setServices((prevServices) => {
      // Filter out the service at the specified index
      const updatedServices = prevServices.filter((_, i) => i !== index);
      return updatedServices;
    });
  };
  const [currentSlide, setCurrentSlide] = useState(0);

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

  const setting2 = {
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: true,
    // centerMode: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    afterChange: (current) => setCurrentSlide(current),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
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

  const handlePrevStep = () => navigate("/create-business/landing");

  useEffect(() => {
    setSpecialService(
      JSON.parse(JSON.stringify(businessState?.specialServices))
    );
    setServices(JSON.parse(JSON.stringify(businessState?.service)));
  }, [businessState]);

  return (
    <>
      <div className="h-100vh create-business-div">
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
                <h1 className="fw-bold title-text">
                  <span className="title-main">Add </span>
                  <span className="title-highlight">Services Details</span>
                </h1>
              </div>

              <div className="col-12">
                {/* Special Service Title */}
                <div className="input-group mt-2 w-100">
                  <TextField
                    fullWidth
                    label="Title"
                    id="title-1"
                    variant="filled"
                    name="title"
                    autoComplete="title-1"
                    onChange={handleChange}
                    error={!!errors?.landingPageHeroTitle}
                    helperText={errors?.landingPageHeroTitle}
                    value={specialService.title}
                  />
                </div>
                <div className="input-group mb-3 mt-4 w-100">
                  <TextField
                    fullWidth
                    label="Description"
                    id="description-1"
                    variant="filled"
                    name="description"
                    autoComplete="description-1"
                    multiline // Makes the TextField behave like a textarea
                    rows={4} // You can adjust the number of rows (height) here
                    value={specialService.description}
                    onChange={handleChange}
                    error={!!errors?.landingPageHeroDescription}
                    helperText={errors?.landingPageHeroDescription}
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
                    Add Special Services
                  </h5>
                </div>

                {specialService?.data?.map((p, index) => (
                  <div
                    key={`index-${index}`}
                    className="mt-2 card p-3 pt-5 position-relative shadow-sm"
                    style={{ border: "1px solid #ddd", borderRadius: "8px" }}
                  >
                    {/* Add "X" button to remove item from every card except the last one */}
                    {index < specialService.data.length - 1 && (
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
                      label="Title"
                      id="title"
                      variant="filled"
                      name="title"
                      autoComplete="Service Name"
                      value={p.title}
                      onChange={(e) => handleProductChange(index, e)}
                      error={!!errors?.landingPageHeroTitle}
                      helperText={errors?.landingPageHeroTitle}
                    />

                    <div className="input-group mb-3 mt-4 w-100">
                      <TextField
                        fullWidth
                        label="Description"
                        id="description"
                        variant="filled"
                        name="description"
                        autoComplete="description"
                        multiline
                        rows={4}
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
                        ...prevData.data,
                        { title: "", description: "", image: "" },
                      ],
                    }))
                  }
                  className="text-decoration-none btn btn-primary w-100 mb-3"
                >
                  + Add More Special Service
                </a>
                <hr
                  style={{
                    border: "3px solid #105193",
                    borderRadius: "5px",
                    margin: "35px 0",
                  }}
                />
                <div className="col-12 text-center">
                  <h5 className="fs-18 mb-4 p-1 text-center text-md-start text-dark fw-bold mt-3">
                    Add Services
                  </h5>
                </div>

                {/* Services List */}
                {services?.map((service, index) => (
                  <div
                    key={index}
                    className="input-group mt-2 w-100 position-relative card p-3 pt-5 shadow-sm"
                    style={{
                      border: "1px solid #ddd",
                      borderRadius: "8px",
                    }}
                  >
                    {/* "X" button to remove item, only shown if it's not the first service */}
                    {services?.length > 1 && (
                      <div
                        onClick={() => removeService(index)}
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
                      label="Title"
                      id="title"
                      variant="filled"
                      name="title"
                      autoComplete="title"
                      error={!!errors?.welcomePartTitle}
                      helperText={errors?.welcomePartTitle}
                      value={service.title}
                      onChange={(e) => handleServiceChange(index, e)}
                    />

                    <div className="input-group mb-3 mt-4 w-100">
                      <TextField
                        fullWidth
                        label="Description"
                        id="description"
                        variant="filled"
                        name="description"
                        autoComplete="description"
                        multiline
                        rows={4}
                        error={!!errors?.welcomePartDescription}
                        helperText={errors?.welcomePartDescription}
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
                        value={service.description}
                        onChange={(e) => handleServiceChange(index, e)}
                        required
                      />
                    </div>

                    <div className="col-12 col-md-3 mb-3">
                      <input
                        type="file"
                        hidden
                        className="serviceImageInput"
                        onChange={(e) => handleFileChange("service", index, e)}
                      />
                      <div
                        onClick={() => uploadImage("service", index)}
                        className="p-2 mt-2 add-logo-div"
                      >
                        <span style={{ color: "grey" }}>(Ratio 16 : 8) </span>
                        <div className="text-center">
                          {isLoading.service[index] ? (
                            <div
                              className="spinner-border text-primary"
                              role="status"
                            ></div>
                          ) : (
                            <img
                              src={
                                service.image ||
                                "/src/assets/images/add_image.png"
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

                {/* Add More Service Button */}
                <a
                  href="#"
                  onClick={() =>
                    setServices((prev) => [
                      ...prev,
                      { title: "", description: "", image: "" },
                    ])
                  }
                  className="text-decoration-none btn btn-primary w-100"
                >
                  + Add More Service
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
              <button
                className="btn btn-primary btn-md w-100"
                onClick={handleServiceSubmit}
              >
                Save & Next
              </button>
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
                      {specialService.data.length > 2 ? (
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
                            </div>
                          ))}
                        </Slider>
                      ) : (
                        specialService.data.map((dish, index) => (
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
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </section>

              <section
                className="h-auto david-font"
                style={{ backgroundColor: "#F3F3F4" }}
              >
                <div className="container p-top">
                  <div className="col-12 mt-5 text-center ">
                    <h1 className="fw-bold text-center">Services We Provide</h1>
                  </div>
                  <div className="col-12 mb-5 row justify-content-center">
                    {services.length > 3 ? (
                      <Slider {...setting2} className="mb-5">
                        {services.map((service, index) => (
                          <div
                            key={index}
                            className={`col-12 col-lg-4 service-design ${
                              index === currentSlide ? "active" : ""
                            } mt-5 mb-5 text-center`}
                          >
                            <div className="col-12 text-center">
                              <h3>{service.title}</h3>
                            </div>
                            <div className="col-12 mt-5">
                              <p className="text-center">
                                {service.description}
                              </p>
                            </div>
                            <div
                              className="col-12 text-center"
                              style={{ height: "100px" }}
                            >
                              <img
                                src={service.image}
                                alt={service.title}
                                className="h-100"
                              />
                            </div>
                          </div>
                        ))}
                      </Slider>
                    ) : (
                      services.map((service, index) => (
                        <div
                          key={index}
                          className={`col-12 col-lg-4 service-design ${
                            index === currentSlide ? "active" : ""
                          } mt-5 mb-5 text-center`}
                        >
                          <div className="col-12 text-center">
                            <h3>{service.title}</h3>
                          </div>
                          <div className="col-12 mt-5">
                            <p className="text-center">{service.description}</p>
                          </div>
                          <div
                            className="col-12 text-center"
                            style={{ height: "100px" }}
                          >
                            <img
                              src={service.image}
                              alt={service.title}
                              className="h-100"
                            />
                          </div>
                        </div>
                      ))
                    )}
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

export default CreateServices;
