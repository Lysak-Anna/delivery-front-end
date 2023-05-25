import { useMemo, useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GoogleMap,
  useLoadScript,
  MarkerF,
  Polyline,
} from "@react-google-maps/api";
import haversine from "haversine-distance";
import { Box, useToast } from "@chakra-ui/react";

import { setAddress } from "../../redux/user/userSlice";
import { getCategoryFromState } from "../../redux/cart/selectors";
import { address } from "../../data/address";

const containerStyle = {
  width: "100%",
  height: "400px",
};

export default function Map() {
  const dispatch = useDispatch();
  const category = useSelector(getCategoryFromState);
  const toast = useToast();
  const [markerPosition, setMarkerPosition] = useState(null);
  const [distance, setDistance] = useState(0);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
  });

  const approxTime = useCallback(() => {
    return toast({
      position: "top-center",
      render: () => (
        <Box color="white" p={3} bg="#53bac1">
          Approximate delivery time is{" "}
          {((distance.toFixed(2) / 50) * 600).toFixed(0)} min
        </Box>
      ),
    });
  }, [distance, toast]);

  useEffect(() => {
    if (!distance) {
      return;
    }
    approxTime();
  }, [approxTime, distance]);

  const center = useMemo(() => ({ lat: 50.45, lng: 30.523 }), []);
  const marker = address[category];

  const path = [marker, markerPosition];
  const handleMapClick = useCallback(
    (event) => {
      const { latLng } = event;
      setMarkerPosition({
        lat: latLng.lat(),
        lng: latLng.lng(),
      });

      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ location: latLng }, (results, status) => {
        if (status === "OK" && results[0]) {
          dispatch(setAddress(results[0].formatted_address));
        }
      });
      if (category) {
        const distanceInMeters = haversine(marker, {
          latitude: latLng.lat(),
          longitude: latLng.lng(),
        });

        const distanceInKilometers = distanceInMeters / 1000;

        setDistance(distanceInKilometers);
      }
    },
    [dispatch, marker, category]
  );

  if (!isLoaded) return <h1>Loading...</h1>;
  const options = {
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 30000,
    zIndex: 1,
  };

  return (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        onClick={handleMapClick}
      >
        {markerPosition && <MarkerF position={markerPosition} />}
        {category && <MarkerF position={marker} label={category} />}
        {category && markerPosition && (
          <Polyline path={path} options={options} />
        )}
      </GoogleMap>
    </div>
  );
}
