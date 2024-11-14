import React, { useEffect, useState } from 'react'
import { FaStar } from 'react-icons/fa'
import Layout from '../components/Layout'
import { Carousel } from 'react-bootstrap' // Import Carousel component
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import './Home.css'
import Placeholder from '../assets/images/placeholder.jpg'

import {
  createReveiw,
  fetchBanners,
  fetchBusiness,
  fetchCategories,
  getAllReviews,
} from '../Functions/functions'
import Loader from '../components/Loader/Loader'
import { InputTextarea } from 'primereact/inputtextarea'
import { InputText } from 'primereact/inputtext'
import { Rating } from 'primereact/rating'
import { Dialog } from 'primereact/dialog'
import { formatDate } from '../utils/app.utils'
import LocationAutocomplete from '../components/LocationAutoComplete'

export default function Home() {
  const navigate = useNavigate()
  const [currentSlide, setCurrentSlide] = useState(0)
  const settings = {
    centerMode: true,
    centerPadding: '50px',
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
  }

  const [location, setLocation] = useState({
    lat: '',
    lon: '',
  })

  const [categoryData, setCategoryData] = useState([])
  const [bannerData, setBannerData] = useState([])
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [businessData, setBusinessData] = useState([])
  const [searchData, setSearchData] = useState('')
  const [totalBusinessData, setTotalBusinessData] = useState(0)
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [visible, setVisible] = useState(false)
  const [isReviewed, setIsReviewed] = useState(false)
  const [reviews, setReviews] = useState([])
  const [visibleCategories, setVisibleCategories] = useState(20)
  const [visibleBusiness, setVisibleBusiness] = useState(10)
  const [review, setReview] = useState([
    {
      rating: '',
      name: '',
      review: '',
    },
  ])

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getAllReviews({ page, limit })

        setReviews(data?.data?.data)
      } catch (error) {
        toast.error(
          error?.response?.data?.message ??
            'An error occurred. Please try again.',
          {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: 'colored',
            style: {
              backgroundColor: '#e74c3c', // Custom red color for error
              color: '#FFFFFF', // White text
            },
          },
        )
      }
    }
    fetchReviews()
  }, [isReviewed])

  const handleReviewSubmit = async () => {
    try {
      if (!review?.name?.trim()?.length) {
        toast.warning('Please enter your name!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'colored',
          style: {
            backgroundColor: '#d2e500', // Custom red color for error
            color: '#FFFFFF', // White text
          },
        })
      } else {
        await createReveiw(review)
        setVisible(false)
        setIsReviewed(!isReviewed)
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ??
          'An error occurred. Please try again.',
        {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'colored',
          style: {
            backgroundColor: '#e74c3c', // Custom red color for error
            color: '#FFFFFF', // White text
          },
        },
      )
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const businessDetails = await fetchBusiness(
          currentPage,
          visibleBusiness,
          '',
          location,
        )

        const categoryDetails = await fetchCategories(visibleCategories)

        setCategoryData(categoryDetails.data.data)
        setBusinessData(businessDetails.data.data)

        setTotalBusinessData(businessDetails.data.totalCount)
      } catch (error) {
        setLoading(false)
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [visibleBusiness, visibleCategories, location])

  useEffect(() => {
    const fetchBanner = async () => {
      const data = await fetchBanners()
      setBannerData(data?.data)
    }
    fetchBanner()
  }, [])

  const loadMoreCategories = () => {
    setVisibleCategories((prev) => prev + 20)
  }

  const loadMoreBusiness = () => {
    setVisibleBusiness((prev) => prev + 10)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setReview((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const getSearchData = async () => {
    try {
      setLoading(true)
      const businessDetails = await fetchBusiness(
        currentPage,
        visibleBusiness,
        searchData,
        location,
      )
      setBusinessData(businessDetails.data.data)
      window.location.href = '/#business'
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout title="Home" navClass="home">
      <div id="#home" className="h-100vh">
        <div className="h-100 bg-red">
          <div className="border-1 surface-border border-round text-center h-100">
            <Carousel className="banner-slick h-100">
              {bannerData && bannerData.length > 0 ? (
                bannerData?.map((banner) => (
                  <Carousel.Item key={`key-${banner?._id}`} className=" h-100">
                    <img
                      className="d-block w-100"
                      src={
                        banner?.image && banner?.image.length > 0
                          ? banner?.image
                          : Placeholder
                      } // Use banner image or fallback
                      alt="First slide"
                      style={{
                        objectFit: 'cover',
                        height: '100%',
                        filter: 'brightness(0.3)',
                      }}
                    />
                  </Carousel.Item>
                ))
              ) : (
                <Carousel.Item className=" h-100">
                  <img
                    className="d-block w-100"
                    src="/src/assets/images/1.jpg"
                    alt="First slide"
                    style={{
                      objectFit: 'cover',
                      height: '100%',
                      filter: 'brightness(0.3)',
                    }}
                  />
                </Carousel.Item>
              )}
            </Carousel>
          </div>
        </div>
        <div className="search-bar-div position-absolute">
          <div className="container">
            <div className="row banner-main-div">
              <div
                className="col-12 col-md-6 banner-head-text"
                style={{ textAlign: 'left' }}
              >
                <h1
                  className="head-line fw-bold text-start"
                  data-aos="fade-right"
                >
                  In<span className="text-theme2">Connect</span> <br />
                  Your Digital Platform for Growing Your Business
                </h1>
                <p
                  className="text-white"
                  data-aos="zoom-in"
                  style={{ textAlign: 'left' }}
                >
                  InConnect is your one-stop platform to create, showcase, and
                  share your business online. Get a personalized NFC card to
                  connect with clients instantly, boost referrals, and expand
                  your reach. Build a professional online presence effortlessly
                  with subscription-based tools. Connect and grow with
                  InConnect!
                </p>
              </div>

              <div
                className=" row search-div text-end col-12 col-md-6"
                style={{ display: 'ruby' }}
              >
                {/* Location Input with Crosshair Icon */}
                <LocationAutocomplete setLocation={setLocation} />

                {/* Search Input with Search Icon */}
                <div className="col-12 col-md-9 mt-3">
                  <div
                    className="input-group banner-input-div"
                    style={{
                      border: '1px solid #ced4da',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      background: 'none',
                    }}
                  >
                    <span
                      className="input-group-text"
                      style={{
                        backgroundColor: 'white',
                        border: 'none',
                        padding: '0 12px',
                        display: 'flex',
                        alignItems: 'center',
                        color: 'white',
                        background: 'none',
                      }}
                    >
                      <i
                        className="bi bi-search fw-bold"
                        style={{ fontSize: '1.2em' }}
                      ></i>
                    </span>
                    <input
                      type="text"
                      className="form-control custom-placeholder"
                      placeholder="Search for Restaurants"
                      value={searchData}
                      onInput={(e) => setSearchData(e.target.value)}
                      style={{
                        border: 'none',
                        boxShadow: 'none',
                        paddingLeft: '0',
                        fontSize: '1em',
                        color: 'white',
                        background: 'none',
                      }}
                    />
                    <button
                      className="btn btn-md bg-theme"
                      style={{ border: 'none' }}
                      onClick={getSearchData}
                    >
                      Search
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section id="category" className=" bg-light h-auto" data-aos="fade-up">
        <div className="container" style={{ width: '90%' }}>
          <div className="mb-5 p-4">
            <h1
              className="text-center fw-bold mt-4"
              style={{ marginTop: '20px' }}
            >
              Discover Diverse Categories
            </h1>
            <p className="mt-3 text-center  ">
              Uncover a variety of services and experiences designed to cater to
              your every need. E xplore the finest options available and find
              exactly what you're looking for!
            </p>
          </div>
          <div className="mb-5 mt-2" id="category">
            <div className="home-category-div">
              {loading && <Loader />}
              {!loading &&
                categoryData.map((category) => (
                  <Link
                    className="cat-div text-decoration-none"
                    data-aos="zoom-in"
                    to={`/business/${category._id}`} // Dynamically generate the URL with the category ID
                    key={category._id} // Unique key for each category
                  >
                    <img
                      src={
                        category.image && category.image.length > 0
                          ? category.image
                          : Placeholder
                      }
                      alt={category.name}
                      className="cat-img"
                    />
                    {category.name}
                  </Link>
                ))}
            </div>
            {visibleCategories <= categoryData.length && ( // Check if more categories are available
              <div className="mb-3 mt-5 text-center">
                <button
                  onClick={loadMoreCategories}
                  className="btn btn-dark btn-md"
                >
                  View More <i className="bi bi-arrow-right"></i>
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
      <section className="home-spot h-auto mb-5">
        <div className="container padding" id="business">
          <div className="text-center mb-5">
            <h1 className="fw-bold" data-aos="fade-right">
              Discover the Top Businesses
            </h1>
            <p className="mt-3 text-center" data-aos="fade-left">
              Explore the most popular destinations in your area, highly rated
              by locals and visitors alike. Find out what makes these places
              stand out and start your next adventure right here!
            </p>
          </div>
          <div className="row justify-content-around gap-2">
            {loading && <Loader />}

            {!loading &&
              businessData.map((business) => (
<Link
  to={
    business.selectedPlan?.isPremium
      ? `/template/premium/${business?._id}`
      : `/template/${business?._id}`
  }
  key={business._id}
  className="text-decoration-none text-dark col-12 col-md-5 b-theme location-card mt-3 business-card"
>
  <div className="row p-2" style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
    <div className="col-4 p-0">
      <img
        src={business?.logo && business?.logo?.length > 0 ? business?.logo : Placeholder}
        alt=""
        className="w-100 br-theme"
        style={{ objectFit: 'cover' }} // Ensure image is responsive
      />
    </div>
    <div className="col-8" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
      <div className="col-12 mb-2 mt-2">
        <h2 style={{
          fontSize: '28px',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}>
          {business?.businessName}
        </h2>
      </div>
      <div className="col-12">
        <span>{business?.category?.name}</span>
      </div>
      <div className="col-12 mt-3" style={{
        display: '-webkit-box',
        WebkitLineClamp: 3,  // Limit to 3 lines
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }}>
        <h3 className="fs-16">
          <i className="bi bi-crosshair"></i>
          <span className="ms-1 fs-15">
            {business?.address?.buildingName}, {" "}
            {business?.address?.city}, {" "}
            {business?.address?.landMark}, {" "}
            {business?.address?.streetName}, {" "}
            {business?.address?.state}
          </span>
        </h3>
      </div>

      {/* Rating Section (on the right side) */}
      <div className="col-12 mt-3 d-flex justify-content-end align-items-center">
        <div className="d-flex align-items-center" style={{
          backgroundColor: 'white', // White background
          borderRadius: '10px',
          padding: '5px 10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' // Subtle shadow for clean look
        }}>
          {/* Always show a yellow star */}
          <FaStar color="gold" size={20} />
          <span className="ms-2" style={{
            fontWeight: 'bold',
            fontSize: '16px',
            color: '#d48a27' // Dark gold color for the rating count
          }}>
            {business?.rating > 0 ? business?.rating : 0} {/* Show 0 if no rating */}
          </span>
        </div>
      </div>
    </div>
  </div>
</Link>

              ))}
          </div>
          {visibleBusiness < totalBusinessData && (
            <div className="mt-5 text-center mb-1">
              <button
                onClick={loadMoreBusiness}
                className="btn btn-dark btn-md"
              >
                View More <i className="bi bi-arrow-right"></i>
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="mt-3 bg-light">
        <div className="container" id="review">
          <div className="mt-3 mb-3">
            <h1 className="text-center p-3 pt-5 fw-bold " data-aos="zoom-out">
              What Our Customers Are Saying
            </h1>
            <p className="mt-3 text-center" data-aos="zoom-in">
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
                    className={`testi-div p-4 ${
                      index === currentSlide ? 'testi-theme' : ''
                    }`}
                    style={{
                      backgroundColor:
                        index === currentSlide ? '#f0f8ff' : '#fff', // Light blue background for the active card
                      borderRadius: '12px', // Rounded corners
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Lighter shadow for premium feel
                      padding: '16px', // Reduced padding for smaller card height
                      transition:
                        'transform 0.3s ease-in-out, background-color 0.3s ease', // Smooth hover effect and background color transition
                      maxWidth: '100%', // Ensure card size is responsive
                      margin: '10px', // Add margin between cards
                      cursor: 'pointer', // Indicating that it's interactive
                      transform: 'scale(1)', // Default scale
                      minHeight: '250px', // Set the minHeight to 250px for further reduction
                      display: 'flex',
                      flexDirection: 'column', // Flexbox to manage content alignment
                      justifyContent: 'space-between', // Space out elements evenly
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = 'scale(1.05)')
                    } // Hover effect
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = 'scale(1)')
                    } // Revert hover effect
                  >
                    <div className="row">
                      <div className="col-2">
                        <img
                          src="/src/assets/images/user.png"
                          alt={testimonial?.name}
                          style={{
                            objectFit: 'cover',
                            width: '40px', // Adjusted image size
                            height: '40px', // Adjusted image size
                            borderRadius: '50%',
                            border: '2px solid #ddd', // Premium border around the image
                          }}
                        />
                      </div>
                      <div className="col-10">
                        <h3
                          className="fs-20 p-0 m-0 ms-4"
                          style={{
                            fontSize: '16px', // Slightly smaller font size for name
                            fontWeight: '600',
                            color: '#333',
                            marginBottom: '4px', // Reduced margin
                          }}
                        >
                          {testimonial?.name}
                        </h3>
                        <div className="text-warning text-center mt-0 m-0">
                          {[...Array(5)].map((star, i) => {
                            const isFilled = i < Math.floor(testimonial?.rating)
                            return (
                              <i
                                key={i}
                                className={`bi ${
                                  isFilled ? 'bi-star-fill' : 'bi-star'
                                }`}
                                style={{
                                  fontSize: '14px', // Reduced star size
                                  color: isFilled ? '#FFD700' : '#ddd',
                                  transition: 'color 0.3s ease', // Smooth color transition for stars
                                }}
                              ></i>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                    <div className="col-12 mt-3">
                      <p
                        style={{
                          maxHeight: '60px', // Shortened max height for the review text
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 2, // Truncate after 2 lines
                          WebkitBoxOrient: 'vertical',
                          fontSize: '14px', // Smaller font size for review text
                          color: '#555', // Slightly lighter text color
                          lineHeight: '1.4',
                          fontFamily: '"Roboto", sans-serif', // Modern font for better readability
                          fontWeight: '400',
                        }}
                      >
                        {testimonial?.review}
                      </p>
                    </div>
                    <div className="col-12 mt-2">
                      <p
                        style={{
                          fontSize: '12px',
                          color: '#999',
                          fontStyle: 'italic',
                          textAlign: 'right', // Align date to the right for a clean look
                          marginTop: '4px',
                        }}
                      >
                        {formatDate(testimonial?.createdAt ?? '')}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
            <div className="text-center mt-5 mb-5">
              <a
                onClick={() => navigate('/reviews')}
                className="btn btn-dark btn-md text-decoration-none text-theme2"
              >
                View more <i className="bi bi-arrow-right"></i>
              </a>
            </div>
          </div>
        </div>
      </section>
      <Dialog
        header="Write a Review"
        visible={visible}
        onHide={() => {
          if (!visible) return
          setVisible(false)
        }}
        style={{ width: '50vw' }}
        breakpoints={{ '960px': '75vw', '641px': '100vw' }}
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
              required
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
      <footer className=" h-auto footer-section">
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
                  onClick={() => navigate('/create-business')}
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
                  InConnect
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
                          <i className="bi bi-telephone text-white me-1"></i>{' '}
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

          <div className="footer-bottom p-4">
            <div className="row w-full justify-content-between">
              <div className="col-sm-4 text-left">
                <a href={`/terms-and-conditions`}>Terms and Conditions</a>
              </div>
              <div className="col-sm-4 text-right">
                <div style={{ color: '#A4B3CB' }} className="text-right">
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
  )
}
