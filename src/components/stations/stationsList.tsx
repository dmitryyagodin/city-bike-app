import { StationLink, StyledList } from '@components';

import React from 'react';

const StationsList = ({ stations }: { stations: Station[] }) => {
  return (
    <StyledList>
      {stations.map((station: Station): JSX.Element => {
        return (
          <li key={station.station_id}>
            <StationLink station={station} />
          </li>
        );
      })}
    </StyledList>
  );
};

export default StationsList;
