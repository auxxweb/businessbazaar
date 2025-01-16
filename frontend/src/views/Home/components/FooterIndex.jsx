import { useNavigate } from "react-router";

const FooterIndex = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div
        className="bg-black position-relative mt-5 mx-auto px-4 py-5 text-white"
        style={{
          maxWidth: "80rem", // Adjust width to make it responsive
          padding: "3rem 2rem",
          borderRadius: "17px",
          display: "flex", // Use Flexbox for layout
          justifyContent: "space-between", // Distribute space between left and right
          alignItems: "center", // Center align items vertically
        }}
      >
        <div style={{ width: "60%", textAlign: "left", marginLeft:'10px' }}>
          <h1
            className="fw-bold mb-3"
            style={{ fontSize: "2rem", textAlign: "left" }}
          >
            ¡Ready to Create Business!
          </h1>
          <p className="mb-4" style={{ fontSize: "1rem", lineHeight: "1.5" }}>
            Showcase your profile to the world! Our platform is designed for
            both businesses and professionals to list their profiles and connect
            with a wider audience!
          </p>
        </div>
        <div style={{ width: "40%", textAlign: "center" }}>
          <button
            className="btn btn-light px-4 py-2 fw-semibold"
            onClick={() => navigate("/create-business")}
            style={{
              fontSize: "1rem",
              borderRadius: "50px", // Keep rounded-pill for a sleek look
            }}
          >
            Create Profile!
          </button>
        </div>
      </div>

      <footer className=" h-auto footer-section">
        <div className="container">
          <hr className="bg-white" />
          <div className="p-4 mt-5 pt-0 pt-md-5">
            <div className="row ">
              <div className="col-12 col-md-6">
                <h1 className="fs-45 text-white text-center text-md-start fw-bold mb-3">
                  Enconnect
                </h1>
                <span className="fs-20 text-white text-center text-md-start">
                  where requirements are found
                </span>

                <div className="col-12 text-center text-lg-start">
                  {/* Title */}
                  <div className="mt-3 mb-2">
                    <a
                      href="#"
                      className="fs-14 text-decoration-none text-orange "
                      style={{ color: "#fff" }}
                    >
                      FOLLOW US
                    </a>
                  </div>

                  {/* Social Media Icons */}
                  <div className="d-flex justify-content-center justify-content-lg-start gap-3">
                    <a
                      href="https://www.facebook.com/profile.php?id=61570312289347&mibextid=ZbWKwL"
                      className="contact-banner text-orange d-flex align-items-center justify-content-center"
                      style={{
                        fontSize: "2rem",
                        width: "50px",
                        height: "50px",
                        backgroundColor: "transparent",
                        color: "rgb(248 58 76)",
                        border: "none",
                      }}
                    >
                      <i className="bi bi-facebook"></i>
                    </a>
                    <a
                      href="https://www.instagram.com/enconnect.nfc"
                      className="contact-banner text-orange d-flex align-items-center justify-content-center"
                      style={{
                        fontSize: "2rem",
                        width: "50px",
                        height: "50px",
                        backgroundColor: "transparent",
                        color: "rgb(248 58 76)",
                        border: "none",
                      }}
                    >
                      <i className="bi bi-instagram"></i>
                    </a>
                    <a
                      href="https://www.linkedin.com/company/enconnect/"
                      className="contact-banner text-orange d-flex align-items-center justify-content-center"
                      style={{
                        fontSize: "2rem",
                        width: "50px",
                        height: "50px",
                        backgroundColor: "transparent",
                        color: "rgb(248 58 76)",
                        border: "none",
                      }}
                    >
                      <i className="bi bi-linkedin"></i>
                    </a>
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div className="row ">
                  <div className="col-12 col-md-6 text-start usefull-links">
                    <h3 className="text-white mb-3 fs-20 fw-bold text-center text-md-start mt-3 mt-md-0">
                      Useful Links
                    </h3>
                    <div className="col-12 mb-3 text-center text-md-start">
                      <a href="#about" className="fs-20 text-white">
                        About Us
                      </a>
                    </div>
                    <div className="col-12 mb-3 text-center text-md-start">
                      <a href="#" className="fs-20 text-white">
                        Services
                      </a>
                    </div>
                    <div className="col-12 mb-3 text-center text-md-start">
                      <a href="#review" className="fs-20 text-white">
                        Review
                      </a>
                    </div>
                  </div>

                  <div className="col-12 col-md-6 text-start">
                    <h3 className="text-white mb-3 fs-20 fw-bold text-center text-md-start">
                      Contact Info
                    </h3>
                    <div className="col-12 mb-3 text-center text-md-start">
                      <a
                        href="mailto:enconnect.nfc@gmail.com"
                        className="fs-16 text-white"
                      >
                        connect@enconnect.in
                      </a>
                    </div>
                    <div className="col-12 mb-3 text-center text-md-start">
                      <a
                        href=""
                        className=" fs-20 text-decoration-none text-white"
                      >
                        <a style={{ color: "white" }} href="tel:9745004569">
                          <i className="bi bi-telephone text-white me-1"></i>{" "}
                          +91 9447020270
                        </a>
                      </a>
                    </div>
                    <div className="col-12 mb-3 text-center text-md-start">
                      <a
                        href="https://www.google.com/maps/search/?api=1&query=Hilite%20Business%20Park%20%2CPalazhi%20%20%2C%20Hilite%20mall%20%2C%20Calicut%2C%20%20%20Kerala%20"
                        className="fs-20 text-white"
                      >
                        <span>
                          <i className="bi bi-geo-alt-fill text-white me-1"></i>
                          Calicut
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="footer-bottom p-4">
            <div className="row align-items-center text-center text-sm-start">
              {/* Left Section */}
              <div className="col-12 col-sm-4 mb-3 mb-sm-0 text-sm-left">
                <a href="/terms-and-conditions">Terms and Conditions</a>
              </div>

              {/* Center Section */}
              <div className="col-12 col-sm-4 mb-3 mb-sm-0 text-center">
                {/* <img src="" alt="Logo" className="mb-2" /> */}
                <p style={{ color: "#A4B3CB", margin: 0 }}>
                  <span>
                    Copyright &copy; {new Date().getFullYear()} En Connect. All
                    Rights Reserved.
                  </span>
                </p>
              </div>

              {/* Right Section */}
              <div className="col-12 col-sm-4 text-sm-right text-center">
                {/* <img src="/images/2 (1).png" alt="Technical Partner Logo" className="mb-2" /> */}
                <p style={{ color: "#A4B3CB", margin: 0 }}>
                  Technical Partner:{" "}
                  <a
                    style={{ textDecoration: "none" }}
                    href="https://www.auxxweb.in"
                  >
                    Auxxweb IT Solutions
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FooterIndex;
