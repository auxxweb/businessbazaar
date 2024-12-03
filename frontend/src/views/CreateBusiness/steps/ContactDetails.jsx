import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { MenuItem, TextField } from "@mui/material";
import CreateBusinessLocation from "../../../components/CreateBusinessLocation";
import { updateBusinessDetails } from "../store/businessSlice";
import { Spinner } from "react-bootstrap";

const libraries = ['places'];

const ContactDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const businessState = useSelector((state) => state.business);
  const [showLocation, setShowLocation] = useState(false)
  const [placeDetails, setPlaceDetails] = useState("")
  const [loading, setLoading] = useState(false)

  const [newFormData, setNewFormData] = useState({
    contactDetails: {
      name: "",
      primaryNumber: "",
      secondaryNumber: "",
      whatsappNumber: "",
      primaryCountryCode: "",
      secondaryCountryCode: "",
      whatsappCountryCode: "",
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

  const countryCodes = [

    { code: "+91", country: "India", cca2: "IN" },
    { code: "+974", country: "Qatar", cca2: "QA" },
    { code: "+968", country: "Oman", cca2: "OM" },
    { code: "+973", country: "Bahrain", cca2: "BH" },
  ]

  // const countryCodes = [
  //   { code: "+1", country: "US/CA", cca2: "US" },
  //   { code: "+44", country: "UK", cca2: "GB" },
  //   { code: "+91", country: "India", cca2: "IN" },
  //   { code: "+61", country: "Aust.", cca2: "AU" },
  //   { code: "+81", country: "Japan", cca2: "JP" },
  //   { code: "+49", country: "Ger.", cca2: "DE" },
  //   { code: "+86", country: "China", cca2: "CN" },
  //   { code: "+33", country: "France", cca2: "FR" },
  //   { code: "+39", country: "Italy", cca2: "IT" },
  //   { code: "+7", country: "Russia", cca2: "RU" },
  //   { code: "+55", country: "Brazil", cca2: "BR" },
  //   { code: "+27", country: "S.Af.", cca2: "ZA" },
  //   { code: "+34", country: "Spain", cca2: "ES" },
  //   { code: "+64", country: "NZ", cca2: "NZ" },
  //   { code: "+82", country: "Korea", cca2: "KR" },
  //   { code: "+971", country: "UAE", cca2: "AE" },
  //   { code: "+353", country: "Irel.", cca2: "IE" },
  //   { code: "+47", country: "Norw.", cca2: "NO" },
  //   { code: "+46", country: "Swed.", cca2: "SE" },
  //   { code: "+48", country: "Pol.", cca2: "PL" },
  //   { code: "+41", country: "Switz.", cca2: "CH" },
  //   { code: "+31", country: "Neth.", cca2: "NL" },
  //   { code: "+30", country: "Gree.", cca2: "GR" },
  //   { code: "+351", country: "Port.", cca2: "PT" },
  //   { code: "+52", country: "Mex.", cca2: "MX" },
  //   { code: "+90", country: "Turkey", cca2: "TR" },
  //   { code: "+94", country: "S.Lan", cca2: "LK" },
  //   { code: "+92", country: "Pak.", cca2: "PK" },
  //   { code: "+880", country: "B.Desh", cca2: "BD" },
  //   { code: "+62", country: "Indo.", cca2: "ID" },
  //   { code: "+66", country: "Thai.", cca2: "TH" },
  //   { code: "+63", country: "Phil.", cca2: "PH" },
  //   { code: "+60", country: "Mal.", cca2: "MY" },
  //   { code: "+65", country: "Sing.", cca2: "SG" },
  //   { code: "+45", country: "Den.", cca2: "DK" },
  //   { code: "+20", country: "Egypt", cca2: "EG" },
  //   { code: "+54", country: "Arg.", cca2: "AR" },
  //   { code: "+58", country: "Venez.", cca2: "VE" },
  //   { code: "+598", country: "Uru.", cca2: "UY" },
  //   { code: "+56", country: "Chile", cca2: "CL" },
  //   { code: "+51", country: "Peru", cca2: "PE" },
  //   { code: "+505", country: "Nica.", cca2: "NI" },
  //   { code: "+506", country: "C.R.", cca2: "CR" },
  //   { code: "+372", country: "Est.", cca2: "EE" },
  //   { code: "+370", country: "Lith.", cca2: "LT" },
  //   { code: "+371", country: "Latv.", cca2: "LV" },
  //   { code: "+994", country: "Azer.", cca2: "AZ" },
  //   { code: "+374", country: "Armen.", cca2: "AM" },
  //   { code: "+995", country: "Georg.", cca2: "GE" },
  //   { code: "+998", country: "Uzbek", cca2: "UZ" },
  //   { code: "+977", country: "Nepal", cca2: "NP" },
  //   { code: "+976", country: "Mong.", cca2: "MN" },
  //   { code: "+853", country: "Macau", cca2: "MO" },
  //   { code: "+852", country: "H.K.", cca2: "HK" },
  //   { code: "+855", country: "Camb.", cca2: "KH" },
  //   { code: "+856", country: "Laos", cca2: "LA" },
  //   { code: "+212", country: "Moro.", cca2: "MA" },
  //   { code: "+213", country: "Alg.", cca2: "DZ" },
  //   { code: "+216", country: "Tuni.", cca2: "TN" },
  //   { code: "+218", country: "Libya", cca2: "LY" },
  //   { code: "+254", country: "Kenya", cca2: "KE" },
  //   { code: "+255", country: "Tanz.", cca2: "TZ" },
  //   { code: "+256", country: "Ugand", cca2: "UG" },
  //   { code: "+234", country: "Nig.", cca2: "NG" },
  //   { code: "+233", country: "Ghana", cca2: "GH" },
  //   { code: "+225", country: "Ivory", cca2: "CI" },
  //   { code: "+221", country: "Sen.", cca2: "SN" },
  //   { code: "+250", country: "Rw.", cca2: "RW" },
  //   { code: "+231", country: "Liber", cca2: "LR" },
  //   { code: "+967", country: "Yemen", cca2: "YE" },
  //   { code: "+963", country: "Syria", cca2: "SY" },
  //   { code: "+964", country: "Iraq", cca2: "IQ" },
  //   { code: "+962", country: "Jorda", cca2: "JO" },
  //   { code: "+961", country: "Leb.", cca2: "LB" },
  //   { code: "+972", country: "Isr.", cca2: "IL" },
  //   { code: "+357", country: "Cyp.", cca2: "CY" },
  //   { code: "+84", country: "Viet.", cca2: "VN" },
  //   { code: "+673", country: "Brunei", cca2: "BN" },
  //   { code: "+975", country: "Bhut.", cca2: "BT" }
  // ];




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
        case "primaryCountryCode":
          value = newFormData?.contactDetails?.primaryCountryCode;
          break;
        case "whatsappCountryCode":
          value = newFormData?.contactDetails?.whatsappCountryCode;
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

    setLoading(true)
    if (validateRequiredFields()) {
      dispatch(
        updateBusinessDetails({
          contactDetails: newFormData.contactDetails,
          address: address,
          location: location,
        })
      );

      navigate("/create-business/category");
      setLoading(false)
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
    address?.streetName,
    address?.landMark,
    address?.city,
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
            {showLocation && <CreateBusinessLocation placeDetails={placeDetails} setPlaceDetails={setPlaceDetails} libraries={libraries} visible={showLocation} setVisible={setShowLocation} setLocation={setLocation} />}
            <div className="d-flex justify-content-between  mt-2">
              <p style={{ fontSize: "12px" }} className="text-secondary m-0 p-0">{placeDetails}</p>
              <span onClick={(() => setShowLocation(!showLocation))} className="w-fit border btn btn-primary d-flex align-items-center">
                <button className="border-0 bg-transparent ">
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
                <button style={{ width: "7rem", fontSize: "14px" }} className="border-0 bg-transparent text-white text-wrap ">Add Location</button>
              </span>
            </div>
            {/* Contact Numbers */}
            <div id="mobileNumberDiv" className="mt-4">
              <div className="row mt-3">
                <div className="col-12 mt-2 mt-sm-0">
                  <div className="input-group mt-2 w-100">
                    <TextField
                      select
                      label="Country Code"
                      variant="filled"
                      name="primaryCountryCode"
                      value={newFormData.contactDetails.primaryCountryCode}
                      onChange={handleContactChange}
                      error={!!errors.primaryCountryCode}
                      helperText={errors.primaryCountryCode}
                      style={{ width: '25%' }}
                    >
                      {countryCodes.map(({ code, country, cca2 }) => (
                        <MenuItem key={code} value={code}>
                          <img
                            src={`https://flagcdn.com/w20/${cca2.toLowerCase()}.png`}
                            alt={`${country} flag`}
                            className="mr-2 w-5 h-4"
                          />

                          {`(${code})`}
                        </MenuItem>
                      ))}
                    </TextField>
                    <TextField
                      fullWidth
                      label="Primary number*"
                      variant="filled"
                      name="primaryNumber"
                      value={newFormData.contactDetails.primaryNumber}
                      onChange={handleContactChange}
                      error={!!errors.primaryNumber}
                      helperText={errors.primaryNumber}
                      style={{ width: '75%' }}
                    />
                  </div>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-12 mt-2 mt-sm-0">
                  <div className="input-group mt-2 w-100">
                    <TextField
                      select
                      label="Country Code"
                      variant="filled"
                      name="secondaryCountryCode"
                      value={newFormData.contactDetails.secondaryCountryCode} // Default to India
                      onChange={handleContactChange}
                      error={!!errors.secondaryCountryCode}
                      helperText={errors.secondaryCountryCode}
                      style={{ width: '25%' }}
                    >
                      {countryCodes.map(({ code, country, cca2 }) => (
                        <MenuItem key={code} value={code}>
                          <img
                            src={`https://flagcdn.com/w20/${cca2.toLowerCase()}.png`}
                            alt={`${country} flag`}
                            className="mr-2 w-5 h-4"
                          />
                          {`(${code})`}
                        </MenuItem>
                      ))}
                    </TextField>

                    <TextField
                      fullWidth
                      label="Alternative number"
                      variant="filled"
                      name="secondaryNumber"
                      value={newFormData.contactDetails.secondaryNumber}
                      onChange={handleContactChange}
                      error={!!errors.secondaryNumber}
                      helperText={errors.secondaryNumber}
                      style={{ width: '75%' }}
                    />
                  </div>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-12 mt-2 mt-sm-0">
                  <div className="input-group mt-2 w-100">
                    <TextField
                      select
                      label="Country Code"
                      variant="filled"
                      name="whatsappCountryCode"
                      value={newFormData.contactDetails.whatsappCountryCode}
                      onChange={handleContactChange}
                      error={!!errors.whatsappCountryCode}
                      helperText={errors.whatsappCountryCode}
                      style={{ width: '25%' }}// Adjust width for mobile and desktop
                    >
                      {countryCodes.map(({ code, country, cca2 }) => (
                        <MenuItem key={code} value={code}>
                          <img
                            src={`https://flagcdn.com/w20/${cca2.toLowerCase()}.png`}
                            alt={`${country} flag`}
                            className="mr-2 w-5 h-4"
                          />
                          {`(${code})`}
                        </MenuItem>
                      ))}
                    </TextField>
                    <TextField
                      fullWidth
                      label="WhatsApp number*"
                      variant="filled"
                      name="whatsappNumber"
                      value={newFormData.contactDetails.whatsappNumber}
                      onChange={handleContactChange}
                      error={!!errors.whatsappNumber}
                      helperText={errors.whatsappNumber}
                      style={{ width: '75%' }}// Adjust width for mobile and desktop
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

          <div className="col-12 mt-3 text-center">
            {loading ? <Spinner variant="primary" /> : <button
              className="btn btn-primary btn-lg w-100"
              onClick={contactSubmitHandler}
            >
              Save & Continue
            </button>}
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
                          <p className="fs-16 text-break">{showCaseAddress}</p>
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
                          <p className="fs-16 text-break">
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
                            +91  {newFormData.contactDetails.primaryNumber}
                          </p>
                          <p className="fs-16">
                            +91 {newFormData.contactDetails.secondaryNumber}
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
