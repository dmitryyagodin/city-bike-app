import {getRides} from './index';

export default async function handle(req, res) {
  
  const query = {};
  const {orderBy, page} = req.query;
  
  if (orderBy) {
    Object.entries(req.query.orderBy).forEach(([key, value]) => {
      const [field, order] = value.split('-');
      query[key] = [ { [field]: order  } ];
    } );
  }
  
  const rides = await getRides(query);  
  res.json(rides);
}