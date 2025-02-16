import React, { useState } from "react";
import PropTypes from "prop-types";
import { FaStar, FaWhatsapp, FaPhone, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import Placeholder from "/images/placeholder.jpg";
import EnquiryModal from "./EnquiryModal";
import { submitContactForm } from "../../../Functions/functions";
import { toast } from "react-toastify";

const BusinessIndex = ({
  loading,
  businessData,
  visibleBusiness,
  totalBusinessData,
  loadMoreBusiness,
  scroll,
  searchItem,
}) => {
  console.log(searchItem, "kkkkkkkkkk:");
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState(null);

  const slugify = (text) => {
    if (!text) return text;
    return text
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
  };
  const handleFormSubmit = async (e, formData, businessId) => {
    e.preventDefault();

    const response = await submitContactForm({
      ...formData,
      businessId: businessId,
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
  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <FaStar
        key={index}
        size={12}
        className={index < Math.floor(rating) ? "text-warning" : "text-muted"}
      />
    ));
  };

  const handleClick = (countryCode, whatsappNumber) => {
    const defaultCountryCode = "+91"; // Default country code
    const finalCountryCode = countryCode || defaultCountryCode; // Use default if not available
    window.open(`https://wa.me/${finalCountryCode}${whatsappNumber}`, "_blank");
  };

  const handleOpenDialer = (phoneNumber) => {
    const formattedNumber = `tel:${String(phoneNumber).replace(/\s/g, "")}`;
    window.location.href = formattedNumber;
  };

  const handleEnquiryClick = (e, business) => {
    e.preventDefault();
    setSelectedBusiness(business);
    setShowEnquiryModal(true);
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

        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 mt-4 g-lg-4 g-0">
          {businessData?.length > 0 ? (
            businessData.map((business) => (
              <div key={business._id} className="col mb-4">
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
                  <div className="card  h-100 border-0 shadow-xl btn-parent rounded-4 hover-card">
                    <div className="px-4 pb-4 position-relative">
                      <div className="">
                        <div className="custom-font-size small text-muted">
                          {business?.category?.name || "News & Media"}
                        </div>

                        <h5
                          className="card-title h6 fw-bold text-dark mt-2"
                          style={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            minHeight: "40px",
                            paddingRight: "45%",
                          }}
                        >
                          {business?.businessName}
                        </h5>

                        <p
                          className="card-text text-muted small mb-0"
                          style={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            paddingRight: "45%",
                          }}
                        >
                          {business?.address?.buildingName}{" "}
                          {business?.address?.city}{" "}
                          {business?.address?.landMark}
                        </p>
                      </div>

                      <div
                        className="position-absolute bg-white shadow-sm"
                        style={{
                          width: "130px",
                          height: "130px",
                          right: "20px",
                          top: "-45px",
                          borderRadius: "12px",
                          padding: "6px",
                          overflow: "hidden",
                        }}
                      >
                        <div className="w-100 h-100 position-relative">
                          <img
                            src={business?.logo || Placeholder}
                            alt={business?.businessName}
                            className="position-absolute"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              borderRadius: "8px",
                            }}
                          />
                        </div>
                      </div>

                      <div
                        className="position-absolute bg-white px-2 py-1 rounded-pill shadow-sm"
                        style={{
                          right: "35px",
                          top: "100px",
                          zIndex: 1,
                        }}
                      >
                        <div className="d-flex align-items-center justify-content-center">
                          {renderStars(business?.rating || 0)}
                          <span className="ms-1 small fw-medium">
                            {business?.rating || "0.0"}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className=" p-3">
                      <div className="d-flex justify-content-center gap-2">
                        <button
                          className="btn btn-success btn-sm flex-1 d-flex align-items-center justify-content-center gap-2"
                          onClick={(e) => {
                            e.preventDefault();
                            handleOpenDialer(
                              business?.contactDetails?.primaryNumber
                            );
                          }}
                        >
                          <FaPhone />{" "}
                          {business?.contactDetails?.primaryNumber ?? ""}
                        </button>
                        <button
                          className="btn btn-outline-success btn-sm flex-1 d-flex align-items-center justify-content-center gap-2"
                          onClick={(e) => {
                            e.preventDefault();
                            handleClick(
                              business?.contactDetails?.whatsappCountryCode,
                              business?.contactDetails?.whatsAppNumber
                            );
                          }}
                        >
                          <FaWhatsapp /> WhatsApp
                        </button>
                        <button
                          className="btn btn-enquiry btn-sm flex-1 d-flex align-items-center justify-content-center gap-2"
                          onClick={(e) => {
                            e.preventDefault();
                            handleEnquiryClick(e, business);
                          }}
                        >
                          <FaEnvelope /> Send Enquiry
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <div className="col-12">
              <div className="  h-100 border-0  rounded-4 overflow-visible">
                <div className="px-4  py-3 text-center">
                  <h5 className="card-title h6 text-dark">Profile not found</h5>
                  <p className="card-text text-muted">
                    No business profiles available at the moment.
                  </p>
                </div>
              </div>
            </div>
          )}

          {!searchItem && visibleBusiness < totalBusinessData && (
            <div className="col">
              <div
                className="cardd h-100 border-0 shadow-xl rounded-4 overflow-visible hover-card d-flex align-items-center justify-content-center cursor-pointer"
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

      {selectedBusiness && (
        <EnquiryModal
          show={showEnquiryModal}
          handleFormSubmit={handleFormSubmit}
          onHide={() => {
            setShowEnquiryModal(false);
            setSelectedBusiness(null);
          }}
          businessName={selectedBusiness.businessName}
          businessId={selectedBusiness._id}
        />
      )}

      <style>
        {`

        .cardd{
        height:80%;
        }
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
          
          .btn-enquiry{
          background:linear-gradient(to right, #e72693, #ff7e2b ); 
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

          .btn-crd{
          padding:20px
          
          }

          @media (max-width: 575px) {
            .card {
              font-size: 0.9rem;
            }
            .card .position-absolute {
              width: 80px;
              right: 0px;
              top: 0px;
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
              margin-bottom: 1rem;
            }
            .col .card {
              margin-bottom: 0.5rem;
            }
            .card .position-absolute {
              width: 60px;
              top: 0px;
              right: 0px;
            }
            .card img {
              width: 100%;
              height: auto;
            }
          }
          .cursor-pointer {
            cursor: pointer;
          }

          .card .btn-sm {
            font-size: 0.7rem;
            padding: 0.25rem 0.5rem;
          }

          @media (max-width: 575px) {
            .card .btn-sm {
              font-size: 0.6rem;
              padding: 0.2rem 0.4rem;
            }
          }

          .modal-content {
            border-radius: 1rem;
            border: none;
          }

          .form-control {
            border-radius: 0.5rem;
            padding: 0.75rem 1rem;
          }

          .form-control:focus {
            box-shadow: 0 0 0 0.25rem rgba(13,110,253,.25);
          }

          .btn-parent{
          display:flex;
          flex-direction: column;
          justify-content:end;
          
          }
          @media (max-width: 1200px) {
          .custom-font-size {
           font-size: 12px; /* Default font size for larger screens */
          }
        }

          @media (max-width: 370px) {
         .custom-font-size {
          font-size: 9px; /* Smaller font size for screens under 370px */
        }
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
