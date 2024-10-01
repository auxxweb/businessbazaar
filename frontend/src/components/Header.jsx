import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Navigate, NavLink } from 'react-router-dom';

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
            <NavLink href="/" className='text-black  text-decoration-none' style={{color:'black'}}>
              Home
            </NavLink>
            <NavLink href="#notification" className='text-black  text-decoration-none' style={{color:'black'}}>
              Notification
            </NavLink>
            <NavLink href="#profile" className='text-black  text-decoration-none' style={{color:'black'}}>
              Profile
            </NavLink>
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
