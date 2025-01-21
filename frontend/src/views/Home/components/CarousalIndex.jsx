import { useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Carousel } from "react-bootstrap";
import LocationAutocomplete from "../../../components/LocationAutoComplete";
import Placeholder from "/images/placeholder.jpg";

const libraries = ["places"];

const CarousalIndex = ({ bannerData, onSearch, setLocation ,setSerachItem }) => {
  const [searchData, setSearchData] = useState("");
  const [showInputs, setShowInputs] = useState(true);
  const [animationClass, setAnimationClass] = useState("fade-in");

  const handleSearchSubmit = useCallback(() => {
    onSearch(searchData);
    if(searchData){
      setSerachItem(true);
    }else{
      setSerachItem(false);
    }
  }, [searchData, onSearch]);

  useEffect(() => {
    let lastScrollY = window.scrollY;
  
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isMobile = window.innerWidth < 768; // Define a threshold for mobile screens
  
      if (isMobile) {
        // Always show inputs on mobile devices
        setShowInputs(true);
        setAnimationClass("fade-in");
        return;
      }
  
      if (currentScrollY > 200) {
        if (currentScrollY > lastScrollY) {
          // Scrolling down, hide inputs
          setAnimationClass("fade-out");
          setTimeout(() => setShowInputs(false), 300); // Match animation duration
        } else {
          // Scrolling up, show inputs
          setShowInputs(true);
          setAnimationClass("fade-in");
        }
      } else {
        // Always show inputs if scrolled less than 200px
        setShowInputs(true);
        setAnimationClass("fade-in");
      }
  
      lastScrollY = currentScrollY;
    };
  
    window.addEventListener("scroll", handleScroll);
  
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div id="home" className="home-section">
      <div className="banner-sectionn relative">
        <div className="banner-overlay relative">
          <Carousel controls={false} className="">
            {bannerData && bannerData.length > 0 ? (
              bannerData.map((banner) => (
                <Carousel.Item key={`key-${banner?._id}`} className="banner-item">
                <img
                  className="banner-imageIndex h-full object-cover rounded-lg"
                  src={banner?.image?.length > 0 ? banner?.image : Placeholder}
                  alt="Banner slide"
                />
              </Carousel.Item>
              ))) : (
              <Carousel.Item className="banner-item">
                <img
                  className="banner-imageIndex h-full object-cover rounded-lg"
                  src="/images/placeholder.jpg"
                  alt="Default slide"
                />
              </Carousel.Item>
            )}
          </Carousel>
        </div>

        <div className="banner-content absolute top-2/2 left-2/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
          <h1 className="text-2xl md:text-4xl font-bold">
            Your Digital Platform for Growing Your Business
          </h1>
          {showInputs && (
            <div
              className={`search-bar flex flex-col sm:flex-row gap-2 justify-center items-center ${animationClass}`}
            >
              <LocationAutocomplete
                setLocation={setLocation}
                libraries={libraries}
              />
              <div className="search-input-group flex items-center border-2 border-white rounded-md overflow-hidden">
                <input
                  type="text"
                  placeholder="Search for any service..."
                  value={searchData}
                  onInput={(e) => setSearchData(e.target.value)}
                  className="p-2 bg-transparent text-dark outline-none"
                />
                <button
                  onClick={handleSearchSubmit}
                  className="bg-orange-500 p-3.5 text-white"
                >
                  <i className="bi bi-search"></i>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

CarousalIndex.propTypes = {
  bannerData: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      image: PropTypes.string,
    })
  ),
  onSearch: PropTypes.func.isRequired,
  setLocation: PropTypes.func.isRequired,
};

export default CarousalIndex;
