import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { Link, useParams } from 'react-router-dom'
import { getCategoryBusiness, getCategoryData } from '../Functions/functions'
import Loader from '../components/Loader'

export default function Business() {
  const [categoryData, setCategoryData] = useState([])
  const [businessData, setBusinessData] = useState([])
  const [totalBusinessData, setTotalBusinessData] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [limit, setLimit] = useState(1)
  const { id } = useParams()

  useEffect(() => {
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

        const business = await getCategoryBusiness(currentPage, id, searchTerm, limit)
        setTotalBusinessData(business.data.totalCount)
        setBusinessData(business.data.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [currentPage, id, searchTerm])

  const totalPages = Math.ceil(totalBusinessData / limit)

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prevPage) => prevPage - 1)
  }

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prevPage) => prevPage + 1)
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1) // Reset to first page on new search
  }

  if (loading) {
    return <Loader />
  }

  return (
    <Layout title="Business" navClass="home">
      <section className="business-view-banner">
        <img src={categoryData.coverImage} className="w-100 h-100" alt="" />
        <div className="text-center image-title">
          <h2>{categoryData.name}</h2>
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
                    className="form-control custom-placeholder"
                    placeholder="Search for Businesses"
                    value={searchTerm}
                    onChange={handleSearch}
                    style={{
                      borderTopRightRadius: '50px',
                      borderBottomRightRadius: '50px',
                      borderLeft: 'none',
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
            {businessData.map((business) => (
              <Link
                to={`/template/${business._id}`}
                key={business._id}
                className="text-decoration-none text-dark col-12 col-md-5 b-theme location-card mt-3"
              >
                <div className="row p-2">
                  <div className="col-4 p-0">
                    <img
                      src={business.logo}
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
                      <span className="p-1 bg-success text-white pe-2 ps-2">
                        4.5 <i className="bi bi-star ms-2 text-white"></i>
                      </span>
                      <span className="ms-2 fs-12">3.5k reviews</span>
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

          <div className="d-flex justify-content-center align-items-center mt-4">
            <button
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className="btn btn-primary me-2"
              style={{
                borderTopLeftRadius: '50px',
                borderBottomLeftRadius: '50px',
                border: 'none',
                color: '#E5F0FD',
                backgroundColor: '#228AE2',
              }}
            >
              Prev.
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className="btn btn-primary ms-2"
              style={{
                borderTopRightRadius: '50px',
                borderBottomRightRadius: '50px',
                border: 'none',
                color: '#E5F0FD',
                backgroundColor: '#228AE2',
              }}
            >
              Next
            </button>
          </div>
        </div>
      </section>
    </Layout>
  )
}
