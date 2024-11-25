/* eslint-disable react/no-unknown-property */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { TextField } from "@mui/material";
import { updateBusinessDetails } from "../store/businessSlice";
import { preRequestFun } from "../service/s3url";
import { ReactCropperComponent } from "../../../components/ReactCropper";
import { Spinner } from "../../../components/Loader/Spinner";

const BusinessDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const businessState = useSelector((state) => state.business);

  const [previewImage, setPreviewImage] = useState(businessState?.logo || "");
  const [resultImage, setResultImage] = useState(null)
  const [showCropper, setShowCropper] = useState(false);

  const [businessName, setBusinessName] = useState(
    businessState?.businessName || ""
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ logo: null, name: null });

  // Handle form submission with validation
  const handleBusinessSubmit = async () => {
    let hasError = false;
    if (!businessName) {
      setError({ ...error, name: "Business Name is required." });
      hasError = true;
    }
    if (!resultImage) {
      setError({ ...error, logo: "Business Logo is required." });
      hasError = true;
    }
    if (hasError) return;

    setError({});
    try {
      setIsLoading(true);
      let preReq = null;
      if (resultImage) {
        preReq = await preRequestFun(resultImage, "Landing");
      }
      dispatch(
        updateBusinessDetails({
          businessName,
          ...(preReq && { logo: preReq.accessLink }),
        })
      );
      navigate("/create-business/contact");
    } catch (e) {
      console.error("An error occurred during submission", e);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrevStep = () => navigate("/create-business");

  useEffect(() => {
    setPreviewImage(businessState?.logo);
    setBusinessName(businessState?.businessName);
  }, [businessState]);
  return (
    <div className="business-details-page">

      <div className="container-fluid">
        <div className="row justify-content-center align-items-center">
          {/* Left Section - Form */}
          <div className="col-12 col-md-6 p-5">
            <div className="form-container">
              <button
                className="btn btn-dark w-auto mb-4"
                onClick={handlePrevStep}
              >
                <i className="bi bi-arrow-left"></i>
              </button>
              <h2 className="fw-bold text-start mb-4">
                <span style={{ color: "#000000" }}>Enter Your</span> Business
                Details
              </h2>

              <div className="input-group mb-4 mt-2 w-100">
                <TextField
                  fullWidth
                  label="Business Name* (8 words)"
                  id="businessName"
                  variant="filled"
                  name="businessName"
                  autoComplete="businessName"
                  value={businessName}
                  inputProps={{ maxLength: 35 }}
                  onChange={(e) => setBusinessName(e.target.value)}
                  error={error?.name || businessName?.split("")?.length >= 35 ? true : false}
                  helperText={error?.name || businessName?.split("")?.length >= 35 ? "exceeded the limit" : ""}
                />
              </div>
              <ReactCropperComponent
                showCropper={showCropper}
                setShowCropper={setShowCropper}
                setResultImage={setResultImage}
                resultImage={resultImage}
                previewImage={previewImage}
                setPreviewImage={setPreviewImage}
                label={" Upload Business Logo*"}
                aspectRatio={1/1}
                ratio={" 1 : 1"} />

              {error?.logo && (
                <div className="text-danger mb-4">{error?.logo}</div>
              )}

              {isLoading ? <Spinner /> : <button
                className="btn btn-primary w-100 text-white p-2"
                onClick={handleBusinessSubmit}
              >
                Save & Next
              </button>}
            </div>
          </div>

          {/* Right Section - Business Name Display */}
          <div className="col-12 col-md-6 p-5">
            <div className="business-preview">
              <div className="text-center mb-4">
                <h3 className="fw-bold">Business Name Preview</h3>
              </div>
              <div className="preview-content text-center">
                {previewImage ? (
                  <img src={previewImage} alt="Business Logo" width="120" />
                ) : (
                  <div className="logo-placeholder">No Logo Uploaded</div>
                )}
                <h4 className="mt-4 text-uppercase">
                  {businessName || "Your Business Name"}
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .h-100vh {
          height: 100vh;
        }
        .left-portion {
          background-color: #f5f5f5;
        }
        .right-portion {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 2rem;
          position: relative;
        }
        .back-button-container {
          position: absolute;
          top: 1rem;
          left: 1rem;
          margin-top: 0.5rem;
          margin-left: 0.5rem;
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
        .btn-primary {
          background-color: #105193;
          border-color: #105193;
        }
        .btn-primary:hover {
          background-color: #107d93;
          border-color: #107d93;
        }
        @media (max-width: 768px) {
          .right-portion {
            padding: 1rem;
          }
          .back-button-container {
            margin-top: 0.75rem;
            margin-left: 0.75rem;
          }
        }
        @media (max-width: 576px) {
          .right-portion {
            padding: 0.5rem;
          }
          .back-button-container {
            margin-top: 1rem;
            margin-left: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default BusinessDetails;
