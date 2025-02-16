import { useJsApiLoader, StandaloneSearchBox } from "@react-google-maps/api";
import { useRef, useState } from "react";

const LocationAutocomplete = ({ setLocation, libraries }) => {
  const inputRef = useRef();
  const [searchValue, setSearchValue] = useState("");

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: libraries,
  });

  const onInputChange = (event) => {
    setSearchValue(event.target.value);
    
    // Only clear location if input is empty (optional, can be removed if not needed)
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
    
    if (place) {
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();

      setSearchValue(place.formatted_address);
      setLocation({
        lat: lat,
        lon: lng,
      });
    }
  };

  return (
    <div className="col-12 col-md-5 h-auto">
      {isLoaded && (
        <StandaloneSearchBox
          onLoad={(ref) => (inputRef.current = ref)}
          onPlacesChanged={handleOnPlacesChanged}
        >
          <div
            className="input-group banner-input-div w-30"
            style={{
              border: "2.5px solid #ced4da",
              borderRadius: "6px",
              overflow: "hidden",
              background: "transparent",
              height: "48px",
              width: "278px",
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
                color: "#d6d6d6",
                background: "none",
                height: "100%",
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
                fontSize: "1.2em",
                color: "#bfbfbf",
                 background: "transparent",
                height: "100%",
              }}
            />
          </div>
        </StandaloneSearchBox>
      )}
    </div>
  );
};

export default LocationAutocomplete;
