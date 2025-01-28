import React, { useState } from "react";
import { FaPhone, FaWhatsapp, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Modal, Button, Row, Col, Image } from "react-bootstrap";

import { motion, AnimatePresence } from "framer-motion";

const FreeListIndex = ({
  freelist,
  renderStars,
  handleOpenDialer,
  handleClick,
  handleEnquiryClick,
}) => {
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const [selectedBusiness, setSelectedBusiness] = useState(null); // State to store selected business data

  const handleCardClick = (business) => {
    setSelectedBusiness(business); // Set the selected business when a card is clicked
    setShowModal(true); // Show the modal
  };

  const handleCloseModal = () => {
    setShowModal(false); // Close the modal
  };

  return (
    <section className="home-spot h-auto mb-2">
      <div className="container py-5" id="freelist">
        <div className="text-center mb-5">
          <h1 className="fw-bold mb-3">Discover the Top Profiles</h1>
          <p className="text-muted mx-auto" style={{ maxWidth: "800px" }}>
            Explore the most popular profile listings in your area through our
            local profile directory listing, highly rated by locals and visitors
            alike.
          </p>
        </div>

        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 mt-4 g-lg-4 g-0">
          {freelist?.length > 0 ? (
            freelist.map((business) => (
              <div key={business._id} className="col mb-4">
                <div
                  className="card h-100 border-0 shadow-xl btn-parent rounded-4 hover-card"
                  onClick={() => handleCardClick(business)} // Trigger modal on card click
                >
                  <div className="px-4 pb-4 position-relative">
                    {/* Business Details */}
                    <div>
                      <div className="custom-font-size small text-muted">
                        {business?.brandName || "No Brand Name"}
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
                        {business?.name}
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
                        {business?.address?.buildingName},{" "}
                        {business?.address?.streetName},{" "}
                        {business?.address?.district},{" "}
                        {business?.address?.state} -{" "}
                        {business?.address?.pinCode}
                      </p>
                    </div>

                    {/* Business Logo */}
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
                          src={business?.logo || "PlaceholderImageURL"}
                          alt={business?.name}
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
                  </div>

                  {/* Action Buttons */}
                  <div className="p-3">
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
                        {business?.contactDetails?.primaryNumber || "N/A"}
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
                        className="btn btn-primary btn-sm flex-1 d-flex align-items-center justify-content-center gap-2"
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
              </div>
            ))
          ) : (
            <div className="col-12">
              <div className="text-center">No profiles available.</div>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
            >
              <Modal.Header closeButton>
                <Modal.Title>{selectedBusiness.name}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Row>
                  <Col md={6}>
                    <h5 className="mb-3">Brand Information</h5>
                    <p>
                      <strong>Brand Name:</strong>{" "}
                      {selectedBusiness.brandName || "N/A"}
                    </p>
                    {selectedBusiness.logo && (
                      <Image
                        src={selectedBusiness.logo || "/placeholder.svg"}
                        alt={`${selectedBusiness.brandName} logo`}
                        roundedCircle
                        width={100}
                        height={100}
                        className="mt-2 border"
                      />
                    )}
                  </Col>
                  <Col md={6}>
                    <h5 className="mb-3">Address</h5>
                    <p>
                      {selectedBusiness.address.buildingName},{" "}
                      {selectedBusiness.address.streetName},<br />
                      {selectedBusiness.address.landMark &&
                        `${selectedBusiness.address.landMark}, `}
                      {selectedBusiness.address.district},{" "}
                      {selectedBusiness.address.state} -{" "}
                      {selectedBusiness.address.pinCode}
                    </p>
                  </Col>
                </Row>
                <Row className="mt-4">
                  <Col md={6}>
                    <h5 className="mb-3">Contact Details</h5>
                    <p>
                      <strong>Primary:</strong>{" "}
                      {selectedBusiness.contactDetails.primaryCountryCode}{" "}
                      {selectedBusiness.contactDetails.primaryNumber}
                    </p>
                    {selectedBusiness.contactDetails.secondaryNumber && (
                      <p>
                        <strong>Secondary:</strong>{" "}
                        {selectedBusiness.contactDetails.secondaryCountryCode}{" "}
                        {selectedBusiness.contactDetails.secondaryNumber}
                      </p>
                    )}
                    <p>
                      <strong>WhatsApp:</strong>{" "}
                      {selectedBusiness.contactDetails.whatsappCountryCode}{" "}
                      {selectedBusiness.contactDetails.whatsAppNumber}
                    </p>
                    <p>
                      <strong>Email:</strong>{" "}
                      {selectedBusiness.contactDetails.email}
                    </p>
                    {selectedBusiness.contactDetails.website && (
                      <p>
                        <strong>Website:</strong>{" "}
                        <a
                          href={selectedBusiness.contactDetails.website}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {selectedBusiness.contactDetails.website}
                        </a>
                      </p>
                    )}
                  </Col>
                  <Col md={6}>
                    <h5 className="mb-3">Description</h5>
                    <p>{selectedBusiness.description}</p>
                  </Col>
                </Row>
                {selectedBusiness.enconnectUrl && (
                  <Row className="mt-4">
                    <Col>
                      <h5 className="mb-3">Enconnect URL</h5>
                      <a
                        href={selectedBusiness.enconnectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {selectedBusiness.enconnectUrl}
                      </a>
                    </Col>
                  </Row>
                )}
                {selectedBusiness.images &&
                  selectedBusiness.images.length > 0 && (
                    <Row className="mt-4">
                      <Col>
                        <h5 className="mb-3">Images</h5>
                        <Row>
                          {selectedBusiness.images.map((image, index) => (
                            <Col key={index} xs={6} md={4} className="mb-3">
                              <Image
                                src={image || "/placeholder.svg"}
                                alt={`${selectedBusiness.name} image ${
                                  index + 1
                                }`}
                                fluid
                                rounded
                                style={{
                                  objectFit: "cover", // Ensures the image covers the area without distortion
                                  width: "100%", // Makes the image responsive and fills the container width
                                  height: "200px", // Fixes the height of the image to 200px
                                }}
                              />
                            </Col>
                          ))}
                        </Row>
                      </Col>
                    </Row>
                  )}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                  Close
                </Button>
              </Modal.Footer>
            </motion.div>
          </Modal>
        )}
      </AnimatePresence>
    </section>
  );
};

export default FreeListIndex;
