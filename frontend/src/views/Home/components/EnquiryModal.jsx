import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify"; // Assuming toast is used for notifications

const EnquiryModal = ({ show, onHide, businessName, handleFormSubmit,businessId }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate phone number
    if (!/^\d+$/.test(formData.phoneNumber)) {
      toast.error("Please enter a valid phone number.");
      return;
    }

    // Submit form data
    const success = await handleFormSubmit(e,formData,businessId);

    // Reset form after successful submission
    if (success) {
      setFormData({
        name: "",
        email: "",
        phoneNumber: "",
        message: "",
      });
    }
    onHide()
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      className="fade"
      backdrop="static"
      keyboard={false}
      size="lg"
    >
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="h4 fw-bold text-primary">
          Send Enquiry to {businessName}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-4 py-4">
        <form onSubmit={handleSubmit} className="needs-validation">
          <div className="row mb-3">
            <div className="col-md-6 mb-3 mb-md-0">
              <label htmlFor="name" className="form-label fw-semibold">
                Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control form-control-lg"
                id="name"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="email" className="form-label fw-semibold">
                Email <span className="text-danger">*</span>
              </label>
              <input
                type="email"
                className="form-control form-control-lg"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="phoneNumber" className="form-label fw-semibold">
              Phone Number <span className="text-danger">*</span>
            </label>
            <input
              type="tel"
              className="form-control form-control-lg"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Enter your phone number"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="form-label fw-semibold">
              Message <span className="text-danger">*</span>
            </label>
            <textarea
              className="form-control form-control-lg"
              id="message"
              name="message"
              rows={4}
              placeholder="Enter your message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="d-grid gap-2">
            <button
              type="submit"
              className="btn btn-lg btn-warning text-white fw-bold"
            >
              Submit Enquiry
            </button>
            <button
              type="button"
              className="btn btn-lg btn-outline-secondary"
              onClick={onHide}
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal.Body>
      <style jsx>{`
        .modal-content {
          border-radius: 1rem;
          border: none;
          box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
        }
        .form-control {
          border-radius: 0.5rem;
        }
        .form-control:focus {
          box-shadow: 0 0 0 0.25rem rgba(255, 193, 7, 0.25);
          border-color: #ffc107;
        }
        .btn-warning {
          background-color: #ffa500;
          border-color: #ffa500;
        }
        .btn-warning:hover {
          background-color: #ff9000;
          border-color: #ff9000;
        }
        @media (max-width: 767px) {
          .modal-body {
            padding: 1rem;
          }
        }
      `}</style>
    </Modal>
  );
};

export default EnquiryModal;
