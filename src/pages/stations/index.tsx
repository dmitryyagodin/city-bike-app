import type { NextPage } from 'next';
import prisma from '@db';
import { useEffect, useContext } from 'react';
import { Pagination, NoDataView, StationsList, StyledAside, StationsSearch } from '@components';
import dynamic from 'next/dynamic';
import { errorMessages } from '@lib';
import { StationContext } from 'src/context/stationContext';
import styled from 'styled-components';

type Props = {
  stations: Station[] | [];
  totalCount: number | 0;
};

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const MapWithNoSSR = dynamic(() => import('../../components/map/openStreetMap'), {
  ssr: false,
});

const AllStations: NextPage<Props> = ({ stations, totalCount }) => {
  const { currentStations, setCurrentStations, setAllStations, setStationsCount, stationsOnPage } =
    useContext(StationContext);

  useEffect(() => {
    setCurrentStations(stations.slice(0, stationsOnPage));
    setAllStations(stations);
    setStationsCount(totalCount);
  }, []);

  if (!stations.length || totalCount == 0) {
    return <NoDataView message={errorMessages.outOfService} />;
  }

  return (
    <>
      <h1>Stations</h1>
      <Grid>
        <Pagination shallow={true} />
        {/* <StyledAside> */}
        <StationsSearch />
        <StationsList stations={currentStations} />
        {/* </StyledAside> */}
        <MapWithNoSSR stations={currentStations} />
      </Grid>
    </>
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
