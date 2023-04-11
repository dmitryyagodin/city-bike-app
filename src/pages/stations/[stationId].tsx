import prisma from '@db';
import formatTopConnections from '../../lib/formatTopConnections';
import queryTopConnections from '../../../prisma/queryTopConnections';
import queryStationDetails from '../../../prisma/queryStationDetails';
import queryDateRange from '../../../prisma/queryDateRange';
import StationInfo from '../../components/station/stationInfo';

type Props = {
  station: Station & StationStats;
  topReturns: TopConnection[];
  topDepartures: TopConnection[];
  stationId: number;
  dateRange: { minDate: string; maxDate: string };
};

const Station: NextPage<Props> = ({
  station,
  topReturns,
  topDepartures,
  dateRange,
  stationId,
}) => {
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
      <StationInfo
        dateRange={dateRange}
        stationId={stationId}
        topReturns={topReturns}
        topDepartures={topDepartures}
      />
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
  const dateRange = await queryDateRange();
  const station = await queryStationDetails(Number(stationId));
  const topConnections = await queryTopConnections(stationId, dateRange);

  const { topReturns, topDepartures } = formatTopConnections(topConnections);

  return {
    props: { stationId, station, topReturns, topDepartures, dateRange },
  };
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
