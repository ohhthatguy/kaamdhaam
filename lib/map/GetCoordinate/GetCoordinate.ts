"use client";

import { useMapEvents } from "react-leaflet";

type getCoordinateMapProp = {
  mapCoOrdinateOnClick: (coordinate: { lng: number; lat: number }) => void;
  setSelectedLocation: React.Dispatch<
    React.SetStateAction<[number, number] | null>
  >;
};

const GetCoordinate = ({
  mapCoOrdinateOnClick,
  setSelectedLocation,
}: getCoordinateMapProp) => {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;

      console.log("Latitude:", lat);
      console.log("Longitude:", lng);

      mapCoOrdinateOnClick({ lng, lat });
      setSelectedLocation([lat, lng]);
    },
  });

  return null;
};

export default GetCoordinate;
