/* eslint-disable @typescript-eslint/no-empty-function */
import React, { ReactNode, useState } from 'react';

const ITEMS_ON_PAGE = 50;

type RidesContextType = {
  searchParams: SearchParams;
  isLoading: boolean;
  setIsLoading: (val: boolean) => void;
  skipItems: number;
  ridesCount: number;
  itemsOnPage: number;
  // allRides: Ride[] | [];
  // currentStations: Ride[] | [];
  // ridesQuery: RidesQuery;
  setSkipItems: (num: number) => void;
  setRidesCount: (count: number) => void;
  // setAllRides: (stations: Ride[]) => void;
  // setCurrentStations: (stations: Ride[]) => void;
  // setRidesQuery: (queryObj: RidesQuery) => void;
  setSearchParams: (sortObj: SearchParams) => void;
};

const contextDefaultValues: RidesContextType = {
  searchParams: {},
  setSearchParams: () => {},
  isLoading: false,
  setIsLoading: () => {},
  skipItems: 0,
  ridesCount: 0,
  itemsOnPage: ITEMS_ON_PAGE,
  // allRides: [],
  // currentStations: [],
  setSkipItems: () => {},
  setRidesCount: () => {},
  // setAllRides: () => {},
  // setCurrentStations: () => {},
};

export const RidesContext = React.createContext<RidesContextType>(contextDefaultValues);

type Props = {
  children: ReactNode;
};

export const RidesContextProvider = ({ children }: Props) => {
  // const [currentStations, setCurrent] = useState<Ride[]>([]);
  // const [allRides, setRides] = useState<Ride[]>([]);
  const [ridesCount, setCount] = useState(0);
  const [skipItems, setSkip] = useState(ITEMS_ON_PAGE);
  // const [ridesQuery, setQuery] = useState('');
  const [searchParams, setParams] = useState({});
  const [isLoading, setLoading] = useState(false);

  const itemsOnPage = ITEMS_ON_PAGE;

  // const setCurrentStations = (stations: Ride[]) => setCurrent(stations);
  // const setAllRides = (stations: Ride[]) => setRides(stations);
  const setRidesCount = (count: number) => setCount(count);
  const setSkipItems = (num: number) => setSkip(num);
  // const setRidesQuery = (queryObject: RidesQuery) => setQuery(queryObject);
  const setSearchParams = (params: SearchParams) => setParams(params);
  const setIsLoading = (val: boolean) => setLoading(val);

  return (
    <RidesContext.Provider
      value={{
        searchParams,
        setSearchParams,
        isLoading,
        setIsLoading,
        // currentStations,
        // setCurrentStations,
        // allRides,
        // setAllRides,
        setRidesCount,
        ridesCount,
        skipItems,
        setSkipItems,
        itemsOnPage,
        // ridesQuery,
        // setRidesQuery,
      }}
    >
      {children}
    </RidesContext.Provider>
  );
};
