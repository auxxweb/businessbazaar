import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { TextField } from "@mui/material";
import { updateBusinessDetails } from "../store/businessSlice";
import { Container, Nav, Navbar, NavLink } from "react-bootstrap";
import { preRequestFun } from "../service/s3url";

const LandingPageDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const businessState = useSelector((state) => state.business);

  const [theme, setTheme] = useState("#6AA646");
  const [secondaryTheme, setSecondaryTheme] = useState("#A8FF75");

  const [landingPageHero, setLandingPageHero] = useState({
    title: "",
    description: "",
    coverImage: "",
    loading: "",
  });
  const [welcomePart, setWelcomePart] = useState({
    title: "",
    description: "",
    coverImage: "",
    loading: "",
  });
  const [landingFile, setLandingFile] = useState();
  const [welcomeFile, setWelcomeFile] = useState();

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // Loader state

  const handleFileChange = (name, e, sectionSetter) => {
    const file = e.target.files[0];

    if (name === "landingPageHeroImage") {
      setLandingPageHero((prevState) => ({
        ...prevState,
        loading: true,
      }));
    } else if (name === "welcomePartImage") {
      setWelcomePart((prevState) => ({
        ...prevState,
        loading: true,
      }));
    }

    if (file) {
      setLoading(true); // Show loader
      const reader = new FileReader();

      reader.onload = () => {
        sectionSetter((prevData) => ({
          ...prevData,
          coverImage: reader.result, // Use reader.result to get Base64 string
        }));

        if (name === "landingPageHeroImage") {
          setLandingPageHero((prevState) => ({
            ...prevState,
            loading: false,
          }));
          setLandingFile(file);
        } else if (name === "welcomePartImage") {
          setWelcomePart((prevState) => ({
            ...prevState,
            loading: false,
          }));
          setWelcomeFile(file);
        }

        setLoading(false); // Hide loader after image is set
      };

      reader.onerror = () => {
        console.error("Error reading file:", reader.error);
        setLoading(false); // Ensure loader hides on error
      };

      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e, sectionSetter) => {
    const { name, value } = e.target;
    sectionSetter((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!landingPageHero.title)
      newErrors.landingPageHeroTitle = "Title is required";
    if (!landingPageHero.description)
      newErrors.landingPageHeroDescription = "Description is required";
    if (!landingPageHero.coverImage)
      newErrors.landingPageHeroCoverImage = "Cover image is required";
    if (!welcomePart.title) newErrors.welcomePartTitle = "Title is required";
    if (!welcomePart.description)
      newErrors.welcomePartDescription = "Description is required";
    if (!welcomePart.coverImage)
      newErrors.welcomePartCoverImage = "Cover image is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleLandingSubmit = async () => {
    setLoading(true); // Set loading once at the start
    try {
      let landingPreReq = null;
      let welcomePreReq = null;

      if (landingFile) {
        landingPreReq = await preRequestFun(landingFile, "Landing");
      }

      if (welcomeFile) {
        welcomePreReq = await preRequestFun(welcomeFile, "Welcome");
      }

      if (landingPreReq?.accessLink) {
        setLandingPageHero((prev) => ({
          ...prev,
          coverImage: landingPreReq.accessLink,
        }));
      }

      if (welcomePreReq?.accessLink) {
        setWelcomePart((prev) => ({
          ...prev,
          coverImage: welcomePreReq.accessLink,
        }));
      }

      if (validateForm()) {
        dispatch(
          updateBusinessDetails({
            landingPageHero: {
              ...landingPageHero,
              coverImage:
                landingPreReq?.accessLink || landingPageHero.coverImage,
            },
            theme,
            secondaryTheme,
            welcomePart: {
              ...welcomePart,
              coverImage: welcomePreReq?.accessLink || welcomePart.coverImage,
            },
          })
        );
        navigate("/create-business/services");
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false); // Set loading to false at the end
    }
  };

  const triggerFileUpload = (inputId) => {
    document.getElementById(inputId).click();
  };

  const handlePrevStep = () => navigate("/create-business/description");

  useEffect(() => {
    setTheme(businessState?.theme || "#6AA646");
    setSecondaryTheme(businessState?.secondaryTheme || "#A8FF75");
    setLandingPageHero(businessState?.landingPageHero);
    setWelcomePart(businessState?.welcomePart);
  }, [businessState]);

  if (loading) {
    return (
      <div className="h-100vh">
        <div className="d-flex h-100 justify-content-center align-items-center">
          <span>Loading</span>
        </div>
      </div>
    );
  }

  return (
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
            <div className="col-12 text-center text-md-start mt-5">
              <h1 className="fw-bold title-text">
                <span className="title-main">Add</span> <br />
                <span className="title-highlight">Landing Page Details</span>
              </h1>
            </div>

            {/* Color Theme Section */}
            <div className="col-12 p-3 p-md-3">
              <h5 className="fs-18 mb-4 p-1 text-start text-md-start text-dark fw-bold mt-3">
                Color Theme
              </h5>
              <div className="col-6 col-md-3 d-flex w-100 gap-5 pb-3">
                <div>
                  <label>Choose Primary Color</label>
                  <TextField
                    variant="outlined"
                    type="color"
                    name="color"
                    className="form-control form-control-lg"
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                  />
                </div>

                <div>
                  <label>Choose Secondary Color</label>
                  <TextField
                    type="color"
                    name="color"
                    className="form-control form-control-lg"
                    value={secondaryTheme}
                    onChange={(e) => setSecondaryTheme(e.target.value)}
                  />
                </div>
              </div>

              {/* Landing Page Hero Details */}
              <h5 className="fs-18 mb-4 text-dark fw-bold mt-4">
                Add Landing Page Banner
              </h5>

              <div className="input-group mt-2 w-100">
                <TextField
                  fullWidth
                  label="Title*"
                  id="title"
                  variant="filled"
                  name="title"
                  autoComplete="title"
                  value={landingPageHero.title}
                  onChange={(e) => handleInputChange(e, setLandingPageHero)}
                  error={!!errors?.landingPageHeroTitle}
                  helperText={errors?.landingPageHeroTitle}
                />
              </div>
              <div className="input-group mb-3 mt-4 w-100">
                <TextField
                  fullWidth
                  label="Description*"
                  id="description"
                  variant="filled"
                  name="description"
                  autoComplete="description"
                  multiline // Makes the TextField behave like a textarea
                  rows={4} // You can adjust the number of rows (height) here
                  value={landingPageHero.description}
                  onChange={(e) => handleInputChange(e, setLandingPageHero)}
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

              {/* Hero Image Upload */}
              <input
                type="file"
                hidden
                id="LandingHeroImageInput"
                onChange={(e) =>
                  handleFileChange(
                    "landingPageHeroImage",
                    e,
                    setLandingPageHero
                  )
                }
              />
              <div
                onClick={() => triggerFileUpload("LandingHeroImageInput")}
                className="p-2 mt-2 mb-3 add-logo-div"
              >
                <span style={{ color: "grey" }}>(Ratio 16 : 9)</span>
                <div className="text-center">
                  {landingPageHero.loading ? (
                    <div
                      className="spinner-border text-primary"
                      role="status"
                    ></div>
                  ) : (
                    <img
                      src={
                        landingPageHero.coverImage ||
                        "/src/assets/images/add_image.png"
                      }
                      width="50"
                      alt="Add Hero Image"
                    />
                  )}
                </div>
              </div>
              {errors.landingPageHeroCoverImage && (
                <div className="text-danger">
                  {errors.landingPageHeroCoverImage}
                </div>
              )}

              {/* Welcome Part */}
              <h5 className="fs-18 mb-2 text-dark fw-bold mt-3">
                Add Welcome Part
              </h5>
              <div className="input-group mt-2 w-100">
                <TextField
                  fullWidth
                  label="Title*"
                  id="title"
                  variant="filled"
                  name="title"
                  autoComplete="title"
                  value={welcomePart.title}
                  onChange={(e) => handleInputChange(e, setWelcomePart)}
                  error={!!errors?.welcomePartTitle}
                  helperText={errors?.welcomePartTitle}
                />
              </div>
              <div className="input-group mb-3 mt-4 w-100">
                <TextField
                  fullWidth
                  label="Description*"
                  id="description"
                  variant="filled"
                  name="description"
                  autoComplete="description"
                  multiline // Makes the TextField behave like a textarea
                  rows={4} // You can adjust the number of rows (height) here
                  value={welcomePart.description}
                  onChange={(e) => handleInputChange(e, setWelcomePart)}
                  error={!!errors?.welcomePartDescription}
                  helperText={errors?.welcomePartDescription}
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

              {/* Welcome Image Upload */}
              <input
                type="file"
                hidden
                id="WelcomeImageInput"
                onChange={(e) =>
                  handleFileChange("welcomePartImage", e, setWelcomePart)
                }
              />
              <div
                onClick={() => triggerFileUpload("WelcomeImageInput")}
                className="p-2 mt-2 mb-3 add-logo-div"
              >
                <span style={{ color: "grey" }}>(Ratio 5 : 7)</span>
                <div className="text-center">
                  {welcomePart.loading ? (
                    <div
                      className="spinner-border text-primary"
                      role="status"
                    ></div>
                  ) : (
                    <img
                      src={
                        welcomePart.coverImage ||
                        "/src/assets/images/add_image.png"
                      }
                      width="50"
                      alt="Add Welcome Image"
                    />
                  )}
                </div>
              </div>
              {errors.welcomePartCoverImage && (
                <div className="text-danger">
                  {errors.welcomePartCoverImage}
                </div>
              )}

              <div className="col-12 mt-4 text-center">
                <button
                  className="btn btn-primary w-100"
                  onClick={handleLandingSubmit}
                >
                  Save & Next
                </button>
              </div>
            </div>
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
                            background-color: ${theme}; /* Color of the scrollbar thumb */
                            border-radius: 10px;     /* Rounded edges of the thumb */
                            border: 3px solid  ${theme}; /* Padding around the thumb */
                        }
                    .theme
                    {
                        background-color: ${theme};
                        color: white;
                        border: none;
                    }.service-design.active{
                        background-color: ${theme};
                    }.address-section{
                    background-color:${theme};
                    }.address-logo i{
                    color: ${theme};
                    }.cat-option{
                        border-right: 1px dashed ${theme};
                    }.text-orange{
                            color: ${theme};
                        }.dish-div:hover{
                            background-color: ${theme};
                            color:white;
                        }.product-section{
                        padding:20px;
                        border:1px solid ${theme};
                        border-radius:16px;
                            }.slick-dots .slick-active button{
                                background-color: ${theme};
                                border-radius: 16px;
                            }
                        `}
          </style>
          <Navbar
            expand="lg"
            className="bg-white pjs "
            style={{ paddingBlock: "5px" }}
          >
            <Container>
              {/* Align Brand to the start (left side) */}
              <Navbar.Brand
                href="/"
                className="fw-bold w-50 nav-logo"
                style={{ fontSize: "36px" }}
              >
                <img src={businessState?.logo} alt="" />
                <span className="ms-2">{businessState?.businessName}</span>
              </Navbar.Brand>

              <Navbar.Toggle
                aria-controls="basic-navbar-nav"
                style={{ color: "black" }}
              />

              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto w-100 justify-content-evenly jcc">
                  <button
                    className="hamburger-btn text-black bg-transparent border-0 d-flex flex-column justify-content-center align-items-center"
                    style={{ cursor: "pointer" }}
                    onClick={() => console.log("Hamburger button clicked")}
                  >
                    <div
                      style={{
                        width: "25px",
                        height: "3px",
                        backgroundColor: "black",
                        margin: "4px 0",
                      }}
                    ></div>
                    <div
                      style={{
                        width: "25px",
                        height: "3px",
                        backgroundColor: "black",
                        margin: "4px 0",
                      }}
                    ></div>
                    <div
                      style={{
                        width: "25px",
                        height: "3px",
                        backgroundColor: "black",
                        margin: "4px 0",
                      }}
                    ></div>
                  </button>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          <section className="h-auto">
            <div className="container p-top">
              <div className="row align-items-center banner-section">
                {/* Left Image for Mobile View */}
                <div className="col-12 col-lg-6 text-end d-block d-lg-none">
                  <img
                    src={landingPageHero.coverImage}
                    alt=""
                    className="banner-image"
                  />
                  <div className="banner-image-2 d-none">
                    <img src="/src/assets/images/baner-image2.png" alt="" />
                  </div>
                </div>

                {/* Text Content */}
                <div className="col-12 col-lg-6">
                  <div className="row align-items-center">
                    <div className="col-12">
                      <h1 className="text-start text-dark fw-bold david-font fw-bold banner-title text-center text-lg-start">
                        {landingPageHero.title}
                      </h1>
                    </div>
                    <div className="col-12">
                      <p className="text-secondary text-center text-lg-start david-font">
                        {landingPageHero.description}
                      </p>
                    </div>
                    <div className="mt-3 col-12">
                      <div className="row">
                        <div className="col-6 col-lg-5 mb-2">
                          <NavLink
                            to="#about"
                            className="btn btn-dark text-white radius-theme box-shadow w-100 p-1"
                            style={{ backgroundColor: "#212529" }}
                          >
                            View More
                          </NavLink>
                        </div>
                        <div className="col-6 col-lg-5 mb-2">
                          <NavLink
                            to="#service"
                            className="btn btn-dark text-white radius-theme box-shadow theme w-100 p-1"
                          >
                            Services
                          </NavLink>
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 col-12 social-media gap-3">
                      <a
                        href={businessState?.socialMediaLinks?.[0]?.link}
                        target="_blank"
                        className="contact-banner text-dark"
                      >
                        <i className="bi bi-facebook"></i>
                      </a>
                      <a
                        href={businessState?.socialMediaLinks?.[1]?.link}
                        target="_blank"
                        className="contact-banner text-dark"
                      >
                        <i className="bi bi-instagram"></i>
                      </a>
                      <a
                        href={businessState?.socialMediaLinks?.[2]?.link}
                        target="_blank"
                        className="contact-banner text-dark"
                      >
                        <i className="bi bi-twitter"></i>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Right Image for Desktop View */}
                <div className="col-12 col-lg-6 text-end d-none d-lg-block">
                  <img
                    src={landingPageHero.coverImage}
                    alt=""
                    className="banner-image"
                  />
                  <div className="banner-image-2 d-none">
                    <img src="/src/assets/images/baner-image2.png" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="mt-5 mb-5">
            <div className="container p-top">
              <div className="col-12 address-section">
                <div className="row">
                  <div className="col-12 col-lg-4 mb-3 mb-lg-0">
                    <div className="row align-items-center justify-content-start">
                      <div className="col-auto address-logo">
                        <i className="bi bi-geo-alt-fill"></i>
                      </div>
                      <div className="col">
                        <span className="fs-13">Address</span>
                        <p className="fs-16">
                          {businessState?.address?.buildingName},{" "}
                          {businessState?.address?.city},
                          {businessState?.address?.landMark},
                          {businessState?.address?.streetName},{" "}
                          {businessState?.address?.state}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 col-lg-4 mb-3 mb-lg-0">
                    <div className="row align-items-center justify-content-start">
                      <div className="col-auto address-logo">
                        <i className="bi bi-envelope-fill"></i>
                      </div>
                      <div className="col">
                        <span className="fs-13">Send Email</span>
                        {businessState?.emails?.map((email, index) => (
                          <p className="fs-16" key={index}>
                            {email.email}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="col-12 col-lg-4 mb-3 mb-lg-0">
                    <div className="row align-items-center justify-content-start">
                      <div className="col-auto address-logo">
                        <i className="bi bi-telephone"></i>
                      </div>
                      <div className="col">
                        <span className="fs-13">Contact</span>
                        {businessState?.mobileNumbers?.map((number, index) => (
                          <p className="fs-16" key={index}>
                            {number.number}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <section
            className=" h-auto"
            style={{ backgroundColor: "#F3F3F4" }}
            id="about"
          >
            <div className="container p-top">
              <div className="row mt-5 align-items-center mb-5">
                <div className="col-12 col-lg-6 mt-2 text-center text-lg-start about-image">
                  <img
                    src={welcomePart.coverImage}
                    className="img-fluid"
                    alt=""
                  />
                </div>
                <div className="col-12 col-lg-6">
                  <div className="col-12 mb-3">
                    <h1 className="text-center text-lg-start text-dark fw-bold david-font fw-bold banner-title">
                      {welcomePart.title}
                    </h1>
                  </div>
                  <div className="col-12 mt-4">
                    <p className="text-secondary text-center text-lg-start david-font mt-4">
                      {welcomePart.description}
                    </p>
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

export default LandingPageDetails;
