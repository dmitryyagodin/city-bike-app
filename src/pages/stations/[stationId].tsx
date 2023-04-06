import prisma from '@db';

const Station = ({ station }: { station: Station & StationStats}) => {
  return (
    <div>
      <h1>Station {station.station_name}</h1>
      <p>Address: {station.station_address}</p>
      <p>Capacity: {station.capacity}</p>
      <p>From: {station.departuresCount} times with an average distance of {station.averageDepartureDistance} m </p>
      <p>To: {station.returnsCount} times with an average distance of {station.averageReturnDistance} m</p>
    </div>
  );
};

/**
 * Pre-generate static props for earch of the paths returned by the getStaticPaths
 * 
 * @param context 
 * @returns 
 */

export async function getStaticProps(context: { params: { stationId: string }}) {

  const { stationId } = context.params;
  const [station]: [Station & StationStats] = await prisma.$queryRaw`
    SELECT
      s.station_name,
      s.station_address,
      s.capacity,
      s.longitude::TEXT,
      s.latitude::TEXT,
      SUM(CASE WHEN s.station_id = r.departure_station_id THEN 1 ELSE 0 END)::INTEGER as "departuresCount",
      SUM(CASE WHEN s.station_id = r.return_station_id THEN 1 ELSE 0 END)::INTEGER as "returnsCount",
      AVG(CASE WHEN s.station_id = r.return_station_id THEN r.distance ELSE NULL END )::INTEGER as "averageReturnDistance",
      AVG(CASE WHEN s.station_id = r.departure_station_id THEN r.distance ELSE NULL END )::INTEGER as "averageDepartureDistance"
    FROM
      stations AS s
    LEFT JOIN rides AS r
    ON s.station_id = r.return_station_id
    OR s.station_id = r.departure_station_id
    WHERE s.station_id = ${Number(stationId)}
    GROUP BY
      s.station_name,
      s.station_address,
      s.capacity,
      s.longitude,
      s.latitude;
  `;

  return { props: { station }};
}

/* 
 *  Generate static paths from the list of all the stations
 *   
 */
export async function getStaticPaths() {
  const stations: Station[] = await prisma.station.findMany({});
  
  const paths = stations.map(station => ({
    params: {stationId: station.station_id.toString()}
  }));  

  return { paths, fallback: false };
}

export default Station;