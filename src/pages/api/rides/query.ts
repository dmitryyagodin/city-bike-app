import {getRides} from './index';

export default async function handle(req, res) {
  
  const query = {};

  Object.entries(req.query).forEach(([key, value]) => {
      const [field, order] = value.split('-');
      query[key] = [ { [field]: order  } ];
    } );
  
  const rides = await getRides(query);  
  res.json(rides);
}