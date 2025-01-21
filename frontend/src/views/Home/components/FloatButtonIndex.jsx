import { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useNavigate } from "react-router";

export default function FloatingButtons() {
  const [showAdvertiseModal, setShowAdvertiseModal] = useState(false);
  const [showListingModal, setShowListingModal] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      {/* Fixed Buttons */}
      <div className="fixed-buttons   d-md-block">
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
          onClick={() => setShowListingModal(true)}
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
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header border-0">
              <h5 className="modal-title">Advertise with Us</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowAdvertiseModal(false)}
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email Address"
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="tel"
                    className="form-control"
                    placeholder="Phone Number"
                    required
                  />
                </div>
                <div className="mb-3">
                  <textarea
                    className="form-control"
                    rows={4}
                    placeholder="Message"
                    required
                  ></textarea>
                </div>
                <motion.button
                  type="submit"
                  className="btn btn-primary w-100"
                  whileTap={{ scale: 0.95 }}
                >
                  Submit
                </motion.button>
              </form>
            </div>
          </div>
        </div>
      </div>

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
              <form>
                <div className="row g-3">
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Your Name"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Brand Name"
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Logo</label>
                    <input
                      type="file"
                      className="form-control"
                      accept="image/*"
                      required
                    />
                  </div>
                  <div className="col-12">
                    <textarea
                      className="form-control"
                      rows={2}
                      placeholder="Address"
                      required
                    ></textarea>
                  </div>
                  <div className="col-md-4">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Pincode"
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="District"
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Location"
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <input
                      type="tel"
                      className="form-control"
                      placeholder="Phone Number"
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <input
                      type="tel"
                      className="form-control"
                      placeholder="Phone Number 2 (Optional)"
                    />
                  </div>
                  <div className="col-md-4">
                    <input
                      type="tel"
                      className="form-control"
                      placeholder="WhatsApp Number"
                      required
                    />
                  </div>
                  <div className="col-12">
                    <textarea
                      className="form-control"
                      rows={4}
                      placeholder="Business Description"
                      required
                    ></textarea>
                  </div>
                  <div className="col-12">
                    <label className="form-label">Image Size (5 Nos)</label>
                    <input
                      type="file"
                      className="form-control"
                      accept="image/*"
                      multiple
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="url"
                      className="form-control"
                      placeholder="Website URL"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="url"
                      className="form-control"
                      placeholder="Enconnect Profile URL"
                      required
                    />
                  </div>
                </div>
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
            bottom: 100px;
            // top: auto;
            right: 100px;
            transform: none;
            flex-direction: row;
          }

          .btn-advertise,
          .btn-listing {
            writing-mode: horizontal-tb;
            width: auto;
            height: auto;
            padding: 8px 12px;
            font-size: 14px;
            border-radius: 8px;
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

        @media (max-width: 768px) {
          .fixed-buttons {
            bottom: 20px;
            top: auto;
            right: 20px;
            transform: none;
          }

          .btn-advertise,
          .btn-listing {
            width: auto;
            padding: 10px 15px;
            font-size: 14px;
          }
        }
      `}</style>
    </>
  );
}
