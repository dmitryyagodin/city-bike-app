/* eslint-disable @typescript-eslint/no-empty-function */
import React, { ReactNode, useState } from 'react';

const STATIONS_ON_PAGE = 10;

type StationContextType = {
  skip: number;
  activeStation: number | 0;
  stationsCount: number;
  stationsOnPage: number;
  allStations: Station[] | [];
  currentStations: Station[] | [];
  filteredStations: Station[] | [];
  setActiveStation: (id: number) => void;
  setSkipNumber: (num: number) => void;
  setStationsCount: (count: number) => void;
  setAllStations: (stations: Station[]) => void;
  setCurrentStations: (stations: Station[]) => void;
  setFilteredStations: (stations: Station[]) => void;
};

const contextDefaultValues: StationContextType = {
  skip: 0,
  activeStation: 0,
  stationsCount: 0,
  stationsOnPage: STATIONS_ON_PAGE,
  allStations: [],
  currentStations: [],
  filteredStations: [],
  setActiveStation: () => {},
  setSkipNumber: () => {},
  setStationsCount: () => {},
  setAllStations: () => {},
  setCurrentStations: () => {},
  setFilteredStations: () => {},
};

export const StationContext = React.createContext<StationContextType>(contextDefaultValues);

type Props = {
  children: ReactNode;
};

export const ContextProvider = ({ children }: Props) => {
  const [activeStation, setActive] = useState(0);
  const [currentStations, setCurrent] = useState<Station[]>([]);
  const [allStations, setStations] = useState<Station[]>([]);
  const [stationsCount, setCount] = useState(0);
  const [skip, setSkip] = useState(STATIONS_ON_PAGE);
  const [filteredStations, setFiltered] = useState<Station[]>([]);

  const stationsOnPage = STATIONS_ON_PAGE;

  const setActiveStation = (id: number) => setActive(id);
  const setCurrentStations = (stations: Station[]) => setCurrent(stations);
  const setAllStations = (stations: Station[]) => setStations(stations);
  const setStationsCount = (count: number) => setCount(count);
  const setSkipNumber = (num: number) => setSkip(num);
  const setFilteredStations = (stations: Station[]) => setFiltered(stations);

  return (
    <StationContext.Provider
      value={{
        activeStation,
        setActiveStation,
        currentStations,
        setCurrentStations,
        allStations,
        setAllStations,
        setStationsCount,
        stationsCount,
        skip,
        setSkipNumber,
        stationsOnPage,
        filteredStations,
        setFilteredStations,
      }}
    >
      {children}
    </StationContext.Provider>
  );
};
