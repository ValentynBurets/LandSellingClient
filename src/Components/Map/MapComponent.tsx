import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import Geocode from "react-geocode";

import Search from "./Search/Search";
import Locate from "./Locate/Locate";

import realEstateIcon from "../../Assets/Images/icons/real-estate-business-house-on-a-hand.png";

import "@reach/combobox/styles.css";
import mapStyles from "./mapStyles.json";
import style from "./MapComponent.module.sass";
import { LotLocation } from "../Types/LotLocation";
import useMapContext from "./useMapContext";

const mapContainerStyle = {
  margin: "1rem",
  width: "55rem",
  height: "30rem",
  borderRadius: "10px",
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
}

interface MapComponentProps {
  isNewLot: boolean;
  center: { lat: number; lng: number };
  handleSetLocation: (arg: LotLocation) => void;
  lotLocation: LotLocation;
}

export default function MapComponent(props: MapComponentProps) {
  const { location, setLocation } = useMapContext();

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY!,
    libraries,
  });
  const [adress, setAdress] = useState<string>("");
  const [marker, setMarker] = useState<MarkerProps>();
  const [selected, setSelected] = useState<MarkerProps>(
    null as unknown as MarkerProps
  );

  const getGeocode = () => {
    console.log("test");
    Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY!);
    // set response language. Defaults to english.
    Geocode.setLanguage("en");

    Geocode.fromLatLng(
      location.latitude.toString(),
      location.longitude.toString()
    ).then(
      (response) => {
        setAdress(response.results[0].formatted_address);
        let city = "",
          region = "",
          country = "",
          house = "",
          street = "";
        for (
          let i = 0;
          i < response.results[0].address_components.length;
          i++
        ) {
          for (
            let j = 0;
            j < response.results[0].address_components[i].types.length;
            j++
          ) {
            switch (response.results[0].address_components[i].types[j]) {
              case "locality":
                city = response.results[0].address_components[i].long_name;
                break;
              case "administrative_area_level_1":
                region = response.results[0].address_components[i].long_name;
                break;
              case "country":
                country = response.results[0].address_components[i].long_name;
                break;
              case "street_number":
                house = response.results[0].address_components[i].long_name;
                break;
              case "route":
                street = response.results[0].address_components[i].long_name;
                break;
            }
          }
        }

        props.handleSetLocation({
          latitude: location.latitude,
          longitude: location.longitude,
          country: country,
          region: region,
          city: city,
          street: street,
          house: house,
        } as LotLocation);
        console.log(response);
      },
      (error) => {
        console.error(error);
      }
    );
  };
  useEffect(() => {
    if (!props.isNewLot && props.lotLocation) {
      console.log(props.lotLocation)
      setMarker({
        lat: props.lotLocation.latitude,
        lng: props.lotLocation.longitude,
      });
    }
  }, [props.lotLocation]);

  useEffect(() => {
    getGeocode();
  }, [location]);

  const onMapClick = useCallback((e) => {
    console.log(props.isNewLot);
    if (props.isNewLot) {
      setMarker({
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      });

      setLocation((prev: LotLocation) => ({
        ...prev,
        longitude: e.latLng.lng(),
        latitude: e.latLng.lat(),
      }));
    }
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

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps</div>;

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
        zoom={12}
        center={
          props.center.lat !== 0
            ? props.center
            : {
                lat: 49.835457,
                lng: 24.022879,
              }
        }
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {marker && (
          <Marker
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
        )}
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
              <h2> Selected Location</h2>
              <p>{adress}</p>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </div>
  );
}
