import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Button, Row, Col, Image } from "react-bootstrap";
import {
  Phone,
  Mail,
  Globe,
  MapPin,
  PhoneIcon as Phone2,
  MessageCircle,
  Building2,
  Navigation,
  LinkIcon,
} from "lucide-react"
import { FaWhatsapp, FaInstagram, FaFacebookF, FaTwitter, FaLinkedinIn ,FaEnvelope,FaPhone} from "react-icons/fa"
import { motion, AnimatePresence } from "framer-motion";
 
const FreeListIndex = ({
  freelist,
  renderStars,

  handleEnquiryClick,
}) => {
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const [selectedBusiness, setSelectedBusiness] = useState(null); // State to store selected business data

  const handleCardClick = (business) => {
    setSelectedBusiness(business); // Set the selected business when a card is clicked
    setShowModal(true); // Show the modal
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
                          e.stopPropagation(); // Prevents the parent card's onClick from triggering
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
                          e.stopPropagation(); // Prevents the parent card's onClick from triggering
                          handleClick(
                            business?.contactDetails?.whatsappCountryCode,
                            business?.contactDetails?.whatsAppNumber
                          );
                        }}
                      >
                        <FaWhatsapp /> WhatsApp
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
        <Modal show={showModal} onHide={handleCloseModal} size="xl" centered>
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="modal-content bg-gradient-to-br from-gray-100 to-gray-200"
          >
            <Modal.Body className="p-4">
              <Row className="g-0">
                {/* Left Section - 60% */}
                <Col md={8}>
                  <motion.div
                    className="pe-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {/* Header Section */}
                    <div className="d-flex mb-4">
                      <motion.div
                        className="me-4"
                        whileHover={{ scale: 1.05, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {selectedBusiness.logo && (
                          <Image
                            src={selectedBusiness.logo || "/placeholder.svg"}
                            alt={`${selectedBusiness.brandName} logo`}
                            width={140}
                            height={140}
                            className="border-4 border-amber-400 rounded-lg shadow-lg"
                          />
                        )}
                      </motion.div>
                      <div className="flex-grow-1">
                        <div className="d-flex justify-content-between align-items-start">
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                            <h2 className="h4 mt-4 pt-2 mb-2 text-emerald-600 fw-bold">{selectedBusiness.name}</h2>
                            <p className="mb-0 text-gray-600">
                              <Building2 className="me-2 inline-block text-amber-500" size={16} />
                              <strong>Brand Name:</strong> {selectedBusiness.brandName || "N/A"}
                            </p>
                          </motion.div>
                          <Button
                            variant="link"
                            onClick={handleCloseModal}
                            className="p-0 text-gray-500 hover:text-gray-700 transition-all"
                          >
                            ×
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Description Section */}
                    <motion.div
                      className="mb-4 p-3 bg-white rounded-lg shadow-md"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      whileHover={{ boxShadow: "0 8px 15px rgba(0,0,0,0.1)" }}
                    >
                      <h5 className="mb-3 text-emerald-600">Description</h5>
                      <p className="text-gray-700 mb-0">
                        {selectedBusiness.description || "No description available."}
                      </p>
                    </motion.div>

                    {/* Images Section */}
                    {selectedBusiness.images && selectedBusiness.images.length > 0 && (
                      <motion.div
                        className="mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        <h5 className="mb-3 text-emerald-600">Gallery</h5>
                        <div
                          className="d-flex flex-wrap gap-3 p-3 border rounded-lg bg-white overflow-auto"
                          style={{ maxHeight: "250px" }}
                        >
                          {selectedBusiness.images.map((image, index) => (
                            <motion.div
                              key={index}
                              className="rounded-lg overflow-hidden shadow-md"
                              style={{
                                width: "22%",
                                aspectRatio: "1 / 1",
                                minWidth: "80px",
                              }}
                              whileHover={{
                                scale: 1.05,
                                boxShadow: "0 8px 15px rgba(0,0,0,0.1)",
                                rotate: 5,
                              }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              <Image
                                src={image || "/placeholder.svg"}
                                alt={`${selectedBusiness.name} image ${index + 1}`}
                                width={200}
                                height={200}
                                className="w-100 h-100 hover-scale transition-all"
                                style={{ objectFit: "cover" }}
                              />
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                </Col>

                {/* Right Section - 40% */}
                <Col md={4}>
                  <motion.div
                    className="h-100 border"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {/* Address Section */}
                    <motion.div
                      className="mb-4 p-3 rounded-lg shadow-md bg-gradient-to-r from-amber-100 to-amber-200  border-amber-300"
                      whileHover={{ boxShadow: "0 8px 15px rgba(0,0,0,0.1)", scale: 1.02 }}
                    >
                      <h5 className="mb-3 fw-bold text-amber-700 d-flex align-items-center">
                        <MapPin className="me-2 text-amber-500" /> Address
                      </h5>
                      <p className="mb-0 fs-8 text-gray-700">
                        <Navigation className="me-2 text-amber-500 inline-block" size={16} />
                        <strong>{selectedBusiness.address.buildingName},</strong> <br />
                        {selectedBusiness.address.streetName}, <br />
                        {selectedBusiness.address.district}, {selectedBusiness.address.state} -
                        <strong> {selectedBusiness.address.pinCode}</strong>
                      </p>
                    </motion.div>

                    {/* Contact Details */}
                    <motion.div
                      className="mb-4 p-3 rounded-lg shadow-md bg-gradient-to-r from-emerald-100 to-emerald-200"
                      whileHover={{ boxShadow: "0 8px 15px rgba(0,0,0,0.1)", scale: 1.02 }}
                    >
                      <h5 className="mb-3 text-emerald-700">Contact Details</h5>
                      <div className="d-flex flex-column gap-2">
                        <ContactItem
                          icon={<Phone className="text-blue-500" size={16} />}
                          label="Primary"
                          value={`${selectedBusiness.contactDetails.primaryCountryCode} ${selectedBusiness.contactDetails.primaryNumber}`}
                        />
                        {selectedBusiness.contactDetails.secondaryNumber && (
                          <ContactItem
                            icon={<Phone2 className="text-indigo-500" size={16} />}
                            label="Secondary"
                            value={`${selectedBusiness.contactDetails.secondaryCountryCode} ${selectedBusiness.contactDetails.secondaryNumber}`}
                          />
                        )}
                        <ContactItem
                          icon={<FaWhatsapp className="text-green-500" size={16} />}
                          label="WhatsApp"
                          value={`${selectedBusiness.contactDetails.whatsappCountryCode} ${selectedBusiness.contactDetails.whatsAppNumber}`}
                        />
                        <ContactItem
                          icon={<Mail className="text-red-500" size={16} />}
                          label="Email"
                          value={selectedBusiness.contactDetails.email}
                        />
                        {selectedBusiness.contactDetails.website && (
                          <ContactItem
                            icon={<Globe className="text-purple-500" size={16} />}
                            label="Website"
                            value={
                              <a
                                href={selectedBusiness.contactDetails.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-decoration-none text-purple-600 hover:text-purple-700 hover:underline"
                              >
                                {selectedBusiness.contactDetails.website}
                              </a>
                            }
                          />
                        )}
                      </div>
                    </motion.div>

                    {/* Enconnect URL */}
                    {selectedBusiness.enconnectUrl && (
                      <motion.div
                        className="p-3 rounded-lg shadow-md bg-gradient-to-r from-purple-100 to-purple-200"
                        whileHover={{ boxShadow: "0px 8px 15px rgba(0,0,0,0.1)", scale: 1.02 }}
                      >
                        <h5 className="mb-3 text-purple-700 d-flex align-items-center">
                          <LinkIcon className="me-2 text-purple-500" /> Enconnect URL
                        </h5>
                        <motion.a
                          href={selectedBusiness.enconnectUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-decoration-none text-break text-purple-600 hover:text-purple-700 hover:underline d-flex align-items-center"
                          whileHover={{ x: 5 }}
                        >
                          {selectedBusiness.enconnectUrl}
                        </motion.a>
                      </motion.div>
                    )}
                  </motion.div>
                </Col>
              </Row>
            </Modal.Body>

            <div className="d-flex justify-content-center p-3">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline-secondary"
                  onClick={handleCloseModal}
                  className="px-4 py-2 rounded-full shadow-sm bg-gradient-to-r from-gray-200 to-gray-300 text-gray-700 hover:from-gray-300 hover:to-gray-400"
                >
                  Close
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </Modal>
      )}
    </AnimatePresence>
    <style>
      {`
      .hover-scale {
  transition: transform 0.3s ease;
}

.hover-scale:hover {
  transform: scale(1.05);
}

.hover-opacity-100:hover {
  opacity: 1 !important;
}

.hover-underline:hover {
  text-decoration: underline !important;
}

.transition-all {
  transition: all 0.3s ease;
}

`}
    </style>
    </section>
  );
};

export default FreeListIndex;


const ContactItem = ({ icon, label, value }) => (
  <motion.p className="mb-1 d-flex align-items-center" whileHover={{ x: 5, color: "#059669" }}>
    <span className="me-2">{icon}</span>
    <strong>{label}:</strong> <span className="ms-1 text-gray-700">{value}</span>
  </motion.p>
)