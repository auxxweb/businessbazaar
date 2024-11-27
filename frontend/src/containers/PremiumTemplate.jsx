import { Box, Button, Typography } from "@mui/material";
import TemplateHeader from "/src/components/Business/TemplateHeader";
import useBusiness from "/src/Hooks/useBusiness";
import BackdropLoader from "/src/components/BackdropLoader";
import ContactSection from "/src/components/Business/ContactSection";
import WelcomeCard from "/src/components/Business/WelcomeCard";
import TemplateFooter from "/src/components/Business/TemplateFooter";
import SpecialServices from "/src/components/Business/SpecialServices";
import SubscribeSection from "/src/components/Business/SubscribeSection";
import ReviewSection from "/src/components/Business/ReviewSection";
import Gallery from "/src/components/Business/Gallery";
import ServicesSection from "/src/components/Business/ServicesSection";
import MenuSection from "/src/components/Business/MenuSection";
import ContactForm from "/src/components/Business/contactForm";
import Loader from "../../src/components/Loader/Loader";
import ShareButton from "../components/ShareButton";


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
            position: "relative",
            width: "100vw",
            height: "800px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          {/* Background Image */}
          <Box
            sx={{
              backgroundImage: `url(${businessData?.landingPageHero?.coverImage  ? businessData?.landingPageHero?.coverImage : "https://products.otis.com/hubfs/raw_assets/public/Otis_Oct2020/images/grayscale-mountain.png"})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0,
              filter: "brightness(0.4)",
              zIndex: 1,
              opacity:1
            }}
          />

          {/* Overlay Content */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              color: "#D3DFEB",
              maxWidth: "611px",
              textAlign: "center",
              zIndex: 2, // Ensure content is above the background
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
        <ShareButton
          number={businessData?.contactDetails?.primaryNumber}
        />
                  <div className="mt-2 mb-3 sm:mt-0 sm:mb-0">
            <div className="container px-4 sm:px-0">
              <div className="col-12 address-section">
                <div className="row justify-content-between">
                  {/* Address Section */}
                  <div className="col-12 col-sm-4 mb-3 mb-sm-0">
                    <div className="row align-items-center justify-content-start">
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                          `${businessData?.address?.buildingName}, ${businessData?.address?.city}, ${businessData?.address?.landMark}, ${businessData.address?.streetName}, ${businessData.address?.state}`,
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-decoration-none text-dark"
                      >
                        <div className="row">
                          <div className="col-auto address-logo">
                            <i className="bi bi-geo-alt-fill text-2xl sm:text-lg" />
                          </div>
                          <div className="col">
                            <span className="fs-12 sm:fs-10" style={{ color: businessData?.secondaryTheme }}>Address</span>
                            <p
                              style={{ color: businessData?.theme, textDecoration: 'none' }}

                              className="fs-14 sm:fs-12">{`${businessData.address?.buildingName}, ${businessData.address?.city}, ${businessData.address?.landMark}, ${businessData.address?.streetName}, ${businessData.address?.state}`}</p>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>

                  {/* Email Section */}
                  <div className="col-12 col-sm-4 mb-3 mb-sm-0">
                    <div className="row align-items-center justify-content-start">
                      <div className="col-auto address-logo">
                        <i className="bi bi-envelope-fill text-2xl sm:text-lg" />
                      </div>
                      <div className="col">
                        <a
                          href={`mailto:${businessData?.contactDetails?.email}`}
                          className="text-decoration-none text-dark"
                        >
                          <span className="fs-12 sm:fs-10 " style={{ color: businessData?.textColor }}>Send Email</span>
                          <p className="fs-14 sm:fs-12"
                            style={{ color: businessData?.textColor, textDecoration: 'none' }}
                          >
                            {businessData?.contactDetails?.email}
                          </p>
                        </a>
                        <ShareButton
                          number={businessData?.contactDetails?.primaryNumber}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Contact Section */}
                  <div className="col-12 col-sm-4 mb-3 mb-sm-0">
                    <div className="row align-items-center justify-content-start">
                      <div className="col-auto address-logo">
                        <i className="bi bi-telephone text-2xl sm:text-lg" />
                      </div>
                      <div className="col">
                        <span className="fs-12 sm:fs-10" style={{ color: businessData.textColor }}>
                          Contact
                        </span>
                        <p className="fs-14 sm:fs-12 mb-0">
                          <a
                            style={{ color: businessData?.textColor, textDecoration: 'none' }}
                            href={`tel:${businessData?.contactDetails?.primaryNumber}`}
                          >
                            {businessData?.contactDetails?.primaryNumber}
                          </a>
                        </p>
                        <p className="fs-14 sm:fs-12 mt-0">
                          <a
                            style={{ color: businessData?.textColor, textDecoration: 'none' }}
                            href={`tel:${businessData?.contactDetails?.secondaryNumber}`}
                          >
                            {businessData?.contactDetails?.secondaryNumber}
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        <Box mt={{ xs: "10rem", md: "5rem" }}>
          <WelcomeCard businessData={businessData} />
        </Box>

        <SpecialServices businessData={businessData} />
        <MenuSection businessData={businessData} />
        <ServicesSection businessData={businessData} />
        <Gallery businessData={businessData} />
        <ReviewSection businessData={businessData} />
        <ContactForm businessData={businessData} />
        <SubscribeSection />

        <TemplateFooter businessData={businessData} closeDays={closeDays} />
        <a href="#" className="btn btn-lg btn-bottom btn-lg-square bg-transparent rounded-circle back-to-top1"><i className="bi bi-arrow-up"></i></a>
        {loading && <Loader />}
      </Box>
    </>
  );
};

export default PremiumTemplate;
