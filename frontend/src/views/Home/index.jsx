import { useCallback, useEffect, useState } from "react";
import Layout from "../../components/Layout";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { toast } from "react-toastify";
import "./Home.css";

import {
  createReveiw,
  fetchBanners,
  fetchBusiness,
  fetchCategories,
  getAllReviews,
} from "../../Functions/functions";
import { InputTextarea } from "primereact/inputtextarea";
import { InputText } from "primereact/inputtext";
import { Rating } from "primereact/rating";
import { Dialog } from "primereact/dialog";
import { BUSINESS_PAGE, REVIEW_LIMIT, REVIEW_PAGE } from "./constants";
import {
  BusinessSection,
  CarouselSection,
  CategorySection,
  FooterSection,
  ReviewSection,
} from "./components";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const settings = {
    centerMode: true,
    centerPadding: "50px",
    slidesToShow: 3,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    infinite: true,
    speed: 500,
    afterChange: (current) => setCurrentSlide(current),
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerMode: false,
        },
      },
    ],
  };

  const [location, setLocation] = useState({
    lat: "",
    lon: "",
  });

  const [categoryData, setCategoryData] = useState([]);
  const [bannerData, setBannerData] = useState([]);
  const [businessData, setBusinessData] = useState([]);
  const [totalBusinessData, setTotalBusinessData] = useState(0);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [isReviewed, setIsReviewed] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [visibleCategories, setVisibleCategories] = useState(20);
  const [visibleBusiness, setVisibleBusiness] = useState(10);
  const [review, setReview] = useState([
    {
      rating: "",
      name: "",
      review: "",
    },
  ]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getAllReviews({
          page: REVIEW_PAGE,
          limit: REVIEW_LIMIT,
        });

        setReviews(data?.data?.data);
      } catch (error) {
        toast.error(
          error?.response?.data?.message ??
            "An error occurred. Please try again.",
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
            style: {
              backgroundColor: "#e74c3c", // Custom red color for error
              color: "#FFFFFF", // White text
            },
          }
        );
      }
    };
    fetchReviews();
  }, [isReviewed]);

  const handleReviewSubmit = async () => {
    try {
      if (!review?.name?.trim()?.length) {
        toast.warning("Please enter your name!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
          style: {
            backgroundColor: "#d2e500", // Custom red color for error
            color: "#FFFFFF", // White text
          },
        });
      } else {
        await createReveiw(review);
        setVisible(false);
        setIsReviewed(!isReviewed);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ??
          "An error occurred. Please try again.",
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
          style: {
            backgroundColor: "#e74c3c", // Custom red color for error
            color: "#FFFFFF", // White text
          },
        }
      );
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const businessDetails = await fetchBusiness(
          BUSINESS_PAGE,
          visibleBusiness,
          "",
          location
        );

        const categoryDetails = await fetchCategories(visibleCategories);

        setCategoryData(categoryDetails.data.data);
        setBusinessData(businessDetails.data.data);

        setTotalBusinessData(businessDetails.data.totalCount);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [visibleBusiness, visibleCategories, location]);

  useEffect(() => {
    const fetchBanner = async () => {
      const data = await fetchBanners();
      setBannerData(data?.data);
    };
    fetchBanner();
  }, []);

  const loadMoreCategories = () => {
    setVisibleCategories((prev) => prev + 20);
  };

  const loadMoreBusiness = () => {
    setVisibleBusiness((prev) => prev + 10);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReview((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const getSearchData = useCallback(
    async (searchData) => {
      try {
        setLoading(true);
        const businessDetails = await fetchBusiness(
          BUSINESS_PAGE,
          visibleBusiness,
          searchData,
          location
        );
        setBusinessData(businessDetails.data.data);
        window.location.href = "/#business";
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    [location, visibleBusiness]
  );

  return (
    <Layout title="Home" navClass="home">
      <CarouselSection
        bannerData={bannerData}
        onSearch={getSearchData}
        setLocation={setLocation}
      />

      <CategorySection
        categoryData={categoryData}
        loadMoreCategories={loadMoreCategories}
        loading={loading}
        visibleCategories={visibleCategories}
      />

      <BusinessSection
        businessData={businessData}
        loadMoreBusiness={loadMoreBusiness}
        loading={loading}
        visibleBusiness={visibleBusiness}
        totalBusinessData={totalBusinessData}
      />

      <ReviewSection
        currentSlide={currentSlide}
        review={review}
        reviews={reviews}
        setVisible={setVisible}
        settings={settings}
      />

      <Dialog
        header="Write a Review"
        visible={visible}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
        style={{ width: "50vw" }}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
      >
        <div className="container">
          <div className="p-3 justify-content-center">
            <Rating
              value={review.rating}
              onChange={(e) => setReview({ ...review, rating: e.value })}
              cancel={false}
            />
          </div>
          <div className="col-12">
            <InputText
              keyfilter="text"
              placeholder="Full Name"
              className="w-100"
              value={review.name}
              name="name"
              required
              onChange={handleInputChange}
            />
          </div>

          <div className="col-12 mt-3">
            <div className="card flex justify-content-center">
              <InputTextarea
                value={review.description}
                onChange={handleInputChange}
                rows={5}
                cols={30}
                name="review"
                placeholder="Write your review here..."
              />
            </div>
          </div>
          <div className="col-12 mt-3">
            <div className="row">
              <button
                onClick={handleReviewSubmit}
                className="btn-dark btn theme radius"
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
      </Dialog>

      <FooterSection />

      <a href="#" className="btn btn-lg btn-bottom btn-lg-square back-to-top">
        <i className="bi bi-arrow-up"></i>
      </a>
    </Layout>
  );
}
