/* eslint-disable @typescript-eslint/no-empty-function */
import React, { ReactNode, useState } from 'react';

type StationContextType = {
  activeStation: number | 0;
  setActive: (id: number) => void;
};

const contextDefaultValues: StationContextType = {
  activeStation: 0,
  setActive: () => {},
};

export const StationContext = React.createContext<StationContextType>(contextDefaultValues);

type Props = {
  children: ReactNode;
};

export const ContextProvider = ({ children }: Props) => {
  const [activeStation, setActiveStation] = useState(0);

  const setActive = (id: number) => {
    setActiveStation(id);
  };

  return (
    <StationContext.Provider value={{ activeStation, setActive }}>
      {children}
    </StationContext.Provider>
  );
};
