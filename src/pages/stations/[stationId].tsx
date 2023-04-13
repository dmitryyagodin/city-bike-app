import type { NextPage } from 'next';
import prisma from '@db';
import formatTopConnections from '../../lib/formatTopConnections';
import getTopConnections from '../../../prisma/getTopConnections';
import getStationDetails from '../../../prisma/getStationDetails';
import getDateRange from '../../../prisma/getDateRange';
import StationInfo from '../../components/station/stationInfo';

type Props = {
  station: Station & StationStats;
  topReturns: TopConnection[];
  topDepartures: TopConnection[];
  dateRange: 'string';//{ minDate: string; maxDate: string };
  stationId: 'string';
};

const Station: NextPage<Props> = ({
  station,
  topReturns,
  topDepartures,
  dateRange,
  stationId
}) => {
  return (
    <>
      <StationInfo
        dateRange={dateRange}
        topReturns={topReturns}
        topDepartures={topDepartures}
        stationWithStats={station}
        stationId={stationId}
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
  const dateRange = await getDateRange();
  const station = await getStationDetails(stationId, dateRange);
  const topConnections = await getTopConnections(stationId, dateRange);

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
