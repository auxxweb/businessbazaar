import { Box, Button, Typography } from "@mui/material";
import TemplateHeader from "../components/Business/TemplateHeader";
import useBusiness from "../Hooks/useBusiness";
import BackdropLoader from "../components/BackdropLoader";
import ContactSection from "../components/Business/ContactSection";
import WelcomeCard from "../components/Business/WelcomeCard";
import TemplateFooter from "../components/Business/TemplateFooter";
import SpecialServices from "../components/Business/SpecialServices";
import SubscribeSection from "../components/Business/SubscribeSection";
import ReviewSection from "../components/Business/ReviewSection";
import Gallery from "../components/Business/Gallery";
import ServicesSection from "../components/Business/ServicesSection";
import MenuSection from "../components/Business/MenuSection";
import { width } from "@fortawesome/free-brands-svg-icons/fa42Group";

const PremiumTemplate = () => {
  const { businessData, loading, closeDays } = useBusiness();
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap"
        rel="stylesheet"
      />
      <style>
        {" "}
        {`
                    ::-webkit-scrollbar {
                        width: 12px; /* Width of the entire scrollbar */
                    }

                    /* Scrollbar track */
                    ::-webkit-scrollbar-track {
                        background: rgb(243, 243, 244); /* Background of the scrollbar track */
                    }::-webkit-scrollbar-thumb {
                        background-color: ${businessData?.theme}; /* Color of the scrollbar thumb */
                        border-radius: 10px;     /* Rounded edges of the thumb */
                        border: 3px solid  ${businessData?.theme}; /* Padding around the thumb */
                    }
                .theme
                {
                    background-color: ${businessData?.theme};
                    color: white;
                    border: none;
                }.service-design.active{
                    background-color: ${businessData?.theme};
                }.address-section{
                background-color:${businessData?.theme};
                }.address-logo i{
                color: ${businessData?.theme};
                }.cat-option{
                    border-right: 1px dashed ${businessData?.theme};
                }.text-orange{
                        color: ${businessData?.theme};
                    }.dish-div:hover{
                        background-color: ${businessData?.theme};
                        color:white;
                    }.product-section{
                    padding:20px;
                    border:1px solid ${businessData?.theme};
                    border-radius:16px;
                        }.slick-dots .slick-active button{
                            background-color: ${businessData?.theme};
                            border-radius: 16px;
                        }
                    `}
      </style>

      <Box sx={{ overflowX: "hidden" }}>
        <TemplateHeader businessData={businessData} />
        <Box
          sx={{
            backgroundImage: `url(${businessData?.landingPageHero?.coverImage})`,
            // backgroundImage: `url(/business/dm.png)`,
            backgroundSize: "cover",
            objectFit: "fill",
            backgroundRepeat: "no-repeat",
            width: "100vw",
            height: "800px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              color: "#D3DFEB",
              maxWidth: "611px",
              height: "100%",
              textAlign: "center",
            }}
          >
            <Typography
              fontSize={"64px"}
              lineHeight={"76.8px"}
              fontWeight={"bold"}
              marginBottom={"15px"}
            >
              {businessData?.landingPageHero?.title}
            </Typography>
            <Typography fontSize={"16px"} lineHeight={"24px"}>
              {businessData?.landingPageHero?.description}
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
          <Box
            sx={{ position: "absolute", bottom: { xs: "-30%", md: "-21%" } }}
          >
            <ContactSection 
            
            businessData={businessData} />
          </Box>
        </Box>
        <Box mt={{ xs: "10rem", md: "5rem" }}>
          <WelcomeCard businessData={businessData} />
        </Box>

        <SpecialServices businessData={businessData} />
        <MenuSection businessData={businessData} />
        <ServicesSection businessData={businessData} />
        <Gallery businessData={businessData} />
        <ReviewSection businessData={businessData} />
        <SubscribeSection />

        <TemplateFooter businessData={businessData} closeDays={closeDays} />
        <BackdropLoader open={loading} />
      </Box>
    </>
  );
};

export default PremiumTemplate;
