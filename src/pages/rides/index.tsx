import type { NextPage } from 'next';
import Table from '../components/table';
import { getRides } from '@api/rides';
import RidesFilter from '../components/ridesFilter';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Pagination from '../components/pagination';
import { getNavPageUrl, numberWithCommas } from '../../lib/utils';

const RIDES_ON_PAGE = 50;

type Props = {
  rides: { rides: Ride[] };
  totalCount: number;
};

const Rides: NextPage<Props> = ({ rides, totalCount }) => {
  const router = useRouter();

  const [filteredRides, setFilteredRides] = useState(rides);
  const [showItems, setShowItems] = useState(RIDES_ON_PAGE);
  const [skip, setSkip] = useState(showItems);
  const [totalRides, setTotalRides] = useState(totalCount);

  useEffect(() => {
    console.log('useEffect is run');
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
            setSkip(() => Number(router.query.skip) + RIDES_ON_PAGE);
          }
        });
    }
  }, [router.query.orderBy, router.query.skip]);

  return (
    <div>
      <h1>Bike rides</h1>
      <h2>{numberWithCommas(totalCount)} results</h2>
      <RidesFilter />
      <Pagination
        prevHref={skip > RIDES_ON_PAGE ? getNavPageUrl(router, skip - RIDES_ON_PAGE * 2): false}
        nextHref={getNavPageUrl(router, skip)}
        nextPageNumber={skip / RIDES_ON_PAGE + 1}
        totalPages={numberWithCommas(Math.ceil(totalCount / RIDES_ON_PAGE))}
      />
      <Table rows={filteredRides} />
    </div>
  );
};

export async function getStaticProps() {
  const { rides, totalCount }: { rides: Ride[], totalCount: number } =
    await getRides();
  return { props: { rides, totalCount } };
}

export default Rides;
