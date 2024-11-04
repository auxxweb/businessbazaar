import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { Link, useParams } from 'react-router-dom'
import { getCategoryBusiness, getCategoryData } from '../Functions/functions';
import Loader from '../components/Loader';

export default function Business() {

    const [categoryData, setCategoryData] = useState([])
    const [businessData, setBusinessData] = useState([])
    const [totalBusinessData, setTotalBusinessData] = useState(0)
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const { id } = useParams()

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const category = await getCategoryData(id);
                setCategoryData(category.data);
                
                const business = await getCategoryBusiness(currentPage, id);
                setTotalBusinessData(business.data.totalCount);
                setBusinessData(business.data.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false); 
            }
        };
        
        fetchData();
    }, [currentPage, id]);

    const itemsPerPage = 6


    const totalPages = Math.ceil(totalBusinessData / itemsPerPage);
    const goToPreviousPage = () => {
        if (currentPage > 1) setCurrentPage(prevPage => prevPage - 1);
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(prevPage => prevPage + 1);
    };
    if (loading){
        return <Loader/>
    }
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
                <img src={categoryData.coverImage} className='w-100 h-100' alt="" />
                <div className="text-center image-title">
                    <h2>{categoryData.name}</h2>
                </div>

            </section>
            <section className='h-auto mt-5'>
                <div className="container">
                    <div className="col-12">
                        <div className="row justify-content-center">

                            <div className="col-6 col-md-4 mt-4">
                                <select name="" id="" className='form-control'>
                                    <option value="">Ratings</option>
                                    <option value="5-star">5 Stars</option>
                                    <option value="4-star">4 Stars & Above</option>
                                    <option value="3-star">3 Stars & Above</option>
                                    <option value="2-star">2 Stars & Above</option>
                                    <option value="1-star">1 Star & Above</option>
                                </select>
                            </div>

                        </div>
                    </div>

                </div>
            </section>
            <section className="home-spot h-auto mb-5">
            <div className="container padding" id='business'>
                <div className="text-center mb-5">
                    <h1 className='fw-bold'>Discover the Top Businesses</h1>
                    <p className="mt-3 text-center">
                        Explore the most popular destinations in your area, highly rated by locals and visitors alike.
                        Find out what makes these places stand out and start your next adventure right here!
                    </p>
                </div>

                <div className="row justify-content-around gap-2">
                    {businessData.map(business => (
                        <Link to={`/template/${business._id}`} key={business._id} className="text-decoration-none text-dark col-12 col-md-5 b-theme location-card mt-3">
                            <div className="row p-2">
                                <div className="col-4 p-0">
                                    <img src={business.logo} alt="" className='w-100 br-theme' />
                                </div>
                                <div className="col-8">
                                    <div className="col-12 mb-2 mt-2">
                                        <h2 style={{ fontSize: '28px' }}>{business.businessName}</h2>
                                    </div>
                                    <div className="col-12">
                                        <span className='p-1 bg-success text-white pe-2 ps-2'>4.5 <i className="bi bi-star ms-2 text-white"></i></span>
                                        <span className="ms-2 fs-12">3.5k reviews</span>
                                    </div>
                                    <div className="col-12 mt-3">
                                        <h3 className='fs-16'>
                                            <i className="bi bi-crosshair"></i>
                                            <span className='ms-1 fs-15'>{business.address.buildingName}, {business.address.city}, {business.address.landMark}, {business.address.streetName}, {business.address.state}</span>
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="d-flex justify-content-center mt-4">
                    <button onClick={goToPreviousPage} disabled={currentPage === 1} className="btn btn-primary me-2">Previous</button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <button onClick={goToNextPage} disabled={currentPage === totalPages} className="btn btn-primary ms-2">Next</button>
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
