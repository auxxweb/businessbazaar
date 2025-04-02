import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { X, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router";
import Cropper from "react-easy-crop";
import {
  CreateFreeListDetails,
  fetchCategories,
  getAllFreeList,
} from "../../../Functions/functions";
import { preRequestFun } from "../../CreateBusiness/service/s3url";
import { toast } from "react-toastify"; // Import toast from a library like react-toastify
import "cropperjs/dist/cropper.css";
import ReactCropper from "react-cropper";
import getCroppedImg from "../../../utils/cropper.utils";
import { AnimatePresence } from "framer-motion";

export default function FloatingButtons({fetchFreeList}) {
  const [showAdvertiseModal, setShowAdvertiseModal] = useState(false);
  const [showListingModal, setShowListingModal] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const navigate = useNavigate();
  const [showCropModal, setShowCropModal] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    brandName: "",
    password: "",
    category: "",
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

  const [logoPreview, setLogoPreview] = useState(null);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    // Name and Brand Name Validation
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.brandName.trim())
      newErrors.brandName = "Brand Name is required.";

    // Logo and Images Validation
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

    if (!formData.password.trim()) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
    }

    // Handle nested fields (address, contactDetails, etc.)
    if (name === "confirmPassword") {
      setFormData((prev) => ({ ...prev, confirmPassword: value }));

      // Check if passwords match
      if (value !== formData.password) {
        updatedErrors.confirmPassword = "Passwords do not match.";
      } else {
        delete updatedErrors.confirmPassword;
      }
    }

    if (!formData.category) newErrors.category = "Category is required.";
    // Contact Details Validation
    if (
      !formData.contactDetails.primaryNumber.trim() ||
      isNaN(formData.contactDetails.primaryNumber) ||
      formData.contactDetails.primaryNumber.length !== 10
    ) {
      newErrors["contactDetails.primaryNumber"] =
        "Primary number must be a valid 10-digit number.";
    }

    if (
      !formData.contactDetails.whatsAppNumber.trim() ||
      isNaN(formData.contactDetails.whatsAppNumber) ||
      formData.contactDetails.whatsAppNumber.length !== 10
    ) {
      newErrors["contactDetails.whatsAppNumber"] =
        "WhatsApp number must be a valid 10-digit number.";
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
    ) {
      newErrors["contactDetails.website"] = "Valid website URL is required.";
    }

    if (!formData.description.trim())
      newErrors.description = "Description is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = async (e) => {
    const { name, value, files } = e.target;

    if (files) {
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
        setFormData((prev) => ({
          ...prev,
          
          images: imageLinks.map((link) => link.accessLink),
        }));
        setImagePreviews(imageFiles.map((file) => URL.createObjectURL(file)));
      }
      return;
    }

    let updatedErrors = { ...errors };

    // Handle nested fields (address, contactDetails, etc.)
    if (name.includes(".")) {
      const [key, subKey] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [key]: { ...prev[key], [subKey]: value },
      }));

      // Validate and remove error if corrected
      if (value.trim()) {
        delete updatedErrors[name];
      } else {
        updatedErrors[name] = `${subKey} is required.`;
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));

      // Validate and remove error if corrected
      if (value.trim()) {
        delete updatedErrors[name];
      } else {
        updatedErrors[name] = `${name} is required.`;
      }
    }

    // Specific validation for primary number and WhatsApp number
    if (
      name === "contactDetails.primaryNumber" ||
      name === "contactDetails.whatsAppNumber"
    ) {
      if (value.trim() && !isNaN(value) && value.length === 10) {
        delete updatedErrors[name];
      } else {
        updatedErrors[name] = `${
          name === "contactDetails.primaryNumber"
            ? "Primary number"
            : "WhatsApp number"
        } must be a valid 10-digit number.`;
      }
    }

    setErrors(updatedErrors);
  };

  const [logoFile, setLogoFile] = useState(null);

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState(null);
  const handleCropSave = async () => {
    try {
      const { fileUrl, blob } = await getCroppedImg(logoPreview, croppedArea);
      setLogoPreview(fileUrl); // Set the cropped image preview
      setFormData((prev) => ({ ...prev, logo: fileUrl })); // Update form data with the cropped image URL
      setShowCropModal(false); // Close the crop modal
     
      const croppedFile = new File(
        [blob],
        logoFile?.name || "cropped-logo.png",
        { type: blob.type }
      );
      const prereq = await preRequestFun(croppedFile,'freelist')
      
      setFormData((prev) => ({
        ...prev,
        logo: prereq.accessLink,
      }));
      setLogoFile(croppedFile); // Store the cropped file
    } catch (e) {
      console.error("Error cropping image:", e);
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
        fetchFreeList()
        setShowListingModal(false);
      } else {
        toast.error("Failed to create listing.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An unexpected error occurred.");
    }
  };

  const handleRemoveImage = (index) => {
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
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
          Create Profile
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
                  {/* Email */}
                  <div className="col-md-6">
                    <input
                      type="email"
                      name="contactDetails.email"
                      className={`form-control ${
                        errors["contactDetails.email"] ? "is-invalid" : ""
                      }`}
                      placeholder="Email"
                      value={formData.contactDetails.email}
                      onChange={handleChange}
                    />
                    {errors["contactDetails.email"] && (
                      <div className="invalid-feedback">
                        {errors["contactDetails.email"]}
                      </div>
                    )}
                  </div>
                  {/* Password */}
                  <div className="col-md-6 position-relative">
                    <div className="input-group">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        className={`form-control ${
                          errors.password ? "is-invalid" : ""
                        }`}
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <div className="invalid-feedback">{errors.password}</div>
                    )}
                  </div>
                  {/* Category */}
                  <div className="col-md-12">
                    <select
                      name="category"
                      className={`form-control ${
                        errors.category ? "is-invalid" : ""
                      }`}
                      value={formData.category}
                      onChange={(e) => {
                        setFormData((prev) => ({
                          ...prev,
                          category: e.target.value,
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
                  {/* Other Fields */}
                  {/* Contact Details */}
                  {[
                    "primaryNumber",
                    "secondaryNumber",
                    "whatsAppNumber",
                    "website",
                  ].map((field) => (
                    <div className="col-md-6" key={field}>
                      <input
                        type={field.includes("Number") ? "tel" : "url"}
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
                  {/* Logo Upload */}
                  <div className="col-12">
                    <label className="form-label">Logo</label>
                    <input
                      type="file"
                      name="logo"
                      className="form-control"
                      accept="image/*"
                      onChange={handleChange}
                    />
                    {logoPreview && (
                      <img
                        src={logoPreview}
                        alt="Logo Preview"
                        className="img-thumbnail mt-2"
                        style={{ width: "100px" }}
                      />
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
                      className="form-control"
                      accept="image/*"
                      multiple
                      onChange={handleChange}
                    />
                    <div className="d-flex gap-2 flex-wrap mt-2">
                      {imagePreviews.map((src, index) => (
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
                  {/* Enconnect URL */}
                  <div className="col-12">
                    <input
                      type="url"
                      name="enconnectUrl"
                      className={`form-control ${
                        errors.enconnectUrl ? "is-invalid" : ""
                      }`}
                      placeholder="Auxxbay Profile URL"
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
                    <button type="submit" className="btn btn-submit w-100">
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {showCropModal && logoFile && (
          <div
            className="modal fade show d-block"
            tabIndex="-1"
            role="dialog"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
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
