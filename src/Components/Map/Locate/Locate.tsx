import compass from "../../../Assets/Images/icons/compass.svg";

import useMapContext from "../useMapContext";

import "./Locate.sass";

interface LocateProps {
  panTo: ({ lat, lng }: any) => void;
}

export default function Locate(props: LocateProps) {
  const { setLocation } = useMapContext();
  return (
    <button
      className="locate"
      onClick={() => {
        navigator.geolocation.getCurrentPosition((position) => {
            props.panTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
            console.log("position", position);
          },
          () => null);
      }}
    >
      <img src={compass} alt="compass - locate me" />
    </button>
  );
}
