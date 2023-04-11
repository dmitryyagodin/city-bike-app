import DateFilter from './dateFilter';
import StationStats from './stationStats';
import formatTopConnections from '../../lib/formatTopConnections.ts';
import { useState } from 'react';

export default function StationInfo(props) {
  const [topDepartures, setTopDepartures] = useState(props.topDepartures);
  const [topReturns, setTopReturns] = useState(props.topReturns);

  function handleFilterEvent({ topConnections }) {
    const connections = formatTopConnections(topConnections);
    console.log(connections);
    setTopReturns(connections.topReturns);
    setTopDepartures(connections.topDepartures);
  }

  return (
    <div>
      <DateFilter
        dateRange={props.dateRange}
        stationId={props.stationId}
        emitFilterEvent={handleFilterEvent}
      />
      <StationStats topDepartures={topDepartures} topReturns={topReturns} />
    </div>
  );
}
