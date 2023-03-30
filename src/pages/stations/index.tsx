// import type { NextPage } from 'next';
import prisma from '@db';

const allStations = ({ stations }: { stations: Station[] }) => {
  return (
    <div>
      <h1>Stations</h1>
      <ul>
        {stations.map((station: Station): JSX.Element => {
          return (
            <li data-id={station.station_id} key={station.station_id}>
              {station.station_name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export async function getServerSideProps() {
  const stations: Station[] = await prisma.station.findMany({
    skip: 0,
    take: 50,
  });
  // const stations = await res.json();
  stations.forEach((station) => {
    station.longitude = station.longitude.toString();
    station.latitude = station.latitude.toString();
  });
  return { props: { stations } };
}

export default allStations;
