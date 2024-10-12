/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  fetchBusinessByCategory,
  fetchCategoryById,
} from '../Functions/functions'
import { reviewCount } from '../utils/app.utils'
import '../css/business.css'
import Pagination from '../components/Pagination'

export default function Business() {
  const { id } = useParams()

  const [paginationData, setPaginationData] = useState({
    page: 1,
    limit: 5,
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [businessData, setBusinessData] = useState([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    const fatchCategoryId = async () => {
      try {
        setLoading(true)
        const categoryData = await fetchCategoryById(id)
        setCategory(categoryData?.data)
      } catch (error) {
        setLoading(false)
        console.error('Error fetching categories:', error)
      } finally {
        setLoading(false)
      }
    }
    fatchCategoryId()
  }, [paginationData, searchTerm])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const businessDatas = await fetchBusinessByCategory({
          categoryId: id,
          searchTerm,
          ...paginationData,
        })
        setBusinessData(businessDatas?.data)
        console.log(businessDatas.data?.data)
      } catch (error) {
        console.error('Error fetching categories:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [paginationData, searchTerm])

  const handlePageChange = (page) => {
    setPaginationData({
      ...paginationData,
      page,
    })
  }

  return (
    <Layout title="Business" navClass="home">
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
                      color: '#228AE2',
                    }}
                  >
                    <i className="bi bi-crosshair2"></i>{' '}
                    {/* Use an alternative location icon */}
                  </span>
                  <input
                    type="text"
                    className="form-control custom-placeholder"
                    placeholder="location"
                    style={{
                      borderTopRightRadius: '50px',
                      borderBottomRightRadius: '50px',
                      borderLeft: 'none',
                      color: '#E5F0FD',
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
                      border: '1px solid #ced4da',
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
                      borderLeft: 'none',
                    }}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="mt-1 business-view-banner">
        <img
          src={
            category?.coverImage ??
            (!loading && '/src/assets/images/business-image.png')
          }
          className="w-100 h-100"
          alt=""
        />
        <div className="text-center image-title">
          <h2>Savor the Moment</h2>
        </div>
      </section>
      {/* <section className="h-auto mt-5">
        <div className="container">
          <div className="col-12">
          </div>
        </div>
      </section> */}
      <section className="mt-5 h-auto">
        <div className="container">
          <div className="mb-5 p-4">
            <h1
              className="text-center fw-bold mt-4"
              style={{ marginTop: '20px' }}
            >
              Discover Diverse Categories
            </h1>
            <p className="mt-3 text-center  ">
              Uncover a variety of services and experiences designed to cater to
              your every need. E xplore the finest options available and find
              exactly what you're looking for!
            </p>
          </div>
          <div className="col-12 mt-4 row justify-content-center mb-5 business-view-div-main">
            {businessData?.data?.length &&
              businessData?.data?.map((business, index) => (
                <Link
                  to={`/template/${business?._id}`}
                  className="text-decoration-none text-dark col-12 b-theme location-card mt-4"
                  key={`business-card-${index}`}
                >
                  <div className="row p-3 businessCard">
                    <div className="col-12 col-md-4 mt-2 p-0 text-center">
                      <img
                        src={business?.logo}
                        alt="Business View"
                        className="w-100 br-theme"
                      />
                    </div>
                    <div className="col-12 col-md-8 p-3">
                      <div className="col-12 mb-2 mt-2">
                        <div className="row">
                          <div className="col-11 text-center text-md-start">
                            <h2 style={{ fontSize: '28px' }}>
                              {business?.businessName}
                            </h2>
                          </div>
                          {/* <div className="col-1 text-end">
                            <i className="bi bi-heart fs-20"></i>
                          </div> */}
                        </div>
                      </div>
                      <div className="col-12 text-center text-md-start">
                        <span className="p-1 bg-success text-white pe-2 ps-2">
                          {business?.rating}{' '}
                          <i className="bi bi-star ms-2 text-white"></i>
                        </span>
                        <span className="ms-2 fs-12">
                          {reviewCount(
                            business?.testimonial?.reviews?.length || 0,
                          )}
                        </span>
                      </div>
                      <div className="col-12 mt-3 text-center text-md-start">
                        <h3 className="fs-16">
                          <i className="bi bi-crosshair"></i>
                          <span className="ms-1 fs-15">
                            {business?.address?.buildingName &&
                              ` ${business?.address?.buildingName},`}
                            {business?.address?.streetName &&
                              ` ${business?.address?.streetName},`}
                            {business?.address?.landMark &&
                              ` ${business?.address?.landMark},`}
                            {business?.address?.city &&
                              ` ${business?.address?.city},`}
                            {business?.address?.state &&
                              ` ${business?.address?.state},`}
                            {business?.address?.pinCode &&
                              ` ${business?.address?.pinCode}`}
                          </span>
                        </h3>
                      </div>
                      <div className="col-12 mt-3 mb-5">
                        <div className="business-feature text-center text-md-start">
                          {business?.services?.map((service, index) => (
                            <span key={`key-${index}`} className="ms-2">
                              {service}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="col-12 mt-3 text-center text-md-start">
                        <button className="view-more btn">View Details</button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            <div className="d-flex">
              <div className="col-12 mt-5 text-center text-md-center">
                <Pagination
                  totalItems={businessData?.totalCount ?? 0}
                  itemsPerPage={paginationData?.limit ?? 5}
                  currentPage={paginationData?.page}
                  onPageChange={handlePageChange}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="mt-3 h-auto footer-section">
        <div className="container">
          <div className="p-4 mt-0  pt-5">
            <div className="row">
              <div className="col-12 col-md-6">
                <h1 className="fs-45 text-white text-center text-md-start fw-bold">
                  Ready to Create Your Business
                </h1>
              </div>
              <div className="col-12 col-md-6 text-center text-md-end">
                <button
                  onClick={() => {
                    navigate('/create-business')
                  }}
                  className="btn btn-theme mt-3"
                >
                  Create Now
                </button>
              </div>
            </div>
          </div>
          <hr className="bg-white" />
          <div className="p-4 mt-5 pt-0 pt-md-5">
            <div className="row">
              <div className="col-12 col-md-6">
                <h1 className="fs-45 text-white text-center text-md-start fw-bold mb-3">
                  Business Bazaar
                </h1>
                <div className="fs-20 text-white text-center text-md-start">
                  where requirements are found
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="row">
                  <div className="col-12 col-md-6 text-start usefull-links">
                    <h3 className="text-white mb-3 fs-20 fw-bold text-center text-md-start mt-3 mt-md-0">
                      Useful Links
                    </h3>
                    <div className="col-12 mb-3 text-center text-md-start">
                      <a href="" className="fs-20 text-white">
                        About Me
                      </a>
                    </div>
                    <div className="col-12 mb-3 text-center text-md-start">
                      <a href="" className="fs-20 text-white">
                        Services
                      </a>
                    </div>
                    <div className="col-12 mb-3 text-center text-md-start">
                      <a href="" className="fs-20 text-white">
                        Portfolio
                      </a>
                    </div>
                  </div>

                  <div className="col-12 col-md-6 text-start">
                    <h3 className="text-white mb-3 fs-20 fw-bold text-center text-md-start">
                      Contact Info
                    </h3>
                    <div className="col-12 mb-3 text-center text-md-start">
                      <a href="" className="fs-16 text-white">
                        Auxxweb@gmail.com
                      </a>
                    </div>
                    <div className="col-12 mb-3 text-center text-md-start">
                      <a
                        href=""
                        className=" fs-20 text-decoration-none text-white"
                      >
                        <span>
                          <i className="bi bi-telephone text-white me-1"></i>{' '}
                          +91 7994085695
                        </span>
                      </a>
                    </div>
                    <div className="col-12 mb-3 text-center text-md-start">
                      <a href="" className="fs-20 text-white">
                        <span>
                          <i className="bi bi-geo-alt-fill text-white me-1"></i>
                          Calicut
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 mt-2">
            <div className="row text-center text-md-start text-white">
              <div className="col-12 col-md-2 mt-2">Cookie Policy</div>
              <div className="col-12 col-md-2 mt-2">Terms and Conditions</div>
            </div>
            <div className="text-secondary text-center text-md-start mt-5">
              <div className="fs-16">© 2024. All rights reserved</div>
            </div>
          </div>
        </div>
      </footer>
    </Layout>
  )
}
