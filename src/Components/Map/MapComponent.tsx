import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { formatRelative } from "date-fns";

import Search from "./Search/Search";
import Locate from "./Locate/Locate";

import realEstateIcon from "../../Assets/Images/icons/real-estate-business-house-on-a-hand.png";

import "@reach/combobox/styles.css";
import mapStyles from "./mapStyles.json";
import style from "./MapComponent.module.sass"

const mapContainerStyle = {
  margin: "1rem",
  width: "55rem",
  height: "30rem",
  borderRadius: "10px",
};

const center = {
  lat: 43.6532225,
  lng: -79.383186,
};

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

const libraries = ["places"] as (
  | "places"
  | "drawing"
  | "geometry"
  | "localContext"
  | "visualization"
)[];

interface MarkerProps {
  lat: number;
  lng: number;
  time: Date;
}

export default function MapComponent() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY!,
    libraries,
  });

  const [markers, setMarkers] = useState<MarkerProps[]>([]);
  const [selected, setSelected] = useState<MarkerProps>(
    null as unknown as MarkerProps
  );

  const onMapClick = useCallback((e) => {
    setMarkers((current) => [
      ...current,
      {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
        time: new Date(),
      },
    ]);
  }, []);

  const mapRef = useRef<google.maps.Map>();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = useCallback(({ lat, lng }) => {
    console.log("{lat, lng}", { lat, lng });

    mapRef.current !== undefined && mapRef.current.panTo({ lat, lng });
    mapRef.current !== undefined && mapRef.current.setZoom(14);
  }, []);

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <div>
      <div className={style.search_style}>
        <Search panTo={panTo} />
      </div>
      <div className={style.locate_style}>
        <Locate panTo={panTo} />
      </div>

      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.time.toISOString()}
            position={{
              lat: marker.lat,
              lng: marker.lng,
            }}
            icon={{
              url: realEstateIcon,
              scaledSize: new window.google.maps.Size(30, 30),
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
            }}
            onClick={() => {
              setSelected(marker);
            }}
          />
        ))}
        {selected ? (
          <InfoWindow
            position={{
              lat: selected.lat,
              lng: selected.lng,
            }}
            onCloseClick={() => {
              setSelected(null as unknown as MarkerProps);
            }}
          >
            <div>
              <h2> Point Spoted!</h2>
              <p>Spotted {formatRelative(selected.time, new Date())}</p>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </div>
  );
}
