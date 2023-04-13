import { NextApiRequest, NextApiResponse } from 'next';
import getTopConnections from '../../../../prisma/getTopConnections';
import getStationDetails from '../../../../prisma/getStationDetails';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // query: { stationId: '1', min: '2021-07-21', max: '2021-07-31'
  const { stationId, min, max } = req.query;

  if (typeof stationId === 'string' && typeof min === 'string' && typeof max === 'string') {
    const dateRange = JSON.stringify({ minDate: min, maxDate: max });

    const topConnections = await getTopConnections(stationId, dateRange);
    const stationWithStats = await getStationDetails(stationId, dateRange);
  
    res.json({ topConnections, stationWithStats });
  }
}
