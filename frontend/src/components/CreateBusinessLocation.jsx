
/* eslint-disable react/prop-types */
import { TextField } from "@mui/material";
import { Dialog } from "primereact/dialog";
import React, { useEffect } from "react";
import { useJsApiLoader, StandaloneSearchBox, GoogleMap} from "@react-google-maps/api";
import { useRef, useState } from "react";
import './businessLocation.css'

const containerStyle = {
  width: '100%',
  height: '400px',
}


const CreateBusinessLocation = ({ setPlaceDetails,setLocation, visible, setVisible,libraries }) => {
  const inputRef = useRef();
  const [inputValue, setInputValue] = useState("");
  const [center, setCenter] = useState({
    lat: 11.2487,
    lng: 75.8335,
  });

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries:libraries,
  });

  const onInputChange = (event) => {
    setInputValue(event.target.value);
    if (event.target.value === "") {
      setLocation({
        lat: "",
        lon: "",
      });
      setCenter({
        lat: 11.2487,
        lng: 75.8335,
      })
    }

  };
 

  const handleOnPlacesChanged = () => {
    const places = inputRef?.current?.getPlaces();
    const place = places[0];
    const lat = place?.geometry?.location.lat();
    const lng = place?.geometry?.location.lng();

    setInputValue(place?.formatted_address);
    setLocation({
      lat: lat,
      lon: lng,
    });
    setCenter({
      lat: lat,
      lng: lng,
    })

  };

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback((mapInstance) => {
    const bounds = new window.google.maps.LatLngBounds(center);
    mapInstance.fitBounds(bounds);
    setMap(mapInstance); // Save the map instance in state if needed
  }, [map]);

  const onUnmount = React.useCallback((map) => {
    setMap(null)
  }, [])

  const handleOnclick = (data)=>{

    if(data?.placeId){
      fetchDetailsByPlaceId(data.placeId)
    }else{
      // setInputValue("") 
    }
    setLocation({
      lat: data?.latLng?.lat(),
      lon: data?.latLng?.lng(),
    });
    setCenter({
      lat: data?.latLng?.lat(),
      lng: data?.latLng?.lng(),
    })
    
  }

  const fetchDetailsByPlaceId = (placeId) => {
    if (!map) return;

    const service = new google.maps.places.PlacesService(map);
    service.getDetails(
      { placeId },
      (place, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          setPlaceDetails(place?.formatted_address)
          setInputValue(place?.formatted_address)
        } else {
          console.error("Failed to fetch place details:", status);
        }
      }
    );
  };

  const handleClose = ()=>{
    setInputValue("")
    setPlaceDetails("")
setVisible(false)
  }

  return (
    <Dialog
      header="Select the location"
      visible={visible}
      onHide={() => {
        if (!visible) return;
        setVisible(false);
      }}

      style={{ minWidth: "50vw", borderRadius: '12px', overflow: "hidden", zIndex: 1 }}
      breakpoints={{ "960px": "75vw", "641px": "100vw" }}
    >
        {isLoaded && (
      <div className=" mt-2 w-100">
          <StandaloneSearchBox
            onLoad={(ref) => (inputRef.current = ref)}
            onPlacesChanged={handleOnPlacesChanged} >
              <div>
            <TextField
              fullWidth
              label="Location"
              variant="filled"
              name="lon"
              value={inputValue}
              onChange={onInputChange}
            />
             <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          onLoad={onLoad}
          onUnmount={onUnmount}
          onClick={handleOnclick}
        >
        </GoogleMap>
              </div>
          </StandaloneSearchBox>
         
      </div>
        )}
        <div className="d-flex justify-content-end pt-4 ">
          <button onClick={()=>handleClose()} className="btn shadow btn-primary mx-2">Cancel</button>
          <button onClick={(()=>setVisible(false))} className="btn shadow btn-primary mx-2">Submit</button>
        </div>
    </Dialog>
  );
};

export default CreateBusinessLocation;
