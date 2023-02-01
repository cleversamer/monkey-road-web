import { useMemo } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";

const Map = () => {
  const center = useMemo(() => ({ lat: 44, lng: -80 }), []);

  return (
    <GoogleMap zoom={10} center={center} mapContainerClassName="map-container">
      <Marker position={center} />
    </GoogleMap>
  );
};

export default Map;
