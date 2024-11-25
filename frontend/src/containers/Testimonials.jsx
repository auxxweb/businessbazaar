import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { InputTextarea } from "primereact/inputtextarea";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import { toast } from 'react-toastify'
import { getAllReviews } from '../Functions/functions';
import { formatDate } from '../utils/app.utils'
import Rating from '@mui/material/Rating';


export default function Testimonials() {
    const [visible,setVisible] = useState(false);
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)
    const [reviewLoading, setReviewLoading] = useState(false);
    const [businessData, setBusinessData] = useState(null);
    const [review, setReview] = useState([
      {
        rating: "",
        name: "",
        description: "",
      },
    ]);

    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
    const [reviews, setReviews] = useState([])
    const [isReviewed, setIsReviewed] = useState(false)
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setReview((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      };
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

      const handleReviewSubmit = (e) => {
        e.preventDefault();
        console.log(review, "review");
        setReviewLoading(true)
    
        createBusinessReview({
          ...review,
          businessId: id,
        }).then((response) => {
          setReviewLoading(false)
          setReview({
            rating: "",
            name: "",
            review: "",
          })
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
        }).catch((err) => {
          setReview({
            rating: "",
            name: "",
            review: "",
          })
          setReviewLoading(false)
          console.log(err.message);
        })
      };
      
  return (
    <Layout title="Reviews" navClass='home'>
    <section className="d-block bg-light">
        <div className="col-12 h-50-vh"><img src="/src/assets/images/testi-banner.jpg" alt="" className='w-100 h-100' style={{objectFit:'cover',filter:"brightness(0.5)"}}/></div>
        <div className="container d-block" id="review">
          <div className="mt-3 mb-3">
            <h1 className="text-center p-3 pt-5 fw-bold " data-aos="zoom-out">
             Review
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
          {reviews?.map((testimonial, index) => (
                <div data-aos="zoom-out" key={index} className="testi-slide col-12 col-md-6" style={{borderBottom:"0.5px solid #cdcdcd",marginInline:"auto"}}>
                  <div
                    className={`testi-div p-5 `}
                  >
                    <div className="row ">
                      <div className="col-2">
                        <img
                          src="/src/assets/images/user.png"
                          alt={testimonial?.name}
                          style={{ objectFit: 'cover' }}
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
                            ),
                          )}
                          {testimonial?.rating % 1 !== 0 && (
                            <i className="bi bi-star-half"></i>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="w-100 mt-4">
                      <p className='w-100' style={{whiteSpace:'pre'}}>{testimonial?.review} </p>
                    </div>
                    <div className="col-12 mt-4">
                      <p>{formatDate(testimonial?.createdAt ?? '')}</p>
                    </div>
                  </div>
                </div>
              ))}
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

          style={{ minWidth: "50vw", borderRadius: '12px', overflow: "hidden" }}
          breakpoints={{ "960px": "75vw", "641px": "100vw" }}
        >
          <div className="container ">
            <form onSubmit={handleReviewSubmit}>
              <div className=" mb-3 d-flex justify-content-center">
                <Rating
                  name="simple-controlled"
                  value={review.rating}
                  color="warning"
                  onChange={(event, newValue) => {
                    setReview({ ...review, rating: newValue })
                  }}
                />
              </div>

              <div className="">
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
              <div className=" mt-3">
                <div className="w-100 d-flex justify-content-center">
                  <InputTextarea
                    value={review.review} // Bind the description from state
                    onChange={handleInputChange} // Update description in state
                    rows={5}
                    cols={30}
                    name="review" // Important: use `name` for targeting in handleInputChange
                    placeholder="Write your review here..."
                    className="w-100"
                  />
                </div>
              </div>

              <div className="col-12 mt-3 text-center">
                {reviewLoading ?
                  <div className="spinner-border" style={{ color: businessData?.theme }} role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div> : <button type="submit" className="btn-theme2 btn  theme radius  ">
                    Submit Review
                  </button>}
              </div>
            </form>
          </div>
        </Dialog>
      <footer className=" h-auto footer-section">
        <div className="container">
          <div className="p-4 mt-0 mt-md-5">
            <div className="row ">
              <div className="col-12 col-md-6">
                <h1 className="fs-45 text-white text-center text-md-start fw-bold">
                  Ready to Create Your Business
                </h1>
              </div>
              <div className="col-12 col-md-6 text-center text-md-end">
                <button className="btn btn-theme mt-3">Create Now</button>
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
                        Auxxweb@gmail.com
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

          <div className="p-4 mt-2">
            <div className="row text-white">
              <div className="col-12 text-center text-md-start col-md-2 mt-2">
                Cookie Policy
              </div>
              <div className="col-12 text-center text-md-start col-md-2 mt-2">
                Terms and Conditions
              </div>
            </div>
            <div className="text-secondary text-center text-md-start mt-5">
              <div className="fs-16">© 2024. All rights reserved</div>
            </div>
          </div>
        </div>
      </footer>
    </Layout>
  )
}
