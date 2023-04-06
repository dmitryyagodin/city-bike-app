import { NextApiRequest, NextApiResponse } from 'next';
import { getRides } from './index';



interface OrderByObject {
  [keys: string]: string
}

interface Query {
  orderBy?: OrderByObject[];
  skip?: number;
}

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  
  const query: Query = {};

  if (typeof req.query.orderBy === 'string') {
    const [field, order] = req.query.orderBy.split('-');
    query.orderBy = [{ [field]: order }];
  }

  if (req.query.skip) query.skip = Number(req.query.skip);

  const { rides, totalCount } = await getRides(query);
  res.json({ rides, totalCount });
}
