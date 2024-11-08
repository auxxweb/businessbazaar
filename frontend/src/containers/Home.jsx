import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Carousel } from "react-bootstrap"; // Import Carousel component
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import ContactForm from "/src/components/Business/contactForm";

import {
  createReveiw,
  fetchBusiness,
  fetchCategories,
  fetchSearchCategory,
  getAllReviews,
} from "../Functions/functions";
import Loader from "../components/Loader";
import { InputTextarea } from "primereact/inputtextarea";
import { InputText } from "primereact/inputtext";
import { Rating } from "primereact/rating";
import { Dialog } from "primereact/dialog";
import ContactSection from "/src/components/Business/ContactSection";
import { formatDate } from "../utils/app.utils";

export default function Home() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const settings = {
    centerMode: true,
    centerPadding: "50px",
    slidesToShow: 3,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    infinite: true,
    speed: 500,
    afterChange: (current) => setCurrentSlide(current),
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerMode: false,
        },
      },
    ],
  };
  const [categoryData, setCategoryData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [businessData, setBusinessData] = useState([]);
  const [searchData, setSearchData] = useState("");
  const [totalBusinessData, setTotalBusinessData] = useState(0);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [visible, setVisible] = useState(false);
  const [isReviewed, setIsReviewed] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [review, setReview] = useState([
    {
      rating: "",
      name: "",
      review: "",
    },
  ]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getAllReviews({ page, limit });
        console.log(data?.data?.data, "dataaaaa-a-a--a-a-");

        setReviews(data?.data?.data);
      } catch (error) {
        toast.error(
          error?.response?.data?.message ??
            "An error occurred. Please try again.",
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
            style: {
              backgroundColor: "#e74c3c", // Custom red color for error
              color: "#FFFFFF", // White text
            },
          }
        );
      }
    };
    fetchReviews();
  }, [isReviewed]);

  const handleReviewSubmit = async () => {
    try {
      await createReveiw(review);
      setVisible(false);
      setIsReviewed(!isReviewed);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ??
          "An error occurred. Please try again.",
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
          style: {
            backgroundColor: "#e74c3c", // Custom red color for error
            color: "#FFFFFF", // White text
          },
        }
      );
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const businessDetails = await fetchBusiness(currentPage);
        const categoryDetails = await fetchCategories();

        setCategoryData(categoryDetails.data.data);
        setBusinessData(businessDetails.data.data);

        setTotalBusinessData(businessDetails.data.totalCount);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  async function searchHandler() {
    try {
      console.log(searchData);
      const searchValue = await fetchSearchCategory(searchData);
      console.log(searchValue);
      setCategoryData(searchValue.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  // const testimonials = [
  //   {
  //     name: 'Brett Heimann',
  //     company: 'MarketingAgency.com',
  //     text:
  //       'Great service, great communication, great finished product. will continue to use for our business.',
  //     img: '/src/assets/images/testi.jpg',
  //   },
  //   {
  //     name: 'John Doe',
  //     company: 'TechSolutions',
  //     text:
  //       'Amazing experience. The team is very professional and delivers on time.',
  //     img: '/src/assets/images/testi.jpg',
  //   },
  //   {
  //     name: 'Jane Smith',
  //     company: 'DesignCo',
  //     text: 'Very satisfied with the quality of work. Highly recommend.',
  //     img: '/src/assets/images/testi.jpg',
  //   },
  //   {
  //     name: 'Alice Brown',
  //     company: 'CreativeAgency',
  //     text:
  //       'Exceptional service and support. They really understand our needs.',
  //     img: '/src/assets/images/testi.jpg',
  //   },
  // ]

  const itemsPerPage = 6;

  const totalPages = Math.ceil(totalBusinessData / itemsPerPage);
  const goToPreviousPage = async () => {
    if (currentPage > 1) {
      try {
        setLoading(true);
        const newPage = currentPage - 1;
        setCurrentPage(newPage);

        const businessDetails = await fetchBusiness(newPage);
        setBusinessData(businessDetails.data.data);
        setTotalBusinessData(businessDetails.data.totalCount);
      } catch (err) {
        console.log("Failed to fetch business");
      } finally {
        setLoading(false);
      }
    }
  };

  const goToNextPage = async () => {
    if (currentPage < totalPages) {
      try {
        setLoading(true);
        const newPage = currentPage + 1;
        setCurrentPage(newPage);

        const businessDetails = await fetchBusiness(newPage);
        setBusinessData(businessDetails.data.data);
        setTotalBusinessData(businessDetails.data.totalCount);
      } catch (err) {
        console.log("Failed to fetch business");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReview((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // if (loading) {
  //     return <Loader />
  // }

  return (
    <Layout title="Home" navClass="home">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="row justify-content-between">
              {/* Location Input with Crosshair Icon */}
              <div className="col-12 mt-3 col-md-4">
                <div className="input-group">
                  <span
                    className="input-group-text"
                    style={{
                      backgroundColor: "white",
                      borderTopLeftRadius: "50px",
                      borderBottomLeftRadius: "50px",
                      border: "1px solid #ced4da",
                      color: "#105193",
                    }}
                  >
                    <i className="bi bi-crosshair2"></i>{" "}
                    {/* Use an alternative location icon */}
                  </span>
                  <input
                    type="text"
                    className="form-control custom-placeholder"
                    placeholder="location"
                    style={{
                      borderTopRightRadius: "50px",
                      borderBottomRightRadius: "50px",
                      borderLeft: "none",
                      color: "#E5F0FD",
                    }}
                  />
                </div>
              </div>

              {/* Search Input */}
              <div className="col-12 mt-3 col-md-8">
                <div className="input-group">
                  <span
                    className="input-group-text"
                    style={{
                      backgroundColor: "white",
                      borderTopLeftRadius: "50px",
                      borderBottomLeftRadius: "50px",
                      border: "1px solid #ced4da",
                    }}
                  >
                    <i className="bi bi-search fw-bold"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control custom-placeholder"
                    placeholder="Search for Restaurants"
                    value={searchData}
                    onInput={(e) => {
                      setSearchData(e.target.value);
                    }}
                    style={{
                      borderLeft: "none",
                    }}
                  />
                  <button
                    type="button"
                    onClick={searchHandler}
                    className="btn btn-theme text-white custom-button"
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* 
            </div>
          </div>
        </div>
      </div> */}

      <div id="#home">
        <div className="container">
          <div className="border-1 surface-border border-round m-2 text-center py-5 px-3">
            <Carousel className="banner-slick">
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="/src/assets/images/1.jpg"
                  alt="First slide"
                  style={{ objectFit: "cover", height: "400px" }}
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="/src/assets/images/2.jpg"
                  alt="Second slide"
                  style={{ objectFit: "cover", height: "400px" }}
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="/src/assets/images/3.jpg"
                  alt="Third slide"
                  style={{ objectFit: "cover", height: "400px" }}
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="/src/assets/images/4.jpg"
                  alt="Fourth slide"
                  style={{ objectFit: "cover", height: "400px" }}
                />
              </Carousel.Item>
            </Carousel>
          </div>
        </div>
      </div>

      <section className="mt-4 bg-light h-auto">
        <div className="container" style={{ width: "90%" }}>
          <div className="mb-5 p-4">
            <h1
              className="text-center fw-bold mt-4"
              style={{ marginTop: "20px" }}
            >
              Discover Diverse Categories
            </h1>
            <p className="mt-3 text-center  ">
              Uncover a variety of services and experiences designed to cater to
              your every need. E xplore the finest options available and find
              exactly what you're looking for!
            </p>
          </div>
          <div className="mb-2 mt-2" id="category">
            <div className="row justify-content-center">
              {categoryData.map((category) => (
                <Link
                  className="cat-div text-decoration-none"
                  to={`/business/${category._id}`} // Dynamically generate the URL with the category ID
                  key={category._id} // Add a unique key for each category
                >
                  <div className="cat-img">
                    <img src={category.image} alt={category.name} />{" "}
                    {/* Dynamically render category image */}
                  </div>
                  <div className="text-center">
                    <p>{category.name}</p>{" "}
                    {/* Dynamically render category name */}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="home-spot h-auto mb-5">
        <div className="container padding" id="business">
          <div className="text-center mb-5">
            <h1 className="fw-bold">Discover the Top Businesses</h1>
            <p className="mt-3 text-center">
              Explore the most popular destinations in your area, highly rated
              by locals and visitors alike. Find out what makes these places
              stand out and start your next adventure right here!
            </p>
          </div>
          <div className="row justify-content-around gap-2">
            {loading && <Loader />}

            {!loading &&
              businessData?.map((business) => (
                <Link
                  to={`/template/${business?._id}`}
                  key={business._id}
                  className="text-decoration-none text-dark col-12 col-md-5 b-theme location-card mt-3"
                >
                  <div className="row p-2">
                    <div className="col-4 p-0">
                      <img
                        src={business?.logo ?? placeholder}
                        alt=""
                        className="w-100 br-theme"
                      />
                    </div>
                    <div className="col-8">
                      <div className="col-12 mb-2 mt-2">
                        <h2 style={{ fontSize: "28px" }}>
                          {business.businessName}
                        </h2>
                      </div>
                      <div className="col-12">
                        <span className="p-1 bg-success text-white pe-2 ps-2">
                          4.5 <i className="bi bi-star ms-2 text-white"></i>
                        </span>
                        <span className="ms-2 fs-12">3.5k reviews</span>
                      </div>
                      <div className="col-12 mt-3">
                        <h3 className="fs-16">
                          <i className="bi bi-crosshair"></i>
                          <span className="ms-1 fs-15">
                            {business.address.buildingName},{" "}
                            {business.address.city}, {business.address.landMark}
                            , {business.address.streetName},{" "}
                            {business.address.state}
                          </span>
                        </h3>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>

          {/* Pagination Controls */}
          <div className="d-flex justify-content-center align-items-center mt-4">
            <button
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className="btn btn-primary me-2"
              style={{
                borderTopLeftRadius: "50px",
                borderBottomLeftRadius: "50px",
                border: "none",
                color: "#E5F0FD",
                backgroundColor: "#105193",
              }}
            >
              Prev.
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className="btn btn-primary ms-2"
              style={{
                borderTopRightRadius: "50px",
                borderBottomRightRadius: "50px",
                border: "none",
                color: "#E5F0FD",
                backgroundColor: "#105193",
              }}
            >
              Next
            </button>
          </div>
        </div>
      </section>
      <div />
      <section className="mb-5 mt-3 bg-light">
        <div className="container" id="review">
          <div className="mt-3 mb-3">
            <h1 className="text-center fw-bold ">
              What Our Customers Are Saying
            </h1>
            <p className="mt-3 text-center">
              Hear from those who have experienced our services firsthand. Read
              their stories and see why we’re a trusted choice for so many.
              Their feedback is a testament to our commitment to excellence!
            </p>
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

          <div className="col-12">
            <Slider {...settings}>
              {reviews?.map((testimonial, index) => (
                <div key={index} className="testi-slide">
                  <div
                    className={`testi-div p-5 ${
                      index === currentSlide ? "testi-theme" : ""
                    }`}
                  >
                    <div className="row ">
                      <div className="col-2">
                        <img
                          src="/src/assets/images/user.png"
                          alt={testimonial?.name}
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                      <div className="col-10">
                        <h3 className="fs-20 p-0 m-0 ms-4">
                          {testimonial?.name}
                        </h3>
                        <div className="text-warning text-center mt-0 m-0">
                          {[...Array(Math.floor(testimonial?.rating))].map(
                            (star, i) => (
                              <i key={i} className="bi bi-star-fill"></i>
                            )
                          )}
                          {testimonial?.rating % 1 !== 0 && (
                            <i className="bi bi-star-half"></i>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="col-12 mt-4">
                      <p>{testimonial?.review}</p>
                    </div>
                    <div className="col-12 mt-4">
                      <p>{formatDate(testimonial?.createdAt ?? "")}</p>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
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
              onChange={handleInputChange}
            />
          </div>

          <div className="col-12 mt-3">
            <div className="card flex justify-content-center">
              <InputTextarea
                value={review.description}
                onChange={handleInputChange}
                rows={5}
                cols={30}
                name="review"
                placeholder="Write your review here..."
              />
            </div>
          </div>
          <div className="col-12 mt-3">
            <div className="row">
              <button
                onClick={handleReviewSubmit}
                className="btn-dark btn theme radius"
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
      </Dialog>
      <ContactForm></ContactForm>
      <footer className="mt-3 h-auto footer-section">
        <div className="container">
          <div className="p-4 mt-0 mt-md-5 pt-5">
            <div className="row ">
              <div className="col-12 col-md-6">
                <h1 className="fs-45 text-white text-center text-md-start fw-bold">
                  Ready to Create Your Business
                </h1>
              </div>
              <div className="col-12 col-md-6 text-center text-md-end">
                <button
                  className="btn btn-theme mt-3"
                  onClick={() => navigate("/create-business")}
                >
                  Create Now
                </button>
              </div>
            </div>
          </div>
          <hr className="bg-white" />
          <div className="p-4 mt-5 pt-0 pt-md-5">
            <div className="row ">
              <div className="col-12 col-md-6">
                <h1 className="fs-45 text-white text-center text-md-start fw-bold mb-3">
                  Business Bazaar
                </h1>
                <span className="fs-20 text-white text-center text-md-start">
                  where requirements are found
                </span>
              </div>
              <div className="col-12 col-md-6">
                <div className="row ">
                  <div className="col-12 col-md-6 text-start usefull-links">
                    <h3 className="text-white mb-3 fs-20 fw-bold text-center text-md-start mt-3 mt-md-0">
                      Useful Links
                    </h3>
                    <div className="col-12 mb-3 text-center text-md-start">
                      <a href="" className="fs-20 text-white">
                        About Me
                      </a>
                    </div>
                    <div className="col-12 mb-3 text-center text-md-start">
                      <a href="" className="fs-20 text-white">
                        Services
                      </a>
                    </div>
                    <div className="col-12 mb-3 text-center text-md-start">
                      <a href="" className="fs-20 text-white">
                        Portfolio
                      </a>
                    </div>
                  </div>

                  <div className="col-12 col-md-6 text-start">
                    <h3 className="text-white mb-3 fs-20 fw-bold text-center text-md-start">
                      Contact Info
                    </h3>
                    <div className="col-12 mb-3 text-center text-md-start">
                      <a href="" className="fs-16 text-white">
                        inconnect@gmail.com
                      </a>
                    </div>
                    <div className="col-12 mb-3 text-center text-md-start">
                      <a
                        href=""
                        className=" fs-20 text-decoration-none text-white"
                      >
                        <span>
                          <i className="bi bi-telephone text-white me-1"></i>{" "}
                          +91 7994085695
                        </span>
                      </a>
                    </div>
                    <div className="col-12 mb-3 text-center text-md-start">
                      <a href="" className="fs-20 text-white">
                        <span>
                          <i className="bi bi-geo-alt-fill text-white me-1"></i>
                          Calicut
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="footer-bottom p-4">
            <div class="row w-full justify-content-between">
              <div class="col-sm-4 text-left">
                <a href={`/terms-and-conditions/${businessData?._id}`}>
                  Terms and Conditions
                </a>
              </div>
              <div class="col-sm-4 text-right">
                <div style={{ color: "#A4B3CB" }} class="text-right">
                  <span>
                    Copyright &copy;
                    {new Date().getFullYear()} In Connect. All Rights Reserved
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </Layout>
  );
}
