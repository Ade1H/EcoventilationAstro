import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Map = ({ lat = 60.674, lng = 17.141, zoom = 13, markerText = "Ecoventilation - Gävle" }) => {
  return (
    <div className="w-full h-80 md:h-96 rounded-lg overflow-hidden shadow-lg">
      <MapContainer center={[lat, lng]} zoom={zoom} scrollWheelZoom={false} className="w-full h-full">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        <Marker position={[lat, lng]}>
          <Popup>{markerText}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
