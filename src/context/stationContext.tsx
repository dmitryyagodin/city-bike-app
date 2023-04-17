/* eslint-disable @typescript-eslint/no-empty-function */
import React, { ReactNode, useState } from 'react';

type StationContextType = {
  activeStation: number | 0;
  setActiveStation: (id: number) => void;
  currentStations: Station[] | [];
  setCurrentStations: (stations: Station[]) => void;
};

const contextDefaultValues: StationContextType = {
  activeStation: 0,
  setActiveStation: () => {},
  currentStations: [],
  setCurrentStations: () => {},
};

export const StationContext = React.createContext<StationContextType>(contextDefaultValues);

type Props = {
  children: ReactNode;
};

export const ContextProvider = ({ children }: Props) => {
  const [activeStation, setActive] = useState(0);
  const [currentStations, setCurrent] = useState([]);

  const setActiveStation = (id: number) => {
    setActive(id);
  };

  const setCurrentStations = (stations: Station[]) => {
    setCurrent(stations);
  };

  return (
    <StationContext.Provider
      value={{ activeStation, setActiveStation, currentStations, setCurrentStations }}
    >
      {children}
    </StationContext.Provider>
  );
};
