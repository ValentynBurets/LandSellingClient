import compass from "../../../Assets/Images/icons/compass.svg";

import "./Locate.sass";

interface LocateProps {
  panTo: ({ lat, lng }: any) => void;
}

export default function Locate(props: LocateProps) {
  return (
    <button
      className="locate"
      onClick={() => {
        navigator.geolocation.getCurrentPosition((position) => {
            props.panTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          () => null);
      }}
    >
      <img src={compass} alt="compass - locate me" />
    </button>
  );
}
