import prisma from '@db';

export default async function queryTopConnections(
  id: string,
  dateRange: string
) {
  const stationId = Number(id);
  const { minDate, maxDate } = JSON.parse(dateRange);

  // add one more day to include the last of the range
  const _maxDate = new Date(maxDate);
  _maxDate.setDate(_maxDate.getDate() + 1);
  const _minDate = new Date(minDate);

  const connections: TopConnectionRaw[] = await prisma.$queryRaw`
    WITH rides_by_date AS (
      SELECT
        departure_station_id AS d_id,
        departure_station_name AS d_name,
        return_station_id AS r_id,
        return_station_name AS r_name,
        COUNT(
          CASE WHEN departure_station_id = ${stationId} THEN 1 ELSE NULL END
        ) rets,
        COUNT(
          CASE WHEN return_station_id = ${stationId} THEN 1 ELSE NULL END
        ) deps
      FROM
        rides
      WHERE
        (
          departure_station_id = ${stationId}
          OR return_station_id = ${stationId}
        )
        AND departure_time > ${_minDate}
        AND departure_time < ${_maxDate}
      GROUP BY
        d_id,
        d_name,
        r_id,
        r_name
    ),
    with_ranks AS (
      SELECT
        d_id,
        d_name,
        r_id,
        r_name,
        rets,
        deps,
        RANK() OVER (
          ORDER BY
            deps DESC
        ) dep_rank,
        RANK() OVER (
          ORDER BY
            rets DESC
        ) ret_rank
      FROM
        rides_by_date
      GROUP BY
        d_id,
        r_id,
        d_name,
        r_name,
        rets,
        deps
    )
    SELECT
      d_id AS "departureStationId",
      r_id AS "returnStationId",
      d_name AS "departureStationName",
      r_name AS "returnStationName",
      rets :: INTEGER AS "returnCount",
      deps :: INTEGER AS "departureCount",
      dep_rank :: INTEGER AS "departureRank",
      ret_rank :: INTEGER AS "returnRank",
      (
        CASE WHEN d_id = ${stationId} THEN d_id ELSE r_id END
      ) "currentStationId"
    FROM
      with_ranks
    WHERE
      dep_rank < 6
      OR ret_rank < 6;`;

  return connections;
}
