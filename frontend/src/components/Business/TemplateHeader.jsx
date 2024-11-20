/* eslint-disable react/prop-types */
import { Container, Nav, Navbar, NavLink } from 'react-bootstrap'
import PlaceholderBanner from "../../assets/images/Placeholder.jpg"
const TemplateHeader = ({businessData}) => {
  return (
    <Navbar
  expand="lg"
  className="bg-white pjs fixed-top"
  style={{ paddingBlock: "5px" }}
>
  <Container>
    {/* Back button for large screens (before the logo) */}
    <button
      className="btn btn-outline-secondary d-none d-lg-inline-block me-2"
      onClick={() => window.location.href = "/"} // Modify the onClick action as needed
    >Home
    </button>

    {/* Align Brand to the start (left side) */}
    <Navbar.Brand
      href="/"
      className="fw-bold w-50 nav-logo"
      style={{ fontSize: "36px" }}
    >
      <img
        src={
          businessData?.logo && businessData?.logo.length > 0
            ? businessData?.logo
            : Placeholder
        }
        alt={businessData?.businessName || "Logo Placeholder"}
      />
      <span className="ms-2">{businessData?.businessName}</span>
    </Navbar.Brand>

    <Navbar.Toggle
      aria-controls="basic-navbar-nav"
      style={{ color: "black" }}
    />

    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ms-auto w-100 justify-content-evenly jcc">
        <NavLink
          href="#"
          className="text-black text-center text-lg-start text-decoration-none fs-14"
          style={{ color: "black" }}
        >
           <i className="bi bi-arrow-left"></i>
          Home
        </NavLink>
        <NavLink
          href="#about"
          className="text-black text-center text-lg-start text-decoration-none fs-14"
          style={{ color: "black" }}
        >
          About
        </NavLink>
        <NavLink
          href="#gallery"
          className="text-black text-center text-lg-start text-decoration-none fs-14"
          style={{ color: "black" }}
        >
          Gallery
        </NavLink>
        <NavLink
          href="#contact"
          className="text-black text-center text-lg-start text-decoration-none fs-14"
          style={{ color: "black" }}
        >
          Contact
        </NavLink>
        <NavLink
          href="#news"
          onClick={(e) => setShowNews(true)}
          className="text-black text-center text-lg-start text-decoration-none fs-14"
          style={{ color: "black" }}
        >
          News
        </NavLink>
        <NavLink
          href="#services"
          style={{
            backgroundColor: colorTheme,
            color: "white",
            borderRadius: "10px 0px",
            padding: "8px 20px",
            fontSize: "13px",
            boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.15)",
          }}
          className="fw-bold text-decoration-none text-center text-lg-start"
        >
          Services
        </NavLink>

        {/* Back button for smaller screens (inside menu items) */}
        <button
          className="btn btn-outline-secondary d-lg-none mt-2"
          onClick={() => window.location.href = "/"} // Modify the onClick action as needed
        >
          Back to Home
        </button>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
  )
}

export default TemplateHeader
