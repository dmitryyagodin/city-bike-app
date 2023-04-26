import prisma from '@db';

export default async function getStations() {
  try {
    const stations: Station[] = await prisma.station.findMany({
      orderBy: [
        {
          station_id: 'asc',
        },
      ],
    });

    stations.forEach((station) => {
      station.longitude = station.longitude.toString();
      station.latitude = station.latitude.toString();
    });

    return { stations };
  } catch (e) {
    throw e;
  }
}
