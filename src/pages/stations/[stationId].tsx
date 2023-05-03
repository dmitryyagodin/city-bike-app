import type { NextPage } from 'next';
import prisma from '@db';
import formatTopConnections from '../../lib/formatTopConnections';
import getTopConnections from '../../../prisma/getTopConnections';
import getStationDetails from '../../../prisma/getStationDetails';
import getDateRange from '../../../prisma/getDateRange';
import { Col, Container, Row, StationInfo } from '@components';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import Head from 'next/head';

type Props = {
  stationWithStats: Station & StationStats;
  topReturns: TopConnection[];
  topDepartures: TopConnection[];
  dateRange: 'string'; //{ minDate: string; maxDate: string };
  stationId: 'string';
};

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const Station: NextPage<Props> = ({
  stationWithStats,
  topReturns,
  topDepartures,
  dateRange,
  stationId,
}) => {
  const MapWithNoSSR = dynamic(() => import('../../components/map/openStreetMap'), {
    ssr: false,
  });

  if (!stationWithStats) {
    return <p>The requested page has no data to view</p>;
  }
  return (
    <>
      <Head>
        <title>Helsinki city bike station | {stationWithStats.station_name || ''}</title>
        <meta
          name="description"
          content={`Helsinki city bike station ${stationWithStats.station_name || ''}. Top departures & top returns. Filter stats by date`}
          key="desc"
        />
      </Head>
      <Container>
        <Row>
          <Col mobileS={12} laptopL={6}>
            <StationInfo
              dateRange={dateRange}
              topReturns={topReturns}
              topDepartures={topDepartures}
              stationWithStats={stationWithStats}
              stationId={stationId}
            />
          </Col>
          <Col mobileS={12} laptopL={6}>
            <MapWithNoSSR stations={[stationWithStats]} width="100%" height="calc(100vh - 160px)" />
          </Col>
        </Row>
      </Container>
    </>
  );
};

/**
 * Pre-generate static props for earch of the paths returned by the getStaticPaths
 *
 * @param context
 * @returns
 */

export async function getStaticProps(context: { params: { stationId: string } }) {
  const { stationId } = context.params;
  const dateRange = await getDateRange();
  const stationWithStats = await getStationDetails(stationId, dateRange);
  const topConnections = await getTopConnections(stationId, dateRange);
  const { topReturns, topDepartures } = formatTopConnections(topConnections);

  return {
    props: { stationId, stationWithStats, topReturns, topDepartures, dateRange },
  };
}

/*
 *  Generate static paths from the list of all the stations
 *
 */
export async function getStaticPaths() {
  try {
    const stations: Station[] = await prisma.station.findMany({});

    const paths = stations.map((station) => ({
      params: { stationId: station.station_id.toString() },
    }));

    return { paths, fallback: false };
  } catch (err) {
    throw err;
  }
}

export default Station;
