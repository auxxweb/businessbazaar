import React, { useState } from 'react'
import { Container, Nav, Navbar, NavLink } from 'react-bootstrap'
import '/src/assets/css/template.css';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Template() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const settings = {
        dots: false,
        infinite: true,
        autoplay: true,
        arrows: false,
        speed: 500,
        slidesToShow: 4, // Number of dishes to show
        slidesToScroll: 1,

        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    };
    const setting2 = {
        dots: false,
        arrows: false,
        infinite: true,
        autoplay: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        afterChange: (current) => setCurrentSlide(current),
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };


    const settings3 = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };


    const services = [
        {
            title: 'Door to Door Delivery',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel diam id diam efficitur vestibulum. Nulla facilisi. Sed et libero vel neque tincidunt pharetra. Sed in massa ac neque pharetra consectetur.',
            img: '/src/assets/images/service2.svg'
        },
        {
            title: 'Secure Payment',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel diam id diam efficitur vestibulum. Nulla facilisi. Sed et libero vel neque tincidunt pharetra. Sed in massa ac neque pharetra consectetur.',
            img: '/src/assets/images/service1.svg'
        },
        {
            title: 'Fast Delivery',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel diam id diam efficitur vestibulum. Nulla facilisi. Sed et libero vel neque tincidunt pharetra. Sed in massa ac neque pharetra consectetur.',
            img: '/src/assets/images/service3.svg'
        }, {
            title: 'Door to Door Delivery',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel diam id diam efficitur vestibulum. Nulla facilisi. Sed et libero vel neque tincidunt pharetra. Sed in massa ac neque pharetra consectetur.',
            img: '/src/assets/images/service2.svg'
        },
    ];

    const dishes = [
        {
            img: '/src/assets/images/dish-1.png',
            title: 'Lumpia with Sauce',
            description: 'Lorem ipsum dolor sit, consectetur adipiscing elit, sed do eiusmod tempor.'
        },
        {
            img: '/src/assets/images/dish-2.png',
            title: 'Fish and Veggie',
            description: 'Lorem ipsum dolor sit, consectetur adipiscing elit, sed do eiusmod tempor.'
        },
        {
            img: '/src/assets/images/dish-3.png',
            title: 'Tofu Chili',
            description: 'Lorem ipsum dolor sit, consectetur adipiscing elit, sed do eiusmod tempor.'
        },
        {
            img: '/src/assets/images/dish-4.png',
            title: 'Egg and Cocumber',
            description: 'Lorem ipsum dolor sit, consectetur adipiscing elit, sed do eiusmod tempor.'
        },
        {
            img: '/src/assets/images/dish-1.png',
            title: 'Lumpia with Sauce',
            description: 'Lorem ipsum dolor sit, consectetur adipiscing elit, sed do eiusmod tempor.'
        }
    ];



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
            <Navbar expand="lg" className="bg-white pjs" style={{ padding: "20px" }}>
                <Container>
                    {/* Align Brand to the start (left side) */}
                    <Navbar.Brand href="#home" className='fw-bold w-50 nav-logo' style={{ fontSize: '36px' }}>
                        <img src="/src/assets/images/logo.svg" alt="" />
                        <span className="ms-2">Food House</span>
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ color: 'black' }} />

                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto w-100 justify-content-evenly">
                            <NavLink href="#menu" className='text-black  text-decoration-none fs-14' style={{ color: 'black' }}>
                                Menu
                            </NavLink>
                            <NavLink href="#gallery" className='text-black  text-decoration-none fs-14' style={{ color: 'black' }}>
                                Gallery
                            </NavLink>
                            <NavLink href="#about" className='text-black  text-decoration-none fs-14' style={{ color: 'black' }}>
                                About
                            </NavLink>
                            <NavLink href="#contact" className='text-black  text-decoration-none fs-14' style={{ color: 'black' }}>
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
                                className='fw-bold text-decoration-none'
                            >
                                Book a table
                            </NavLink>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <section className='h-auto'>
                <div className="container">
                    <div className="row align-items-center w-100">
                    <div className="col-12 col-md-6 text-end d-block d-md-none">
                            <img src="/src/assets/images/banner-image.png" alt="" className='banner-image' />
                            <div className='banner-image-2 d-none'>
                                <img src="/src/assets/images/baner-image2.png" alt="" />
                            </div>
                        </div>
                        <div className="col-12 col-md-6 order-0 order-md-1">
                            <div className="row align-items-center">
                                <div className="col-12">
                                    <h1 className="text-start text-dark fw-bold david-font fw-bold banner-title text-center text-md-start">We provide the <br />
                                        best food for you</h1>
                                </div>
                                <div className="col-12">
                                    <p className='text-secondary text-center text-md-start david-font'>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel neque ac nunc faucibus commodo. Donec sagittis neque vel neque congue, vel pellentesque lacus malesuada.
                                        Donec sed ultricies nunc, in efficitur nisi.
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
                                <div className="mt-5 col-12 row jcc-md  gap-3">
                                    <div className="contact-banner">
                                        <i className="bi bi-facebook"></i>
                                    </div>
                                    <div className="contact-banner">
                                        <i className="bi bi-instagram"></i>
                                    </div>
                                    <div className="contact-banner">
                                        <i className="bi bi-twitter"></i>
                                    </div>
                                    {/* <hr style={{width:"fit-content",opacity: 0.15,}}></hr> */}
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-md-6 text-end d-none d-md-block">
                            <img src="/src/assets/images/banner-image.png" alt="" className='banner-image' />
                            <div className='banner-image-2 d-none'>
                                <img src="/src/assets/images/baner-image2.png" alt="" />
                            </div>
                        </div>

                    </div>
                </div>
            </section>
            <div className="mt-5 mb-5">
                <div className="container">
                    <div className="col-12 address-section">
                        <div className="row">
                            <div className="col-12  col-md-4">
                                <div className="row align-items-center justify-content-around">
                                    <div className="col-1 address-logo">
                                        <i className="bi bi-geo-alt-fill"></i>
                                    </div>

                                    <div className="col-10 text-white">
                                        <span className="fs-13">Address</span>
                                        <p className='fs-16'>Calicut South Beach, Kozhikode</p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12  col-md-4">
                                <div className="row align-items-center justify-content-around">
                                    <div className="col-1 address-logo">
                                        <i className="bi bi-envelope-fill"></i>
                                    </div>

                                    <div className="col-10 text-white">
                                        <span className="fs-13">Send Email</span>
                                        <p className='fs-16'>Calicut South Beach, Kozhikode</p>
                                    </div>
                                </div>
                            </div>


                            <div className="col-12  col-md-4">
                                <div className="row align-items-center justify-content-around">
                                    <div className="col-1 address-logo">
                                        <i className="bi bi-telephone"></i>
                                    </div>

                                    <div className="col-10 text-white">
                                        <span className="fs-13">Contact</span>
                                        <p className='fs-16'>+91 0123654799</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <section className=' h-auto' style={{ backgroundColor: "#F3F3F4" }} id='about'>
                <div className="container">
                    <div className="row mt-5 align-items-center mb-5">
                        <div className="col-12 col-md-6 mt-2 text-center text-md-start about-image">
                            <img
                                src="/src/assets/images/baner-image2.png"
                                className="img-fluid"
                                alt=""
                            />

                        </div>
                        <div className="col-12 col-md-6">
                            <div className="col-12 mb-3">
                                <h1 className="text-center text-md-start text-dark fw-bold david-font fw-bold banner-title">Wecome to Our Restaurant</h1>
                            </div>
                            <div className="col-12 mt-4">
                                <p className='text-secondary text-center text-md-start david-font mt-4'>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel neque ac nunc faucibus commodo. Donec sagittis neque vel neque congue, vel pellentesque lacus malesuada.
                                    Donec sed ultricies nunc, in efficitur nisi. Sed consectetur, quam sit amet lobortis vulputate, velit velit consectetur ex, id malesuada ligula ipsum eu eros.
                                </p>
                            </div>
                            <div className="mt-3 col-12">
                                <div className="row">
                                    <div className="col-6 col-md-2">
                                        <button className="btn btn-dark text-white radius-theme box-shadow w-100">Menu</button>
                                    </div>
                                    <div className="col-6 col-md-3">
                                        <button className="btn btn-dark text-white radius-theme box-shadow theme w-100">Book a table</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </section>

            <section className="h-auto" style={{ backgroundColor: "#F3F3F4" }}>
                <div className="container mt-5 mb-5">
                    <div className="col-12 mb-5">
                        <div className="mt-5 text-center">
                            <div className="col-12">
                                <h1 className="text-center text-dark fw-bold david-font fw-bold banner-title fs-45">Our Special Dishes</h1>
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
                                {dishes.map((dish, index) => (
                                    <div key={index} className="dish-div col-12 text-center  p-3">
                                        <div className="col-12 position-relative text-center" style={{ bottom: "60px" }}>
                                            <img src={dish.img} alt={dish.title} />
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
                <div className="container pt-5 mt-5">
                    <div className="col-12 mb-5">
                        <div className="row justify-content-center">
                            <div className="col-6 text-center">
                                <h1 className="text-dark fw-bold david-font fw-bold banner-title fs-45">Menu</h1>
                            </div>
                        </div>
                    </div>
                    <div className="mt-3 mb-5 p-3" style={{ borderBottom: "2px solid #F3F3F4" }}>
                        <div className="row">
                            <div className="col-6 mb-3 col-md-3 cat-option">
                                <div className='row align-items-center'>
                                    <div className="col-3">
                                        <img src="/src/assets/images/burger1.png" alt="" className='w-80' />
                                    </div>
                                    <div className="col-9 fw-bold text-orange">
                                        <span>Fast Food</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6 mb-3 col-md-3 cat-option">
                                <div className='row align-items-center'>
                                    <div className="col-3">
                                        <img src="/src/assets/images/orange-juice.png" alt="" className='w-80' />
                                    </div>
                                    <div className="col-9 fw-bold text-orange">
                                        <span>Drink & Juice</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6 mb-3 col-md-3 cat-option">
                                <div className='row align-items-center'>
                                    <div className="col-3">
                                        <img src="/src/assets/images/pizza.png" alt="" className='w-80' />
                                    </div>
                                    <div className="col-9 fw-bold text-orange">
                                        <span>Chicken Pizza</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6 mb-3 col-md-3 cat-option br-none">
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

                                <div className="col-12 col-md-6 mt-3">
                                    <div className="row">
                                        <div className="col-2">
                                            <img src="/src/assets/images/menu1.png" alt="" className='w-100' />
                                        </div>
                                        <div className="col-8">
                                            <h1 className='fs-20 fw-bold'>Chinese Pasta</h1>
                                            <p className="mt-2">it's a testament to our.</p>
                                        </div>
                                        <div className="col-2">
                                            <span className='fw-bold'>$15.99</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12 col-md-6 mt-3">
                                    <div className="row">
                                        <div className="col-2">
                                            <img src="/src/assets/images/menu2.png" alt="" className='w-100' />
                                        </div>
                                        <div className="col-8">
                                            <h1 className='fs-20 fw-bold'>Egg and Cucumber</h1>
                                            <p className="mt-2">it's a testament to our.</p>
                                        </div>
                                        <div className="col-2">
                                            <span className='fw-bold'>$15.99</span>
                                        </div>
                                    </div>
                                </div>


                                <div className="col-12 col-md-6 mt-3">
                                    <div className="row">
                                        <div className="col-2">
                                            <img src="/src/assets/images/menu3.png" alt="" className='w-100' />
                                        </div>
                                        <div className="col-8">
                                            <h1 className='fs-20 fw-bold'>Chicken Fried Rice</h1>
                                            <p className="mt-2">it's a testament to our.</p>
                                        </div>
                                        <div className="col-2">
                                            <span className='fw-bold'>$15.99</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12 col-md-6 mt-3">
                                    <div className="row">
                                        <div className="col-2">
                                            <img src="/src/assets/images/menu4.png" alt="" className='w-100' />
                                        </div>
                                        <div className="col-8">
                                            <h1 className='fs-20 fw-bold'>Chicken White Rice</h1>
                                            <p className="mt-2">it's a testament to our.</p>
                                        </div>
                                        <div className="col-2">
                                            <span className='fw-bold'>$15.99</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12 col-md-6 mt-3">
                                    <div className="row">
                                        <div className="col-2">
                                            <img src="/src/assets/images/menu5.png" alt="" className='w-100' />
                                        </div>
                                        <div className="col-8">
                                            <h1 className='fs-20 fw-bold'>Chicken Pizza</h1>
                                            <p className="mt-2">it's a testament to our.</p>
                                        </div>
                                        <div className="col-2">
                                            <span className='fw-bold'>$15.99</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12 col-md-6 mt-3 mb-5">
                                    <div className="row">
                                        <div className="col-2">
                                            <img src="/src/assets/images/menu6.png" alt="" className='w-100' />
                                        </div>
                                        <div className="col-8">
                                            <h1 className='fs-20 fw-bold'>Spatial Barger</h1>
                                            <p className="mt-2">it's a testament to our.</p>
                                        </div>
                                        <div className="col-2">
                                            <span className='fw-bold'>$15.99</span>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>

                </div>
            </section>

            <section className="h-auto david-font" style={{ backgroundColor: "#F3F3F4" }}>
                <div className="container">
                    <div className="col-12 mt-5 text-center text-md-start">
                        <h1 className='fw-bold'>Services We Provide</h1>
                    </div>
                    <div className="col-12 mb-5">
                        <Slider {...setting2} className='mb-5'>
                            {services.map((service, index) => (
                                <div key={index} className={`col-12 col-md-4 service-design ${index === currentSlide ? 'active' : 'bg-white'}  mt-5 mb-5 text-center`}>
                                    <div className="col-12 text-center">
                                        <h3>{service.title}</h3>
                                    </div>
                                    <div className="col-12 mt-5">
                                        <p className='text-center'>{service.description}</p>
                                    </div>
                                    <div className="col-12 text-center" style={{ height: "100px" }}>
                                        <img src={service.img} alt={service.title} className='h-100' />
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
                            <div className="col-12 col-md-4 mt-4">
                                <img src="/src/assets/images/gallery.png" alt="" />
                            </div>
                            <div className="col-12 col-md-4 mt-4">
                                <img src="/src/assets/images/gallery1.png" alt="" />
                            </div>
                            <div className="col-12 col-md-4 mt-4">
                                <img src="/src/assets/images/gallery2.png" alt="" />
                            </div>
                            <div className="col-12 col-md-4 mt-4">
                                <img src="/src/assets/images/gallery3.png" alt="" />
                            </div>
                            <div className="col-12 col-md-4 mt-4 mb-4">
                                <img src="/src/assets/images/gallery4.png" alt="" />
                            </div>
                        </div>
                    </div>

                </div>
            </section>
            <section className='bg-white'>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-12 col-md-6 row align-items-center">
                            <div>
                                <div className="col-12 text-center text-md-start">
                                    <h1 className="fw-bold fs-45">Our Expert Chef</h1>
                                </div>
                                <div className="col-12 text-center text-md-start">
                                    <p className="fs-25">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non neque elit. Sed ut tellus ac neque fermentum tristique. Donec sed facilisis tellus, a vulputate turpis. Duis eget turpis non tellus tincidunt fermentum.</p>
                                </div>
                            </div>
                            <div className="mt-3 col-12 mb-5">
                                <div className="row">
                                    <div className="col-6 col-md-2">
                                        <button className="btn btn-dark text-white radius-theme box-shadow w-100">Menu</button>
                                    </div>
                                    <div className="col-6 col-md-3">
                                        <button className="btn btn-dark text-white radius-theme box-shadow theme w-100">Book a table</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-md-6">
                            <div className="col-12 text-center">
                                <img src="/src/assets/images/chef.png" alt="" className='chef-div img-fluid w-100' />

                            </div>
                        </div>


                    </div>
                </div>
            </section>
            <section style={{ backgroundColor: "#F3F3F4" }}>
                <div className="container david-font">
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
                            {testimonials.map((testimonial, index) => (
                                <div key={index} className="bg-white col-12 p-3 mt-2 test-div-bottom">
                                    <div className="col-12 text-center test-button-img-div">
                                        <img src={testimonial.img} alt={testimonial.name} />
                                    </div>
                                    <div className='text-warning text-center mt-0 m-0'>
                                        {[...Array(testimonial.stars)].map((star, i) => (
                                            <i key={i} className="bi bi-star-fill"></i>
                                        ))}
                                    </div>
                                    <div className="col-12 mt-3">
                                        <p>{testimonial.text}</p>
                                    </div>
                                    <div className="col-12 text-center mb-5">
                                        <span className='fw-bold david-font'>{testimonial.name}</span>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                    <div className="col-12">
                        <div className="col-12 text-center">
                            <button className="btn btn-dark text-white radius-theme box-shadow theme mt-5">Write Review</button>

                        </div>
                    </div>
                </div>
            </section>

            <section className="h-auto david-font" id='contact'>
                <div className="container">
                    <div className="col-12 newsletter position-relative">
                        <img src="/src/assets/images/newsletter.png" alt="" className='w-100'/>
                        <div className="text-center newsletter-content position-absolute">
                            <div className='d-none d-lg-block'>
                            <h2 className="fs-45 mb-3  fw-bold text-white">
                                Create Your own Business <br />
                                Subscribing To our  Newsletter
                            </h2>
                            <div className='row bg-white align-items-center input-div p-2'>
                                <div className="col-md-8 ">
                                    <input type="text" style={{ border: "0 !important" }} className="form-control form-control-lg" />
                                </div>
                                <div className="col-4 position-relative news-button">
                                    <button className="btn theme btn-lg ">Subscribe</button>
                                </div>
                            </div>
                            </div>


                            <div className='d-block d-lg-none'>
                            <h2 className="fs-16  fw-bold text-white">
                                Create Your own Business <br />
                                Subscribing To our  Newsletter
                            </h2>
                            <div className='row'>
                                <div className="col-md-12 ">
                                    <input type="text" style={{ border: "0 !important" }} className="form-control form-control-sm" />
                                </div>
                                <div className="col-12 position-relative news-button">
                                    <button className="btn theme btn-sm mt-1">Subscribe</button>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <footer className='h-auto'>
                <div className="container pjs">
                    <div className="mt-5">
                        <div className="row">
                            <div className="col-12 col-md-4">
                                <div className="col-12 text-center text-md-start text mt-5">
                                    <img src="/src/assets/images/logo.svg" alt="" />
                                    <span className="ms-2 fs-45 text-white">Food House</span>
                                </div>
                                <div className="col-12 mt-4  text-center text-md-start" style={{ color: "#A4B3CB" }}>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                                    </p>
                                </div>
                            </div>

                            <div className="col-12 col-md-4">
                                <div className="col-12 mt-5">
                                    <div className="col-12 mt-3 mb-3 text-center text-md-start">
                                        <a href="#" className=" fs-14 text-decoration-none text-orange">NAVIGATION</a>
                                    </div>
                                    <div className="col-12 mt-3 mb-3  text-center text-md-start">
                                        <a href="#" className="fs-14 text-decoration-none" style={{ color: "#A4B3CB" }}>Menu</a>
                                    </div>
                                    <div className="col-12 mt-3 mb-3  text-center text-md-start">
                                        <a href="#" className="fs-14 text-decoration-none" style={{ color: "#A4B3CB" }}>About Us</a>
                                    </div>
                                    <div className="col-12 mt-3 mb-3  text-center text-md-start">
                                        <a href="#" className="fs-14 text-decoration-none" style={{ color: "#A4B3CB" }}>Contact Us</a>
                                    </div>
                                    <div className="col-12 mt-3 mb-3  text-center text-md-start">
                                        <a href="#" className="fs-14 text-decoration-none" style={{ color: "#A4B3CB" }}>Main Dishes</a>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 col-md-4">
                                <div className="col-12 mt-5">
                                    <div className="col-12 mt-3 mb-3 text-center text-md-start">
                                        <a href="#" className=" fs-14 text-decoration-none text-orange">Follow Us</a>
                                    </div>

                                    <div className="mt-5 col-12 row gap-3 jcc-md text-center text-md-start">
                                        <div className="contact-banner text-orange text-center text-md-start">
                                            <i className="bi bi-facebook text-orange"></i>
                                        </div>
                                        <div className="contact-banner text-center text-md-start">
                                            <i className="bi bi-instagram text-orange"></i>
                                        </div>
                                        <div className="contact-banner text-center text-md-start">
                                            <i className="bi bi-twitter text-orange"></i>
                                        </div>
                                        {/* <hr style={{width:"fit-content",opacity: 0.15,}}></hr> */}
                                    </div>

                                </div>
                            </div>

                            <div className="col-12">
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="col-12">
                                            <div className="col-12 mt-3 mb-3 text-center text-md-start">
                                                <a href="#" className=" fs-14 text-decoration-none text-orange">OPENING HOURS</a>
                                            </div>
                                            <div className="mt-3 text-center text-md-start" style={{ color: "#A4B3CB" }}>
                                                <span>Monday - Friday</span>
                                            </div>
                                            <div className="mt-3 text-center text-md-start" style={{ color: "#A4B3CB" }}>
                                                <span>8:00 am to 9:00 pm</span>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="col-md-4">
                                        <div className="col-12 mt-5 text-center text-md-start">
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
                                    <div className="col-12 col-md-8 mt-5"  style={{ color: "#A4B3CB" }}>
                                        <span>© 2024 Business Bazaar. All Right Reserved</span>
                                    </div>
                                    
                                    <div className="col-12 col-md-6  text-center text-md-start mb-5 mt-5"  style={{ color: "#A4B3CB" }}>
                                        <div className="row">
                                            <div className="col-12 col-md-6">Terms of Service</div>
                                            <div className="col-12 col-md-6">Privacy Policy</div>
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
