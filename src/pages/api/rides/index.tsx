import prisma from '@db';

const defaultQuery = {skip: 0, take: 50};

export const getRides = async (query = {} ) => {
  query = {...query, ...defaultQuery};
  
  const rides: Ride[] = await prisma.ride.findMany(query);

  rides.forEach((ride) => {
    ride.departureTime = ride.departureTime.toLocaleString('fi');
    ride.returnTime = ride.returnTime.toLocaleString('fi');
    ride.distance = Number(ride.distance);
  });

  return JSON.parse(JSON.stringify(rides));
};