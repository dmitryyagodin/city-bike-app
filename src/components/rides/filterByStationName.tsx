import React from 'react';
import { useRouter } from 'next/router';
import { Col, Row, StyledDetails, StyledInput } from '@components';
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
      <Row>
        <Col mobileS={5} laptopS={10}>
          <label className="mt-2 flex-column">
            From station
            <StyledInput
              list="stations-list"
              name="departure_station"
              onChange={(e) => updateSearchParams(e, router)}
              // pattern={`^(${stationSearchPattern})$`}
              placeholder="select station"
            />
          </label>
        </Col>
        <Col mobileS={2}></Col>
        <Col mobileS={5} laptopS={10}>
          <label className="mt-2 flex-column">
            To station
            <StyledInput
              list="stations-list"
              name="return_station"
              onChange={(e) => updateSearchParams(e, router)}
              // pattern={`^(${stationSearchPattern})$`}
              placeholder="select station"
            />
          </label>
        </Col>
      </Row>

      <datalist id="stations-list">
        {stations.map((station) => {
          return <option key={`departure-${station.station_id}`} value={station.station_name} />;
        })}
      </datalist>
    </StyledDetails>
  );
};

export default FilterByStationName;
