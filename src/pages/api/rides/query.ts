import { NextApiRequest, NextApiResponse } from 'next';
import { getRides } from '../../../../prisma/getRides';

interface OrderByObject {
  [keys: string]: string;
}

interface Query {
  orderBy?: OrderByObject[];
  skip?: number;
  where?: { AND: []};
}

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const query: Query = {};

  if (req.method === 'POST') {
    const {orderBy, where, skip} =  JSON.parse(req.body);
    console.log('--- BODY******');
    console.log(JSON.parse(req.body));
    console.log('-----BODY******');

    if (orderBy) query.orderBy = orderBy;
    if (where) query.where = where;
    if (skip) query.skip = skip;
  }

  console.log('-----QUERY******');
  console.log(query);
  console.log('-----QUERY******');
  const { rides, totalCount } = await getRides(query);
  res.json({ rides, totalCount });
}
