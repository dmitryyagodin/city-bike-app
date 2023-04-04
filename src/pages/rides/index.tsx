import type { NextPage } from 'next';
import Table from '../components/table';
import { getRides } from '@api/rides';
import RidesFilter from '../components/ridesFilter';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';


type Props = {
  rides: { rides: Ride[] };
};

const Rides: NextPage<Props>  =  ({ rides }) => {
  const router = useRouter();

  const [filteredRides, setFilteredRides] = useState(rides);

  useEffect(() => {
    if (router.query.orderBy) {
      fetch('/api/rides/query?orderBy=' + router.query.orderBy )
      .then((res) => res.json())
      .then((data) => setFilteredRides(data));
    }
  }, [router.query.orderBy]);



  return (
    <div>
      <h1>Bike rides</h1>
      <RidesFilter />
      <Table rows={filteredRides} />
    </div>
  );
};

export async function getStaticProps() {
  const rides: Ride[] = await getRides();
  return { props: { rides } };
}

export default Rides;
