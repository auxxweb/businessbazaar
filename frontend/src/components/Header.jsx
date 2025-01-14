import React, { useCallback, useEffect, useRef, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, useLocation } from "react-router-dom";
import LocationAutocomplete from "./LocationAutoComplete";
const libraries = ["places"];

export default function Header({onSearch, setLocation}) {
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
  const [searchData, setSearchData] = useState("");

  
    const handleSearchSubmit = useCallback(() => {
      onSearch(searchData);
    }, [searchData, onSearch]);
  

  // Check if the current route is "/reviews"
  const isReviewsPage = location.pathname === "/reviews";

  return (
    <Navbar
      expand="lg"
      className={`fixed-top home-navbar ${expanded ? "navba" : ""}`}
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
            src="/images/enconnectLogo.png"
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
                {/* <div className="banner-content absolute top-2/2 left-2/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center px-4">
                  <h1 className="text-3xl md:text-4xl font-bold mb-5">
                    Your Digital Platform for Growing Your Business
                  </h1>
                  <div className="search-bar flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <LocationAutocomplete
                      setLocation={setLocation}
                      libraries={libraries}
                    />
                    <div className="search-input-group flex items-center border-2 border-white rounded-md overflow-hidden">
                      <input
                        type="text"
                        placeholder="Search for any service..."
                        value={searchData}
                        onInput={(e) => setSearchData(e.target.value)}
                        className="p-2 bg-transparent text-white outline-none"
                      />
                      <button
                        onClick={handleSearchSubmit}
                        className="bg-orange-500 p-2 text-white"
                      >
                        <i className="bi bi-search"></i>
                      </button>
                    </div>
                  </div>
                </div> */}
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
                  Profile
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
                  Go to Dashboard
                </a>
                <NavLink
                  to="/create-business"
                  className="fw-bold text-decoration-none mx-3 my-auto"
                  style={{
                    backgroundColor: "#105193",
                    color: "white",
                    borderRadius: "6px",
                    padding: "8px 20px",
                    fontSize: "15px",
                  }}
                  onClick={() => setExpanded(false)} // Close on link click
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
                  className="fw-bold text-decoration-none mx-3 my-auto"
                  style={{
                    backgroundColor: "#105193",
                    color: "white",
                    borderRadius: "20px",
                    padding: "8px 20px",
                    fontSize: "15px",
                  }}
                  onClick={() => setExpanded(false)} // Close on link click
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
