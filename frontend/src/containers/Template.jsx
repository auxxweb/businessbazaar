import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar, NavLink } from "react-bootstrap";
import "/src/assets/css/template.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useParams } from "react-router-dom";
import {
  createBusinessReview,
  fetchBusinessTemplate,
  getAllBusinessReviews,
  submitContactForm,
  submitNewsLetter,
} from "../Functions/functions";
import { Dialog } from "primereact/dialog";
import { Rating } from "primereact/rating";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import ContactForm from "/src/components/Business/contactForm";
import { formatDate } from "../utils/app.utils";
import { toast } from "react-toastify";
import PlaceholderBanner from "../assets/images/BannerPlaceholder.png";
import Placeholder from "../assets/images/Placeholder.jpg";
import Loader from "../components/Loader/Loader";
import NewsArticles from "./NewsArticles";

export default function Template() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showNews,setShowNews] = useState(false)
  const [businessData, setBusinessData] = useState(null);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [colorTheme, setColorTheme] = useState("");
  const [visible, setVisible] = useState(false);
  const [reviewFetch, setreviewFetch] = useState(false);
  const [review, setReview] = useState({
    rating: "",
    name: "",
    review: "",
  });

  const [reviews, setReviews] = useState([]);

  const [closeDays, setCloseDays] = useState([]);
  const allDays = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];
  const [newsLetterEmail, setNewsLetterEmail] = useState("");

  const handleFormSubmit = async (e, formData) => {
    e.preventDefault();

    const response = await submitContactForm({
      ...formData,
      businessId: id,
    });
    if (response?.data) {
      toast.success("Form submitted successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        style: {
          backgroundColor: "#38a20e", // Custom red color for error
          color: "#FFFFFF", // White text
        },
      });
      return true;
    } else {
      toast.success("Failed submission failed!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        style: {
          backgroundColor: "#aa0808", // Custom red color for error
          color: "#FFFFFF", // White text
        },
      });
      return false;
    }
  };

  useEffect(()=>{
    
  if(window?.location?.hash == '#news'){
    setShowNews(true)
  }else{
    setShowNews(false)
  }

  },[window?.location?.hash])
  const handleNewsLetterSubmit = async (e) => {
    e.preventDefault();
    console.log("newsLetterEmail", newsLetterEmail);

    const response = await submitNewsLetter({
      email: newsLetterEmail,
    });
    if (response?.data) {
      toast.success("Subscribed successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        style: {
          backgroundColor: "#38a20e", // Custom red color for error
          color: "#FFFFFF", // White text
        },
      });
      setNewsLetterEmail("");
    } else {
      toast.success("Failed to Subscribe!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        style: {
          backgroundColor: "#aa0808", // Custom red color for error
          color: "#FFFFFF", // White text
        },
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReview((prevState) => ({
      ...prevState,
      [name]: value, getAllBusinessReviews
    }));
  };

  useEffect(() => {
    const fetchReview = async () => {
      const response = await getAllBusinessReviews({ businessId: id });
      console.log(response, "data-validation");
      setReviews(response?.data?.data);
    };
    fetchReview();
  }, [id, reviewFetch]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    console.log(review, "review");

    const response = await createBusinessReview({
      ...review,
      businessId: id,
    });

    if (response?.data) {
      toast.success("Thank you for your review!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        style: {
          backgroundColor: "#38a20e", // Custom red color for error
          color: "#FFFFFF", // White text
        },
      });
      setreviewFetch(!reviewFetch);
      setVisible(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const businessDetails = await fetchBusinessTemplate(id, setLoading);
      setBusinessData(businessDetails?.data);
      console.log(businessDetails);
      setColorTheme(businessDetails.data.theme);
      setLoading(false);
      const closed = allDays.filter(
        (day) =>
          !businessDetails.data.businessTiming.workingDays
            .map((d) => d.toLowerCase())
            .includes(day)
      );
      setCloseDays(closed);
    };

    fetchData();
  }, [id]);

  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    arrows: false,
    // centerMode: true,
    speed: 500,
    slidesToShow: 2, // Number of dishes to show
    // mobileFirst: true,
    slidesToScroll: 1,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
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
    slidesToScroll: 1,
    afterChange: (current) => setCurrentSlide(current),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
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

  const settings3 = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    // centerMode: true,
    arrows: false,
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

  if (loading) {
    return (
      <div className="h-100vh text-center ">
        <div className="row h-100 justify-content-center align-items-center">
          <div className="col-3 "> {loading && <Loader />}</div>
        </div>
      </div>
    );
  }

  // If there's no business data (e.g., fetch failed), show an error message
  if (!businessData) {
    return <div>Error loading business data.</div>;
  }

  return (
    <>
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
                        background-color: ${colorTheme}; /* Color of the scrollbar thumb */
                        border-radius: 10px;     /* Rounded edges of the thumb */
                        border: 3px solid  ${colorTheme}; /* Padding around the thumb */
                    }
                .theme
                {
                    background-color: ${colorTheme};
                    color: white;
                    border: none;
                }.service-design.active{
                    background-color: ${colorTheme};
                }.address-section{
                background-color:${colorTheme};
                }.address-logo i{
                color: ${colorTheme};
                }.cat-option{
                    border-right: 1px dashed ${colorTheme};
                }.text-orange{
                        color: ${colorTheme};
                    }.dish-div:hover{
                        background-color: ${colorTheme};
                        color:white;
                    }.product-section{
                    padding:20px;
                    border:1px solid ${colorTheme};
                    border-radius:16px;
                        }.slick-dots .slick-active button{
                            background-color: ${colorTheme};
                            border-radius: 16px;
                        }
                    `}
      </style>
      <Navbar
  expand="lg"
  className="bg-white pjs fixed-top"
  style={{ paddingBlock: "5px" }}
>
  <Container>
    {/* Back button for large screens (before the logo) */}
    <button
      className="btn btn-outline-secondary d-none d-lg-inline-block me-2"
      onClick={() => window.location.href = "/"} // Modify the onClick action as needed
    >Home
    </button>

    {/* Align Brand to the start (left side) */}
    <Navbar.Brand
      href="/"
      className="fw-bold w-50 nav-logo"
      style={{ fontSize: "36px" }}
    >
      <img
        src={
          businessData?.logo && businessData?.logo.length > 0
            ? businessData?.logo
            : Placeholder
        }
        alt={businessData?.businessName || "Logo Placeholder"}
      />
      <span className="ms-2">{businessData?.businessName}</span>
    </Navbar.Brand>

    <Navbar.Toggle
      aria-controls="basic-navbar-nav"
      style={{ color: "black" }}
    />

    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ms-auto w-100 justify-content-evenly jcc">
        <NavLink
          href="#"
          className="text-black text-center text-lg-start text-decoration-none fs-14"
          style={{ color: "black" }}
        >
           <i className="bi bi-arrow-left"></i>
          Home
        </NavLink>
        <NavLink
          href="#about"
          className="text-black text-center text-lg-start text-decoration-none fs-14"
          style={{ color: "black" }}
        >
          About
        </NavLink>
        <NavLink
          href="#gallery"
          className="text-black text-center text-lg-start text-decoration-none fs-14"
          style={{ color: "black" }}
        >
          Gallery
        </NavLink>
        <NavLink
          href="#contact"
          className="text-black text-center text-lg-start text-decoration-none fs-14"
          style={{ color: "black" }}
        >
          Contact
        </NavLink>
        <NavLink
          href="#news"
          onClick={(e) => setShowNews(true)}
          className="text-black text-center text-lg-start text-decoration-none fs-14"
          style={{ color: "black" }}
        >
          News
        </NavLink>
        <NavLink
          href="#services"
          style={{
            backgroundColor: colorTheme,
            color: "white",
            borderRadius: "10px 0px",
            padding: "8px 20px",
            fontSize: "13px",
            boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.15)",
          }}
          className="fw-bold text-decoration-none text-center text-lg-start"
        >
          Services
        </NavLink>

        {/* Back button for smaller screens (inside menu items) */}
        <button
          className="btn btn-outline-secondary d-lg-none mt-2"
          onClick={() => window.location.href = "/"} // Modify the onClick action as needed
        >
          Back to Home
        </button>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>

      {showNews ? <NewsArticles newsData={businessData?.landingPageHero} colorTheme={colorTheme} /> : <>

        <section className="h-auto" >
          <div className="container p-top">
            <div className="row align-items-center banner-section">
              {/* Left Image for Mobile View */}
              <div className="col-12 col-lg-6 text-end d-block d-lg-none">
                <img
                  src={
                    businessData?.landingPageHero?.coverImage &&
                      businessData?.landingPageHero?.coverImage?.length > 0
                      ? businessData?.landingPageHero?.coverImage
                      : PlaceholderBanner
                  }
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
                      {businessData?.landingPageHero?.title}
                    </h1>
                  </div>
                  <div className="col-12">
                    <p className="text-secondary text-center text-lg-start david-font">
                      {businessData?.landingPageHero?.description}
                    </p>
                  </div>
                  <div className="mt-3 col-12">
                    <div className="row">
                      <div className="col-6 col-lg-3 mb-2">
                        <NavLink
                          to="#about"
                          className="btn btn-dark text-white radius-theme box-shadow w-100 p-1"
                          style={{ backgroundColor: "#212529" }}
                        >
                          View More
                        </NavLink>
                      </div>
                      <div className="col-6 col-lg-3 mb-2">
                        <NavLink
                          href="#services"
                          className="btn btn-dark text-white radius-theme box-shadow theme w-100 p-1"
                        >
                          Services
                        </NavLink>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 col-12 social-media gap-3">
                    <a
                      href={
                        businessData?.socialMediaLinks?.length &&
                        businessData?.socialMediaLinks[0]?.link
                      }
                      target="_blank"
                      className="contact-banner text-dark"
                    >
                      <i className="bi bi-facebook"></i>
                    </a>
                    <a
                      href={
                        businessData?.socialMediaLinks?.length &&
                        businessData?.socialMediaLinks[1]?.link
                      }
                      target="_blank"
                      className="contact-banner text-dark"
                    >
                      <i className="bi bi-instagram"></i>
                    </a>
                    <a
                      href={
                        businessData?.socialMediaLinks?.length &&
                        businessData?.socialMediaLinks[2]?.link
                      }
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
                  src={
                    businessData?.landingPageHero?.coverImage &&
                      businessData?.landingPageHero?.coverImage?.length > 0
                      ? businessData?.landingPageHero?.coverImage
                      : PlaceholderBanner
                  }
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
              <div className="row justify-content-between">
                <div className="col-12 col-lg-4 mb-3 mb-lg-0">
                  <div className="row align-items-center justify-content-start">
                    <div className="col-auto address-logo">
                      <i className="bi bi-geo-alt-fill"></i>
                    </div>
                    <div className="col">
                      <span className="fs-13">Address</span>
                      <p className="fs-16">
                        {businessData?.address?.buildingName},{" "}
                        {businessData?.address?.city},
                        {businessData?.address?.landMark},
                        {businessData?.address?.streetName},{" "}
                        {businessData?.address?.state}
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
                      <p className="fs-16">
                        {businessData?.contactDetails?.email}
                      </p>
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
                      <p className="fs-16 mb-0">
                        {businessData?.contactDetails?.primaryNumber}
                      </p>
                      <p className="fs-16 mt-0">
                        {businessData?.contactDetails?.secondaryNumber}
                      </p>
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
                  src={
                    (businessData?.welcomePart?.coverImage ?? Placeholder)
                  }
                  className="img-fluid about-image"
                  alt=""
                />
              </div>
              <div className="col-12 col-lg-6">
                <div className="col-12 mb-3">
                  <h1 className="text-center text-lg-start text-dark fw-bold david-font fw-bold banner-title">
                    {businessData?.welcomePart?.title}
                  </h1>
                </div>
                <div className="col-12 mt-4">
                  <p className="text-secondary text-center text-lg-start david-font mt-4">
                    {businessData?.welcomePart?.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="h-auto" id="services" style={{ backgroundColor: "#F3F3F4" }}>
          <div className="container p-top">
            <div className="col-12 mb-5">
              <div className="mt-5 text-center">
                <div className="col-12">
                  <h1 className="text-center text-dark fw-bold david-font fw-bold banner-title fs-45">
                    {businessData?.specialServices?.title}
                  </h1>
                </div>
                <div className="row justify-content-center">
                  <div className="col-12 col-lg-6 ">
                    <p className="text-secondary text-center mb-2">
                      {businessData?.specialServices?.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="col-12 mb-5 david-font row justify-content-center gap-3">
                {businessData.specialServices.data.length > 2 ? (
                  <Slider {...settings}>
                    {businessData?.specialServices?.data.map((dish, index) => (
                      <div
                        key={index}
                        className="dish-div col-12 text-center p-3"
                      >
                        <div className="col-12 position-relative text-center">
                          <img
                            src={
                              dish.image && dish.image.length > 0
                                ? dish.image
                                : Placeholder
                            }
                            alt={dish.title}
                            style={{
                              width: "300px",
                              height: "300px",
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
                  businessData.specialServices.data.map((dish, index) => (
                    <div
                      key={index}
                      className="dish-div col-12 col-lg-6 text-center p-3"
                    >
                      <div className="col-12 position-relative">
                        <img
                          src={
                            dish.image && dish.image.length > 0
                              ? dish.image
                              : Placeholder
                          }
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
        <section className="bg-white h-auto david-font" id="menu">
          <div className="container  p-top">
            <div className="col-12 mb-5">
              <div className="row justify-content-center">
                <div className="col-12 col-md-6 text-center">
                  <h1 className="text-dark fw-bold david-font banner-title fs-45">
                    Our List
                  </h1>
                </div>
              </div>
            </div>

            <div className="mt-5 david-font">
              <div className="mb-5">
                <div className="row mb-3">
                  {businessData?.productSection?.map((item, index) => (
                    <div
                      className="col-12 col-lg-6 mt-3 "
                      style={{ padding: "0 30px" }}
                      key={index}
                    >
                      <div className="row  product-section align-items-center">
                        <div className="col-2">
                          <img
                            src={
                              item.image && item.image.length > 0
                                ? item.image
                                : Placeholder
                            }
                            alt=""
                            className="w-100"
                          />
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

        <section
          className="h-auto david-font"
          style={{ backgroundColor: "#F3F3F4" }}
        >
          <div className="container p-top">
            <div className="col-12 mt-5 text-center text-lg-start">
              <h1 className="fw-bold text-center">Services We Provide</h1>
            </div>
            <div className="col-12 mb-5">
              <Slider {...setting2} className="mb-5">
                {businessData?.service?.map((service, index) => (
                  <div
                    key={index}
                    className={`col-12 col-lg-4 service-design ${index === currentSlide ? "active" : "bg-white"
                      }  mt-5 mb-5 text-center`}
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
                        src={
                          service.image && service.image.length > 0
                            ? service.image
                            : Placeholder
                        }
                        alt={service.title}
                        className="h-100"
                      />
                    </div>
                  </div>
                ))}
              </Slider>
            </div>

            <div className="col-12 mb-5" id="gallery">
              <div className="col-12 mb-5 mt-5">
                <h1 className="fw-bold text-center">Gallery</h1>
              </div>
              <Slider {...gallery} className="gallery-slider">
                {businessData?.gallery?.map((image, index) => (
                  <div key={index} className="p-2">
                    <img
                      src={image && image.length > 0 ? image : Placeholder}
                      alt=""
                      className="w-100 gallery-img"
                    />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </section>
        <section className="bg-white d-none">
          <div className="container p-top">
            <div className="row align-items-center">
              <div className="col-12 col-lg-6 row align-items-center">
                <div>
                  <div className="col-12 text-center text-lg-start">
                    <h1 className="fw-bold fs-45">Our Expert Chef</h1>
                  </div>
                  <div className="col-12 text-center text-lg-start">
                    <p className="fs-25">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                      non neque elit. Sed ut tellus ac neque fermentum tristique.
                      Donec sed facilisis tellus, a vulputate turpis. Duis eget
                      turpis non tellus tincidunt fermentum.
                    </p>
                  </div>
                </div>
                <div className="mt-3 col-12 mb-5">
                  <div className="row">
                    <div className="menu-button">
                      <button className="btn btn-dark text-white radius-theme box-shadow w-100">
                        Menu
                      </button>
                    </div>
                    <div className="book-a-table">
                      <button className="btn btn-dark text-white radius-theme box-shadow theme w-100">
                        Book a table
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12 col-lg-6">
                <div className="col-12 text-center">
                  <img
                    src="/src/assets/images/chef.png"
                    alt=""
                    className="chef-div img-fluid w-100"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="" style={{ backgroundColor: "#F3F3F4" }}>
          <div className="container david-font p-top">
            <div className="col-12 text-center">
              <h1>Our Happy Customers</h1>
            </div>
            <div className="col-12">
              <p className="text-center">
                At Our Restaurant, we strive to provide the best dining experience
                possible. Our loyal customers have been satisfied with our
                culinary skills, service, and overall ambiance. Our positive
                feedback has helped us continuously improve our dining experience.
                If you're a loyal customer, we'd love to hear from you!
              </p>
            </div>

            <div className="col-12">
              <Slider {...settings}>
                {reviews?.map((testimonial, index) => (
                  <div key={index} className="testi-slide">
                    <div
                      className={`testi-div p-4 ${index === currentSlide ? "testi-theme" : ""
                        }`}
                      style={{
                        backgroundColor:
                          index === currentSlide ? "#f0f8ff" : "#fff", // Light blue background for the active card
                        borderRadius: "12px", // Rounded corners
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Lighter shadow for premium feel
                        padding: "16px", // Reduced padding for smaller card height
                        transition:
                          "transform 0.3s ease-in-out, background-color 0.3s ease", // Smooth hover effect and background color transition
                        maxWidth: "100%", // Ensure card size is responsive
                        margin: "10px", // Add margin between cards
                        cursor: "pointer", // Indicating that it's interactive
                        transform: "scale(1)", // Default scale
                        minHeight: "250px", // Set the minHeight to 250px for further reduction
                        display: "flex",
                        flexDirection: "column", // Flexbox to manage content alignment
                        justifyContent: "space-between", // Space out elements evenly
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.transform = "scale(1.05)")
                      } // Hover effect
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.transform = "scale(1)")
                      } // Revert hover effect
                    >
                      <div className="row">
                        <div className="col-2">
                          <img
                            src="/src/assets/images/user.png"
                            alt={testimonial?.name}
                            style={{
                              objectFit: "cover",
                              width: "40px", // Adjusted image size
                              height: "40px", // Adjusted image size
                              borderRadius: "50%",
                              border: "2px solid #ddd", // Premium border around the image
                            }}
                          />
                        </div>
                        <div className="col-10">
                          <h3
                            className="fs-20 p-0 m-0 ms-4"
                            style={{
                              fontSize: "16px", // Slightly smaller font size for name
                              fontWeight: "600",
                              color: "#333",
                              marginBottom: "4px", // Reduced margin
                            }}
                          >
                            {testimonial?.name}
                          </h3>
                          <div className="text-warning text-center mt-0 m-0">
                            {[...Array(5)].map((star, i) => {
                              const isFilled =
                                i < Math.floor(testimonial?.rating);
                              return (
                                <i
                                  key={i}
                                  className={`bi ${isFilled ? "bi-star-fill" : "bi-star"
                                    }`}
                                  style={{
                                    fontSize: "14px", // Reduced star size
                                    color: isFilled ? "#FFD700" : "#ddd",
                                    transition: "color 0.3s ease", // Smooth color transition for stars
                                  }}
                                ></i>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                      <div className="col-12 mt-3">
                        <p
                          style={{
                            maxHeight: "60px", // Shortened max height for the review text
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: 2, // Truncate after 2 lines
                            WebkitBoxOrient: "vertical",
                            fontSize: "14px", // Smaller font size for review text
                            color: "#555", // Slightly lighter text color
                            lineHeight: "1.4",
                            fontFamily: '"Roboto", sans-serif', // Modern font for better readability
                            fontWeight: "400",
                          }}
                        >
                          {testimonial?.review}
                        </p>
                      </div>
                      <div className="col-12 mt-2">
                        <p
                          style={{
                            fontSize: "12px",
                            color: "#999",
                            fontStyle: "italic",
                            textAlign: "right", // Align date to the right for a clean look
                            marginTop: "4px",
                          }}
                        >
                          {formatDate(testimonial?.createdAt ?? "")}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
              <div className="text-center mt-3 mb-5">
                {/* <a href="/reviews" className="text-decoration-none text-theme2">
      View more <i className="bi bi-arrow-right"></i>
    </a> */}
              </div>
            </div>
            <div className="col-12">
              <div className="col-12 text-center mb-3">
                <button
                  className="btn btn-dark text-white radius-theme box-shadow theme mt-5"
                  onClick={() => setVisible(true)}
                >
                  Write Review
                </button>
              </div>
            </div>
          </div>
        </section>
        <Dialog
          header="Write a Review"
          visible={visible}
          onHide={() => {
            if (!visible) return;
            setVisible(false);
          }}
          style={{ width: "50vw" }}
          breakpoints={{ "960px": "75vw", "641px": "100vw" }}
        >
          <div className="container">
            <form onSubmit={handleReviewSubmit}>
              <div className="p-3 justify-content-center">
                <Rating
                  value={review.rating}
                  onChange={(e) => setReview({ ...review, rating: e.value })}
                  cancel={false}
                />
              </div>

              <div className="col-12">
                <InputText
                  keyfilter="text"
                  placeholder="Full Name"
                  className="w-100"
                  value={review.name}
                  name="name"
                  required
                  onChange={handleInputChange}
                />
              </div>

              {/* Description Input Field */}
              <div className="col-12 mt-3">
                <div className="card flex justify-content-center">
                  <InputTextarea
                    value={review.review} // Bind the description from state
                    onChange={handleInputChange} // Update description in state
                    rows={5}
                    cols={30}
                    name="review" // Important: use `name` for targeting in handleInputChange
                    placeholder="Write your review here..."
                  />
                </div>
              </div>

              <div className="col-12 mt-3">
                <div className="row">
                  <button type="submit" className="btn-theme2 btn theme radius">
                    Submit Review
                  </button>
                </div>
              </div>
            </form>
          </div>
        </Dialog>

        <ContactForm handleFormSubmit={handleFormSubmit} />

        <section className="h-auto david-font" id="contact">
          <div className="container p-top">
            <div className="col-12 newsletter position-relative">
              <img
                src="/src/assets/images/newsletter.png"
                alt=""
                className="w-100"
              />
              <div className="text-center newsletter-content position-absolute">
                <div className="d-none d-lg-block">
                  <h2 className="fs-45 mb-3 fw-bold text-white">
                    Create Your Own Business <br />
                    Subscribing To Our Newsletter
                  </h2>
                  <div className="row bg-white align-items-center input-div p-2">
                    <div className="col-lg-8">
                      <input
                        type="email"
                        placeholder="Enter Your Email"
                        style={{ border: "0 !important" }}
                        required
                        value={newsLetterEmail}
                        onChange={(e) =>
                          setNewsLetterEmail(e.target?.value?.trim())
                        }
                        className="form-control form-control-lg"
                      />
                    </div>
                    <div className="col-lg-4">
                      <button
                        onClick={handleNewsLetterSubmit}
                        className="btn theme btn-lg w-100"
                      >
                        Subscribe
                      </button>
                    </div>
                  </div>
                </div>

                <div className="d-block d-lg-none">
                  <h2 className="fs-16 fw-bold text-white">
                    Create Your Own Business <br />
                    Subscribing To Our Newsletter
                  </h2>
                  <div className="row">
                    <div className="col-12">
                      <input
                        type="email"
                        name="email"
                        style={{ border: "0 !important" }}
                        className="form-control form-control-sm"
                      />
                    </div>
                    <div className="col-12">
                      <button
                        type="button"
                        className="btn theme btn-sm mt-1 w-100"
                      >
                        Subscribe
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>}

      <footer className="h-auto">
        <div className="container pjs  p-top">
          <div className="mt-1">
            <div className="row">
              <div className="col-12 col-lg-3">
                <div className="col-12 d-block d-lg-flex text-center text-lg-start text mt-5">
                  <div className="nav-logo width-fit">
                    <img
                      src={
                        businessData?.logo && businessData?.logo.length > 0
                          ? businessData?.logo
                          : Placeholder
                      }
                      alt=""
                    />
                  </div>
                  <span className="ms-2 fs-30 text-white">
                    {businessData?.businessName}
                  </span>
                </div>
                <div
                  className="col-12 mt-4  text-center text-lg-start"
                  style={{ color: "#A4B3CB" }}
                >
                  <p>{businessData?.description}</p>
                </div>
              </div>

              <div className="col-12 col-lg-2">
                <div className="col-12 mt-5">
                  <div className="col-12 mt-3 mb-3 text-center text-lg-start">
                    <a
                      href="#"
                      className=" fs-14 text-decoration-none text-orange"
                    >
                      NAVIGATION
                    </a>
                  </div>
                  <div className="col-12 mt-3 mb-3  text-center text-lg-start">
                    <a
                      href="#"
                      className="fs-14 text-decoration-none"
                      style={{ color: "#A4B3CB" }}
                    >
                      Menu
                    </a>
                  </div>
                  <div className="col-12 mt-3 mb-3  text-center text-lg-start">
                    <a
                      href="#"
                      className="fs-14 text-decoration-none"
                      style={{ color: "#A4B3CB" }}
                    >
                      About Us
                    </a>
                  </div>
                  <div className="col-12 mt-3 mb-3  text-center text-lg-start">
                    <a
                      href="#"
                      className="fs-14 text-decoration-none"
                      style={{ color: "#A4B3CB" }}
                    >
                      Contact Us
                    </a>
                  </div>
                  <div className="col-12 mt-3 mb-3  text-center text-lg-start">
                    <a
                      href="#"
                      className="fs-14 text-decoration-none"
                      style={{ color: "#A4B3CB" }}
                    >
                      Main Dishes
                    </a>
                  </div>
                </div>
              </div>

              <div className="col-4">
                <div className="row mt-5">
                  <div className="col-lg-6">
                    <div className="col-12">
                      <div className="col-12 mb-3 text-center text-lg-start">
                        <a
                          href="#"
                          className=" fs-14 text-decoration-none text-orange"
                        >
                          OPENING HOURS
                        </a>
                      </div>
                      <div
                        className="mt-3 text-center text-lg-start"
                        style={{ color: "#A4B3CB" }}
                      >
                        {businessData?.businessTiming?.workingDays?.map(
                          (day, index) => (
                            <p key={index}>{day}</p>
                          )
                        )}
                      </div>
                      <div
                        className="mt-3 text-center text-lg-start"
                        style={{ color: "#A4B3CB" }}
                      >
                        <span>8:00 am to 9:00 pm</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-3">
                <div className="col-12 mt-5">
                  <div className="col-12 mt-3 mb-3 text-center text-lg-start">
                    <a
                      href="#"
                      className=" fs-14 text-decoration-none text-orange"
                    >
                      FOLLOW US
                    </a>
                  </div>

                  <div className="mt-5 col-12 row gap-3 jcc-md text-center text-lg-start">
                    <a
                      href={
                        businessData?.socialMediaLinks?.length &&
                        businessData?.socialMediaLinks[0]?.link
                      }
                      className="contact-banner text-orange text-center text-lg-start"
                    >
                      <i className="bi bi-facebook text-orange"></i>
                    </a>
                    <a
                      href={
                        businessData?.socialMediaLinks?.length &&
                        businessData?.socialMediaLinks[1]?.link
                      }
                      className="contact-banner text-center text-lg-start"
                    >
                      <i className="bi bi-instagram text-orange"></i>
                    </a>
                    <a
                      href={
                        businessData?.socialMediaLinks?.length &&
                        businessData?.socialMediaLinks[2]?.link
                      }
                      className="contact-banner text-center text-lg-start"
                    >
                      <i className="bi bi-twitter text-orange"></i>
                    </a>
                    {/* <hr style={{width:"fit-content",opacity: 0.15,}}></hr> */}
                  </div>
                </div>
              </div>
              <div className="col-12">
                <hr style={{ width: "100%", opacity: 0.25, color: "white" }} />
                <div className="footer-bottom">
                  <div className="row w-full justify-content-between">
                    <div className="col-sm-4 text-left">
                      <a href={`/terms-and-conditions/${id}`}>
                        Terms and Conditions
                      </a>
                    </div>
                    <div className="col-sm-4 text-right">
                      <div style={{ color: "#A4B3CB" }} className="text-right">
                        <span>
                          Copyright &copy;
                          {new Date().getFullYear()} In Connect. All Rights
                          Reserved
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <a href="#" class="btn btn-lg btn-bottom btn-lg-square back-to-top"><i class="bi bi-arrow-up"></i></a>
    </>
  );
}
