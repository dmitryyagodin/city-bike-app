import prisma from '@db';
import {formatDate, getDuration } from 'src/lib/utils';

const defaultQuery = {skip: 0, take: 50};

export const getRides = async (query = {} ) => {
  query = {...query, ...defaultQuery};
  
  const rides: Ride[] = await prisma.ride.findMany(query);

  rides.forEach((ride) => {
    ride.departureTime = formatDate(ride.departureTime as Date);
    ride.returnTime = formatDate(ride.returnTime as Date);
    ride.distance = Number(ride.distance);
    ride.duration = getDuration(ride.duration as number);
  });

  return JSON.parse(JSON.stringify(rides));
};