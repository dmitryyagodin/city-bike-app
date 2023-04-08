import prisma from '@db';

export default async function queryStationDetails(stationId) {
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
  return station;
}
