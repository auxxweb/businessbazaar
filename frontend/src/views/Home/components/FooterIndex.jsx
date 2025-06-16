import { useNavigate } from "react-router";
import { Facebook, Instagram, Linkedin, MapPin, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

const FooterIndex = () => {
  const navigate = useNavigate();

  const socialLinks = [
    {
      icon: Facebook,
      href: "https://www.facebook.com/profile.php?id=61570312289347&mibextid=ZbWKwL",
    },
    { icon: Instagram, href: "https://www.instagram.com/auxxweb" },
    { icon: Linkedin, href: "https://www.linkedin.com/company/auxxweb/" },
  ];

  const usefulLinks = [
    { name: "About Us", href: "#about" },
    { name: "Services", href: "#" },
    { name: "Review", href: "#review" },
  ];
  return (
    <div>
      <div
        className="bg-black   position-relative mt-5 mx-auto   text-white"
        style={{
          maxWidth: "80rem",
          padding: "2rem 2rem",
          borderRadius: "17px",
          marginLeft: "2px",
          display: "flex",
          flexDirection: "column", // Default layout
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ width: "100%",  }}>
          <h1
            className="fw-bold mb-3"
            style={{ fontSize: "2rem", }}
          >
            ¡Ready to Create Business!
          </h1>
          <p className="mb-4 " style={{ fontSize: "1rem", lineHeight: "1.5" ,textAlign:'center'}}>
            Showcase your profile to the world! Our platform is designed for
            both businesses and professionals to list their profiles and connect
            with a wider audience!
          </p>
        </div>
        <div
          className="button-container btn-cntnr"
          style={{
            width: "100%",
            textAlign: "center",
          }}
        >
          <button
            className="btn btn-light px-4 py-2 fw-semibold"
            onClick={() => navigate("/create-business")}
            style={{
              fontSize: "1rem",
              borderRadius: "50px",
            }}
          >
            Create Profile!
          </button>
        </div>
      </div>
      <footer className="bg-white text-black py-5 footer-content border-top">
        <div className="container">
          <div className="row gy-4 justify-content-between">
            {/* Company Info */}
            <div className="col-12 col-md-6 col-lg-3">
              <img
                src="/images/auxxbay-logo.png"
                width={250}
                height={100}
                className="imglogo img-fluid mb-3"
                alt="Auxxbay Logo"
              />
              <p className="mb-2 sub-txt">where requirements are found</p>

              <div className="mb-4 ps-0 ps-md-4">
                <p className="text-uppercase small mb-3 fw-bold">Follow us</p>
                <div className="d-flex gap-3">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-black"
                      style={{ textDecoration: "none" }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <social.icon
                        className="icon"
                        style={{ width: "30px", height: "30px" }}
                      />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>

            {/* Useful Links */}
            <div className="col-12 col-sm-6 col-lg-3">
              <h3 className="h5 mb-3 fw-bold">Useful Links</h3>
              <ul className="list-unstyled">
                {usefulLinks.map((link, index) => (
                  <motion.li
                    key={index}
                    className="mb-2"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <NavLink
                      href={link.href}
                      className="text-black text-decoration-none"
                      style={{ transition: "color 0.3s" }}
                    >
                      {link.name}
                    </NavLink>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="col-12 col-sm-6 col-lg-3">
              <h3 className="h5 mb-3 fw-bold">Contact Info</h3>
              <ul className="list-unstyled">
                <motion.li className="mb-3" whileHover={{ x: 5 }}>
                  <a
                    href="mailto:auxxbay@gmail.com"
                    className="text-black text-decoration-none"
                  >
                    connect@auxxbay.in
                  </a>
                </motion.li>
                <motion.li className="mb-3" whileHover={{ x: 5 }}>
                  <a
                    href="tel:+917511175402"
                    className="text-black text-decoration-none d-flex align-items-center gap-2"
                  >
                    <Phone size={16} />
                    +91 7511175402
                  </a>
                </motion.li>
                <motion.li whileHover={{ x: 5 }}>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Hilite%20Business%20Park%20%2CPalazhi%20%2C%20Hilite%20mall%20%2C%20Calicut%2C%20%20%20Kerala%20"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black text-decoration-none d-flex align-items-center gap-2"
                  >
                    <MapPin size={16} />
                    Calicut
                  </a>
                </motion.li>
              </ul>
            </div>

            {/* Logo */}
            <div className="col-12 col-lg-3 d-flex justify-content-center justify-content-lg-end align-items-center mt-4 mt-lg-0">
              <img
                src="https://img.freepik.com/free-vector/business-meeting-brainstorming-team-people-working-office-corporate-communication-men-women-sitting-negotiating-studying_575670-2062.jpg"
                width={300}
                height={200}
                className="img-fluid imglogo"
                alt="Business Meeting"
              />
            </div>
          </div>

          {/* Bottom Section */}
          <div className="row mt-5 pt-4 border-top border-secondary align-items-center text-center text-md-start">
            <div className="col-12 col-md-4 mb-3 mb-md-0">
              <NavLink
                href="/terms-and-conditions"
                className="text-secondary text-decoration-none"
              >
                Terms and Conditions
              </NavLink>
            </div>
            <div className="col-12 col-md-4 mb-3 mb-md-0">
              <p className="text-secondary mb-0">
                Copyright © 2025 Auxxbay. All Rights Reserved.
              </p>
            </div>
          </div>
        </div>

        <style jsx>{`
          .icon:hover {
            color: #dc3545 !important;
            transition: color 0.3s;
          }

          .text-secondary:hover {
            color: #dc3545 !important;
          }

          .footer-content {
            height: 100%;
            margin-top: 30px;
          }

          .tittle {
            background: linear-gradient(to right, #e72693, #ff7e2b);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            padding-right: 1rem;
          }
          .sub-txt {
            margin-left: 1.5rem;
          }
          @media (max-width: 767px) {
            .footer-content {
              text-align: center;
            }

            .footer-content .col-12 {
              margin-bottom: 2rem;
            }

            .footer-content .d-flex {
              justify-content: center;
            }

            .footer-content .text-md-end {
              text-align: center !important;
            }

            .footer-content .justify-content-md-end {
              justify-content: center !important;
            }
            .imglogo {
              width: 80%;
            }
          }
        `}</style>
      </footer>
    </div>
  );
};

export default FooterIndex;
