import type { NextPage } from 'next';
import { getRides } from 'prisma/getRides';
import getStations from 'prisma/getStations';
import { useEffect, useState, useContext } from 'react';
import { numberWithCommas } from '../../lib/utils';
import { NoDataView, Table, RidesPagination, RidesSearch, StyledButton } from '@components';
import { errorMessages } from '@lib';
import { RidesContext } from 'src/context/ridesContext';

type Props = {
  rides: Ride[] | null;
  totalCount: number | null;
  stations: Station[];
};

const Rides: NextPage<Props> = ({ rides, totalCount, stations }) => {
  
  const { searchParams, setIsLoading, setRidesCount, ridesCount } = useContext(RidesContext);
  
  useEffect(() => {
    totalCount && setRidesCount(totalCount);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [filteredRides, setFilteredRides] = useState(rides);

  useEffect(() => {
    const url = '/api/rides/query';

    if (JSON.stringify(searchParams) !== '{}') {
      const queryObject: RideQuery = {};
      if (searchParams.orderBy) {
        const orderByArray = Object.entries(searchParams.orderBy).map(([k, v]) => ({ [k]: v }));
        queryObject.orderBy = orderByArray;
      }
      
      if (searchParams.skip) {
        queryObject.skip = searchParams.skip;
      }
      
      if (searchParams.where) {
        queryObject.where = searchParams.where;
      }

      fetch(url, { method: 'POST', body: JSON.stringify(queryObject)})
        .then((res) => res.json())
        .then((data) => {
          setFilteredRides(data.rides);
          setRidesCount(data.totalCount);
          setIsLoading(false);
        });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handleReset = () => {
    setIsLoading(true);
     window.location.reload();
  };

  if (!rides || !ridesCount) {
    return <NoDataView message={errorMessages.outOfService} />;
  }

  return (
    <div>
      <h1>Bike rides</h1>
      <h2>{numberWithCommas(ridesCount) + ' results'}</h2>
      <div>
        <RidesSearch stations={stations} />
        <StyledButton onClick={handleReset}>Reset results</StyledButton>
        <div>
          <RidesPagination  />
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
