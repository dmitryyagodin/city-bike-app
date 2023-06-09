import type { NextPage } from 'next';
import { getRides } from 'prisma/getRides';
import getStations from 'prisma/getStations';
import { useEffect, useState, useContext } from 'react';
import { Table, RidesPagination, RidesFilter, Container, Row, Col, StyledAside } from '@components';
import { RidesContext } from 'src/context/ridesContext';
import Head from 'next/head';

type Props = {
  rides: Ride[] | null;
  totalCount: number | null;
  stations: Station[];
};

const Rides: NextPage<Props> = ({ rides, totalCount, stations }) => {
  const { searchParams, setIsLoading, setRidesCount } = useContext(RidesContext);

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

      fetch(url, { method: 'POST', body: JSON.stringify(queryObject) })
        .then((res) => res.json())
        .then((data) => {
          setFilteredRides(data.rides);
          setRidesCount(data.totalCount);
          setIsLoading(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <>
      <Head>
        <title>Helsinki city bike rides</title>
        <meta
          name="description"
          content="Helsinki city bike rides. Filter and sort by bike station names, distance and ride duration"
          key="desc"
        />
      </Head>
      <Container>
        <Row>
          <Col mobileS={12}>
            <h1 className="text-center">Bike rides</h1>
          </Col>

          <Col laptopL={3}>
            <StyledAside>
              <RidesFilter stations={stations} />
            </StyledAside>
          </Col>

          <Col laptopL={9}>
            <RidesPagination />
            <Table rows={filteredRides || []} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export async function getStaticProps() {
  const { rides, totalCount } = await getRides();
  const { stations } = await getStations();

  return { props: { rides, totalCount, stations } };
}

export default Rides;
