import type { NextPage } from "next";
import DateFilter from "./dateFilter";
import StationStats from "./stationStats";
import formatTopConnections from "../../lib/formatTopConnections";
import { useState } from "react";

type Props = {
  topDepartures: TopConnection[];
  topReturns: TopConnection[];
  stationWithStats: Station & StationStats;
  dateRange: string;
  stationId: string;
};

const StationInfo: NextPage<Props> = (props) => {
  const station = props.stationWithStats;

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

  function handleFilterEvent({
    topConnections,
    stationWithStats,
  }: {
    topConnections: TopConnectionRaw[];
    stationWithStats: Station & StationStats;
  }) {
    const connections = formatTopConnections(topConnections);

    setTopReturns(connections.topReturns);
    setTopDepartures(connections.topDepartures);
    
    setDeparturesCount(stationWithStats.departuresCount);
    setReturnsCount(stationWithStats.returnsCount);
    setAverageDepartureDistance(stationWithStats.averageDepartureDistance);
    setAverageReturnDistance(stationWithStats.averageReturnDistance);
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
};

export default StationInfo;
