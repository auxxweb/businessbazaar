import { useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Carousel } from "react-bootstrap";
import LocationAutocomplete from "../../../components/LocationAutoComplete";
import Placeholder from "/images/placeholder.jpg";

const libraries = ["places"];

const CarousalIndex = ({
  bannerData,
  onSearch,
  setLocation,
  setSerachItem,
}) => {
  const [searchData, setSearchData] = useState("");
  const [showInputs, setShowInputs] = useState(true);
  const [animationClass, setAnimationClass] = useState("fade-in");

  const handleSearchSubmit = useCallback(() => {
    onSearch(searchData);
    if (searchData) {
      setSerachItem(true);
    } else {
      setSerachItem(false);
    }
  }, [searchData, onSearch]);

  // useEffect(() => {
  //   let lastScrollY = window.scrollY;

  //   const handleScroll = () => {
  //     const currentScrollY = window.scrollY;
  //     const isMobile = window.innerWidth < 768; // Define a threshold for mobile screens

  //     if (isMobile) {
  //       // Always show inputs on mobile devices
  //       setShowInputs(true);
  //       setAnimationClass("fade-in");
  //       return;
  //     }

  //     // Show inputs if the scroll is between 0px and 200px
  //     if (currentScrollY <= 200) {
  //       setShowInputs(true);
  //       setAnimationClass("fade-in");
  //     } else {
  //       // If scrolled more than 200px
  //       if (currentScrollY > lastScrollY) {
  //         // Scrolling down, hide inputs
  //         setAnimationClass("fade-out");
  //         setTimeout(() => setShowInputs(false), 300); // Match animation duration
  //       } else {
  //         // Scrolling up, show inputs
  //         setShowInputs(true);
  //         setAnimationClass("fade-in");
  //       }
  //     }

  //     lastScrollY = currentScrollY;
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);
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

      if (currentScrollY <= 200) {
        setShowInputs(true);
        setAnimationClass("fade-in");
      } else {
        if (currentScrollY > lastScrollY) {
          // Scrolling down, apply the fade-out animation with upward motion
          setAnimationClass("fade-out-up");
          setTimeout(() => setShowInputs(false), 300); // Match animation duration
        } else {
          // Scrolling up, show inputs
          setShowInputs(true);
          setAnimationClass("fade-in");
        }
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
                <Carousel.Item
                  key={`key-${banner?._id}`}
                  className="banner-item"
                >
                  <img
                    className="banner-imageIndex h-full object-cover rounded-lg"
                    src={
                      banner?.image?.length > 0 ? banner?.image : Placeholder
                    }
                    alt="Banner slide"
                  />
                </Carousel.Item>
              ))
            ) : (
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
          <div
            className={`search-bar flex flex-col sm:flex-row gap-2 justify-center items-center ${animationClass}`}
          >
            <div className="location-autocomplete">
              <LocationAutocomplete
                setLocation={setLocation}
                libraries={libraries}
              />
            </div>
            <div className="search-input-group flex items-center border-2 border-white rounded-md overflow-hidden">
              <input
                type="text"
                placeholder="Search for any service..."
                value={searchData}
                onInput={(e) => setSearchData(e.target.value)}
                className="p-2 outline-none"
                style={{
                  backgroundColor: "rgba(76, 75, 75, 0.3)", // Semi-transparent white background
                  backdropFilter: "blur(8px)", // Blur effect
                  borderRadius: "4px", // Optional: Add some rounded corners
                  border: "none", // Remove borders
                }}
              />
              <button
                onClick={handleSearchSubmit}
                className="bg-orange-500 p-3.5 text-white"
              >
                <i className="bi bi-search"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <style>
        {`
        .fade-in {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.8s ease, transform 0.3s ease;
}

/* For fade-out effect with upward movement */
.fade-out-up {
  opacity: 0;
  transform: translateY(-20px); /* Moves it upwards */
  transition: opacity 0.8s ease, transform 0.3s ease;
}
        `}
      </style>
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
