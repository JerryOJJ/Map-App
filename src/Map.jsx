import { useRef, useEffect, useState } from "react";
import { SearchBox } from "@mapbox/search-js-react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const accessToken = process.env.REACT_APP_MAPBOX_TOKEN;
console.log(process.env.REACT_APP_MAPBOX_TOKEN)

function Map() {
  const mapContainerRef = useRef();
  const mapInstanceRef = useRef();
  const [mapLoaded, setMapLoaded] = useState(false);
  const [inputValue, setInputValue] = useState("");
  useEffect(() => {
    mapboxgl.accessToken = accessToken;

    mapInstanceRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: [9, 8.6],
      zoom: 1,
    });

    mapInstanceRef.current.on("load", () => {
      setMapLoaded(true);
    });
  }, []);

  return (
    <>
      <SearchBox
        accessToken={accessToken}
        map={mapInstanceRef.current}
        mapboxgl={mapboxgl}
        value={inputValue}
        onChange={(d) => {
          setInputValue(d);
        }}
        marker
      />
      <div id="map-container" ref={mapContainerRef} style={{ height: 300 }} />
    </>
  );
}

export default Map;
