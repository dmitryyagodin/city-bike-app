import { StyledLink } from '@components';
import { StationContext } from 'src/context/stationContext';
import { useContext } from 'react';
import React from 'react';

const StationLink = ({ station }: { station: Station }) => {
  const { activeStation, setActiveStation } = useContext(StationContext);

  return (
    <StyledLink
      onMouseEnter={() => setActiveStation(station.station_id)}
      onMouseLeave={() => setActiveStation(0)}
      onFocus={() => setActiveStation(station.station_id)}
      onBlur={() => setActiveStation(0)}
      data-id={station.station_id}
      className={station.station_id === activeStation ? 'active' : ''}
      href={`stations/${station.station_id}`}
    >
      {station.station_name}
    </StyledLink>
  );
};

export default StationLink;
