/* eslint-disable react/prop-types */
import Slider from "react-slick";
const settings = {
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
const Gallery = ({ businessData }) => {
  return (
    <section
      className="h-auto david-font"
      style={{ backgroundColor: "#F3F3F4" }}
    >
      <div className="container p-top">
        <div className="col-12 mb-5" id="gallery">
          <div className="col-12 mb-5 mt-5">
            <h1 className="fw-bold text-center">Gallery</h1>
          </div>
          <Slider {...settings} className="gallery-slider">
            {businessData?.gallery?.map((image, index) => (
              <div key={index} className="p-2">
                <img src={image} alt="" className="w-100 gallery-img" />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
