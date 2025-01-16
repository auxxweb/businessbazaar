import React from "react";
import PropTypes from "prop-types";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import Placeholder from "/images/placeholder.jpg";

const BusinessIndex = ({
  loading,
  businessData,
  visibleBusiness,
  totalBusinessData,
  loadMoreBusiness,
  scroll,
}) => {
  const slugify = (text) => {
    if (!text) return text;
    return text
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <FaStar
        key={index}
        size={12}
        className={index < Math.floor(rating) ? "text-warning" : "text-muted"}
      />
    ));
  };

  return (
    <section className="home-spot h-auto mb-2" ref={scroll}>
      <div className="container py-5" id="business">
        <div className="text-center mb-5">
          <h1 className="fw-bold mb-3">Discover the Top Profiles</h1>
          <p className="text-muted mx-auto" style={{ maxWidth: "800px" }}>
            Explore the most popular profile listings in your area through our
            local profile directory listing, highly rated by locals and visitors
            alike. Our platform makes it easy to find top-rated profiles based
            on customer reviews and expert recommendations.
          </p>
        </div>

        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-lg-4 g-0">
          {businessData?.map((business) => (
            <div key={business._id} className="col">
              <Link
                to={
                  business?.selectedPlan?.isPremium
                    ? `/profile/premium/${slugify(business?.businessName)}/${
                        business?._id
                      }`
                    : `/profile/${slugify(business?.businessName)}/${
                        business?._id
                      }`
                }
                className="text-decoration-none"
              >
                <div className="card h-100 border-0 shadow-xl rounded-4 overflow-visible hover-card">
                  <div className="px-4 py-3 position-relative">
                    {/* Category */}
                    <div className="small text-muted">
                      {business?.category?.name || "News & Media"}
                    </div>

                    <div className="row g-3">
                      {/* Content Column */}
                      <div className="col-12">
                        <h5
                          className="card-title h6 fw-bold text-dark"
                          style={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            minHeight: "20px",
                            paddingRight: "45%", // Space for image
                          }}
                        >
                          {business?.businessName}
                        </h5>

                        <p
                          className="card-text text-muted small"
                          style={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            paddingRight: "45%", // Space for image
                          }}
                        >
                          {business?.address?.buildingName}{" "}
                          {business?.address?.city}{" "}
                          {business?.address?.landMark}
                        </p>
                      </div>

                      {/* Image positioned at top */}
                      <div
                        className="position-absolute"
                        style={{
                          width: "130px",
                          right: "20px",
                          top: "-30px",
                          maxWidth: "40%",
                        }}
                      >
                        <img
                          src={business?.logo || Placeholder}
                          alt={business?.businessName}
                          className="rounded-3 w-100 shadow-sm"
                          style={{
                            aspectRatio: "1",
                            objectFit: "cover",
                          }}
                        />
                      </div>

                      {/* Rating fixed under the image */}
                      <div
                        className="position-absolute"
                        style={{
                          width: "110px",
                          right: "30px",
                          top: "80px", // Updated from bottom: 2px to top: 80px
                        }}
                      >
                        <div className="d-flex align-items-center justify-content-center px-2 py-1">
                          {renderStars(business?.rating || 0)}
                          <span className="ms-1 small fw-medium">
                            {business?.rating || "0.0"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
          {visibleBusiness < totalBusinessData && (
            <div className="col">
              <div
                className="card h-100 border-0 shadow-xl rounded-4 overflow-visible hover-card d-flex align-items-center justify-content-center cursor-pointer"
                onClick={loadMoreBusiness}
              >
                <div className="text-center">
                  <h5 className="card-title h6 fw-bold text-dark ">
                    View More
                  </h5>
                  <i className="bi bi-arrow-right fs-4"></i>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>

      <style>
        {`
          .col {
            animation: fadeInUp 0.5s ease-out;
            animation-fill-mode: both;
          }
          .col:nth-child(3n+1) { animation-delay: 0.1s; }
          .col:nth-child(3n+2) { animation-delay: 0.2s; }
          .col:nth-child(3n+3) { animation-delay: 0.3s; }

          .hover-card {
            transition: all 0.3s ease;
            background: white;
          }
          .hover-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
          }
          .text-warning {
            color: #ffc107 !important;
          }
          .overflow-visible {
            overflow: visible !important;
          }
          
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @media (max-width: 575px) {
            .card {
              font-size: 0.9rem;
            }
            .card .position-absolute {
              width: 80px;
              right: 10px;
              top: -20px;
            }
            .card-title.h6 {
              font-size: 1rem;
            }
            .card-text {
              font-size: 0.75rem;
            }
            .col {
              margin-bottom: 1rem;
            }
            .row-cols-2 {
              margin-bottom: 2rem;
            }
            .col .card {
              margin-bottom: 1.5rem;
            }
            .card .position-absolute {
              width: 60px;
              top: -25px;
              right: 15px;
            }
            .card img {
              width: 100%;
              height: auto;
            }
          }
          .cursor-pointer {
            cursor: pointer;
          }
        `}
      </style>
    </section>
  );
};

BusinessIndex.propTypes = {
  loading: PropTypes.bool.isRequired,
  businessData: PropTypes.array.isRequired,
  visibleBusiness: PropTypes.number.isRequired,
  totalBusinessData: PropTypes.number.isRequired,
  loadMoreBusiness: PropTypes.func.isRequired,
  scroll: PropTypes.object,
};

export default BusinessIndex;

