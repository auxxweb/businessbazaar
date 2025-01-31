import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Button, Row, Col, Image } from "react-bootstrap";
import { X } from "lucide-react";

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
import {
  fetchCategories,
  freeListLogin,
  updateFreelist,
} from "../../../Functions/functions";
import { toast } from "react-toastify"; // Import toast from a library like react-toastify
import { preRequestFun } from "../../CreateBusiness/service/s3url";
import Cropper from "react-easy-crop";
import getCroppedImg from "../../../utils/cropper.utils";

const FreeListIndex = ({
  freelist,
  fetchFreeList,
  renderStars,
  handleEnquiryClick,
}) => {
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const [selectedBusiness, setSelectedBusiness] = useState(null); // State to store selected business data
  const [modalImage, setModalImage] = useState(null);
  const [categoryData, setCategoryData] = useState([]);

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

  const handleEditOpenModal = (email) => {
    setEditFormData((prev) => ({
      ...prev,
      email: email || "", // Ensure it's not undefined
    }));
    setShowEditModal(true);
  };
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

  const [logoPreview, setLogoPreview] = useState(null);
  const [logoFile, setLogoFile] = useState(null);
  const [showCropModal, setShowCropModal] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState(null);

  const handleChange = async (e) => {
    const { name, value, files } = e.target;

    // Handle file inputs
    if (e.target.type === "file") {
      if (name === "logo") {
        const file = files[0];
        const reader = new FileReader();

        reader.onload = function (e) {
          setLogoPreview(e.target.result); // Show preview of image
          setLogoFile(file); // Store the original file
          setShowCropModal(true); // Open the crop modal
        };

        reader.readAsDataURL(file);
      }
      if (name === "images") {
        const imageFiles = Array.from(files);
        const imageLinks = await Promise.all(
          imageFiles.map((file) => preRequestFun(file, "freelist"))
        );
        setUpdateFormData((prev) => ({
          ...prev,
          images: imageLinks.map((link) => link.accessLink),
        }));
        setImagePreviews(imageFiles.map((file) => URL.createObjectURL(file)));
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

  const handleCropSave = async () => {
    try {
      const { fileUrl, blob } = await getCroppedImg(logoPreview, croppedArea);
      setLogoPreview(fileUrl); // Set the cropped image preview
      setUpdateFormData((prev) => ({ ...prev, logo: fileUrl })); // Update form data with the cropped image URL
      setShowCropModal(false); // Close the crop modal

      // Upload the cropped file and store it in formData
      const croppedFile = new File(
        [blob],
        logoFile?.name || "cropped-logo.png",
        { type: blob.type }
      );
      const prereq = await preRequestFun(croppedFile, "freelist");

      setUpdateFormData((prev) => ({
        ...prev,
        logo: prereq.accessLink, // Set the uploaded file link
      }));
      setLogoFile(croppedFile); // Store the cropped file
    } catch (e) {
      console.error("Error cropping image:", e);
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    const response = await updateFreelist(updateId, updateFormData);
    if (response.success === true) {
      toast.success("Business Updated successfully!");
      setShowModal(false);
      fetchFreeList();
      setShowListingModal(false);
    }
    handleEditCloseModal(); // Close modal after submission
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryDetails = await fetchCategories();
        setCategoryData(categoryDetails?.data?.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleRemoveImage = (index) => {
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));

    setUpdateFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };
  return (
    <section className="home-spot h-auto mb-2">
      <div className="container py-5" id="freelist">
        <div className="text-center mb-5">
          <h1 className="fw-bold mb-3">
            Find & Connect with Local Businesses – Absolutely Free!
          </h1>
          <p className="text-muted mx-auto" style={{ maxWidth: "800px" }}>
            Find various businesses near you from the free profile listing
            directory. Top-rated services can be discovered through genuine
            customer reviews and recommendations from the community. No fees, no
            fuss; simply unhindered access to the best local
            businesses around you!
          </p>
        </div>

        {/* freelist cards */}
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

      {/* freelist details Modal */}
      <AnimatePresence>
        {showModal && (
          <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
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
                              width={120}
                              height={120}
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
                              <h2 className="h5 mt-4 pt-2 mb-2 text-emerald-600 fw-bold">
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
                                style={{
                                  fontSize: "30px",
                                  fontWeight: "bold",
                                  color: "#6b7280",
                                  transition: "color 0.3s ease-in-out",
                                }}
                                variant="link"
                                onClick={() =>
                                  handleEditOpenModal(
                                    selectedBusiness?.contactDetails?.email
                                  )
                                }
                                className="p-0 me-3 text-blue-500 hover:text-blue-700 transition-all"
                              >
                                <FaEdit size={22} />
                              </Button>
                              <Button
                                variant="link"
                                onClick={handleCloseModal}
                                style={{
                                  fontSize: "30px",
                                  fontWeight: "bold",
                                  color: "#6b7280",
                                  transition: "color 0.3s ease-in-out",
                                }}
                                onMouseEnter={(e) =>
                                  (e.target.style.color = "#374151")
                                }
                                onMouseLeave={(e) =>
                                  (e.target.style.color = "#6b7280")
                                }
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
                            <h5 className="mb-3 text-emerald-600 text-sm">
                              Gallery
                            </h5>
                            <div
                              className="d-flex flex-wrap gap-3 p-3 border rounded-lg bg-white overflow-auto"
                              style={{ maxHeight: "250px" }}
                            >
                              {selectedBusiness.images.map((image, index) => (
                                <motion.div
                                  key={index}
                                  className="rounded-lg overflow-hidden shadow-md cursor-pointer"
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
                                  onClick={() => setModalImage(image)}
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
                        className="mb-4 p-3 rounded-lg shadow-md bg-gradient-to-r from-amber-100 to-amber-200 border-amber-300"
                        whileHover={{
                          boxShadow: "0 8px 15px rgba(0,0,0,0.1)",
                          scale: 1.02,
                        }}
                      >
                        <h5 className="mb-2 fw-bold text-sm text-amber-700 d-flex align-items-center">
                          <MapPin className="me-2 text-amber-500" size={14} />{" "}
                          Address
                        </h5>
                        <p className="mb-0 text-xs text-gray-700">
                          <Navigation
                            className="me-2 text-amber-500 inline-block"
                            size={12}
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
                        <h5 className="mb-2 text-sm text-emerald-700">
                          Contact Details
                        </h5>
                        <div className="d-flex flex-column gap-2">
                          <ContactItem
                            icon={<Phone className="text-blue-500" size={12} />}
                            label="Primary"
                            value={`${selectedBusiness.contactDetails.primaryCountryCode} ${selectedBusiness.contactDetails.primaryNumber}`}
                          />
                          {selectedBusiness.contactDetails.secondaryNumber && (
                            <ContactItem
                              icon={
                                <Phone2 className="text-indigo-500" size={12} />
                              }
                              label="Secondary"
                              value={`${selectedBusiness.contactDetails.secondaryCountryCode} ${selectedBusiness.contactDetails.secondaryNumber}`}
                            />
                          )}
                          <ContactItem
                            icon={
                              <FaWhatsapp
                                className="text-green-500"
                                size={12}
                              />
                            }
                            label="WhatsApp"
                            value={`${selectedBusiness.contactDetails.whatsappCountryCode} ${selectedBusiness.contactDetails.whatsAppNumber}`}
                          />
                          <ContactItem
                            icon={<Mail className="text-red-500" size={12} />}
                            label="Email"
                            value={selectedBusiness.contactDetails.email}
                          />
                          {selectedBusiness.contactDetails.website && (
                            <ContactItem
                              icon={
                                <Globe className="text-purple-500" size={12} />
                              }
                              label="Website"
                              value={
                                <a
                                  href={selectedBusiness.contactDetails.website}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-decoration-none text-purple-600 hover:text-purple-700 hover:underline text-xs"
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
                          <h5 className="mb-2 text-sm text-purple-700 d-flex align-items-center">
                            <LinkIcon
                              className="me-2 text-purple-500"
                              size={12}
                            />{" "}
                            Enconnect URL
                          </h5>
                          <motion.a
                            href={selectedBusiness.enconnectUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-decoration-none text-break text-purple-600 hover:text-purple-700 hover:underline d-flex align-items-center text-xs"
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

      {/* image hover modal */}
      <Modal show={modalImage}>
        {modalImage && (
          <motion.div
            className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center  bg-opacity-75"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalImage(null)}
          >
            <motion.div
              className="position-relative bg-white p-3 rounded-3 shadow-lg d-flex flex-column align-items-center"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
              style={{ width: "480px", height: "480px" }}
            >
              {/* Close Button */}
              <button
                className="position-absolute top-0 end-0 translate-middle p-2 border-0 rounded-circle bg-white shadow-sm"
                onClick={() => setModalImage(null)}
                style={{
                  width: "35px",
                  height: "35px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <i className="bi bi-x-lg text-dark fs-6"></i>
              </button>

              {/* Image Container */}
              <div className="w-100 h-100 d-flex align-items-center justify-content-center overflow-hidden rounded-3 border">
                <img
                  src={modalImage || "/placeholder.svg"}
                  alt="Expanded image"
                  className="w-100 h-100 object-cover rounded-3"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </Modal>

      {/* login modal */}
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
                readOnly
                disabled
                style={{ pointerEvents: "none", backgroundColor: "#f3f4f6" }} // Light gray background
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

      {/* crop modal */}
      <Modal show={showCropModal}>
        <AnimatePresence>
          {showCropModal && logoFile && (
            <div
              className="modal fade show d-block"
              tabIndex="-1"
              role="dialog"
            >
              <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Crop Your Logo</h5>
                    <button
                      type="button"
                      className="btn-close"
                      aria-label="Close"
                      onClick={() => setShowCropModal(false)}
                    ></button>
                  </div>
                  <div className="modal-body">
                    <div
                      className="cropper-container position-relative"
                      style={{ height: "400px" }}
                    >
                      <Cropper
                        image={logoPreview}
                        crop={crop}
                        zoom={zoom}
                        aspect={1}
                        onCropChange={setCrop}
                        onZoomChange={setZoom}
                        onCropComplete={(
                          croppedAreaPercentage,
                          croppedAreaPixels
                        ) => setCroppedArea(croppedAreaPixels)}
                      />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      className="mx-2 btn-primary"
                      variant="contained"
                      color="primary"
                      onClick={handleCropSave}
                    >
                      Save Crop
                    </button>
                    <button
                      className="btn btn-danger"
                      variant="filled"
                      color="warning"
                      onClick={() => setShowCropModal(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </AnimatePresence>
      </Modal>

      {/* edit modal  */}
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
                      value={
                        updateFormData.contactDetails?.secondaryNumber || ""
                      }
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
                      value={
                        updateFormData.contactDetails?.whatsAppNumber || ""
                      }
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
                    <select
                      name="category"
                      className={`form-control ${
                        errors.category ? "is-invalid" : ""
                      }`}
                      value={updateFormData.category?._id || ""} // Assuming category is an object with _id
                      onChange={(e) => {
                        setUpdateFormData((prev) => ({
                          ...prev,
                          category:
                            categoryData.find(
                              (c) => c._id === e.target.value
                            ) || null, // Select the category object based on _id
                        }));
                      }}
                    >
                      <option value="">Select Category</option>
                      {categoryData.map((category, index) => (
                        <option key={index} value={category._id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                    {errors.category && (
                      <div className="invalid-feedback">{errors.category}</div>
                    )}
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

                    {/* File input for changing the logo */}
                    <input
                      type="file"
                      name="logo"
                      className="form-control"
                      accept="image/*"
                      onChange={handleChange}
                    />
                  </div>

                  {/* Display the existing logo if available */}
                  {updateFormData.logo && (
                    <div className="mb-3">
                      <img
                        src={updateFormData.logo} // Assuming it's a URL or base64 string
                        alt="Current Logo"
                        style={{
                          maxWidth: "150px",
                          maxHeight: "150px",
                          objectFit: "contain",
                        }}
                      />
                    </div>
                  )}

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
                    <div className="d-flex gap-2 flex-wrap mt-2">
                      {updateFormData.images.map((src, index) => (
                        <div key={index} className="position-relative">
                          <img
                            src={src}
                            alt={`Preview ${index + 1}`}
                            className="img-thumbnail"
                            style={{
                              width: "100px",
                              height: "100px",
                              objectFit: "cover",
                            }}
                          />
                          <button
                            type="button"
                            className="position-absolute top-0 start-100 translate-middle badge bg-danger border-0"
                            onClick={() => handleRemoveImage(index)}
                            style={{
                              width: "20px",
                              height: "20px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              borderRadius: "50%",
                              cursor: "pointer",
                            }}
                          >
                            X
                          </button>
                        </div>
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
                    <button
                      type="submit"
                      className="btn btn-primary w-100 mt-3"
                    >
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
    className="mb-1 d-flex align-items-center flex-wrap"
    whileHover={{ x: 5, color: "#059669" }}
  >
    <span className="me-2">{icon}</span>
    <strong>{label}:</strong>{" "}
    <span
      className="ms-1 fs-14 text-gray-700 text-break"
      style={{ wordBreak: "break-word", whiteSpace: "normal" }}
    >
      {value}
    </span>
  </motion.p>
);
