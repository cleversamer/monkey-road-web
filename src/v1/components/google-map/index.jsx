import styled from "styled-components";
import { useState, useCallback } from "react";
import { GoogleMapsProvider } from "@ubilabs/google-maps-react-hooks";

const GoogleMap = () => {
  const [mapContainer, setMapContainer] = useState(null);
  const mapRef = useCallback((node) => {
    node && setMapContainer(node);
  }, []);

  const mapOptions = {
    // Add your map options here
    // `center` and `zoom` are required for every map to be displayed
    center: { lat: 25.2048, lng: 55.2708 },
    zoom: 10,
  };

  return (
    <GoogleMapsProvider
      googleMapsAPIKey="AIzaSyCjl0VJDO8ea-7pWcvEzo6p0R6LSYw38Zk"
      mapContainer={mapContainer}
      mapOptions={mapOptions}
    >
      <Map ref={mapRef} />
    </GoogleMapsProvider>
  );
};

const Map = styled.div`
  height: 300px;
`;

export default GoogleMap;
