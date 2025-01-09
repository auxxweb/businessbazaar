import React, { useEffect, useRef, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, useLocation } from "react-router-dom";

export default function Header() {
  const [expanded, setExpanded] = useState(false);
  const navbarRef = useRef(null);
  const location = useLocation();

  // Handle click outside and scroll events
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setExpanded(false);
      }
    };

    const handleScroll = () => {
      setExpanded(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Check if the current route is "/reviews"
  const isReviewsPage = location.pathname === "/reviews";

  return (
    <Navbar
      expand="lg"
      className={`fixed-top home-navbar ${expanded ? "navbar-active" : ""}`}
      expanded={expanded}
      ref={navbarRef}
    >
      <Container>
        <Navbar.Brand href="/" className="fw-bold w-50" style={{ fontSize: "36px" }}>
          <img
            src={process.env.PUBLIC_URL + "/assets/images/enconnectLogo.png"}
            alt="Logo"
            style={{ height: "50px", width: "150px" }}
          />
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          style={{ color: "black" }}
          onClick={() => setExpanded(!expanded)}
        />

        <Navbar.Collapse id="basic-navbar-nav" className="text-center">
          <Nav className="ms-auto d-flex justify-content-between w-100">
            {!isReviewsPage ? (
              <>
                <a
                  href="#category"
                  className="text-decoration-none mx-3 my-auto"
                  style={{ fontSize: "16px" }}
                  onClick={() => setExpanded(false)}
                >
                  Categories
                </a>
                <a
                  href="#business"
                  className="text-decoration-none mx-3 my-auto"
                  style={{ fontSize: "16px" }}
                  onClick={() => setExpanded(false)}
                >
                  Profile
                </a>
                <a
                  href="#review"
                  className="text-decoration-none mx-3 my-auto"
                  style={{ fontSize: "16px" }}
                  onClick={() => setExpanded(false)}
                >
                  Review
                </a>
                <a
                  href="https://admin.enconnect.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-decoration-none mx-3 my-auto"
                  style={{ fontSize: "16px" }}
                  onClick={() => setExpanded(false)}
                >
                  Go to Dashboard
                </a>
                <NavLink
                  to="/create-business"
                  className="fw-bold text-decoration-none mx-3 my-auto"
                  style={{
                    backgroundColor: "#105193",
                    color: "white",
                    borderRadius: "50px",
                    padding: "8px 20px",
                    fontSize: "15px",
                  }}
                  onClick={() => setExpanded(false)}
                >
                  My Profile
                </NavLink>
              </>
            ) : (
              <>
                <a
                  href="#review"
                  className="text-decoration-none mx-3 my-auto"
                  style={{ fontSize: "16px" }}
                  onClick={() => setExpanded(false)}
                >
                  Review
                </a>

                <NavLink
                  to="/"
                  className="fw-bold text-decoration-none mx-3 my-auto"
                  style={{
                    backgroundColor: "#105193",
                    color: "white",
                    borderRadius: "50px",
                    padding: "8px 20px",
                    fontSize: "15px",
                  }}
                  onClick={() => setExpanded(false)}
                >
                  Back to Home
                </NavLink>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
