import type { NextPage } from "next";
import DateFilter from "./dateFilter";
import StationStats from "./stationStats";
import {formatTopConnections} from "@lib";
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

  const [departuresCount, setDeparturesCount] = useState(station.departuresCount);
  const [returnsCount, setReturnsCount] = useState(station.returnsCount);

  const [averageDepartureDistance, setAverageDepartureDistance] = useState(
    station.averageDepartureDistance
  );
  const [averageReturnDistance, setAverageReturnDistance] = useState(station.averageReturnDistance);

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
    <>
      <h1 className="text-center">{station.station_name}</h1>
      <address className="text-center">Address: {station.station_address}</address>
      <p className="text-center">
        Capacity: <strong>{station.capacity}</strong>
      </p>

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
    </>
  );
};

export default StationInfo;
