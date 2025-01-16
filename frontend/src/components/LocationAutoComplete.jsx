/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useJsApiLoader, StandaloneSearchBox } from "@react-google-maps/api";
import { useRef, useState } from "react";

const LocationAutocomplete = ({ setLocation ,libraries}) => {
  const inputRef = useRef();
  const [searchValue, setSearchValue] = useState("");

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: libraries,
  });

  const onInputChange = (event) => {
    setSearchValue(event.target.value);
    if (event.target.value === "") {
      setLocation({
        lat: "",
        lon: "",
      });
    }
  };

  const handleOnPlacesChanged = () => {
    const places = inputRef.current.getPlaces();
    const place = places[0];
    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();

    setSearchValue(place.formatted_address);
    setLocation({
      lat: lat,
      lon: lng,
    });
  };

  return (
    <div className="col-12 col-md-5 h-auto">
    {isLoaded && (
      <StandaloneSearchBox
        onLoad={(ref) => (inputRef.current = ref)}
        onPlacesChanged={handleOnPlacesChanged}
      >
        <div
          className="input-group banner-input-div w-30"  // Reduced width to 75% or you can set a fixed width like 'w-50' or '300px'
          style={{
            border: "2.5px solid #ced4da",
            borderRadius: "6px",
            overflow: "hidden",
            background: "none",
            height: "48px",
            width : '260px' // Reduced height for the input group
          }}
        >
          <span
            className="input-group-text"
            style={{
              backgroundColor: "white",
              border: "none",
              padding: "0 12px",
              display: "flex",
              alignItems: "center",
              color: "black",
              background: "none",
              height: "100%", // Ensures the icon is vertically centered
            }}
          >
            <i className="bi bi-crosshair2" style={{ fontSize: "1.2em" }}></i>
          </span>
          <input
            value={searchValue}
            onChange={onInputChange}
            type="text"
            className="form-control custom-placeholder"
            placeholder="Location"
            style={{
              border: "none",
              boxShadow: "none",
              paddingLeft: "0",
              fontSize: "0.8em",
              color: "black",
              background: "none",
              height: "100%", // Reduced height for the input field
            }}
          />
        </div>
      </StandaloneSearchBox>
    )}
  </div>
  );
};

export default LocationAutocomplete;
