import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Link, useParams } from "react-router-dom";
import {
  fetchBusiness,
  getCategoryBusiness,
  getCategoryData,
} from "../Functions/functions";
import Loader from "../components/Loader/Loader";
import Placeholder from "/images/placeholder.jpg";
import debounce from "lodash.debounce";
import { FaStar } from "react-icons/fa";

export default function Business() {
  const [categoryData, setCategoryData] = useState([]);
  const [businessData, setBusinessData] = useState([]);
  const [totalBusinessData, setTotalBusinessData] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [limit, setLimit] = useState(10); // Adjusting the limit as needed
  const [visibleBusiness, setVisibleBusiness] = useState(10);
  const { id } = useParams();

  // Scroll to the top when category changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Fetch data whenever currentPage, id, searchTerm, or visibleBusiness changes
  useEffect(() => {
    const fetchData = async () => {
      // setLoading(true);
      try {
        if (id) {
          // Fetch data for a specific category
          console.log("Fetching category data...");
          const category = await getCategoryData({
            categoryId: id,
            searchTerm,
            page: currentPage,
            limit,
          });
          console.log("Category Data:", category);
          setCategoryData(category.data);

          const business = await getCategoryBusiness(
            currentPage,
            id,
            searchTerm,
            visibleBusiness
          );
          console.log("Business Data:", business);
          setTotalBusinessData(business.data.totalCount);
          setBusinessData(business.data.data);
        } else {
          // Fetch all businesses if no category id is provided
          console.log("Fetching all business data...");
          const business = await fetchBusiness(currentPage, visibleBusiness);
          console.log("Business Data:", business);
          setTotalBusinessData(business.data.totalCount);
          setBusinessData(business.data.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        console.log("Data fetch complete");
        setLoading(false); // Make sure this is being reached
      }
    };

    fetchData();
  }, [currentPage, id, searchTerm, visibleBusiness]);

  const totalPages = Math.ceil(totalBusinessData / limit);

  // Load more businesses when the button is clicked
  const loadMoreBusiness = () => {
    setVisibleBusiness((prev) => prev + 10);
  };

  // Debounced search function
  const debouncedSearch = debounce((value) => {
    setSearchTerm(value);
    setCurrentPage(1); // Reset to first page on new search
  }, 500); // 500 ms delay

  // Handle immediate input update
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value); // Immediate update for the input field
    debouncedSearch(value); // Trigger debounced search for API call
  };

  // If loading, show the Loader component
  // if (loading) {
  //   return <Loader />;
  // }
  const slugify = (text) => {
    if (!text) return "";
    return text
      .toLowerCase()
      .replace(/ /g, "-") // Replace spaces with hyphens
      .replace(/[^\w-]+/g, ""); // Remove non-word characters
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <FaStar
        key={index}
        size={12}
        className={index < Math.floor(rating) ? "text-warning" : "text-muted"}
      />
    ));
  };

  return (
    <Layout title="Business" navClass="home">
      <section className="business-view-banner">
        <img
          src={id ? categoryData.coverImage : "/images/businesses.jpg"}
          className="w-100 h-100"
          style={{ filter: "brightness(0.4)" }}
          alt=""
        />
        <div className="text-center image-title">
          <h2 className="text-white">
            {id ? categoryData.name : "All Businesses"}
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
                      backgroundColor: "white",
                      borderTopLeftRadius: "50px",
                      borderBottomLeftRadius: "50px",
                      border: "1px solid #ced4da",
                    }}
                  >
                    <i className="bi bi-search fw-bold"></i>
                  </span>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search for Businesses"
                    value={searchTerm}
                    onChange={handleSearch} // Immediate update with debounce for API call
                    style={{
                      borderTopRightRadius: "50px",
                      borderBottomRightRadius: "50px",
                      borderLeft: "none",
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
            <h1 className="fw-bold">Discover the Top Profiles</h1>
            <p className="mt-3 text-center">
              Explore the top-rated profiles in your area, highly recommended by
              locals and visitors alike. Discover what makes these
              establishments stand out and start your next great experience
              here!!
            </p>
          </div>

          <div
  className={`row row-cols-1 row-cols-md-2 row-cols-lg-3 g-lg-4 g-0 ${
    businessData.length <= 2 ? "justify-content-center" : ""
  }`}
>
  {businessData.length > 0 ? (
    businessData?.map((business) => (
      <div key={business._id} className="col">
        <Link
          to={
            business?.selectedPlan?.isPremium
              ? `/profile/premium/${slugify(business?.businessName)}/${
                  business?._id
                }`
              : `/profile/${slugify(business?.businessName)}/${business?._id}`
          }
          className="text-decoration-none"
        >
          <div className="card h-100 border-0 shadow-xl rounded-4 overflow-visible hover-card">
            <div className="px-4 py-3 position-relative">
              {/* Category */}
              <div className="small text-muted">
                {business?.category?.name || "News & Media"}
              </div>

              <div className="row g-3">
                {/* Content Column */}
                <div className="col-12">
                  <h5
                    className="card-title h6 fw-bold text-dark"
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      minHeight: "20px",
                      paddingRight: "45%", // Space for image
                    }}
                  >
                    {business?.businessName}
                  </h5>

                  <p
                    className="card-text text-muted small"
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      paddingRight: "45%", // Space for image
                    }}
                  >
                    {business?.address?.buildingName} {business?.address?.city}{" "}
                    {business?.address?.landMark}
                  </p>
                </div>

                {/* Image positioned at top */}
                <div
                  className="position-absolute"
                  style={{
                    width: "130px",
                    right: "20px",
                    top: "-30px",
                    maxWidth: "40%",
                  }}
                >
                  <img
                    src={business?.logo || Placeholder}
                    alt={business?.businessName}
                    className="rounded-3 w-100 shadow-sm"
                    style={{
                      aspectRatio: "1",
                      objectFit: "cover",
                    }}
                  />
                </div>

                {/* Rating fixed under the image */}
                <div
                  className="position-absolute"
                  style={{
                    width: "110px",
                    right: "30px",
                    top: "80px", // Updated from bottom: 2px to top: 80px
                  }}
                >
                  <div className="d-flex align-items-center justify-content-center px-2 py-1">
                    {renderStars(business?.rating || 0)}
                    <span className="ms-1 small fw-medium">
                      {business?.rating || "0.0"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    ))
  ) : (
    <div className="text-center mt-5">
      <h3>No businesses found</h3>
      <p>Please check back later or refine your search.</p>
    </div>
  )}

  {visibleBusiness < totalBusinessData && (
    <div className="col">
      <div
        className="card h-100 border-0 shadow-xl rounded-4 overflow-visible hover-card d-flex align-items-center justify-content-center cursor-pointer"
        onClick={loadMoreBusiness}
      >
        <div className="text-center">
          <h5 className="card-title h6 fw-bold text-dark ">View More</h5>
          <i className="bi bi-arrow-right fs-4"></i>
        </div>
      </div>
    </div>
  )}
</div>

        </div>
      </section>

      <a href="#" className="btn btn-lg btn-bottom btn-lg-square back-to-top">
        <i className="bi bi-arrow-up"></i>
      </a>
    </Layout>
  );
}
