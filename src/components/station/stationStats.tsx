export default function StationStats({ topDepartures, topReturns }) {
  return (
    <section>
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
}
