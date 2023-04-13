import type { NextPage } from 'next';
import { NoDataView } from '@components';
import prisma from '@db';
import dynamic from "next/dynamic";
import errorMessages from '../../lib/errorMessages.json';

type Props = {
  stations: Station[] | [];
};
const StationsOnMap: NextPage<Props> = ({ stations }) => {
  
  const MapWithNoSSR = dynamic(() => import("../../components/map/openStreetMap"), {
    ssr: false
  });

  if (!stations.length) {
    return <NoDataView message={errorMessages.outOfService} />;
  }
  return (
    <div>
      <h1>Stations</h1>
      <MapWithNoSSR stations={stations}/>
    </div>
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
  //  finally {
  //   return {props: {stations: []}};
  // }
}

export default StationsOnMap;