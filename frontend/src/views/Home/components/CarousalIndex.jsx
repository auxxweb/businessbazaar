import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { Carousel } from "react-bootstrap";
import LocationAutocomplete from "../../../components/LocationAutoComplete";
import Placeholder from "/images/placeholder.jpg";

const libraries = ["places"];

const CarousalIndex = ({ bannerData, onSearch, setLocation }) => {
  const [searchData, setSearchData] = useState("");

  const handleSearchSubmit = useCallback(() => {
    onSearch(searchData);
  }, [searchData, onSearch]);

  return (
    <div id="home" className="home-section">
      <div className="banner-section relative">
        <div className="banner-overlay relative">
          <Carousel controls={false} className="banner-carousel">
            {bannerData && bannerData.length > 0 ? (
              bannerData.map((banner) => (
                <Carousel.Item
                  key={`key-${banner?._id}`}
                  className="banner-item"
                >
                  <img
                    className="banner-image w-full h-full object-cover rounded-lg"
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
                  className="banner-image w-full h-full object-cover rounded-lg"
                  src="/images/placeholder.jpg"
                  alt="Default slide"
                />
              </Carousel.Item>
            )}
          </Carousel>
        </div>

        <div className="banner-content absolute top-2/2 left-2/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center ">
          <h1 className="text-2xl md:text-4xl font-bold ">
            Your Digital Platform for Growing Your Business
          </h1>
          <div className="search-bar flex flex-col sm:flex-row gap-2 justify-center items-center">
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
                className="p-2 bg-transparent text-white outline-none"
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
