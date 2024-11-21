import { useNavigate } from "react-router";

const FooterSection = () => {
  const navigate = useNavigate();
  return (
    <footer className=" h-auto footer-section">
      <div className="container">
        <div className="p-4 mt-0 mt-md-5 pt-5">
          <div className="row ">
            <div className="col-12 col-md-6">
              <h1 className="fs-45 text-white text-center text-md-start fw-bold">
                Ready to Create Your Business
              </h1>
            </div>
            <div className="col-12 col-md-6 text-center text-md-end">
              <button
                className="btn btn-theme mt-3"
                onClick={() => navigate("/create-business")}
              >
                Create Now
              </button>
            </div>
          </div>
        </div>
        <hr className="bg-white" />
        <div className="p-4 mt-5 pt-0 pt-md-5">
          <div className="row ">
            <div className="col-12 col-md-6">
              <h1 className="fs-45 text-white text-center text-md-start fw-bold mb-3">
                EnConnect
              </h1>
              <span className="fs-20 text-white text-center text-md-start">
                where requirements are found
              </span>

              <div className="col-12 text-center text-lg-start">
                {/* Title */}
                <div className="mt-3 mb-2">
                  <a
                    href="#"
                    className="fs-14 text-decoration-none text-orange"
                  >
                    FOLLOW US
                  </a>
                </div>

                {/* Social Media Icons */}
                <div className="row justify-content-center justify-content-lg-start gap-3">
                  <a href="#" className="contact-banner text-orange">
                    <i className="bi bi-facebook text-orange"></i>
                  </a>
                  <a href="#" className="contact-banner text-orange">
                    <i className="bi bi-instagram text-orange"></i>
                  </a>
                  <a href="#" className="contact-banner text-orange">
                    <i className="bi bi-twitter text-orange"></i>
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
                    <a href="" className="fs-20 text-white">
                      About Me
                    </a>
                  </div>
                  <div className="col-12 mb-3 text-center text-md-start">
                    <a href="" className="fs-20 text-white">
                      Services
                    </a>
                  </div>
                  <div className="col-12 mb-3 text-center text-md-start">
                    <a href="" className="fs-20 text-white">
                      Portfolio
                    </a>
                  </div>
                </div>

                <div className="col-12 col-md-6 text-start">
                  <h3 className="text-white mb-3 fs-20 fw-bold text-center text-md-start">
                    Contact Info
                  </h3>
                  <div className="col-12 mb-3 text-center text-md-start">
                    <a href="" className="fs-16 text-white">
                      inconnect@gmail.com
                    </a>
                  </div>
                  <div className="col-12 mb-3 text-center text-md-start">
                    <a
                      href=""
                      className=" fs-20 text-decoration-none text-white"
                    >
                      <span>
                        <i className="bi bi-telephone text-white me-1"></i> +91
                        7994085695
                      </span>
                    </a>
                  </div>
                  <div className="col-12 mb-3 text-center text-md-start">
                    <a href="" className="fs-20 text-white">
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
          <div className="row w-full justify-content-between">
            <div className="col-sm-4 text-left">
              <a href={`/terms-and-conditions`}>Terms and Conditions</a>
            </div>
            <div className="col-sm-4 text-right">
              <div style={{ color: "#A4B3CB" }} className="text-right">
                <span>
                  Copyright &copy;
                  {new Date().getFullYear()} In Connect. All Rights Reserved
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
