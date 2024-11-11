import "/src/assets/css/TermsAndConditions.css";
import { Box, Typography } from "@mui/material";
import BackdropLoader from "../BackdropLoader";
import useTerms from "../../Hooks/useTerms";

const TermsAndConditions = () => {
  const { terms, termsLoading } = useTerms();

  return (
    <Box sx={{ overflowX: "hidden" }}>
      {/* <TemplateHeader businessData={businessData} /> */}
      <div className="terms-container">
        <h1>Terms and Conditions</h1>
        <Typography
          component="div"
          dangerouslySetInnerHTML={{ __html: terms }}
          // sx={{ fontSize: "1rem", color: "text.primary" }}
        />
      </div>
      <BackdropLoader open={termsLoading} />
    </Box>
  );
};

export default TermsAndConditions;
