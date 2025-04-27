import "../styles/Map.scss";
import PointerIcon from "../assets/pointer.svg";
import { Map, Marker } from "react-map-gl/mapbox";
import { useState, useEffect } from "react";

// const TOKEN = import.meta.env.VITE_TOKEN;
const TOKEN =
  "pk.eyJ1IjoiamVycnlvamoiLCJhIjoiY202dHhmcjBhMDh6azJqc2EwcGozcHV1eSJ9.U_LgDSC9Tf1cQumh1YHPIw";
console.log(TOKEN);

function Mapp({ longitude, latitude, updateCoordinates }) {
  const [viewport, setViewport] = useState({
    latitude,
    longitude,
    zoom: 16,
  });

  const [marker, setMarker] = useState({
    latitude,
    longitude,
  });

  useEffect(() => {
    setViewport((oldViewport) => ({
      ...oldViewport,
      latitude,
      longitude,
    }));
  }, [latitude, longitude]);
  const handleMarkerDrag = (event) => {
    const latitude = event.lnglat.lat;
    const longitude = event.lnglat.lng;

    setMarker({ latitude, longitude });
    updateCoordinates(latitude, longitude);
  };
  return (
    <div className="map">
      <Map
        {...viewport}
        mapboxApiAccessToken={TOKEN}
        mapStyle="mapbox://styles/mapbox/navigation-night-v1"
        onMove={(event) => {
          setViewport(event.viewState);
        }}
      >
        <Marker
          latitude={marker.latitude}
          longitude={marker.longitude}
          draggable={true}
          onDragEnd={handleMarkerDrag}
        >
          <img alt="pointer" className="marker" src={PointerIcon} />
        </Marker>
      </Map>
    </div>
  );
}

export default Mapp;
