import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useNavigate } from "react-router";
import { CreateFreeListDetails, getAllFreeList } from "../../../Functions/functions";
import { preRequestFun } from "../../CreateBusiness/service/s3url";

export default function FloatingButtons() {
  const [showAdvertiseModal, setShowAdvertiseModal] = useState(false);
  const [showListingModal, setShowListingModal] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    brandName: "",
    logo: null, // For file uploads
    address: {
      buildingName: "",
      streetName: "",
      landMark: "",
      district: "",
      state: "",
      pinCode: "",
    },
    contactDetails: {
      primaryNumber: "",
      secondaryNumber: "",
      whatsAppNumber: "",
      primaryCountryCode: "",
      secondaryCountryCode: "",
      whatsappCountryCode: "",
      email: "",
      website: "",
    },
    description: "",
    enconnectUrl: "",
    images: null, // For multiple file uploads
  });

  

  const handleChange = async (e) => {
    const { name, value, files } = e.target;
  
    if (files) {
      // Handle single file upload (e.g., logo)
      if (name === "logo") {
        const logoFile = files[0];
        const logoLink = await preRequestFun(logoFile, "freelist");
        setFormData((prev) => ({
          ...prev,
          logo: logoLink.accessLink, // Correctly set the accessLink
        }));
      }
  
      // Handle multiple file uploads (e.g., images)
      if (name === "images") {
        const imageFiles = Array.from(files);
        const imageLinks = await Promise.all(
          imageFiles.map((file) => preRequestFun(file, "freelist"))
        );
  
        // Ensure the `images` array is updated correctly
        setFormData((prev) => ({
          ...prev,
          images: [...(prev.images || []), ...imageLinks.map(link => link.accessLink)], // Merge with existing images
        }));
      }
  
      return;
    }
  
    // Handle nested fields
    if (name.includes(".")) {
      const [key, subKey] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [key]: {
          ...prev[key],
          [subKey]: value,
        },
      }));
    } else {
      // Handle top-level fields
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Form submitted!");

    const res = await CreateFreeListDetails(formData);
    if (res.success) {
      alert("Success");
    } else {
      alert("Failed");
    }
  };
  // Function to handle button click (CreateFreeListDetails)

  return (
    <>
      {/* Fixed Buttons */}
      <div className="fixed-buttons d-md-block">
        <motion.button
          className="btn-advertise"
          onClick={() => navigate("/create-business")}
          whileHover={{ x: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          My Profile
        </motion.button>
        <br /> {/* Add this line */}
        <motion.button
          className="btn-listing"
          onClick={() => setShowListingModal(false)} //temporarily disabled
          whileHover={{ x: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          Free Listing
        </motion.button>
      </div>

      {/* Advertise Modal */}
      <div
        className={`modal fade ${showAdvertiseModal ? "show" : ""}`}
        style={{ display: showAdvertiseModal ? "block" : "none" }}
        tabIndex={-1}
      ></div>

      {/* Free Listing Modal */}
      <div
        className={`modal fade ${showListingModal ? "show" : ""}`}
        style={{ display: showListingModal ? "block" : "none" }}
        tabIndex={-1}
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header border-0">
              <h5 className="modal-title fw-bold">Create Free Listing</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowListingModal(false)}
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  {/* Name and Brand Name */}
                  <div className="col-md-6">
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      name="brandName"
                      className="form-control"
                      placeholder="Brand Name"
                      value={formData.brandName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Logo Upload */}
                  <div className="col-12">
                    <label className="form-label">Logo</label>
                    <input
                      type="file"
                      name="logo"
                      className="form-control"
                      accept="image/*"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Address Fields */}
                  <div className="col-md-6">
                    <input
                      type="text"
                      name="address.buildingName"
                      className="form-control"
                      placeholder="Building Name"
                      value={formData.address.buildingName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      name="address.streetName"
                      className="form-control"
                      placeholder="Street Name"
                      value={formData.address.streetName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      name="address.landMark"
                      className="form-control"
                      placeholder="Landmark"
                      value={formData.address.landMark}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      name="address.district"
                      className="form-control"
                      placeholder="District"
                      value={formData.address.district}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      name="address.state"
                      className="form-control"
                      placeholder="State"
                      value={formData.address.state}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      name="address.pinCode"
                      className="form-control"
                      placeholder="Pincode"
                      value={formData.address.pinCode}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Contact Details */}
                  <div className="col-md-4">
                    <input
                      type="tel"
                      name="contactDetails.primaryNumber"
                      className="form-control"
                      placeholder="Primary Number"
                      value={formData.contactDetails.primaryNumber}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <input
                      type="tel"
                      name="contactDetails.secondaryNumber"
                      className="form-control"
                      placeholder="Secondary Number"
                      value={formData.contactDetails.secondaryNumber}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-4">
                    <input
                      type="tel"
                      name="contactDetails.whatsAppNumber"
                      className="form-control"
                      placeholder="WhatsApp Number"
                      value={formData.contactDetails.whatsAppNumber}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-12">
                    <input
                      type="email"
                      name="contactDetails.email"
                      className="form-control"
                      placeholder="Email"
                      value={formData.contactDetails.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Description */}
                  <div className="col-12">
                    <textarea
                      name="description"
                      className="form-control"
                      rows={4}
                      placeholder="Business Description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>

                  {/* Images Upload */}
                  <div className="col-12">
                    <label className="form-label">Images (5 max)</label>
                    <input
                      type="file"
                      name="images"
                      className="form-control"
                      accept="image/*"
                      multiple
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* URLs */}
                  <div className="col-md-6">
                    <input
                      type="url"
                      name="contactDetails.website"
                      className="form-control"
                      placeholder="Website URL"
                      value={formData.contactDetails.website}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="url"
                      name="enconnectUrl"
                      className="form-control"
                      placeholder="Enconnect Profile URL"
                      value={formData.enconnectUrl}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="mt-4">
                  <motion.button
                    type="submit"
                    className="btn btn-submit w-100"
                    whileTap={{ scale: 0.95 }}
                  >
                    Submit Listing
                  </motion.button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* Modal Backdrop */}
      {(showAdvertiseModal || showListingModal) && (
        <div
          className="modal-backdrop fade show"
          onClick={() => {
            setShowAdvertiseModal(false);
            setShowListingModal(false);
          }}
        ></div>
      )}

      <style jsx>{`
        .fixed-buttons {
          position: fixed;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          z-index: 1000;
          display: flex;
          flex-direction: column;
          gap: 20px; /* For desktop screens */
        }

        .btn-submit {
          background: linear-gradient(to right, #e72693, #ff7e2b);
        }

        .btn-advertise,
        .btn-listing {
          border: none;
          color: white;
          padding: 10px 8px;
          text-align: center;
          font-size: 16px;
          cursor: pointer;
          border-radius: 8px 0 0 8px;
          width: 40px;
          transition: all 0.3s ease;
          writing-mode: vertical-lr;
          text-orientation: mixed;
          height: 130px;
          margin-top: 20px;
        }

        .btn-advertise {
          background-color: #e72693;
        }

        .btn-listing {
          background-color: #ff7e2b;
        }

        @media (max-width: 768px) {
          .fixed-buttons {
            position: fixed;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            z-index: 1000;
            display: flex;
            flex-direction: column;
            gap: 0px; /* For desktop screens */
          }

          .btn-advertise,
          .btn-listing {
            border: none;
            color: white;
            padding: 10px 8px;
            text-align: center;
            font-size: 16px;
            cursor: pointer;
            border-radius: 8px 0 0 8px;
            width: 40px;
            transition: all 0.3s ease;
            writing-mode: vertical-lr;
            text-orientation: mixed;
            height: 130px;
            margin-top: 20px;
          }

          .fixed-buttons br {
            display: block; /* Ensure the line break applies only on smaller screens */
          }
        }

        .btn-listing {
          background-color: #ff7e2b;
        }

        .modal-content {
          border-radius: 15px;
          border: none;
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
        }

        .modal-header {
          padding: 1.5rem;
        }

        .modal-body {
          padding: 1.5rem;
        }

        .form-control {
          padding: 0.75rem 1rem;
          border-radius: 8px;
          border: 1px solid #e0e0e0;
        }

        .form-control:focus {
          box-shadow: 0 0 0 3px rgba(0, 102, 255, 0.1);
          border-color: #0066ff;
        }

        .btn-primary {
          background-color: #0066ff;
          border: none;
          padding: 0.75rem;
          border-radius: 8px;
          font-weight: 500;
        }

        .btn-primary:hover {
          background-color: #0052cc;
        }
      `}</style>
    </>
  );
}
