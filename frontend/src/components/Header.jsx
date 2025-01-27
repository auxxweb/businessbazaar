import React, { useCallback, useEffect, useRef, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, useLocation } from "react-router-dom";
import LocationAutocomplete from "./LocationAutoComplete";
import FloatingButtons from "../views/Home/components/FloatButtonIndex";

const libraries = ["places"];

export default function Header({ onSearch, setLocation ,setSerachItem, searchItem}) {
  const [expanded, setExpanded] = useState(false);
  const [showInputsOnScroll, setShowInputsOnScroll] = useState(false);
  const navbarRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setExpanded(false);
      }
    };

    const handleScroll = () => {
      setExpanded(false); // Close menu on scroll

      // Show inputs only after scrolling 200px
      if (window.scrollY > 200) {
        setShowInputsOnScroll(true);
      } else {
        setShowInputsOnScroll(false);
      }
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
    if(searchData){
      setSerachItem(true)
      
    }else{
      setSerachItem(false)
    }
    
  }, [searchData, onSearch]);

  const isReviewsPage = location.pathname === "/reviews";

  return (
    <Navbar
      expand="xl"
      className={`fixed-top home-navbar ${
        expanded ? "navbar-meu bg-white" : ""
      }`}
      expanded={expanded}
      ref={navbarRef}
    >
      <Container fluid>
        <div className="d-flex align-items-center w-100 justify-content-between">
          {/* Logo */}
          <Navbar.Brand href="/" className="fw-bold d-flex align-items-center">
            <img
              src="/images/enconnectLogo.png"
              alt="Logo"
              style={{ height: "50px", width: "150px" }}
            />
          </Navbar.Brand>

          {/* Navbar Toggle */}
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={() => setExpanded(!expanded)}
            className="custom-toggler"
          />

          {/* Inputs: Location & Search */}
          <div
            className={`inputs-container d-none d-xl-flex align-items-center gap-2 flex-grow-1 mx-3 ${
              showInputsOnScroll ? "show" : ""
            }`}
          >
            <div className="location-autocomplete">
              <LocationAutocomplete
                setLocation={setLocation}
                libraries={libraries}
              />
            </div>
            <div
              className="input-group border border-black rounded overflow-hidden"
              style={{ height: "48px", width: "268px" }}
            >
              <input
                type="text"
                placeholder="Search for any service..."
                value={searchData}
                onInput={(e) => setSearchData(e.target.value)}
                className="form-control bg-transparent  border-0"
              />
              <button
                onClick={handleSearchSubmit}
                className="btn search-submit-btn text-white"
              >
                <i className="bi bi-search"></i>
              </button>

             
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto text-center align-items-center justify-content-center text-lg-start">
            {!isReviewsPage ? (
              <>
                <a
                  href="#category"
                  className="text-decoration-none py-2"
                  onClick={() => setExpanded(false)}
                >
                  Categories
                </a>
                <a
                  href="#business"
                  className="text-decoration-none mx-2 py-2"
                  onClick={() => setExpanded(false)}
                >
                  Profile
                </a>
                <a
                  href="#review"
                  className="text-decoration-none mx-2 py-2"
                  onClick={() => setExpanded(false)}
                >
                  Review
                </a>
                <a
                  href="https://admin.enconnect.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-decoration-none my-profile-btn mx-2 py-2 px-2"
                  onClick={() => setExpanded(false)}
                >
                  Go to Dashboard
                </a>
                {/* <NavLink
                  to="/create-business"
                  className="btn my-profile-btn text-white mx-2"
                  onClick={() => setExpanded(false)}
                >
                  My Profile
                </NavLink> */}
              </>
            ) : (
              <>
                <a
                  href="#review"
                  className="text-decoration-none mx-3 py-2"
                  onClick={() => setExpanded(false)}
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
