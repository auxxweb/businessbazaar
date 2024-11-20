import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <Navbar expand="lg" className="fixed-top home-navbar">
      <Container>
        {/* Align Brand to the start (left side) */}
        <Navbar.Brand href="/" className="fw-bold w-50" style={{ fontSize: '36px' }}>
          <img src="/src/assets/images/enConnectLogo.jpg" alt="" style={{ width: '100px' }} />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ color: 'black' }} />

        <Navbar.Collapse id="basic-navbar-nav" className="text-center">
          <Nav className="ms-auto d-flex justify-content-between w-100">
            <a
              href="#category"
              className="text-black text-decoration-none mx-3 my-auto"
              style={{ fontSize: '16px' }}
            >
              Categories
            </a>
            <a
              href="#business"
              className="text-black text-decoration-none mx-3 my-auto"
              style={{ fontSize: '16px' }}
            >
              Business
            </a>
            <a
              href="#review"
              className="text-black text-decoration-none mx-3 my-auto"
              style={{ fontSize: '16px' }}
            >
              Review
            </a>
            <a
              href="https://admin.enconnect.in/"
              target="_blank"
              className="text-black text-decoration-none mx-3 my-auto"
              style={{ fontSize: '16px' }}
            >
              Admin Panel
            </a>
            <NavLink
              to="/create-business"
              className="fw-bold text-decoration-none mx-3 my-auto"
              style={{
                backgroundColor: '#105193',
                color: 'white',
                borderRadius: '50px',
                padding: '8px 20px',
                fontSize: '15px',
              }}
            >
              My Business
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
