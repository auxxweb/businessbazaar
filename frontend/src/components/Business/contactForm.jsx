/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import 'react-phone-input-2/lib/style.css';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import { submitContactForm } from '../../Functions/functions';

function ContactForm({ businessData }) {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false); // To track form submission

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Start submitting

    try {
      const response = await submitContactForm({
        ...formData,
        businessId: id,
      });

      if (response?.data) {
        toast.success("Form submitted successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
          style: {
            backgroundColor: "#38a20e", // Green color for success
            color: "#FFFFFF", // White text
          },
        });
        setFormData({
          name: '',
          email: '',
          phoneNumber: '',
          message: '',
        });
      }
    } catch (error) {
      toast.error("Failed to submit the form. Please try again later.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        style: {
          backgroundColor: "#aa0808", // Red color for error
          color: "#FFFFFF", // White text
        },
      });
    } finally {
      setIsSubmitting(false); // Stop submitting
    }
  };

  return (
    <div className="contact-form-container bg-light">
      <form onSubmit={handleFormSubmit} className="contact-form">
        <h2 className="form-title">Contact Us</h2>
        <div className="form-group">
          <div className="row">
            <div className="col-md-6">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            className="form-control"
          ></textarea>
        </div>
        <div className="d-flex justify-content-center align-items-center mt-4">
          <button
            type="submit"
            className="submit-button"
            style={{
              backgroundColor: businessData?.theme,
              borderRadius: '10px',
              border: '1px solid #ced4da',
            }}
            disabled={isSubmitting} // Disable button when submitting
          >
            {isSubmitting ? "Submitting..." : "Send Message"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ContactForm;