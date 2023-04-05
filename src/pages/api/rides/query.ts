import { getRides } from './index';

export default async function handle(req, res) {
  const query = {};

  if (req.query.orderBy) {
    const [field, order] = req.query.orderBy.split('-');
    query.orderBy = [{ [field]: order }];
  }

  if (req.query.skip) query.skip = Number(req.query.skip);

  const { rides, totalCount } = await getRides(query);
  res.json({ rides, totalCount });
}
