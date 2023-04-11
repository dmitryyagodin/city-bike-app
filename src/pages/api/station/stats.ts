import { NextApiRequest, NextApiResponse } from 'next';
import queryTopConnections from '../../../../prisma/queryTopConnections';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // query: { stationId: '1', min: '2021-07-21', max: '2021-07-31'
  const { stationId, min, max } = req.query;

  const dateRange = JSON.stringify({ minDate: min, maxDate: max });

  const topConnections = await queryTopConnections(stationId, dateRange);
  res.json({ topConnections });
}
