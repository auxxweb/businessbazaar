import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, Navigate, NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <Navbar expand="lg" className="bg-white">
      <Container>
        {/* Align Brand to the start (left side) */}
        <Navbar.Brand href="/" className='fw-bold w-50' style={{ fontSize: '36px' }}>
          Business Bazar
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav"  style={{color:'black'}}/>

        <Navbar.Collapse id="basic-navbar-nav" className='text-center'>
          <Nav className="ms-auto w-100 justify-content-evenly">
          <a href="#category" className="text-black text-decoration-none" style={{ color: 'black' }}>
            Categories
          </a>
          <a href="#business" className="text-black text-decoration-none" style={{ color: 'black' }}>
            Business
          </a>
          <a href="#review" className="text-black text-decoration-none" style={{ color: 'black' }}>
            Review
          </a>
            <NavLink
              to='/create-business'
              style={{
                backgroundColor: '#228AE2',
                color: 'white',
                borderRadius: '50px',
                padding: '8px 20px',
                fontSize: '15px',
              }}
              className='fw-bold text-decoration-none'
            >
              My Business
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
