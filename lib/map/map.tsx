"use client";

import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import GetCoordinate from "./GetCoordinate/GetCoordinate";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

type MapProps = {
  position: [number, number];
  zoom: number;
  mapCoOrdinateOnClick: (coordinate: { lng: number; lat: number }) => void;
  coOrdinateAfterClick: { type: "Point"; coordinates?: [number, number] };
};

const Map = ({
  position,
  zoom,
  mapCoOrdinateOnClick,
  coOrdinateAfterClick,
}: MapProps) => {
  const [selectedLocation, setSelectedLocation] = useState<
    [number, number] | null
  >(null);

  return (
    <MapContainer
      center={position}
      zoom={zoom}
      scrollWheelZoom={false}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <GetCoordinate
        mapCoOrdinateOnClick={mapCoOrdinateOnClick}
        setSelectedLocation={setSelectedLocation}
      />

      {selectedLocation && (
        <Marker position={selectedLocation}>
          <Popup>WORK LOCATION</Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default Map;
