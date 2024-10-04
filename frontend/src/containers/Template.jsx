import React, { useEffect, useState } from 'react'
import { Container, Nav, Navbar, NavLink } from 'react-bootstrap'
import '/src/assets/css/template.css';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useParams } from 'react-router-dom';
import { fetchBusinessTemplate } from '../Functions/functions';

export default function Template() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [businessData, setBusinessData] = useState(null); 
    const { id } = useParams();
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const fetchData = async()=>{
            const businessDetails = await fetchBusinessTemplate(id);
            setBusinessData(businessDetails.data)
            console.log(businessDetails)
            setLoading(false);
        }

        fetchData()

    },[id])

    const settings = {
        dots: false,
        infinite: true,
        autoplay: true,
        arrows: false,
        // centerMode: true,
        speed: 500,
        slidesToShow: 2, // Number of dishes to show
        // mobileFirst: true,
        slidesToScroll: 1,

        responsive: [
            {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 1,
                  infinite: true,
                },
              },
              {
                breakpoint: 768,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                },
              },
              {
                breakpoint: 600,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                },
              },
              {
                breakpoint: 480,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                },
              },
              {
                breakpoint: 390,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                },
              },
        ]
    };
    const setting2 = {
        dots: false,
        arrows: false,
        infinite: true,
        autoplay: true,
        // centerMode: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        afterChange: (current) => setCurrentSlide(current),
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 1,
                  infinite: true,
                },
              },
              {
                breakpoint: 768,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                },
              },
              {
                breakpoint: 600,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                },
              },
              {
                breakpoint: 480,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                },
              },
              {
                breakpoint: 390,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                },
              },
        ]
    };


    const settings3 = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        // centerMode: true,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1,
                  infinite: true,
                },
              },
              {
                breakpoint: 768,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                },
              },
              {
                breakpoint: 600,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                },
              },
              {
                breakpoint: 480,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                },
              },
              {
                breakpoint: 390,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                },
              },
        ]
    };


    if (loading) {
        return <div className='h-100vh text-center '>
            <div className='row h-100 justify-content-center align-items-center'>

            <div className='col-3 '>Loading...</div>
            </div>
        </div>;
    }

    // If there's no business data (e.g., fetch failed), show an error message
    if (!businessData) {
        return <div>Error loading business data.</div>;
    }




    const testimonials = [
        {
            name: 'Ama Ampomah',
            text: 'Amanda, a 25-year-old loyal customer, has been using our restaurant for over 5 years. She has a strong sense of food and a love for authentic Italian cuisine. She has been a regular at our restaurant and has consistently given us excellent reviews.',
            img: '/src/assets/images/Mask group.png',
            stars: 5
        },
        {
            name: 'John Doe',
            text: 'John is a frequent diner at our restaurant, always praising our fresh ingredients and authentic recipes. He appreciates our consistency in delivering high-quality meals.',
            img: '/src/assets/images/Mask group.png',
            stars: 5
        },
        {
            name: 'Sarah Williams',
            text: 'Sarah loves our cozy ambiance and the diverse menu options. She often brings her family to dine here and enjoys the variety of desserts we offer.',
            img: '/src/assets/images/Mask group.png',
            stars: 4
        },
        {
            name: 'Michael Johnson',
            text: 'Michael is a food enthusiast who enjoys trying new dishes. He has been impressed by our chef’s special menu and the unique flavors we incorporate.',
            img: '/src/assets/images/Mask group.png',
            stars: 5
        }
    ];


    return (
        <>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
            <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap" rel="stylesheet" />
            <Navbar expand="lg" className="bg-white pjs fixed-top" style={{ paddingBlock: "5px" }}>
                <Container>
                    {/* Align Brand to the start (left side) */}
                    <Navbar.Brand href="#home" className='fw-bold w-50 nav-logo' style={{ fontSize: '36px' }}>
                        <img src={businessData.logo} alt="" />
                        <span className="ms-2">{businessData.businessName}</span>
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ color: 'black' }} />

                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto w-100 justify-content-evenly jcc">
                            <NavLink href="#menu" className='text-black text-center text-lg-start  text-decoration-none fs-14' style={{ color: 'black' }}>
                                Menu
                            </NavLink>
                            <NavLink href="#gallery" className='text-black text-center text-lg-start  text-decoration-none fs-14' style={{ color: 'black' }}>
                                Gallery
                            </NavLink>
                            <NavLink href="#about" className='text-black text-center text-lg-start  text-decoration-none fs-14' style={{ color: 'black' }}>
                                About
                            </NavLink>
                            <NavLink href="#contact" className='text-black text-center text-lg-start  text-decoration-none fs-14' style={{ color: 'black' }}>
                                Contact
                            </NavLink>
                            <NavLink
                                to='/create-business'
                                style={{
                                    background: '#EA6D27',
                                    color: 'white',
                                    borderRadius: '10px 0px',
                                    padding: '8px 20px',
                                    fontSize: '13px',
                                    boxShadow: '0px 15px 30px rgba(0, 0, 0, 0.15)'
                                }}
                                className='fw-bold text-decoration-none text-center text-lg-start'
                            >
                                Book a table
                            </NavLink>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <section className='h-auto'>
                <div className="container p-top">
                    <div className="row align-items-center">
                        {/* Left Image for Mobile View */}
                        <div className="col-12 col-lg-6 text-end d-block d-lg-none">
                            <img src={businessData.landingPageHero.coverImage} alt="" className='banner-image' />
                            <div className='banner-image-2 d-none'>
                                <img src="/src/assets/images/baner-image2.png" alt="" />
                            </div>
                        </div>

                        {/* Text Content */}
                        <div className="col-12 col-lg-6">
                            <div className="row align-items-center">
                                <div className="col-12">
                                    <h1 className="text-start text-dark fw-bold david-font fw-bold banner-title text-center text-lg-start">
                                        {businessData.landingPageHero.title}
                                    </h1>
                                </div>
                                <div className="col-12">
                                    <p className='text-secondary text-center text-lg-start david-font'>
                                        {businessData.landingPageHero.description}
                                    </p>
                                </div>
                                <div className="mt-3 col-12">
                                    <div className="row">
                                        <div className="col-6 col-lg-2 mb-2">
                                            <button className="btn btn-dark text-white radius-theme box-shadow w-100">Menu</button>
                                        </div>
                                        <div className="col-6 col-lg-3 mb-2">
                                            <button className="btn btn-dark text-white radius-theme box-shadow theme w-100">Book a table</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5 col-12 social-media gap-3">
                                    <a href={businessData.socialMediaLinks[0].link} target='_blank' className="contact-banner text-dark">
                                        <i className="bi bi-facebook"></i>
                                    </a>
                                    <a href={businessData.socialMediaLinks[1].link} target='_blank' className="contact-banner text-dark">
                                        <i className="bi bi-instagram"></i>
                                    </a>
                                    <a href={businessData.socialMediaLinks[2].link} target='_blank' className="contact-banner text-dark">
                                        <i className="bi bi-twitter"></i>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Right Image for Desktop View */}
                        <div className="col-12 col-lg-6 text-end d-none d-lg-block">
                            <img src={businessData.landingPageHero.coverImage} alt="" className='banner-image' />
                            <div className='banner-image-2 d-none'>
                                <img src="/src/assets/images/baner-image2.png" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="mt-5 mb-5">
                <div className="container p-top">
                    <div className="col-12 address-section">
                        <div className="row">
                            <div className="col-12 col-lg-4 mb-3 mb-lg-0">
                                <div className="row align-items-center justify-content-start">
                                    <div className="col-auto address-logo">
                                        <i className="bi bi-geo-alt-fill"></i>
                                    </div>
                                    <div className="col">
                                        <span className="fs-13">Address</span>
                                        <p className='fs-16'>{businessData.address.buildingName}, {businessData.address.city},{businessData.address.landMark},{businessData.address.streetName}, {businessData.address.state}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 col-lg-4 mb-3 mb-lg-0">
                                <div className="row align-items-center justify-content-start">
                                    <div className="col-auto address-logo">
                                        <i className="bi bi-envelope-fill"></i>
                                    </div>
                                    <div className="col">
                                        <span className="fs-13">Send Email</span>
                                        <p className='fs-16'>{businessData.contactDetails.email}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 col-lg-4 mb-3 mb-lg-0">
                                <div className="row align-items-center justify-content-start">
                                    <div className="col-auto address-logo">
                                        <i className="bi bi-telephone"></i>
                                    </div>
                                    <div className="col">
                                        <span className="fs-13">Contact</span>
                                        <p className='fs-16 mb-0'>{businessData.contactDetails.primaryNumber}</p>
                                        <p className='fs-16 mt-0'>{businessData.contactDetails.secondaryNumber}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <section className=' h-auto' style={{ backgroundColor: "#F3F3F4" }} id='about'>
                <div className="container p-top">
                    <div className="row mt-5 align-items-center mb-5">
                        <div className="col-12 col-lg-6 mt-2 text-center text-lg-start about-image">
                            <img
                                src={businessData.welcomePart.coverImage}
                                className="img-fluid"
                                alt=""
                            />

                        </div>
                        <div className="col-12 col-lg-6">
                            <div className="col-12 mb-3">
                                <h1 className="text-center text-lg-start text-dark fw-bold david-font fw-bold banner-title">{businessData.welcomePart.title}</h1>
                            </div>
                            <div className="col-12 mt-4">
                                <p className='text-secondary text-center text-lg-start david-font mt-4'>
                                {businessData.welcomePart.description}
                                </p>
                            </div>
                            <div className="mt-3 col-12">
                                <div className="row">
                                    <div className="col-6 col-lg-2">
                                        <button className="btn btn-dark text-white radius-theme box-shadow w-100">Menu</button>
                                    </div>
                                    <div className="col-6 col-lg-3">
                                        <button className="btn btn-dark text-white radius-theme box-shadow theme w-100">Book a table</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </section>

            <section className="h-auto" style={{ backgroundColor: "#F3F3F4" }}>
                <div className="container p-top">
                    <div className="col-12 mb-5">
                        <div className="mt-5 text-center">
                            <div className="col-12">
                                <h1 className="text-center text-dark fw-bold david-font fw-bold banner-title fs-45">Our Products</h1>
                            </div>
                            <div className="row justify-content-center">
                                <div className="col-6 mb-5">
                                    <p className='text-secondary text-center mb-5'>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                        Sed vel neque ac nunc faucibus commodo. Donec sagittis neque vel neque congue,
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 mt-5">

                        <div className="col-12 mb-5 david-font">
                            <Slider {...settings}>
                                {businessData.productSection.map((dish, index) => (
                                    <div key={index} className="dish-div col-12 text-center  p-3">
                                        <div className="col-12 position-relative text-center" style={{ bottom: "60px" }}>
                                            <img src={dish.image} alt={dish.title} style={{width:'300px',height:'300px'}}/>
                                        </div>
                                        <div className="col-12">
                                            <h2 className="fs-20 fw-bold">{dish.title}</h2>
                                        </div>
                                        <div className="col-12 mt-3 mb-3">
                                            <p>{dish.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </Slider>
                        </div>

                    </div>
                </div>
            </section>
            <section className="bg-white h-auto david-font" id='menu'>
                <div className="container  p-top">
                    <div className="col-12 mb-5">
                        <div className="row justify-content-center">
                            <div className="col-6 text-center">
                                <h1 className="text-dark fw-bold david-font banner-title fs-45">Menu</h1>
                            </div>
                        </div>
                    </div>

                    <div className="mt-3 mb-5 p-3" style={{ borderBottom: "2px solid #F3F3F4" }}>
                        <div className="row">
                            <div className="col-6 mb-3 col-lg-3 cat-option">
                                <div className='row align-items-center'>
                                    <div className="col-3">
                                        <img src="/src/assets/images/burger1.png" alt="" className='w-80' />
                                    </div>
                                    <div className="col-9 fw-bold text-orange">
                                        <span>Fast Food</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6 mb-3 col-lg-3 cat-option">
                                <div className='row align-items-center'>
                                    <div className="col-3">
                                        <img src="/src/assets/images/orange-juice.png" alt="" className='w-80' />
                                    </div>
                                    <div className="col-9 fw-bold text-orange">
                                        <span>Drink & Juice</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6 mb-3 col-lg-3 cat-option">
                                <div className='row align-items-center'>
                                    <div className="col-3">
                                        <img src="/src/assets/images/pizza.png" alt="" className='w-80' />
                                    </div>
                                    <div className="col-9 fw-bold text-orange">
                                        <span>Chicken Pizza</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6 mb-3 col-lg-3 cat-option br-none">
                                <div className='row align-items-center'>
                                    <div className="col-3">
                                        <img src="/src/assets/images/food.png" alt="" className='w-80' />
                                    </div>
                                    <div className="col-9 fw-bold text-orange">
                                        <span>Chicken</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-5 david-font">
                        <div className="mb-5">
                            <div className="row mb-3">
                                {businessData.productSection.map((item, index) => (
                                    <div className="col-12 col-lg-6 mt-3" key={index}>
                                        <div className="row">
                                            <div className="col-2">
                                                <img src={item.image} alt="" className='w-100' />
                                            </div>
                                            <div className="col-8">
                                                <h1 className='fs-20 fw-bold'>{item.title}</h1>
                                                <p className="mt-2">{item.description}</p>
                                            </div>
                                            <div className="col-2 p-0">
                                                <span className='fw-bold'>{item.price}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <section className="h-auto david-font" style={{ backgroundColor: "#F3F3F4" }}>
                <div className="container p-top">
                    <div className="col-12 mt-5 text-center text-lg-start">
                        <h1 className='fw-bold'>Services We Provide</h1>
                    </div>
                    <div className="col-12 mb-5">
                        <Slider {...setting2} className='mb-5'>
                            {businessData.service.map((service, index) => (
                                <div key={index} className={`col-12 col-lg-4 service-design ${index === currentSlide ? 'active' : 'bg-white'}  mt-5 mb-5 text-center`}>
                                    <div className="col-12 text-center">
                                        <h3>{service.title}</h3>
                                    </div>
                                    <div className="col-12 mt-5">
                                        <p className='text-center'>{service.description}</p>
                                    </div>
                                    <div className="col-12 text-center" style={{ height: "100px" }}>
                                        <img src={service.image} alt={service.title} className='h-100' />
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>

                    <div className="col-12 mb-5" id='gallery'>
                        <div className="col-12 mb-5 mt-5">
                            <h1 className="fw-bold text-center">Gallery</h1>
                        </div>
                        <div className="row justify-content-center mb-5">
                        {businessData.gallery.map((image, index) => (
                            <div className="col-12 col-lg-4 mt-4">
                                <img src={image} alt="" className='w-100 gallery-img' />
                            </div>
                        ))}
                            
                        </div>
                    </div>

                </div>
            </section>
            <section className='bg-white'>
                <div className="container p-top">
                    <div className="row align-items-center">
                        <div className="col-12 col-lg-6 row align-items-center">
                            <div>
                                <div className="col-12 text-center text-lg-start">
                                    <h1 className="fw-bold fs-45">Our Expert Chef</h1>
                                </div>
                                <div className="col-12 text-center text-lg-start">
                                    <p className="fs-25">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non neque elit. Sed ut tellus ac neque fermentum tristique. Donec sed facilisis tellus, a vulputate turpis. Duis eget turpis non tellus tincidunt fermentum.</p>
                                </div>
                            </div>
                            <div className="mt-3 col-12 mb-5">
                                <div className="row">
                                    <div className="col-6 col-lg-2">
                                        <button className="btn btn-dark text-white radius-theme box-shadow w-100">Menu</button>
                                    </div>
                                    <div className="col-6 col-lg-3">
                                        <button className="btn btn-dark text-white radius-theme box-shadow theme w-100">Book a table</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-lg-6">
                            <div className="col-12 text-center">
                                <img src="/src/assets/images/chef.png" alt="" className='chef-div img-fluid w-100' />

                            </div>
                        </div>


                    </div>
                </div>
            </section>
            <section className='' style={{ backgroundColor: "#F3F3F4" }}>
                <div className="container david-font p-top">
                    <div className="col-12 text-center">
                        <h1>Our Happy Customers</h1>
                    </div>
                    <div className="col-12">
                        <p className='text-center'>
                            At Our Restaurant, we strive to provide the best dining experience possible. Our loyal customers have been satisfied with our culinary skills, service, and overall ambiance. Our positive feedback has helped us continuously improve our dining experience. If you're a loyal customer, we'd love to hear from you!
                        </p>
                    </div>

                    <div className="mt-5">
                        <Slider {...settings3}>
                            {businessData.testimonial.reviews.map((testimonial, index) => (
                            <div key={index} className="bg-white col-12 p-3 mt-2 test-div-bottom">
                                <div className="col-12 text-center test-button-img-div">
                                    <img src={testimonial.image} alt={testimonial.name} className="img-fluid" />
                                </div>

                                <div className='text-warning text-center mt-0 m-0'>
                                    {[...Array(Math.floor(testimonial.rating))].map((star, i) => (
                                        <i key={i} className="bi bi-star-fill"></i>
                                    ))}
                                    {testimonial.rating % 1 !== 0 && <i className="bi bi-star-half"></i>}
                                </div>

                                <div className="col-12 mt-3">
                                    <p>{testimonial.review}</p>
                                </div>

                                <div className="col-12 text-center mb-5">
                                    <span className='fw-bold david-font'>{testimonial.name}</span>
                                </div>
                            </div>
                        ))}
                        </Slider>
                    </div>
                    <div className="col-12">
                        <div className="col-12 text-center mb-3">
                            <button className="btn btn-dark text-white radius-theme box-shadow theme mt-5">Write Review</button>

                        </div>
                    </div>
                </div>
            </section>

            <section className="h-auto david-font" id='contact'>
                <div className="container p-top">
                    <div className="col-12 newsletter position-relative">
                        <img src="/src/assets/images/newsletter.png" alt="" className='w-100' />
                        <div className="text-center newsletter-content position-absolute">
                            <div className='d-none d-lg-block'>
                                <h2 className="fs-45 mb-3 fw-bold text-white">
                                    Create Your Own Business <br />
                                    Subscribing To Our Newsletter
                                </h2>
                                <div className='row bg-white align-items-center input-div p-2'>
                                    <div className="col-lg-8">
                                        <input type="text" style={{ border: "0 !important" }} className="form-control form-control-lg" />
                                    </div>
                                    <div className="col-lg-4">
                                        <button className="btn theme btn-lg w-100">Subscribe</button>
                                    </div>
                                </div>
                            </div>

                            <div className='d-block d-lg-none'>
                                <h2 className="fs-16 fw-bold text-white">
                                    Create Your Own Business <br />
                                    Subscribing To Our Newsletter
                                </h2>
                                <div className='row'>
                                    <div className="col-12">
                                        <input type="text" style={{ border: "0 !important" }} className="form-control form-control-sm" />
                                    </div>
                                    <div className="col-12">
                                        <button className="btn theme btn-sm mt-1 w-100">Subscribe</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <footer className='h-auto'>
                <div className="container pjs  p-top">
                    <div className="mt-5">
                        <div className="row">
                            <div className="col-12 col-lg-4">
                                <div className="col-12 text-center text-lg-start text mt-5">
                                    <div className="nav-logo">
                                    <img src={businessData.logo} alt="" />
                                    </div>
                                    <span className="ms-2 fs-45 text-white">{businessData.businessName}</span>
                                </div>
                                <div className="col-12 mt-4  text-center text-lg-start" style={{ color: "#A4B3CB" }}>
                                    <p>
                                        {businessData.description}
                                    </p>
                                </div>
                            </div>

                            <div className="col-12 col-lg-4">
                                <div className="col-12 mt-5">
                                    <div className="col-12 mt-3 mb-3 text-center text-lg-start">
                                        <a href="#" className=" fs-14 text-decoration-none text-orange">NAVIGATION</a>
                                    </div>
                                    <div className="col-12 mt-3 mb-3  text-center text-lg-start">
                                        <a href="#" className="fs-14 text-decoration-none" style={{ color: "#A4B3CB" }}>Menu</a>
                                    </div>
                                    <div className="col-12 mt-3 mb-3  text-center text-lg-start">
                                        <a href="#" className="fs-14 text-decoration-none" style={{ color: "#A4B3CB" }}>About Us</a>
                                    </div>
                                    <div className="col-12 mt-3 mb-3  text-center text-lg-start">
                                        <a href="#" className="fs-14 text-decoration-none" style={{ color: "#A4B3CB" }}>Contact Us</a>
                                    </div>
                                    <div className="col-12 mt-3 mb-3  text-center text-lg-start">
                                        <a href="#" className="fs-14 text-decoration-none" style={{ color: "#A4B3CB" }}>Main Dishes</a>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 col-lg-4">
                                <div className="col-12 mt-5">
                                    <div className="col-12 mt-3 mb-3 text-center text-lg-start">
                                        <a href="#" className=" fs-14 text-decoration-none text-orange">Follow Us</a>
                                    </div>

                                    <div className="mt-5 col-12 row gap-3 jcc-md text-center text-lg-start">
                                        <div className="contact-banner text-orange text-center text-lg-start">
                                            <i className="bi bi-facebook text-orange"></i>
                                        </div>
                                        <div className="contact-banner text-center text-lg-start">
                                            <i className="bi bi-instagram text-orange"></i>
                                        </div>
                                        <div className="contact-banner text-center text-lg-start">
                                            <i className="bi bi-twitter text-orange"></i>
                                        </div>
                                        {/* <hr style={{width:"fit-content",opacity: 0.15,}}></hr> */}
                                    </div>

                                </div>
                            </div>

                            <div className="col-12">
                                <div className="row">
                                    <div className="col-lg-4">
                                        <div className="col-12">
                                            <div className="col-12 mt-3 mb-3 text-center text-lg-start">
                                                <a href="#" className=" fs-14 text-decoration-none text-orange">OPENING HOURS</a>
                                            </div>
                                            <div className="mt-3 text-center text-lg-start" style={{ color: "#A4B3CB" }}>
                                                <span>Monday - Friday</span>
                                            </div>
                                            <div className="mt-3 text-center text-lg-start" style={{ color: "#A4B3CB" }}>
                                                <span>8:00 am to 9:00 pm</span>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="col-lg-4">
                                        <div className="col-12 mt-5 text-center text-lg-start">
                                            <div className="mt-3" style={{ color: "#A4B3CB" }}>
                                                <span>Sunday</span>
                                            </div>
                                            <div className="mt-3" style={{ color: "#A4B3CB" }}>
                                                <span>CLOSED</span>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div className="col-12">
                                <div className="row">
                                    <div className="col-12 col-lg-8 mt-5 text-center text-lg-start" style={{ color: "#A4B3CB" }}>
                                        <span>© 2024 Business Bazaar. All Right Reserved</span>
                                    </div>

                                    <div className="col-12 col-lg-6  text-center text-lg-start mb-5 mt-5" style={{ color: "#A4B3CB" }}>
                                        <div className="row">
                                            <div className="col-12 col-lg-6">Terms of Service</div>
                                            <div className="col-12 col-lg-6">Privacy Policy</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}
