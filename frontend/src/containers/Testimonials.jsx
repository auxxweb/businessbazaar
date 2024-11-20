import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { InputTextarea } from "primereact/inputtextarea";
import { InputText } from "primereact/inputtext";
import { Rating } from "primereact/rating";
import { Dialog } from "primereact/dialog";
import { toast } from 'react-toastify'
import { getAllReviews } from '../Functions/functions';
import { formatDate } from '../utils/app.utils'

export default function Testimonials() {
    const [visible,setVisible] = useState(false);
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)
    const [review, setReview] = useState([
      {
        rating: "",
        name: "",
        description: "",
      },
    ]);
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
      
  return (
    <Layout title="Reviews" navClass='home'>
    
    <section className="d-block bg-light">
        <div className="col-12 h-50-vh"><img src="/src/assets/images/testi-banner.jpg" alt="" className='w-100 h-100' style={{objectFit:'cover',filter:"brightness(0.5)"}}/></div>
        <div className="container d-block" id="review">
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
                name="description"
                placeholder="Write your review here..."
              />
            </div>
          </div>
          <div className="col-12 mt-3">
            <div className="row">
              <button className="btn-dark btn theme radius">
                Submit Review
              </button>
            </div>
          </div>
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
                      <a href="https://www.enconnect.in/" className="fs-20 text-white">
                        Go to Admin Panel
                      </a>
                    </div>
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
