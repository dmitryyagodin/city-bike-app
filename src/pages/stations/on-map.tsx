import type { NextPage } from 'next';
import { NoDataView } from '@components';
import prisma from '@db';
import dynamic from 'next/dynamic';
import errorMessages from '../../lib/errorMessages.json';
import Head from 'next/head';

type Props = {
  stations: Station[] | [];
};
const StationsOnMap: NextPage<Props> = ({ stations }) => {
  const MapWithNoSSR = dynamic(() => import('../../components/map/openStreetMap'), {
    ssr: false,
  });

  if (!stations.length) {
    return <NoDataView message={errorMessages.outOfService} />;
  }
  return (
    <>
      <Head>
        <title>Helsinki city bike | All stations on a map</title>
        <meta
          name="description"
          content="Helsinki city bike. View all stations on a map"
          key="desc"
        />
      </Head>
      <h1 className="visually-hidden">All stations on a map</h1>
      <MapWithNoSSR stations={stations} height="calc(100vh - 160px)" width="100%" />
    </>
  );
};

export async function getServerSideProps() {
  try {
    const stations: Station[] = await prisma.station.findMany({});
    stations.forEach((station) => {
      station.longitude = station.longitude.toString();
      station.latitude = station.latitude.toString();
    });
    return { props: { stations } };
  } catch (e) {
    throw e;
  }
}

export default StationsOnMap;
