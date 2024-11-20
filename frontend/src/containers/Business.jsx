import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { Link, useParams } from 'react-router-dom'
import { useDebouncedCallback } from 'use-debounce'
import {
  fetchBusiness,
  getCategoryBusiness,
  getCategoryData,
} from '../Functions/functions'
import Loader from '../components/Loader/Loader'
import Placeholder from '../assets/images/placeholder.jpg'
import PlaceholderBanner from '../assets/images/BannerPlaceholder.png'

export default function Business() {
  const [categoryData, setCategoryData] = useState([])
  const [businessData, setBusinessData] = useState([])
  const [totalBusinessData, setTotalBusinessData] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [limit, setLimit] = useState(1)
  const [visibleBusiness, setVisibleBusiness] = useState(10)
  const { id } = useParams()

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        setLoading(true)
        try {
          const category = await getCategoryData({
            categoryId: id,
            searchTerm,
            page: currentPage,
            limit,
          })
          setCategoryData(category.data)

          const business = await getCategoryBusiness(
            currentPage,
            id,
            searchTerm,
            visibleBusiness,
          )
          setTotalBusinessData(business.data.totalCount)
          setBusinessData(business.data.data)
        } catch (error) {
          console.error('Error fetching data:', error)
        } finally {
          setLoading(false)
        }
      }

      fetchData()
    } else {
      const fetchData = async () => {
        try {
          setLoading(true)
          const business = await fetchBusiness(currentPage, visibleBusiness)
          console.log(business)
          setTotalBusinessData(business.data.totalCount)
          setBusinessData(business.data.data)
        } catch (e) {
          console.error('Error fetching data:', error)
        } finally {
          setLoading(false)
        }
      }
      fetchData()
    }
  }, [currentPage, id, searchTerm, visibleBusiness])

  const totalPages = Math.ceil(totalBusinessData / limit)

  const loadMoreBusiness = () => {
    setVisibleBusiness((prev) => prev + 10)
  }

  const handleSearch = useDebouncedCallback(
    // function
    (value) => {
      setSearchTerm(value ?? '')
      setCurrentPage(1)
    },
    500,
  )
  // const handleSearch = (e) => {
  //   setSearchTerm(e.target.value)
  //   setCurrentPage(1) // Reset to first page on new search
  // }


  return (
    <Layout title="Business" navClass="home">
      <section className="business-view-banner">
        <img
          src={
            id ? categoryData.coverImage : '/src/assets/images/businesses.jpg'
          }
          className="w-100 h-100"
          style={{ filter: 'brightness(0.4)' }}
          alt=""
        />
        <div className="text-center image-title">
          <h2 className="text-white">
            {id ? categoryData.name : 'All Businesses'}
          </h2>
        </div>
      </section>

      <div className="container mt-4">
        <div className="row">
          <div className="col-md-6">
            <div className="row justify-content-center">
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
                    className="form-control"
                    style={{ color: 'grey' }}
                    placeholder="Search for Businesses"
                    // value={searchTerm}
                    onChange={(e) => {
                      e.preventDefault()
                      handleSearch(e.target.value ?? '')
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="home-spot h-auto mb-5">
        <div className="container padding" id="business">
          <div className="text-center mb-5">
            <h1 className="fw-bold">Discover the Top Businesses</h1>
            <p className="mt-3 text-center">
              Explore the most popular destinations in your area, highly rated
              by locals and visitors alike. Find out what makes these places
              stand out and start your next adventure right here!
            </p>
          </div>

          <div className="row justify-content-around gap-2">
            {loading&&<Loader />}
            {businessData.map((business) => (
              <Link
                to={
                  business.selectedPlan?.isPremium
                    ? `/business/premium/${business?._id}`
                    : `/business/${business?._id}`
                }
                key={business._id}
                className="text-decoration-none text-dark col-12 col-md-5 b-theme location-card mt-3"
              >
                <div className="row p-2">
                  <div className="col-4 p-0">
                    <img
                      src={business.logo ? business.logo : Placeholder}
                      alt=""
                      className="w-100 br-theme"
                    />
                  </div>
                  <div className="col-8">
                    <div className="col-12 mb-2 mt-2">
                      <h2 style={{ fontSize: '28px' }}>
                        {business.businessName}
                      </h2>
                    </div>
                    <div className="col-12">
                      <span>{business.category.name}</span>
                    </div>
                    <div className="col-12 mt-3">
                      <h3 className="fs-16">
                        <i className="bi bi-crosshair"></i>
                        <span className="ms-1 fs-15">
                          {business.address.buildingName},{' '}
                          {business.address.city}, {business.address.landMark},{' '}
                          {business.address.streetName},{' '}
                          {business.address.state}
                        </span>
                      </h3>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          {visibleBusiness < totalBusinessData && (
            <div className="mt-5 text-center mb-1">
              <button
                onClick={loadMoreBusiness}
                className="btn btn-dark btn-md"
              >
                View More <i className="bi bi-arrow-right"></i>
              </button>
            </div>
          )}
        </div>
      </section>
      <a href="#" className="btn btn-lg btn-bottom btn-lg-square back-to-top">
        <i className="bi bi-arrow-up"></i>
      </a>
    </Layout>
  )
}
