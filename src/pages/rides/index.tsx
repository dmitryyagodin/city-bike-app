import type { NextPage } from 'next';
import Table from '../components/table';
import { getRides } from '@api/rides';
import RidesFilter from '../components/ridesFilter';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Pagination from '../components/pagination';

const RIDES_ON_PAGE = 50;

type Props = {
  rides: { rides: Ride[] };
};

const Rides: NextPage<Props>  =  ({ rides }) => {
  const router = useRouter();
  
  const [filteredRides, setFilteredRides] = useState(rides);
  const [skip, setSkip] = useState(0);
  const [totalRides, setTotalRides] = useState(0);

  useEffect(() => {
    
    if (router.query.orderBy || router.query.page) {
      const url = '/api/rides/query?';
      const params = [];
      router.query.orderBy && params.push('orderBy=' + router.query.orderBy);
      router.query.page && params.push('page=' + router.query.page);   
      
      fetch(url + params.join('&'))
      .then((res) => res.json())
      .then((data) => {
        setFilteredRides(data);
      });
      
    }
  }, [router.query.orderBy, router.query.page]);



  return (
    <div>
      <h1>Bike rides</h1>
      <RidesFilter />
      <Table rows={filteredRides} />
      <Pagination
       currentPath={router.asPath}
       nextPageNumber={skip / RIDES_ON_PAGE  + 2}
       skip={skip}
       totalPages={Math.ceil(totalRides / RIDES_ON_PAGE)}
       />
    </div>
  );
};

export async function getStaticProps() {
  const rides: Ride[] = await getRides();
  return { props: { rides } };
}

export default Rides;
