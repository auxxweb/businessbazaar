import React from 'react'
import Layout from '../components/Layout'
import { Link } from 'react-router-dom'

export default function Business() {
    return (
        <Layout title="Business" navClass='home'>
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="row justify-content-center">
                            {/* Location Input with Crosshair Icon */}
                            <div className="col-12 mb-3 col-md-4">
                                <div className="input-group">
                                    <span
                                        className="input-group-text"
                                        style={{
                                            backgroundColor: 'white',
                                            borderTopLeftRadius: '50px',
                                            borderBottomLeftRadius: '50px',
                                            border: '1px solid #ced4da',
                                            color: '#228AE2'
                                        }}
                                    >
                                        <i className="bi bi-crosshair2"></i> {/* Use an alternative location icon */}
                                    </span>
                                    <input
                                        type="text"
                                        className="form-control custom-placeholder"
                                        placeholder="location"
                                        style={{
                                            borderTopRightRadius: '50px',
                                            borderBottomRightRadius: '50px',
                                            borderLeft: 'none',
                                            color: '#E5F0FD'
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Search Input */}
                            <div className="col-12 mb-3 col-md-8">
                                <div className="input-group">
                                    <span
                                        className="input-group-text"
                                        style={{
                                            backgroundColor: 'white',
                                            borderTopLeftRadius: '50px',
                                            borderBottomLeftRadius: '50px',
                                            border: '1px solid #ced4da'
                                        }}
                                    >
                                        <i className="bi bi-search fw-bold"></i>
                                    </span>
                                    <input
                                        type="text"
                                        className="form-control custom-placeholder"
                                        placeholder="Search for Restaurants"
                                        style={{
                                            borderTopRightRadius: '50px',
                                            borderBottomRightRadius: '50px',
                                            borderLeft: 'none'
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <section className='mt-5 business-view-banner'>
                <img src="/src/assets/images/business-image.png" className='w-100 h-100' alt="" />
                <div className="text-center image-title">
                    <h2>Savor the Moment</h2>
                </div>

            </section>
            <section className='h-auto mt-5'>
                <div className="container">
                    <div className="col-12">
                        <div className="row justify-content-center">
                            <div className="col-6 col-md-2 mt-4">
                                <select name="" id="" className='form-control'>
                                    <option value="">Sort by</option>
                                    <option value="price-asc">Price: Low to High</option>
                                    <option value="price-desc">Price: High to Low</option>
                                    <option value="rating">Highest Rated</option>
                                    <option value="newest">Newest First</option>
                                </select>
                            </div>

                            <div className="col-6 col-md-2 mt-4">
                                <select name="" id="" className='form-control'>
                                    <option value="">Ratings</option>
                                    <option value="5-star">5 Stars</option>
                                    <option value="4-star">4 Stars & Above</option>
                                    <option value="3-star">3 Stars & Above</option>
                                    <option value="2-star">2 Stars & Above</option>
                                    <option value="1-star">1 Star & Above</option>
                                </select>
                            </div>

                            <div className="col-6 col-md-2 mt-4">
                                <select name="" id="" className='form-control'>
                                    <option value="">Amenities</option>
                                    <option value="wifi">Free WiFi</option>
                                    <option value="parking">Parking</option>
                                    <option value="pool">Swimming Pool</option>
                                    <option value="gym">Gym</option>
                                    <option value="spa">Spa</option>
                                </select>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
            <section className="mt-5 h-auto">
                <div className="container">
                    <div className="mb-5 p-4">
                        <h1 className="text-center fw-bold mt-4" style={{ marginTop: "20px" }}>
                            Discover Diverse Categories
                        </h1>
                        <p className="mt-3 text-center  ">
                            Uncover a variety of services and experiences designed to cater to your every need. E
                            xplore the finest options available and find exactly what you're looking for!
                        </p>
                    </div>
                    <div className="col-12 mt-4 row justify-content-center mb-5 business-view-div-main">
                        <Link to='/template' className="text-decoration-none text-dark col-12 b-theme location-card mt-4">
                            
                            <div className="row p-3">
                                <div className="col-12 col-md-4 mt-2 p-0 text-center">
                                    <img src="/src/assets/images/business-view.png" alt="Business View" className='w-100 br-theme' />
                                </div>
                                <div className="col-12 col-md-8 p-3">
                                    <div className="col-12 mb-2 mt-2">
                                        <div className="row">
                                            <div className="col-11 text-center text-md-start">
                                                <h2 style={{ fontSize: '28px' }}>Salad House</h2>
                                            </div>
                                            <div className="col-1 text-end">
                                                <i className="bi bi-heart fs-20"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 text-center text-md-start">
                                        <span className='p-1 bg-success text-white pe-2 ps-2'>4.5 <i className="bi bi-star ms-2 text-white"></i></span>
                                        <span className="ms-2 fs-12">3.5k reviews</span>
                                    </div>
                                    <div className="col-12 mt-3 text-center text-md-start">
                                        <h3 className='fs-16'>
                                            <i className="bi bi-crosshair"></i>
                                            <span className='ms-1 fs-15'>No.12/3, Calicut South Beach, Kozhikode</span>
                                        </h3>
                                    </div>
                                    <div className="col-12 mt-3 mb-5">
                                        <div className="business-feature text-center text-md-start">
                                            <span>Dine In</span>
                                            <span className='ms-2'>Indian</span>
                                            <span className='ms-2'>Delivery</span>
                                        </div>
                                    </div>
                                    <div className="col-12 mt-3 text-center text-md-start">
                                        <button className="btn" style={{ backgroundColor: "#228ae2", color: "white" }}>Contact Us</button>
                                    </div>
                                </div>
                            </div>
                        </Link>
                        <Link to='/template' className="text-decoration-none text-dark col-12 b-theme location-card mt-4">
                            <div className="row p-3">
                                <div className="col-12 col-md-4 mt-2 p-0 text-center">
                                    <img src="/src/assets/images/business-view.png" alt="Business View" className='w-100 br-theme' />
                                </div>
                                <div className="col-12 col-md-8 p-3">
                                    <div className="col-12 mb-2 mt-2">
                                        <div className="row">
                                            <div className="col-11 text-center text-md-start">
                                                <h2 style={{ fontSize: '28px' }}>Salad House</h2>
                                            </div>
                                            <div className="col-1 text-end">
                                                <i className="bi bi-heart fs-20"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 text-center text-md-start">
                                        <span className='p-1 bg-success text-white pe-2 ps-2'>4.5 <i className="bi bi-star ms-2 text-white"></i></span>
                                        <span className="ms-2 fs-12">3.5k reviews</span>
                                    </div>
                                    <div className="col-12 mt-3 text-center text-md-start">
                                        <h3 className='fs-16'>
                                            <i className="bi bi-crosshair"></i>
                                            <span className='ms-1 fs-15'>No.12/3, Calicut South Beach, Kozhikode</span>
                                        </h3>
                                    </div>
                                    <div className="col-12 mt-3 mb-5">
                                        <div className="business-feature text-center text-md-start">
                                            <span>Dine In</span>
                                            <span className='ms-2'>Indian</span>
                                            <span className='ms-2'>Delivery</span>
                                        </div>
                                    </div>
                                    <div className="col-12 mt-3 text-center text-md-start">
                                        <button className="btn" style={{ backgroundColor: "#228ae2", color: "white" }}>Contact Us</button>
                                    </div>
                                </div>
                            </div>
                        </Link>
                        <Link to='/template' className="text-decoration-none text-dark col-12 b-theme location-card mt-4">
                            <div className="row p-3">
                                <div className="col-12 col-md-4 mt-2 p-0 text-center">
                                    <img src="/src/assets/images/business-view.png" alt="Business View" className='w-100 br-theme' />
                                </div>
                                <div className="col-12 col-md-8 p-3">
                                    <div className="col-12 mb-2 mt-2">
                                        <div className="row">
                                            <div className="col-11 text-center text-md-start">
                                                <h2 style={{ fontSize: '28px' }}>Salad House</h2>
                                            </div>
                                            <div className="col-1 text-end">
                                                <i className="bi bi-heart fs-20"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 text-center text-md-start">
                                        <span className='p-1 bg-success text-white pe-2 ps-2'>4.5 <i className="bi bi-star ms-2 text-white"></i></span>
                                        <span className="ms-2 fs-12">3.5k reviews</span>
                                    </div>
                                    <div className="col-12 mt-3 text-center text-md-start">
                                        <h3 className='fs-16'>
                                            <i className="bi bi-crosshair"></i>
                                            <span className='ms-1 fs-15'>No.12/3, Calicut South Beach, Kozhikode</span>
                                        </h3>
                                    </div>
                                    <div className="col-12 mt-3 mb-5">
                                        <div className="business-feature text-center text-md-start">
                                            <span>Dine In</span>
                                            <span className='ms-2'>Indian</span>
                                            <span className='ms-2'>Delivery</span>
                                        </div>
                                    </div>
                                    <div className="col-12 mt-3 text-center text-md-start">
                                        <button className="btn" style={{ backgroundColor: "#228ae2", color: "white" }}>Contact Us</button>
                                    </div>
                                </div>
                            </div>
                        </Link>
                        <Link to='/template' className="text-decoration-none text-dark col-12 b-theme location-card mt-4">
                            <div className="row p-3">
                                <div className="col-12 col-md-4 mt-2 p-0 text-center">
                                    <img src="/src/assets/images/business-view.png" alt="Business View" className='w-100 br-theme' />
                                </div>
                                <div className="col-12 col-md-8 p-3">
                                    <div className="col-12 mb-2 mt-2">
                                        <div className="row">
                                            <div className="col-11 text-center text-md-start">
                                                <h2 style={{ fontSize: '28px' }}>Salad House</h2>
                                            </div>
                                            <div className="col-1 text-end">
                                                <i className="bi bi-heart fs-20"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 text-center text-md-start">
                                        <span className='p-1 bg-success text-white pe-2 ps-2'>4.5 <i className="bi bi-star ms-2 text-white"></i></span>
                                        <span className="ms-2 fs-12">3.5k reviews</span>
                                    </div>
                                    <div className="col-12 mt-3 text-center text-md-start">
                                        <h3 className='fs-16'>
                                            <i className="bi bi-crosshair"></i>
                                            <span className='ms-1 fs-15'>No.12/3, Calicut South Beach, Kozhikode</span>
                                        </h3>
                                    </div>
                                    <div className="col-12 mt-3 mb-5">
                                        <div className="business-feature text-center text-md-start">
                                            <span>Dine In</span>
                                            <span className='ms-2'>Indian</span>
                                            <span className='ms-2'>Delivery</span>
                                        </div>
                                    </div>
                                    <div className="col-12 mt-3 text-center text-md-start">
                                        <button className="btn" style={{ backgroundColor: "#228ae2", color: "white" }}>Contact Us</button>
                                    </div>
                                </div>
                            </div>
                        </Link>
                        <Link to='/template' className="text-decoration-none text-dark col-12 b-theme location-card mt-4">
                            <div className="row p-3">
                                <div className="col-12 col-md-4 mt-2 p-0 text-center">
                                    <img src="/src/assets/images/business-view.png" alt="Business View" className='w-100 br-theme' />
                                </div>
                                <div className="col-12 col-md-8 p-3">
                                    <div className="col-12 mb-2 mt-2">
                                        <div className="row">
                                            <div className="col-11 text-center text-md-start">
                                                <h2 style={{ fontSize: '28px' }}>Salad House</h2>
                                            </div>
                                            <div className="col-1 text-end">
                                                <i className="bi bi-heart fs-20"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 text-center text-md-start">
                                        <span className='p-1 bg-success text-white pe-2 ps-2'>4.5 <i className="bi bi-star ms-2 text-white"></i></span>
                                        <span className="ms-2 fs-12">3.5k reviews</span>
                                    </div>
                                    <div className="col-12 mt-3 text-center text-md-start">
                                        <h3 className='fs-16'>
                                            <i className="bi bi-crosshair"></i>
                                            <span className='ms-1 fs-15'>No.12/3, Calicut South Beach, Kozhikode</span>
                                        </h3>
                                    </div>
                                    <div className="col-12 mt-3 mb-5">
                                        <div className="business-feature text-center text-md-start">
                                            <span>Dine In</span>
                                            <span className='ms-2'>Indian</span>
                                            <span className='ms-2'>Delivery</span>
                                        </div>
                                    </div>
                                    <div className="col-12 mt-3 text-center text-md-start">
                                        <button className="btn" style={{ backgroundColor: "#228ae2", color: "white" }}>Contact Us</button>
                                    </div>
                                </div>
                            </div>
                        </Link>
                        <Link to='/template' className="text-decoration-none text-dark col-12 b-theme location-card mt-4">
                            <div className="row p-3">
                                <div className="col-12 col-md-4 mt-2 p-0 text-center">
                                    <img src="/src/assets/images/business-view.png" alt="Business View" className='w-100 br-theme' />
                                </div>
                                <div className="col-12 col-md-8 p-3">
                                    <div className="col-12 mb-2 mt-2">
                                        <div className="row">
                                            <div className="col-11 text-center text-md-start">
                                                <h2 style={{ fontSize: '28px' }}>Salad House</h2>
                                            </div>
                                            <div className="col-1 text-end">
                                                <i className="bi bi-heart fs-20"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 text-center text-md-start">
                                        <span className='p-1 bg-success text-white pe-2 ps-2'>4.5 <i className="bi bi-star ms-2 text-white"></i></span>
                                        <span className="ms-2 fs-12">3.5k reviews</span>
                                    </div>
                                    <div className="col-12 mt-3 text-center text-md-start">
                                        <h3 className='fs-16'>
                                            <i className="bi bi-crosshair"></i>
                                            <span className='ms-1 fs-15'>No.12/3, Calicut South Beach, Kozhikode</span>
                                        </h3>
                                    </div>
                                    <div className="col-12 mt-3 mb-5">
                                        <div className="business-feature text-center text-md-start">
                                            <span>Dine In</span>
                                            <span className='ms-2'>Indian</span>
                                            <span className='ms-2'>Delivery</span>
                                        </div>
                                    </div>
                                    <div className="col-12 mt-3 text-center text-md-start">
                                        <button className="btn" style={{ backgroundColor: "#228ae2", color: "white" }}>Contact Us</button>
                                    </div>
                                </div>
                            </div>
                        </Link>
                        <Link to='/template' className="text-decoration-none text-dark col-12 b-theme location-card mt-4">
                            <div className="row p-3">
                                <div className="col-12 col-md-4 mt-2 p-0 text-center">
                                    <img src="/src/assets/images/business-view.png" alt="Business View" className='w-100 br-theme' />
                                </div>
                                <div className="col-12 col-md-8 p-3">
                                    <div className="col-12 mb-2 mt-2">
                                        <div className="row">
                                            <div className="col-11 text-center text-md-start">
                                                <h2 style={{ fontSize: '28px' }}>Salad House</h2>
                                            </div>
                                            <div className="col-1 text-end">
                                                <i className="bi bi-heart fs-20"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 text-center text-md-start">
                                        <span className='p-1 bg-success text-white pe-2 ps-2'>4.5 <i className="bi bi-star ms-2 text-white"></i></span>
                                        <span className="ms-2 fs-12">3.5k reviews</span>
                                    </div>
                                    <div className="col-12 mt-3 text-center text-md-start">
                                        <h3 className='fs-16'>
                                            <i className="bi bi-crosshair"></i>
                                            <span className='ms-1 fs-15'>No.12/3, Calicut South Beach, Kozhikode</span>
                                        </h3>
                                    </div>
                                    <div className="col-12 mt-3 mb-5">
                                        <div className="business-feature text-center text-md-start">
                                            <span>Dine In</span>
                                            <span className='ms-2'>Indian</span>
                                            <span className='ms-2'>Delivery</span>
                                        </div>
                                    </div>
                                    <div className="col-12 mt-3 text-center text-md-start">
                                        <button className="btn" style={{ backgroundColor: "#228ae2", color: "white" }}>Contact Us</button>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            <footer className='mt-3 h-auto footer-section'>
                <div className="container">
                    <div className="p-4 mt-0 mt-md-5 pt-5" >
                        <div className="row">
                            <div className="col-12 col-md-6">
                                <h1 className="fs-45 text-white text-center text-md-start fw-bold">
                                    Ready to Create Your Business
                                </h1>
                            </div>
                            <div className="col-12 col-md-6 text-center text-md-end">
                                <button className="btn btn-theme mt-3">Create Now</button>
                            </div>
                        </div>
                    </div>
                    <hr className="bg-white" />
                    <div className="p-4 mt-5 pt-0 pt-md-5" >
                        <div className="row">
                            <div className="col-12 col-md-6">
                                <h1 className="fs-45 text-white text-center text-md-start fw-bold mb-3">
                                    Business Bazaar
                                </h1>
                                <div className='fs-20 text-white text-center text-md-start'>where requirements are found</div>
                            </div>
                            <div className="col-12 col-md-6">
                                <div className="row">
                                    <div className="col-12 col-md-6 text-start usefull-links">
                                        <h3 className="text-white mb-3 fs-20 fw-bold text-center text-md-start mt-3 mt-md-0">
                                            Useful Links
                                        </h3>
                                        <div className="col-12 mb-3 text-center text-md-start">
                                            <a href="" className="fs-20 text-white">About Me</a>
                                        </div>
                                        <div className="col-12 mb-3 text-center text-md-start">
                                            <a href="" className="fs-20 text-white">Services</a>
                                        </div>
                                        <div className="col-12 mb-3 text-center text-md-start">
                                            <a href="" className="fs-20 text-white">Portfolio</a>
                                        </div>
                                    </div>



                                    <div className="col-12 col-md-6 text-start">
                                        <h3 className="text-white mb-3 fs-20 fw-bold text-center text-md-start">
                                            Contact Info
                                        </h3>
                                        <div className="col-12 mb-3 text-center text-md-start">
                                            <a href="" className="fs-16 text-white" >Auxxweb@gmail.com</a>
                                        </div>
                                        <div className="col-12 mb-3 text-center text-md-start">
                                            <a href="" className=' fs-20 text-decoration-none text-white'><span><i className="bi bi-telephone text-white me-1"></i> +91 7994085695</span></a>
                                        </div>
                                        <div className="col-12 mb-3 text-center text-md-start">
                                            <a href="" className="fs-20 text-white"><span><i className="bi bi-geo-alt-fill text-white me-1"></i>Calicut</span></a>
                                        </div>
                                    </div>
                                </div>
                            </div>




                        </div>
                    </div>

                    <div className="p-4 mt-2" >
                        <div className="row text-center text-md-start text-white">
                            <div className="col-12 col-md-2 mt-2">Cookie Policy</div>
                            <div className="col-12 col-md-2 mt-2">Terms and Conditions</div>
                        </div>
                        <div className="text-secondary text-center text-md-start mt-5">
                            <div className='fs-16'>© 2024. All rights reserved</div>
                        </div>
                    </div>


                </div>
            </footer>
        </Layout>
    )
}
