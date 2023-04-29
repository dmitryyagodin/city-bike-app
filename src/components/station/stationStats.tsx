import type { NextPage } from "next";
type Props = {
  topDepartures: TopConnection[];
  topReturns: TopConnection[];
  departuresCount: number;
  averageDepartureDistance: number;
  returnsCount: number;
  averageReturnDistance: number;

};

const StationStats: NextPage<Props> = ({
  topDepartures,
  topReturns,
  departuresCount,
  averageDepartureDistance,
  returnsCount,
  averageReturnDistance,
}) => {
  return (
    <section>
      <p>
        From: {departuresCount} times with an average distance of {averageDepartureDistance} m{' '}
      </p>
      <p>
        To: {returnsCount} times with an average distance of {averageReturnDistance} m
      </p>
      <h2>Top Returns</h2>
      <ul>
        {topReturns.map((item) => (
          <li key={item.stationId}>
            {item.stationName}: {item.count} times
          </li>
        ))}
      </ul>
      <h2>Top Departures</h2>
      <ul>
        {topDepartures.map((item) => (
          <li key={item.stationId}>
            {item.stationName}: {item.count} times
          </li>
        ))}
      </ul>
    </section>
  );
};

export default StationStats;