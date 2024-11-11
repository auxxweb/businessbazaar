// src/TermsAndConditions.js
import useBusinessTerms from "../../Hooks/useBusinessTerms";
import BackdropLoader from "../BackdropLoader";
import "../../assets/css/TermsAndConditions.css";
import TemplateHeader from "./TemplateHeader";
import useBusiness from "../../Hooks/useBusiness";
import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

const BusinessTermsAndConditions = () => {
  const { id } = useParams();

  const { businessData, loading } = useBusiness();
  const { businessTerms, termsLoading } = useBusinessTerms(id);

  return (
    <Box sx={{ overflowX: "hidden" }}>
      <TemplateHeader businessData={businessData} />
      <Box className="terms-container" mt={16}>
        <h1>Terms and Conditions</h1>
        <Typography
          component="div"
          dangerouslySetInnerHTML={{ __html: businessTerms }}
          // sx={{ fontSize: "1rem", color: "text.primary" }}
        />
      </Box>
      <BackdropLoader open={termsLoading || loading} />
    </Box>
  );
};

export default BusinessTermsAndConditions;
