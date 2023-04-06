// import type { NextPage } from 'next';
import prisma from '@db';
import dynamic from "next/dynamic";


const allStations = ({ stations }: { stations: Station[] }) => {
  const MapWithNoSSR = dynamic(() => import("../../components/map"), {
    ssr: false
  });
  
  return (
    <div>
      <h1>Stations</h1>
      <MapWithNoSSR stations={stations}/>
    </div>
  );
};

export async function getServerSideProps() {
  const stations: Station[] = await prisma.station.findMany({});
  stations.forEach((station) => {
    station.longitude = station.longitude.toString();
    station.latitude = station.latitude.toString();
  });
  return { props: { stations } };
}

export default allStations;