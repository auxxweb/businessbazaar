import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function Header() {
  return (
    <Navbar expand="lg" className="bg-white">
      <Container>
        {/* Align Brand to the start (left side) */}
        <Navbar.Brand href="#home" className='fw-bold w-50' style={{ fontSize: '36px' }}>
          Business Bazar
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav"  style={{color:'black'}}/>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto w-100 justify-content-evenly">
            <Nav.Link href="#home" className='text-black ' style={{color:'black'}}>
              Home
            </Nav.Link>
            <Nav.Link href="#notification" className='text-black ' style={{color:'black'}}>
              Notification
            </Nav.Link>
            <Nav.Link href="#profile" className='text-black ' style={{color:'black'}}>
              Profile
            </Nav.Link>
            <Nav.Link
              href="#mybusiness"
              style={{
                backgroundColor: '#228AE2',
                color: 'white',
                borderRadius: '50px',
                padding: '8px 20px',
                fontSize: '15px',
              }}
              className='fw-bold'
            >
              My Business
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
