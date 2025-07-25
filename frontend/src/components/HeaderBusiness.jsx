import React, { useEffect, useRef, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

export default function BusinessHeader() {
  const [expanded, setExpanded] = useState(false);
  const navbarRef = useRef(null);
  const location = useLocation();

  // handling the toggle when clicking and scrolling time
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setExpanded(false);
      }
    };

    const handleScroll = () => {
      setExpanded(false);
    };

    document.addEventListener("click", handleClickOutside);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Check if the current route is "/reviews"
  const isReviewsPage = location.pathname === "/reviews";

  return (
    <Navbar
      expand="lg"
      className={`fixed-top home-navbar ${
        expanded ? "navbar-active bg-white" : "bg-white"
      }`}
      expanded={expanded}
      ref={navbarRef}
    >
      <Container>
        <Navbar.Brand
          href="/"
          className="fw-bold w-50"
          style={{ fontSize: "36px" }}
        >
          <img
            src="/images/auxxbay-logo.png"
            alt=""
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
                <Link
                  to="/#category" // Root-relative path with hash
                  className="text-decoration-none mx-3 my-auto"
                  style={{ fontSize: "16px" }}
                  onClick={() => setExpanded(false)}
                >
                  Categories
                </Link>
                <a
                  href="#business"
                  className="text-decoration-none mx-3 my-auto"
                  style={{ fontSize: "16px" }}
                  onClick={() => setExpanded(false)} // Close on link click
                >
                  Profile
                </a>
                <Link
                  to="/reviews" // Root-relative path with hash
                  className="text-decoration-none mx-3 my-auto"
                  style={{ fontSize: "16px" }}
                  onClick={() => setExpanded(false)}
                >
                  Reviews
                </Link>
                <a
                  href="https://auxxbay.auxxweb.in/"
                  target="_blank"
                  className="text-decoration-none mx-3 my-auto"
                  style={{ fontSize: "16px" }}
                  onClick={() => setExpanded(false)} // Close on link click
                >
                  Go to Dashboard
                </a>
                <NavLink
                  to="/create-business"
                  className="btn my-profile-btn text-white mx-2"
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
                  onClick={() => setExpanded(false)} // Close on link click
                >
                  Review
                </a>

                <NavLink
                  to="/"
                  className="btn my-profile-btn text-white mx-2"
                  onClick={() => setExpanded(false)}
                >
                  Back To Home
                </NavLink>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
