import { useMemo } from "react";
import {
  GoogleMap as GMap,
  useLoadScript,
  Marker,
} from "@react-google-maps/api";
import Loader from "../loader";

const googleMapsApiKey = process.env["REACT_APP_GOOGLE_MAPS_API_KEY"];

const GoogleMap = ({ latitude, longitude, onCoordinatesChange }) => {
  const { isLoaded } = useLoadScript({ googleMapsApiKey });
  const center = useMemo(() => ({ lat: latitude, lng: longitude }), []);

  const handelClick = (e) =>
    onCoordinatesChange(e.latLng.lat(), e.latLng.lng());

  if (!isLoaded) {
    return <Loader />;
  }

  return (
    <GMap
      zoom={13}
      center={center}
      mapContainerStyle={{ width: "100%", height: "400px" }}
      onClick={handelClick}
    >
      <Marker position={{ lat: latitude, lng: longitude }} />
    </GMap>
  );
};

export default GoogleMap;
