import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useNavigate } from "react-router";
import {
  CreateFreeListDetails,
  getAllFreeList,
} from "../../../Functions/functions";
import { preRequestFun } from "../../CreateBusiness/service/s3url";
import { toast } from "react-toastify"; // Import toast from a library like react-toastify

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

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    // Name and Brand Name Validation
    if (!formData.name.trim()) newErrors.name = "Name is required .";
    if (!formData.brandName.trim())
      newErrors.brandName = "Brand Name is required.";

    // Logo and Images Validation
    if (!formData.logo) newErrors.logo = "Logo is required.";
    if (!formData.images || formData.images.length === 0)
      newErrors.images = "At least one image is required.";

    // Address Validation
    const addressFields = [
      "buildingName",
      "streetName",
      "landMark",
      "district",
      "state",
      "pinCode",
    ];
    addressFields.forEach((field) => {
      if (!formData.address[field].trim()) {
        newErrors[`address.${field}`] = `${field} is required.`;
      }
    });

    // Contact Details Validation
    if (
      !formData.contactDetails.primaryNumber.trim() ||
      isNaN(formData.contactDetails.primaryNumber)
    ) {
      newErrors["contactDetails.primaryNumber"] =
        "Primary number must be a valid number.";
    }

    if (
      !formData.contactDetails.whatsAppNumber.trim() ||
      isNaN(formData.contactDetails.whatsAppNumber)
    ) {
      newErrors["contactDetails.whatsAppNumber"] =
        "WhatsApp number must be a valid number.";
    }

    if (
      !formData.contactDetails.email.trim() ||
      !/\S+@\S+\.\S+/.test(formData.contactDetails.email)
    ) {
      newErrors["contactDetails.email"] = "Valid email is required.";
    }
    if (
      !formData.contactDetails.website.trim() ||
      !/^https?:\/\/[^\s$.?#].[^\s]*$/.test(formData.contactDetails.website)
    )
      newErrors["contactDetails.website"] = "Valid website URL is required.";

    // Description and Enconnect URL Validation
    if (!formData.description.trim())
      newErrors.description = "Description is required.";
    if (!formData.enconnectUrl.trim())
      newErrors.enconnectUrl = "Enconnect Profile URL is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleChange = async (e) => {
    const { name, value, files } = e.target;

    if (files) {
      if (name === "logo") {
        const logoFile = files[0];
        const logoLink = await preRequestFun(logoFile, "freelist");
        setFormData((prev) => ({ ...prev, logo: logoLink.accessLink }));
      }

      if (name === "images") {
        const imageFiles = Array.from(files);
        const imageLinks = await Promise.all(
          imageFiles.map((file) => preRequestFun(file, "freelist"))
        );
        setFormData((prev) => ({
          ...prev,
          images: [
            ...(prev.images || []),
            ...imageLinks.map((link) => link.accessLink),
          ],
        }));
      }

      return;
    }

    if (name.includes(".")) {
      const [key, subKey] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [key]: { ...prev[key], [subKey]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validate()) {
      toast.error("Please fix the errors in the form.");
      return;
    }

    try {
      const res = await CreateFreeListDetails(formData);
      if (res.success) {
        toast.success("Listing created successfully!");
        setFormData({
          name: "",
          brandName: "",
          logo: null,
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
          images: null,
        });
        setShowListingModal(false);
      } else {
        toast.error("Failed to create listing.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An unexpected error occurred.");
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
          onClick={() => setShowListingModal(true)} //temporarily disabled
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
                      className={`form-control ${
                        errors.name ? "is-invalid" : ""
                      }`}
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                    {errors.name && (
                      <div className="invalid-feedback">{errors.name}</div>
                    )}
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      name="brandName"
                      className={`form-control ${
                        errors.brandName ? "is-invalid" : ""
                      }`}
                      placeholder="Brand Name"
                      value={formData.brandName}
                      onChange={handleChange}
                    />
                    {errors.brandName && (
                      <div className="invalid-feedback">{errors.brandName}</div>
                    )}
                  </div>

                  {/* Logo Upload */}
                  <div className="col-12">
                    <label className="form-label">Logo</label>
                    <input
                      type="file"
                      name="logo"
                      className={`form-control ${
                        errors.logo ? "is-invalid" : ""
                      }`}
                      accept="image/*"
                      onChange={handleChange}
                    />
                    {errors.logo && (
                      <div className="invalid-feedback">{errors.logo}</div>
                    )}
                  </div>

                  {/* Address Fields */}
                  {[
                    "buildingName",
                    "streetName",
                    "landMark",
                    "district",
                    "state",
                    "pinCode",
                  ].map((field) => (
                    <div className="col-md-6" key={field}>
                      <input
                        type="text"
                        name={`address.${field}`}
                        className={`form-control ${
                          errors[`address.${field}`] ? "is-invalid" : ""
                        }`}
                        placeholder={field.replace(/([A-Z])/g, " $1").trim()}
                        value={formData.address[field]}
                        onChange={handleChange}
                      />
                      {errors[`address.${field}`] && (
                        <div className="invalid-feedback">
                          {errors[`address.${field}`]}
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Contact Details */}
                  {[
                    "primaryNumber",
                    "secondaryNumber",
                    "whatsAppNumber",
                    "email",
                    "website",
                  ].map((field) => (
                    <div
                      className={`col-md-${
                        field === "email" || field === "website" ? "12" : "4"
                      }`}
                      key={field}
                    >
                      <input
                        type={
                          field === "email"
                            ? "email"
                            : field.includes("Number")
                            ? "tel"
                            : "url"
                        }
                        name={`contactDetails.${field}`}
                        className={`form-control ${
                          errors[`contactDetails.${field}`] ? "is-invalid" : ""
                        }`}
                        placeholder={field.replace(/([A-Z])/g, " $1").trim()}
                        value={formData.contactDetails[field]}
                        onChange={handleChange}
                      />
                      {errors[`contactDetails.${field}`] && (
                        <div className="invalid-feedback">
                          {errors[`contactDetails.${field}`]}
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Description */}
                  <div className="col-12">
                    <textarea
                      name="description"
                      className={`form-control ${
                        errors.description ? "is-invalid" : ""
                      }`}
                      rows={4}
                      placeholder="Business Description"
                      value={formData.description}
                      onChange={handleChange}
                    ></textarea>
                    {errors.description && (
                      <div className="invalid-feedback">
                        {errors.description}
                      </div>
                    )}
                  </div>

                  {/* Images Upload */}
                  <div className="col-12">
                    <label className="form-label">Images (5 max)</label>
                    <input
                      type="file"
                      name="images"
                      className={`form-control ${
                        errors.images ? "is-invalid" : ""
                      }`}
                      accept="image/*"
                      multiple
                      onChange={handleChange}
                    />
                    {errors.images && (
                      <div className="invalid-feedback">{errors.images}</div>
                    )}
                  </div>

                  {/* Enconnect URL */}
                  <div className="col-12">
                    <input
                      type="url"
                      name="enconnectUrl"
                      className={`form-control ${
                        errors.enconnectUrl ? "is-invalid" : ""
                      }`}
                      placeholder="Enconnect Profile URL"
                      value={formData.enconnectUrl}
                      onChange={handleChange}
                    />
                    {errors.enconnectUrl && (
                      <div className="invalid-feedback">
                        {errors.enconnectUrl}
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="col-12">
                    <button type="submit" className="btn btn-submit">
                      Submit
                    </button>
                  </div>
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
