import type { NextPage } from 'next';
import { getRides } from 'prisma/getRides';
import getStations from 'prisma/getStations';
import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import { getNavPageUrl, numberWithCommas } from '../../lib/utils';
import { NoDataView, Table, RidesFilter, RidesPagination, RidesSearch } from '@components';
import { errorMessages } from '@lib';

const RIDES_ON_PAGE = 50;

type Props = {
  rides: Ride[] | null;
  totalCount: number | null;
  stations: Station[];
};

const Rides: NextPage<Props> = ({ rides, totalCount, stations }) => {
  const router = useRouter();
  const [filteredRides, setFilteredRides] = useState(rides);
  const [skip, setSkip] = useState(RIDES_ON_PAGE);

  const updateNavigation = useCallback(() => {
    if (router.query.orderBy || router.query.skip) {
      const currentSkip = Number(router.query.skip);
      const newSkip = currentSkip + RIDES_ON_PAGE;

      setSkip(newSkip);

      const url = '/api/rides/query?';
      const params = [];

      router.query.orderBy && params.push('orderBy=' + router.query.orderBy);
      currentSkip && params.push('skip=' + currentSkip);

      fetch(url + params.join('&'))
        .then((res) => res.json())
        .then((data) => {
          setFilteredRides(data.rides);
        });
    }
  }, [router]);

  useEffect(() => updateNavigation(), [updateNavigation]);

  if (!rides || !totalCount) {
    return <NoDataView message={errorMessages.outOfService} />;
  }

  return (
    <div>
      <h1>Bike rides</h1>
      <h2>{numberWithCommas(totalCount)} results</h2>
      <div style={{ display: 'flex' }}>
        <RidesSearch stations={stations} />
        <div>
          <RidesPagination
            prevHref={skip > RIDES_ON_PAGE ? getNavPageUrl(router, skip - RIDES_ON_PAGE * 2) : ''}
            nextHref={getNavPageUrl(router, skip)}
            nextPageNumber={skip / RIDES_ON_PAGE + 1}
            totalPages={Math.ceil(totalCount / RIDES_ON_PAGE)}
            shallow={false}
          />
          <Table rows={filteredRides || []} />
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const { rides, totalCount } = await getRides();
  const { stations } = await getStations();
  
  return { props: { rides, totalCount, stations } };
}

export default Rides;
