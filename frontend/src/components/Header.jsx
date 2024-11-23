import React, { useEffect, useRef, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';

export default function Header() {
  const [expanded, setExpanded] = useState(false);
  const navbarRef = useRef(null);

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

  return (
    <Navbar
      expand="lg"
      className={`fixed-top home-navbar ${expanded ? "navbar-active" : ""}`}
      expanded={expanded}
      ref={navbarRef}
    >
      <Container>
        <Navbar.Brand href="/" className="fw-bold w-50" style={{ fontSize: "36px" }}>
          <img src="/src/assets/images/enConnectLogo.jpeg" alt="" style={{ width: "100px" }} />
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          style={{ color: "black" }}
          onClick={() => setExpanded(!expanded)}
        />

        <Navbar.Collapse id="basic-navbar-nav" className="text-center">
          <Nav className="ms-auto d-flex justify-content-between w-100">
            <a
              href="#category"
              className="text-decoration-none mx-3 my-auto"
              style={{ fontSize: "16px" }}
              onClick={() => setExpanded(false)} // Close on link click
            >
              Categories
            </a>
            <a
              href="#business"
              className="text-decoration-none mx-3 my-auto"
              style={{ fontSize: "16px" }}
              onClick={() => setExpanded(false)} // Close on link click
            >
              Business
            </a>
            <a
              href="#review"
              className="text-decoration-none mx-3 my-auto"
              style={{ fontSize: "16px" }}
              onClick={() => setExpanded(false)} // Close on link click
            >
              Review
            </a>
            <a
              href="https://admin.enconnect.in/"
              target="_blank"
              className="text-decoration-none mx-3 my-auto"
              style={{ fontSize: "16px" }}
              onClick={() => setExpanded(false)} // Close on link click
            >
              Admin Panel
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
              onClick={() => setExpanded(false)} // Close on link click
            >
              My Business
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
