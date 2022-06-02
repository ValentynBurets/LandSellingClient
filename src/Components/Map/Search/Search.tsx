import { useCallback } from "react";

import { PanTool } from "@material-ui/icons";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

import style from "./Search.module.sass";

interface SearchProps {
  panTo: ({ lat, lng }: any) => void;
}

export default function Search(props: SearchProps) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: new google.maps.LatLng({
        lat: 43.6532225,
        lng: -79.383186,
      }),
      radius: 200 * 1000,
    },
  });

  return (
    <div className={style.search}>
      <Combobox
        onSelect={async (address) => {
          setValue(address, false);
          clearSuggestions();

          try {
            const geocodeResult = await getGeocode({ address });

            //using this promice you can get the location data(full address and coordinates)
            console.log(await getLatLng(geocodeResult[0]))
            const { lat, lng } = await getLatLng(geocodeResult[0]);

            props.panTo({ lat, lng });
          } catch (error) {
            console.log("error! ", error);
          }
        }}
      >
        <ComboboxInput
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          disabled={!ready}
          placeholder={"Enter the address"}
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" &&
              data.map(({ id, description }) => (
                <ComboboxOption key={id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
}
