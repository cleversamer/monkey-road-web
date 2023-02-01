import { useLoadScript } from "@react-google-maps/api";
import Map from "./Map";

const apiKey = "AIzaSyCx_NZDCzs1HXFD4axd9AYmH74f__gA1VM";

const GoogleMap = () => {
  const { isLoaded } = useLoadScript({ googleMapsApiKey: apiKey });

  return isLoaded ? <Map /> : <div>Loading...</div>;
};

export default GoogleMap;
