import type { NextPage } from 'next';
import Table from '../components/table';
import { getRides } from '@api/rides';
import RidesFilter from '../components/ridesFilter';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Pagination from '../components/pagination';
import { getNextPageUrl } from '../../lib/utils.ts';

const RIDES_ON_PAGE = 50;

type Props = {
  rides: { rides: Ride[] };
  count: number;
};

const Rides: NextPage<Props> = ({ rides, count }) => {
  const router = useRouter();

  const [filteredRides, setFilteredRides] = useState(rides);
  const [skip, setSkip] = useState(50);
  const [totalRides, setTotalRides] = useState(count);

  useEffect(() => {
    if (router.query.orderBy || router.query.skip) {
      const url = '/api/rides/query?';
      const params = [];
      router.query.orderBy && params.push('orderBy=' + router.query.orderBy);
      router.query.skip && params.push('skip=' + router.query.skip);

      fetch(url + params.join('&'))
        .then((res) => res.json())
        .then((data) => {
          setFilteredRides(data.rides);

          if (router.query.skip && skip !== router.query.skip) {
            setSkip(() => Number(router.query.skip) + 50);
          }
        });
    }
  }, [router.query.orderBy, router.query.skip]);

  return (
    <div>
      <h1>Bike rides</h1>
      <RidesFilter />
      <Pagination
        href={getNextPageUrl(router, skip)}
        nextPageNumber={skip / RIDES_ON_PAGE + 1}
        totalPages={Math.ceil(totalRides / RIDES_ON_PAGE)}
      />
      <Table rows={filteredRides} />
    </div>
  );
};

export async function getStaticProps() {
  const { rides, totalCount }: { rides: Ride[]; count: number } =
    await getRides();
  return { props: { rides: rides, count: totalCount } };
}

export default Rides;
