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

  try {
    const rides: Ride[] = await prisma.ride.findMany(query);
    const totalCount: number = await prisma.ride.count({});

    if (rides) {
      rides.forEach((ride) => {
        ride.departureTime = formatDate(ride.departureTime as Date);
        ride.returnTime = formatDate(ride.returnTime as Date);
        ride.duration = getDuration(ride.duration as number);
      });

      return { rides, totalCount };
    } else {
      return {rides: null, totalCount: null};
    }
  } catch (e) {
    throw e;
  }
  //  finally {
  //   return {rides: null, totalCount: null};
  // }
};
