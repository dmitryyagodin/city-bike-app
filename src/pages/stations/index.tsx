import type { NextPage } from 'next';
import prisma from '@db';
import { useEffect, useContext } from 'react';
import {
  Pagination,
  NoDataView,
  StationsList,
  StationsSearch,
  Container,
  Row,
  Col,
  StyledAside,
} from '@components';
import dynamic from 'next/dynamic';
import { errorMessages } from '@lib';
import { StationContext } from 'src/context/stationContext';
import { numberWithCommas } from 'src/lib/utils';

type Props = {
  stations: Station[] | [];
  totalCount: number | 0;
};

const MapWithNoSSR = dynamic(() => import('../../components/map/openStreetMap'), {
  ssr: false,
});

const AllStations: NextPage<Props> = ({ stations, totalCount }) => {
  const {
    currentStations,
    setCurrentStations,
    setAllStations,
    setStationsCount,
    stationsCount,
    stationsOnPage,
  } = useContext(StationContext);

  useEffect(() => {
    setCurrentStations(stations.slice(0, stationsOnPage));
    setAllStations(stations);
    setStationsCount(totalCount);
  }, []);

  if (!stations.length || totalCount == 0) {
    return <NoDataView message={errorMessages.outOfService} />;
  }

  return (
    <Container className="mb-2">
      <Row>
        <Col mobileS={12}>
          <h1 className="text-center">Bike stations</h1>
        </Col>

        <Col mobileS={12} tablet={3}>
          <StyledAside>
            <StationsSearch />
            <h2>{numberWithCommas(stationsCount) || 'No'} results</h2>
            <StationsList stations={currentStations} />
          </StyledAside>
        </Col>

        <Col mobileS={12} tablet={9} className="flex-column">
          <Pagination shallow={true} />
          <MapWithNoSSR stations={currentStations} width="100%" height="520px" />
        </Col>
      </Row>
    </Container>
  );
};

export async function getStaticProps() {
  try {
    const stations: Station[] = await prisma.station.findMany({
      orderBy: [
        {
          station_id: 'asc',
        },
      ],
    });
    const totalCount = stations?.length || 0;

    stations.forEach((station) => {
      station.longitude = station.longitude.toString();
      station.latitude = station.latitude.toString();
    });
    return { props: { stations, totalCount } };
  } catch (e) {
    throw e;
  }
}

export default AllStations;
