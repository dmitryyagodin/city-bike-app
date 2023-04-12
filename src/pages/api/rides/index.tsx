import prisma from '@db';
import { formatDate, getDuration } from 'src/lib/utils';

const defaultQuery = {
  skip: 0,
  take: 50,
};

// const countQuery = {
//   select: {
//     _all: true,
//   },
// };

export const getRides = async (query = {}) => {
  query = { ...defaultQuery, ...query };
 
  const rawRides: RawRide[] | null = await prisma.ride.findMany(query);
  const totalCount: number = await prisma.ride.count({});

  if (rawRides) {
    const rides: Ride[] = [];

    rawRides.forEach(ride => rides.push(
      {
        returnStationId: ride.return_station_id,
        departureStationId: ride.departure_station_id,
        departureStationName: ride.departure_station_name,
        returnStationName: ride.return_station_name,
        departureTime: formatDate(ride.departureTime),
        returnTime: formatDate(ride.returnTime),
        distance: Number(ride.distance),
        duration: getDuration(ride.duration),
        id: ride.id
      })
    );

    return JSON.parse(JSON.stringify({ rides, totalCount }));
  }

};
