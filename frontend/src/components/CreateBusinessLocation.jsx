/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { TextField } from "@mui/material";
import { useJsApiLoader, StandaloneSearchBox } from "@react-google-maps/api";
import { useRef, useState } from "react";

const CreateBusinessLocation = ({ setLocation }) => {
  const inputRef = useRef();
  const [inputValue, setInputValue] = useState("");

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const onInputChange = (event) => {
    setInputValue(event.target.value);
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

    setInputValue(place.formatted_address);
    setLocation({
      lat: lat,
      lon: lng,
    });
  };

  return (
    <div className="input-group mt-2 w-100">
      {isLoaded && (
        <StandaloneSearchBox
          onLoad={(ref) => (inputRef.current = ref)}
          onPlacesChanged={handleOnPlacesChanged}
        >
          <TextField
            fullWidth
            label="Location"
            variant="filled"
            name="lon"
            value={inputValue}
            onChange={onInputChange}
          />
        </StandaloneSearchBox>
      )}
    </div>
  );
};

export default CreateBusinessLocation;
