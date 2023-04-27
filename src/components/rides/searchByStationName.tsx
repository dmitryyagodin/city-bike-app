import React from 'react';
import { useRouter } from 'next/router';
import { StyledInput } from '@components';
import { updateSearchParams } from 'src/lib/utils';

const SearchByStationName = ({ stations }: { stations: Station[] }) => {
  const router = useRouter();
  // const stationSearchPattern = stations
  //   .map((station) => station.station_name.replace(/\(M\)/g, '\x28M\x29'))
  //   .join('|');

  return (
    <details>
      <summary>Search by station name</summary>
      <fieldset>
        From:
        <label>
          <StyledInput
            list="stations-list"
            name="departure_station"
            onChange={(e) => updateSearchParams(e, router)}
            // pattern={`^(${stationSearchPattern})$`}
            placeholder="select station"
          />
        </label>
        <label>
          To:
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
      </fieldset>
    </details>
  );
};

export default SearchByStationName;
