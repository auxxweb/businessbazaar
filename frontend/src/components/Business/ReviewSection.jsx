/* eslint-disable react/prop-types */
import { useState } from "react";
import Slider from "react-slick";
import WriteReviewModal from "./WriteReviewModal";

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
const ReviewSection = ({ businessData }) => {
  const [visible, setVisible] = useState(false);

  return (
    <section className="" style={{ backgroundColor: "#F3F3F4" }}>
      <div className="container david-font p-top">
        <div className="col-12 text-center">
          <h1>Our Happy Customers</h1>
        </div>
        <div className="col-12">
          <p className="text-center">
            At Our Restaurant, we strive to provide the best dining experience
            possible. Our loyal customers have been satisfied with our culinary
            skills, service, and overall ambiance. Our positive feedback has
            helped us continuously improve our dining experience. If you&apos;re
            a loyal customer, we&apos;d love to hear from you!
          </p>
        </div>

        <div className="mt-5">
          <Slider {...settings3}>
            {businessData?.testimonial?.reviews.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white col-12 p-3 mt-2 test-div-bottom"
              >
                <div className="col-12 text-center test-button-img-div">
                  <img
                    src="/src/assets/images/user.png"
                    alt={testimonial?.name}
                    className="img-fluid"
                  />
                </div>

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

                <div className="col-12 mt-3">
                  <p>{testimonial?.review}</p>
                </div>

                <div className="col-12 text-center mb-5">
                  <span className="fw-bold david-font">
                    {testimonial?.name}
                  </span>
                </div>
              </div>
            ))}
          </Slider>
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
      <WriteReviewModal visible={visible} setVisible={setVisible} />
    </section>
  );
};

export default ReviewSection;
