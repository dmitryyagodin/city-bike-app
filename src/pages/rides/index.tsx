// import type { NextPage } from 'next';
import prisma from '@db';
import Table from '../components/table';

const allRides = ({ rides }: { rides: Ride[] }) => {
  return (
    <div>
      <h1>Stations</h1>
      <Table rows={rides} />
    </div>
  );
};

export async function getServerSideProps() {
  const rides: Ride[] = await prisma.ride.findMany({
    skip: 0,
    take: 50,
  });

  rides.forEach((ride) => {
    ride.departureTime = ride.departureTime.toString();
    ride.returnTime = ride.returnTime.toString();
    ride.distance = Number(ride.distance);
  });

  return { props: { rides } };
}

export default allRides;
// For each journey show
//  departure and return stations,
//  covered distance in kilometers and duration in minutes
