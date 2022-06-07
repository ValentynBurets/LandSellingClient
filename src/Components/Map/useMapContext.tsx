import React, {
  Dispatch,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";

import { LotLocation } from "../Types/LotLocation";

interface IContextType {
  location: LotLocation;
  setLocation:  Dispatch<(arg: LotLocation) => void>;
}

export const useMapContext = React.createContext<IContextType>({
  location: {
    latitude: 0,
    longitude: 0,
    country: "",
    region: "",
    city: "",
    street: "",
    house: ""
  },
  setLocation: () => null,
});

export const MapContextProvider = ({ children }: any) => {

  const [location, setLocationFunction] = useState<LotLocation>({
    latitude: 0,
    longitude: 0,
    country: "",
    region: "",
    city: "",
    street: "",
    house: "",
  });

  const setLocation = useCallback((value) => {
    setLocationFunction(value);
  }, []);

  const contextValues = useMemo(
    () => ({
      location,
      setLocation
    }),
    [ location,
      setLocation
    ],
  );

  return (
    <useMapContext.Provider value={contextValues}>
      {children}
    </useMapContext.Provider>
  );
};

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  return useContext(useMapContext);
};
