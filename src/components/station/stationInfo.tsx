import DateFilter from './dateFilter';
import StationStats from './stationStats';
import formatTopConnections from '../../lib/formatTopConnections.ts';
import { useState } from 'react';

export default function StationInfo(props) {
  const station = props.station;

  const [topDepartures, setTopDepartures] = useState(props.topDepartures);
  const [topReturns, setTopReturns] = useState(props.topReturns);

  const [departuresCount, setDeparturesCount] = useState(
    station.departuresCount
  );
  const [returnsCount, setReturnsCount] = useState(station.returnsCount);

  const [averageDepartureDistance, setAverageDepartureDistance] = useState(
    station.averageDepartureDistance
  );
  const [averageReturnDistance, setAverageReturnDistance] = useState(
    station.averageReturnDistance
  );

  function handleFilterEvent({ topConnections, station }) {
    const connections = formatTopConnections(topConnections);

    setTopReturns(connections.topReturns);
    setTopDepartures(connections.topDepartures);
    setDeparturesCount(station.departuresCount);
    setReturnsCount(station.returnsCount);
    setAverageDepartureDistance(station.averageDepartureDistance);
    setAverageReturnDistance(station.averageReturnDistance);
  }

  return (
    <div>
      <h1>Station {station.station_name}</h1>
      <p>Address: {station.station_address}</p>
      <p>Capacity: {station.capacity}</p>
      <DateFilter
        dateRange={props.dateRange}
        stationId={props.stationId}
        emitFilterEvent={handleFilterEvent}
      />
      <StationStats
        topDepartures={topDepartures}
        topReturns={topReturns}
        departuresCount={departuresCount}
        returnsCount={returnsCount}
        averageDepartureDistance={averageDepartureDistance}
        averageReturnDistance={averageReturnDistance}
      />
    </div>
  );
}
