import React from 'react';
import { useRouter } from 'next/router';
import { StyledDetails, StyledFieldset, StyledInput } from '@components';
import { updateSearchParams } from 'src/lib/utils';

const FilterByStationName = ({ stations }: { stations: Station[] }) => {
  const router = useRouter();
  // const stationSearchPattern = stations
  //   .map((station) => station.station_name.replace(/\(M\)/g, '\x28M\x29'))
  //   .join('|');

  return (
    <StyledDetails>
      <summary>
        <h3>By station name</h3>
      </summary>
      <StyledFieldset>
        <label>
          From station
          <StyledInput
            list="stations-list"
            name="departure_station"
            onChange={(e) => updateSearchParams(e, router)}
            // pattern={`^(${stationSearchPattern})$`}
            placeholder="select station"
          />
        </label>
        <label>
          To station
          <StyledInput
            list="stations-list"
            name="return_station"
            onChange={(e) => updateSearchParams(e, router)}
            // pattern={`^(${stationSearchPattern})$`}
            placeholder="select station"
          />
        </label>

        <datalist id="stations-list">
          {stations.map((station) => {
            return <option key={`departure-${station.station_id}`} value={station.station_name} />;
          })}
        </datalist>
      </StyledFieldset>
    </StyledDetails>
  );
};

export default FilterByStationName;
