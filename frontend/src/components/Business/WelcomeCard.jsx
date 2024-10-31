/* eslint-disable react/prop-types */
import { Box, Button, Typography } from "@mui/material";

const WelcomeCard = ({ businessData }) => {
  return (
    <Box sx={{ display: "flex", flexDirection:{xs:"column", md:"row"} }}>
      <Box width={{md:"25%"}} maxHeight={"600px"} display={"flex"} justifyContent={"center"} alignItems={"center"} >

        <img
        //   src={businessData?.welcomePart?.coverImage}
          src={"/business/welcome.png"}
          width="100%"
          height={"auto"}
          alt="welcome image"
        />
      </Box>
      <Box width={{md:"75%"}} display={"flex"} justifyContent={"center"} alignItems={"center"}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "#6C757D",
            maxWidth: "611px",
            height: "100%",
            textAlign: "center",
            width:"100%",
          }}
        >
          <Typography
            fontSize={"58px"}
            lineHeight={"76.8px"}
            fontWeight={"bold"}
            marginBottom={"15px"}
            color={"#212529"}
          >
            Welcome to{" "}
            <Typography
              component="span"
              color={businessData?.theme}
              fontSize={"58px"}
              lineHeight={"76.8px"}
              fontWeight={"bold"}
            >
              auxxweb
            </Typography>
          </Typography>
          <Typography fontSize={"16px"} lineHeight={"24px"}>
            We offer comprehensive software development and digital marketing
            services to help your business thrive in the digital age. Our team
            of experts is committed to delivering innovative solutions that
            drive growth and success.
          </Typography>
          <Box marginTop={"30px"}>
            <Button
              sx={{
                textTransform: "capitalize",
                background: "#212529",
                color: "#ffffff",
                borderTopLeftRadius: "10px",
                borderBottomRightRadius: "10px",
                marginRight: "19px",
              }}
            >
              {" "}
              Menu{" "}
            </Button>
            <Button
              sx={{
                textTransform: "capitalize",
                background: businessData?.theme,
                color: "#ffffff",
                borderTopLeftRadius: "10px",
                borderBottomRightRadius: "10px",
              }}
            >
              {" "}
              Book a table{" "}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default WelcomeCard;
