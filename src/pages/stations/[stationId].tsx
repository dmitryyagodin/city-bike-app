import prisma from '@db';
// import { useRouter } from 'next/router';

const Station = ({ station }: { station: Station }) => {
  return (
    <div>
      <h1>Station {station.station_name}</h1>
    </div>
  );
};

export async function getServerSideProps(context) {
  const id = context.query.stationId;

  const station: Station = await prisma.station.findUnique({
    where: {
      station_id: Number(id),
    },
  });

  station.longitude = station.longitude.toString();
  station.latitude = station.latitude.toString();
  return { props: { station } };
}

export default Station;
