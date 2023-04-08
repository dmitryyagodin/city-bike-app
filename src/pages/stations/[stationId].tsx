import prisma from '@db';
import formatTopConnections from '../../lib/formatTopConnections';
import queryTopConnections from '../../../prisma/queryTopConnections';
import queryStationDetails from '../../../prisma/queryStationDetails';

type Props = {
  station: Station & StationStats;
  topReturns: TopConnection[];
  topDepartures: TopConnection[];
};

const Station: NextPage<Props> = ({ station, topReturns, topDepartures }) => {
  return (
    <>
      <h1>Station {station.station_name}</h1>
      <p>Address: {station.station_address}</p>
      <p>Capacity: {station.capacity}</p>
      <p>
        From: {station.departuresCount} times with an average distance of{' '}
        {station.averageDepartureDistance} m{' '}
      </p>
      <p>
        To: {station.returnsCount} times with an average distance of{' '}
        {station.averageReturnDistance} m
      </p>
      <section>
        <h2>Top Returns</h2>
        <ul>
          {topReturns.map((item) => (
            <li key={item.stationId}>
              {item.stationName}: {item.count} times
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2>Top Departures</h2>
        <ul>
          {topDepartures.map((item) => (
            <li key={item.stationId}>
              {item.stationName}: {item.count} times
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

/**
 * Pre-generate static props for earch of the paths returned by the getStaticPaths
 *
 * @param context
 * @returns
 */

export async function getStaticProps(context: {
  params: { stationId: string };
}) {
  const { stationId } = context.params;

  const station = await queryStationDetails(Number(stationId));

  const topConnections = await queryTopConnections(Number(stationId));

  const { topReturns, topDepartures } = formatTopConnections(topConnections);

  return { props: { station, topReturns, topDepartures } };
}

/*
 *  Generate static paths from the list of all the stations
 *
 */
export async function getStaticPaths() {
  const stations: Station[] = await prisma.station.findMany({});

  const paths = stations.map((station) => ({
    params: { stationId: station.station_id.toString() },
  }));

  return { paths, fallback: false };
}

export default Station;
