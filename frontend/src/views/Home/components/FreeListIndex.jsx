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
} from "lucide-react";
import {
  FaWhatsapp,
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaEnvelope,
  FaPhone,
  FaEdit,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { freeListLogin, updateFreelist } from "../../../Functions/functions";
import { toast } from "react-toastify"; // Import toast from a library like react-toastify

const FreeListIndex = ({ freelist, renderStars, handleEnquiryClick }) => {
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

  const [showEditModal, setShowEditModal] = useState(false);
  const [editFormData, setEditFormData] = useState({
    email: "",
    password: "",
  });
  const [updateId, setUpdateId] = useState("");
  const [showListingModal, setShowListingModal] = useState(false);
  const [updateFormData, setUpdateFormData] = useState({
    name: "",
    brandName: "",
    contactDetails: {
      email: "",
      primaryNumber: "",
      secondaryNumber: "",
      whatsAppNumber: "",
      website: "",
    },
    category: "",
    password: "",
    address: {
      buildingName: "",
      streetName: "",
      landMark: "",
      district: "",
      state: "",
      pinCode: "",
    },
    description: "",
    enconnectUrl: "",
    logo: "",
    images: [],
  });

  const handleEditOpenModal = () => setShowEditModal(true);
  const handleEditCloseModal = () => setShowEditModal(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const response = await freeListLogin(editFormData);
    if (response.success === true) {
      setUpdateFormData(response.data);
      setUpdateId(response.data._id);
      toast.success("login success");
      console.log(updateFormData, "Login Successful!");
      setShowEditModal(false);
      setShowListingModal(true);
    }
    handleEditCloseModal(); // Close modal after submission
  };

  const [errors, setErrors] = useState({});
  const [imagePreviews, setImagePreviews] = useState([]);
  const [logoPreview, setLogoPreview] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    // Handle file inputs
    if (e.target.type === "file") {
      if (name === "logo") {
        setUpdateFormData((prev) => ({
          ...prev,
          logo: files[0],
        }));
      } else if (name === "images") {
        setUpdateFormData((prev) => ({
          ...prev,
          images: Array.from(files),
        }));
      }
    } else {
      if (name.startsWith("contactDetails.")) {
        const field = name.split(".")[1];
        setUpdateFormData((prev) => ({
          ...prev,
          contactDetails: {
            ...prev.contactDetails,
            [field]: value,
          },
        }));
      } else if (name.startsWith("address.")) {
        const field = name.split(".")[1];
        setUpdateFormData((prev) => ({
          ...prev,
          address: {
            ...prev.address,
            [field]: value,
          },
        }));
      } else {
        setUpdateFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
    }
  };


  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    const response = await updateFreelist(updateId, updateFormData);
    if (response.success === true) {
      toast.success("Business Updated successfully!");
      setShowModal(false);
      setShowListingModal(false);
    }
    handleEditCloseModal(); // Close modal after submission
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
                          <div className="d-flex justify-content-between align-items-start position-relative">
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.3 }}
                            >
                              <p className="mb-0 text-gray-600">
                                {selectedBusiness?.categoryName || "N/A"}
                              </p>
                              <h2 className="h4 mt-4 pt-2 mb-2 text-emerald-600 fw-bold">
                                {selectedBusiness.name}
                              </h2>
                              <p className="mb-0 text-gray-600">
                                <Building2
                                  className="me-2 inline-block text-amber-500"
                                  size={16}
                                />
                                <strong>Brand Name:</strong>{" "}
                                {selectedBusiness.brandName || "N/A"}
                              </p>
                            </motion.div>
                            {/* Wrap the buttons in a div to align them to the top-right */}
                            <div className="position-absolute top-0 end-0 d-flex">
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
                          {selectedBusiness.description ||
                            "No description available."}
                        </p>
                      </motion.div>

                      {/* Images Section */}
                      {selectedBusiness.images &&
                        selectedBusiness.images.length > 0 && (
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
                                  transition={{
                                    type: "spring",
                                    stiffness: 300,
                                  }}
                                >
                                  <Image
                                    src={image || "/placeholder.svg"}
                                    alt={`${selectedBusiness.name} image ${
                                      index + 1
                                    }`}
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
                        whileHover={{
                          boxShadow: "0 8px 15px rgba(0,0,0,0.1)",
                          scale: 1.02,
                        }}
                      >
                        <h5 className="mb-3 fw-bold text-amber-700 d-flex align-items-center">
                          <MapPin className="me-2 text-amber-500" /> Address
                        </h5>
                        <p className="mb-0 fs-8 text-gray-700">
                          <Navigation
                            className="me-2 text-amber-500 inline-block"
                            size={16}
                          />
                          <strong>
                            {selectedBusiness.address.buildingName},
                          </strong>{" "}
                          <br />
                          {selectedBusiness.address.streetName}, <br />
                          {selectedBusiness.address.district},{" "}
                          {selectedBusiness.address.state} -
                          <strong> {selectedBusiness.address.pinCode}</strong>
                        </p>
                      </motion.div>

                      {/* Contact Details */}
                      <motion.div
                        className="mb-4 p-3 rounded-lg shadow-md bg-gradient-to-r from-emerald-100 to-emerald-200"
                        whileHover={{
                          boxShadow: "0 8px 15px rgba(0,0,0,0.1)",
                          scale: 1.02,
                        }}
                      >
                        <h5 className="mb-3 text-emerald-700">
                          Contact Details
                        </h5>
                        <div className="d-flex flex-column gap-2">
                          <ContactItem
                            icon={<Phone className="text-blue-500" size={16} />}
                            label="Primary"
                            value={`${selectedBusiness.contactDetails.primaryCountryCode} ${selectedBusiness.contactDetails.primaryNumber}`}
                          />
                          {selectedBusiness.contactDetails.secondaryNumber && (
                            <ContactItem
                              icon={
                                <Phone2 className="text-indigo-500" size={16} />
                              }
                              label="Secondary"
                              value={`${selectedBusiness.contactDetails.secondaryCountryCode} ${selectedBusiness.contactDetails.secondaryNumber}`}
                            />
                          )}
                          <ContactItem
                            icon={
                              <FaWhatsapp
                                className="text-green-500"
                                size={16}
                              />
                            }
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
                              icon={
                                <Globe className="text-purple-500" size={16} />
                              }
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
                          whileHover={{
                            boxShadow: "0px 8px 15px rgba(0,0,0,0.1)",
                            scale: 1.02,
                          }}
                        >
                          <h5 className="mb-3 text-purple-700 d-flex align-items-center">
                            <LinkIcon className="me-2 text-purple-500" />{" "}
                            Enconnect URL
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
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="link"
                    onClick={handleEditOpenModal}
                    className="p-0 me-3 text-blue-500 hover:text-blue-700 transition-all"
                  >
                    <FaEdit size={24} />
                  </Button>
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

      <Modal show={showEditModal} onHide={handleEditCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleEditSubmit}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Enter Email"
                value={editFormData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Enter Password"
                value={editFormData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="text-end">
              <Button
                variant="secondary"
                onClick={handleEditCloseModal}
                className="me-2"
              >
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                Submit
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      <Modal show={showListingModal} onHide={() => setShowListingModal(false)}>
      <div className="modal-dialog modal-dialog-centered modal-xl">
        <div className="modal-content">
          <div className="modal-header border-0">
            <h5 className="modal-title fw-bold">Edit Free Listing</h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => setShowListingModal(false)}
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleUpdateSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Your Name"
                    value={updateFormData.name || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Brand Name</label>
                  <input
                    type="text"
                    name="brandName"
                    className="form-control"
                    placeholder="Brand Name"
                    value={updateFormData.brandName || ""}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="contactDetails.email"
                    className="form-control"
                    placeholder="Email"
                    value={updateFormData.contactDetails?.email || ""}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Primary Number</label>
                  <input
                    type="tel"
                    name="contactDetails.primaryNumber"
                    className="form-control"
                    placeholder="Primary Number"
                    value={updateFormData.contactDetails?.primaryNumber || ""}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Secondary Number</label>
                  <input
                    type="tel"
                    name="contactDetails.secondaryNumber"
                    className="form-control"
                    placeholder="Secondary Number"
                    value={updateFormData.contactDetails?.secondaryNumber || ""}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">WhatsApp Number</label>
                  <input
                    type="tel"
                    name="contactDetails.whatsAppNumber"
                    className="form-control"
                    placeholder="WhatsApp Number"
                    value={updateFormData.contactDetails?.whatsAppNumber || ""}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Website</label>
                  <input
                    type="url"
                    name="contactDetails.website"
                    className="form-control"
                    placeholder="Website"
                    value={updateFormData.contactDetails?.website || ""}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Category</label>
                  <input
                    type="text"
                    name="category"
                    className="form-control"
                    placeholder="Category"
                    value={updateFormData.category || ""}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Building Name</label>
                  <input
                    type="text"
                    name="address.buildingName"
                    className="form-control"
                    placeholder="Building Name"
                    value={updateFormData.address?.buildingName || ""}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Street Name</label>
                  <input
                    type="text"
                    name="address.streetName"
                    className="form-control"
                    placeholder="Street Name"
                    value={updateFormData.address?.streetName || ""}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Landmark</label>
                  <input
                    type="text"
                    name="address.landMark"
                    className="form-control"
                    placeholder="Landmark"
                    value={updateFormData.address?.landMark || ""}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">District</label>
                  <input
                    type="text"
                    name="address.district"
                    className="form-control"
                    placeholder="District"
                    value={updateFormData.address?.district || ""}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">State</label>
                  <input
                    type="text"
                    name="address.state"
                    className="form-control"
                    placeholder="State"
                    value={updateFormData.address?.state || ""}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Pin Code</label>
                  <input
                    type="text"
                    name="address.pinCode"
                    className="form-control"
                    placeholder="Pin Code"
                    value={updateFormData.address?.pinCode || ""}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-12">
                  <label className="form-label">Business Description</label>
                  <textarea
                    name="description"
                    className="form-control"
                    rows={4}
                    placeholder="Business Description"
                    value={updateFormData.description || ""}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <div className="col-12">
                  <label className="form-label">Logo</label>
                  <input
                    type="file"
                    name="logo"
                    className="form-control"
                    accept="image/*"
                    onChange={handleChange}
                  />
                </div>

                <div className="col-12">
                  <label className="form-label">Images (5 max)</label>
                  <input
                    type="file"
                    name="images"
                    className="form-control"
                    accept="image/*"
                    multiple
                    onChange={handleChange}
                  />
                  <div className="image-previews">
                    {imagePreviews.map((preview, index) => (
                      <img
                        key={index}
                        src={preview}
                        alt={`preview-${index}`}
                        className="img-thumbnail"
                        style={{ width: 100, height: 100, margin: 5 }}
                      />
                    ))}
                  </div>
                </div>

                <div className="col-12">
                  <label className="form-label">Enconnect URL</label>
                  <input
                    type="url"
                    name="enconnectUrl"
                    className="form-control"
                    placeholder="Enconnect URL"
                    value={updateFormData.enconnectUrl || ""}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-12">
                  <button type="submit" className="btn btn-primary w-100 mt-3">
                    Update Listing
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Modal>


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
  <motion.p
    className="mb-1 d-flex align-items-center"
    whileHover={{ x: 5, color: "#059669" }}
  >
    <span className="me-2">{icon}</span>
    <strong>{label}:</strong>{" "}
    <span className="ms-1 text-gray-700">{value}</span>
  </motion.p>
);
