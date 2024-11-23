import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { TextField } from "@mui/material";
import CreateBusinessLocation from "../../../components/CreateBusinessLocation";
import { updateBusinessDetails } from "../store/businessSlice";

const libraries = ['places'];

const ContactDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const businessState = useSelector((state) => state.business);
  const [showLocation, setShowLocation] = useState(false)
  const [placeDetails, setPlaceDetails] = useState("")

  const [newFormData, setNewFormData] = useState({
    contactDetails: {
      name: "",
      primaryNumber: "",
      secondaryNumber: "",
      whatsappNumber: "",
      email: "",
      website: "",
    },
  });



  const [address, setAddress] = useState({
    buildingName: "",
    streetName: "",
    landMark: "",
    city: "",
    state: "",
    pinCode: "",
  });

  const [location, setLocation] = useState({
    lat: "",
    lon: "",
  });

  const [errors, setErrors] = useState({});

  const handleContactChange = (event) => {
    const { name, value } = event.target;
    setNewFormData((prevData) => ({
      ...prevData,
      contactDetails: {
        ...prevData.contactDetails,
        [name]: value,
      },
    }));
    validateField(name, value);
  };

  const validateField = (field, value) => {
    const phoneNumberRegex = /^[+]?[0-9]{10,15}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const pinCodeRegex = /^[0-9]{6}$/;

    const newErrors = { ...errors }; // Keep current errors

    // Perform validation based on field type
    switch (field) {
      case "primaryNumber":
        if (!value) {
          newErrors.primaryNumber = "Primary number is required.";
        } else if (!phoneNumberRegex.test(value)) {
          newErrors.primaryNumber =
            "Invalid primary number. Must be between 10-15 digits.";
        } else {
          delete newErrors.primaryNumber;
        }
        break;

      case "whatsappNumber":
        if (!value) {
          newErrors.whatsappNumber = "WhatsApp number is required.";
        } else if (!phoneNumberRegex.test(value)) {
          newErrors.whatsappNumber =
            "Invalid WhatsApp number. Must be between 10-15 digits.";
        } else {
          delete newErrors.whatsappNumber;
        }
        break;

      case "email":
        if (!value) {
          newErrors.email = "Email is required.";
        } else if (!emailRegex.test(value)) {
          newErrors.email = "Invalid email format.";
        } else {
          delete newErrors.email;
        }
        break;

      case "secondaryNumber":
        if (value && !phoneNumberRegex.test(value)) {
          newErrors.secondaryNumber =
            "Invalid secondary number. Must be between 10-15 digits.";
        } else {
          delete newErrors.secondaryNumber;
        }
        break;

      case "pinCode":
        if (!value) {
          newErrors.pinCode = "PinCode is required.";
        } else if (!pinCodeRegex.test(value)) {
          newErrors.pinCode = "Invalid pin code. It should be 6 digits.";
        } else {
          delete newErrors.pinCode;
        }
        break;

      case "buildingName":
        if (!value) {
          newErrors.buildingName = "Building name is required.";
        } else {
          delete newErrors.buildingName;
        }
        break;

      case "state":
        if (!value) {
          newErrors.state = "State is required.";
        } else {
          delete newErrors.state;
        }
        break;

      case "city":
        if (!value) {
          newErrors.city = "City is required.";
        } else {
          delete newErrors.city;
        }
        break;

      case "streetName":
        if (!value) {
          newErrors.streetName = "Street / Colony name is required.";
        } else {
          delete newErrors.streetName;
        }
        break;

      default:
        break;
    }

    // Update errors state
    setErrors(newErrors);
    return !newErrors[field]; // Returns true if the specific field has no error
  };

  const validateRequiredFields = () => {
    const requiredFields = [
      "primaryNumber",
      "whatsappNumber",
      "email",
      "pinCode",
      "buildingName",
      "state",
      "city",
      "streetName",
    ];

    const newErrors = { ...errors }; // Keep current errors
    let isValid = true;

    // Loop through required fields and check if they are filled
    requiredFields.forEach((field) => {
      let value;

      switch (field) {
        case "primaryNumber":
          value = newFormData?.contactDetails?.primaryNumber;
          break;
        case "whatsappNumber":
          value = newFormData?.contactDetails?.whatsappNumber;
          break;
        case "email":
          value = newFormData?.contactDetails?.email;
          break;
        case "pinCode":
          value = address?.pinCode;
          break;
        case "buildingName":
          value = address?.buildingName;
          break;
        case "state":
          value = address?.state;
          break;
        case "city":
          value = address?.city;
          break;
        case "streetName":
          value = address?.streetName;
          break;
        default:
          break;
      }

      // Check if value is missing
      if (!value) {
        newErrors[field] = `${field} is required.`;
        isValid = false;
      } else {
        delete newErrors[field]; // Remove any previous errors for that field
      }
    });

    // Update errors state
    setErrors(newErrors);
    return isValid; // Returns true if all required fields are filled
  };

  const contactSubmitHandler = () => {
    console.log(newFormData, "new-formData");

    if (validateRequiredFields()) {
      dispatch(
        updateBusinessDetails({
          contactDetails: newFormData.contactDetails,
          address: address,
          location: location,
        })
      );

      navigate("/create-business/category");
    }
  };

  const handlePrevStep = () => navigate("/create-business/details");

  const handleAddressChange = (event) => {
    const { name, value } = event.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
    setNewFormData((prevData) => ({
      ...prevData,
      contactDetails: {
        ...prevData.contactDetails,
        [name]: value,
      },
    }));
    validateField(name, value);
  };

  useEffect(() => {
    if (Object.keys(businessState?.contactDetails)?.length) {
      setNewFormData({
        contactDetails: businessState?.contactDetails,
      });
    }
    setAddress(businessState?.address);
    setLocation(businessState?.location);
  }, [businessState]);

  const showCaseAddress = [
    address?.buildingName,
    address?.city,
    address?.landMark,
    address?.streetName,
    address?.state,
    address?.pinCode,
  ]
    .filter(Boolean)
    .toString();
  return (
    <div className="h-100vh create-business-div">
      <div className="row px-4 h-100">
        <div className="col-12 col-md-6 row align-items-center right-portion p-5">
          <div className="col-12 text-start">
            <button
              className="btn btn-dark w-auto float-start"
              onClick={handlePrevStep}
            >
              <i className="bi bi-arrow-left"></i>
            </button>
          </div>
          <div className="col-12">
            <h1 className="fw-bold text-center text-md-start mb-2">
              <span className="title-main">Add</span> <br />
              <span className="title-highlight">Contact Details</span>
            </h1>
          </div>
          <div className="col-12 p-5 p-sm-0 mt-3">
            {/* Building Name */}
            <div className="input-group mt-2 w-100">
              <TextField
                fullWidth
                label="Building name*"
                id="buildingName"
                variant="filled"
                name="buildingName"
                autoComplete="buildingName"
                value={address.buildingName}
                onChange={handleAddressChange}
                error={!!errors?.buildingName}
                helperText={errors?.buildingName}
              />
            </div>

            {/* City */}
            <div className="input-group mt-2 w-100">
              <TextField
                fullWidth
                label="City*"
                variant="filled"
                name="city"
                value={address.city}
                onChange={handleAddressChange}
                error={!!errors?.city}
                helperText={errors?.city}
              />
            </div>

            {/* Street Name */}
            <div className="input-group mt-2 w-100">
              <TextField
                fullWidth
                label="Street / Colony name*"
                variant="filled"
                name="streetName"
                value={address.streetName}
                onChange={handleAddressChange}
                error={!!errors?.streetName}
                helperText={errors?.streetName}
              />
            </div>

            {/* Landmark */}
            <div className="input-group mt-2 w-100">
              <TextField
                fullWidth
                label="Landmark"
                variant="filled"
                name="landMark"
                value={address.landMark}
                onChange={handleAddressChange}
              />
            </div>

            {/* State and Pincode in the same row */}
            <div className="row">
              <div className="col-12 col-md-6 mt-3">
                <div className="input-group mt-2 w-100">
                  <TextField
                    fullWidth
                    label="State*"
                    variant="filled"
                    name="state"
                    value={address.state}
                    onChange={handleAddressChange}
                    error={!!errors?.state}
                    helperText={errors?.state}
                  />
                </div>
              </div>
              <div className="col-12 col-md-6 mt-3">
                <div className="input-group mt-2 w-100">
                  <TextField
                    fullWidth
                    label="Pincode*"
                    variant="filled"
                    type="number"
                    name="pinCode"
                    value={address.pinCode}
                    onChange={handleAddressChange}
                    error={!!errors?.pinCode}
                    helperText={errors?.pinCode}
                  />
                </div>
              </div>
            </div>

            {/* Location */}
            {showLocation && <CreateBusinessLocation setPlaceDetails={setPlaceDetails} libraries={libraries} visible={showLocation} setVisible={setShowLocation} setLocation={setLocation} />}
            <div className="d-flex justify-content-between  mt-2">
              <p style={{ fontSize: "12px" }} className="text-secondary m-0 p-0">{placeDetails}</p>
              <span onClick={(() => setShowLocation(!showLocation))} className="w-fit border btn btn-primary d-flex align-items-center">
                <button  className="border-0 bg-transparent ">
                  <svg fill="#fff" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                    width="17px" height="17px" viewBox="0 0 395.71 395.71"
                    xml:space="preserve">
                    <g>
                      <path d="M197.849,0C122.131,0,60.531,61.609,60.531,137.329c0,72.887,124.591,243.177,129.896,250.388l4.951,6.738
		c0.579,0.792,1.501,1.255,2.471,1.255c0.985,0,1.901-0.463,2.486-1.255l4.948-6.738c5.308-7.211,129.896-177.501,129.896-250.388
		C335.179,61.609,273.569,0,197.849,0z M197.849,88.138c27.13,0,49.191,22.062,49.191,49.191c0,27.115-22.062,49.191-49.191,49.191
		c-27.114,0-49.191-22.076-49.191-49.191C148.658,110.2,170.734,88.138,197.849,88.138z"/>
                    </g>
                  </svg>
                </button>
                <button style={{width:"7rem",fontSize:"14px"}} className="border-0 bg-transparent text-white text-wrap ">Add Location</button>
              </span>
            </div>
            {/* Contact Numbers */}
            <div id="mobileNumberDiv" className="mt-4">
              <div className="row mt-3">
                <div className="col-12 mt-2 mt-sm-0">
                  <div className="input-group mt-2 w-100">
                    <TextField
                      fullWidth
                      label="Primary number*"
                      variant="filled"
                      name="primaryNumber"
                      value={newFormData.contactDetails.primaryNumber}
                      onChange={handleContactChange}
                      error={!!errors.primaryNumber}
                      helperText={errors.primaryNumber}
                    />
                  </div>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-12 mt-2 mt-sm-0">
                  <div className="input-group mt-2 w-100">
                    <TextField
                      fullWidth
                      label="Alternative number"
                      variant="filled"
                      name="secondaryNumber"
                      value={newFormData.contactDetails.secondaryNumber}
                      onChange={handleContactChange}
                      error={!!errors.secondaryNumber}
                      helperText={errors.secondaryNumber}
                    />
                  </div>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-12 mt-2 mt-sm-0">
                  <div className="input-group mt-2 w-100">
                    <TextField
                      fullWidth
                      label="WhatsApp number*"
                      variant="filled"
                      name="whatsappNumber"
                      value={newFormData.contactDetails.whatsappNumber}
                      onChange={handleContactChange}
                      error={!!errors.whatsappNumber}
                      helperText={errors.whatsappNumber}
                    />
                  </div>
                </div>
              </div>
            </div>

            <hr />
            {/* Email Address */}
            <div id="emailDiv" className="mt-4">
              <div className="row mt-3">
                <div className="col-12">
                  <div className="input-group mt-2 w-100">
                    <TextField
                      fullWidth
                      label="Email address*"
                      variant="filled"
                      name="email"
                      value={newFormData.contactDetails.email}
                      onChange={handleContactChange}
                      error={!!errors.email}
                      helperText={errors.email}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Website Link */}
            <div className="mt-4">
              <div className="input-group mt-2 w-100">
                <TextField
                  fullWidth
                  label="Website link"
                  variant="filled"
                  name="website"
                  inputProps={{ maxLength: 200 }}
                  value={newFormData.contactDetails.website}
                  onChange={handleContactChange}
                  error={!!errors.website}
                  helperText={errors.website}
                />
              </div>
            </div>
          </div>

          <div className="col-12 mt-3 text-end">
            <button
              className="btn btn-primary btn-lg w-100"
              onClick={contactSubmitHandler}
            >
              Save & Continue
            </button>
          </div>
        </div>

        <div className="left-portion p-3 col-12 col-lg-6 row align-items-center">
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap"
            rel="stylesheet"
          />
          <style>
            {" "}
            {`
                  .btn-primary {
      background-color: #105193;
      border-color: #105193;
    }
    .btn-primary:hover {
      background-color: #107d93;
      border-color: #107d93;
    }
               .title-text {
      text-align: left;
    }
    .title-main {
      color: black;
    }
    .title-highlight {
      color: #105193;
    }
              .theme
              {
                  background-color: #FC791A;
                  color: white;
                  border: none;
              }.service-design.active{
                  background-color: #FC791A;
              }.address-section{
              background-color:#FC791A;
              }.address-logo i{
              color: #FC791A;
              }.cat-option{
                  border-right: 1px dashed #FC791A;
              }.text-orange{
                      color: #FC791A;
                  }.dish-div:hover{
                      background-color: #FC791A;
                      color:white;
                  }
                  `}
          </style>
          <div
            className="p-3"
            style={{ border: "1px dashed black", borderRadius: "16px" }}
          >
            <p className="text-center">
              This section contains items for the Contact Information.
            </p>
            <div className="mt-5 mb-5">
              <div className="container p-top">
                <div className="col-12 address-section">
                  <div className="row">
                    <div className="col-12 col-lg-4 mb-3 mb-lg-0">
                      <div className="row align-items-center justify-content-start">
                        <div className="col-auto address-logo">
                          <i className="bi bi-geo-alt-fill"></i>
                        </div>
                        <div className="col">
                          <span className="fs-13">Address</span>
                          <p className="fs-16">{showCaseAddress}</p>
                          {/* <p className="fs-16">
                            {address.buildingName},{address.city},
                            {address.landMark},{address.streetName},{" "}
                            {address.state},{address.pinCode}
                          </p> */}
                        </div>
                      </div>
                    </div>

                    <div className="col-12 col-lg-4 mb-3 mb-lg-0">
                      <div className="row align-items-center justify-content-start">
                        <div className="col-auto address-logo">
                          <i className="bi bi-envelope-fill"></i>
                        </div>
                        <div className="col">
                          <span className="fs-13">Send Email</span>
                          <p className="fs-16">
                            {newFormData.contactDetails.email}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="col-12 col-lg-4 mb-3 mb-lg-0">
                      <div className="row align-items-center justify-content-start">
                        <div className="col-auto address-logo">
                          <i className="bi bi-telephone"></i>
                        </div>
                        <div className="col">
                          <span className="fs-13">Contact</span>

                          <p className="fs-16">
                            {newFormData.contactDetails.primaryNumber}
                          </p>
                          <p className="fs-16">
                            {newFormData.contactDetails.secondaryNumber}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactDetails;
