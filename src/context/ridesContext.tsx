/* eslint-disable @typescript-eslint/no-empty-function */
import React, { ReactNode, useState } from 'react';

// const ITEMS_ON_PAGE = 50;

// type WhereObject = {
//   departureStation?: string;
//   returnStation?: string;
// };

// type WhereQuery = {
//   where: { [key]: string }[];
// };

// type RidesQuery = {
//   where: WhereQuery;
// };

type SortParams = {
  departureTime?: 'asc' | 'desc';
  departureStation?: 'asc' | 'desc';
  distance?: 'asc' | 'desc';
  duration?: 'asc' | 'desc';
  returnStation?: 'asc' | 'desc';
  returnTime?: 'asc' | 'desc';
};

type RidesContextType = {
  sortParams: SortParams;
  isLoading: boolean;
  setIsLoading: (val: boolean) => void;
  // skipItems: number;
  // ridesCount: number;
  // itemsOnPage: number;
  // allRides: Ride[] | [];
  // currentStations: Ride[] | [];
  // ridesQuery: RidesQuery;
  // setSkipNumber: (num: number) => void;
  // setRidesCount: (count: number) => void;
  // setAllRides: (stations: Ride[]) => void;
  // setCurrentStations: (stations: Ride[]) => void;
  // setRidesQuery: (queryObj: RidesQuery) => void;
  setSortParams: (sortObj: SortParams) => void;
};

const contextDefaultValues: RidesContextType = {
  sortParams: {},
  setSortParams: () => {},
  isLoading: true,
  setIsLoading: () => {},
  // skipItems: 0,
  // ridesCount: 0,
  // itemsOnPage: ITEMS_ON_PAGE,
  // allRides: [],
  // currentStations: [],
  // setSkipNumber: () => {},
  // setRidesCount: () => {},
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
  // const [ridesCount, setCount] = useState(0);
  // const [skipItems, setSkip] = useState(ITEMS_ON_PAGE);
  // const [ridesQuery, setQuery] = useState('');
  const [sortParams, setParams] = useState({});
  const [isLoading, setLoading] = useState(true);

  // const itemsOnPage = ITEMS_ON_PAGE;

  // const setCurrentStations = (stations: Ride[]) => setCurrent(stations);
  // const setAllRides = (stations: Ride[]) => setRides(stations);
  // const setRidesCount = (count: number) => setCount(count);
  // const setSkipNumber = (num: number) => setSkip(num);
  // const setRidesQuery = (queryObject: RidesQuery) => setQuery(queryObject);
  const setSortParams = (params: SortParams) => setParams(params);
  const setIsLoading = (val: boolean) => setLoading(val);

  return (
    <RidesContext.Provider
      value={{
        sortParams,
        setSortParams,
        isLoading,
        setIsLoading,
        // currentStations,
        // setCurrentStations,
        // allRides,
        // setAllRides,
        // setRidesCount,
        // ridesCount,
        // skipItems,
        // setSkipNumber,
        // itemsOnPage,
        // ridesQuery,
        // setRidesQuery,
      }}
    >
      {children}
    </RidesContext.Provider>
  );
};
