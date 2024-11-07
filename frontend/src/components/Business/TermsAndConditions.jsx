// src/TermsAndConditions.js
import React from "react";
import "/src/assets/css/TermsAndConditions.css";

const TermsAndConditions = ({ htmlContent }) => {
    
  return (
    <div className="terms-container">
      <h1>Terms and Conditions</h1>
      <div
        className="terms-content"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </div>
  );
};

export default TermsAndConditions;
