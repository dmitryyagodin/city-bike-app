import type { NextPage } from 'next';
import prisma from '@db';
import { useEffect, useState, useCallback } from 'react';
import { Pagination, NoDataView, StyledLink, StyledList } from '@components';
import { useRouter } from 'next/router';
import { getNavPageUrl, numberWithCommas } from '../../lib/utils';
import dynamic from 'next/dynamic';
import { errorMessages } from '@lib';

const STATIONS_ON_PAGE = 25;

type Props = {
  stations: Station[] | [];
  totalCount: number | 0;
};

const MapWithNoSSR = dynamic(() => import('../../components/map/openStreetMap'), {
  ssr: false,
});

const AllStations: NextPage<Props> = ({ stations, totalCount }) => {
  const router = useRouter();
  const { pathname } = router;

  const [stationsCount, setStationsCount] = useState(totalCount);
  const [skip, setSkip] = useState(STATIONS_ON_PAGE);
  const [filteredStations, setFilteredStations] = useState(stations.slice(0, STATIONS_ON_PAGE));

  const updateNavigation = useCallback(() => {
    if (router.query.skip) {
      const currentSkip = Number(router.query.skip);
      const newSkip = currentSkip + STATIONS_ON_PAGE;

      setSkip(newSkip);

      setFilteredStations(() => {
        if (router.query.filter) {
          const searchText = router.query.filter as string;
          const filtered = stations.filter((station: Station) =>
            station.station_name.includes(searchText)
          );
          return filtered.slice(currentSkip, newSkip);
        } else {
          return stations.slice(currentSkip, newSkip);
        }
      });
    }
  }, [router, stations]);

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const searchText = e.target.value;

      const query = { [e.target.name]: e.target.value };

      router.push(
        {
          pathname,
          query: query,
        },
        undefined,
        { shallow: true }
      );

      setFilteredStations(() => {
        const filtered = stations.filter((station: Station) =>
          station.station_name.includes(searchText)
        );

        setStationsCount(filtered.length);
        setSkip(STATIONS_ON_PAGE);

        return filtered.slice(0, STATIONS_ON_PAGE);
      });
    },
    [pathname, router, stations]
  );

  useEffect(() => updateNavigation(), [updateNavigation]);

  const [active, setActive] = useState(0);

  console.log('rerendered');

  if (!stations.length || totalCount == 0) {
    return <NoDataView message={errorMessages.outOfService} />;
  }

  return (
    <div>
      <h1>Stations</h1>
      <h2>{numberWithCommas(stationsCount) || 'No'} results</h2>
      <div style={{ display: 'flex' }}>
        <div>
          <Pagination
            prevHref={
              skip > STATIONS_ON_PAGE ? getNavPageUrl(router, skip - STATIONS_ON_PAGE * 2) : ''
            }
            nextHref={getNavPageUrl(router, skip)}
            nextPageNumber={skip / STATIONS_ON_PAGE + 1}
            totalPages={Math.ceil(stationsCount / STATIONS_ON_PAGE)}
            shallow={true}
          />
          <label>
            Search
            <input type="text" onChange={handleSearch} name="filter" />
          </label>
          <StyledList>
            {filteredStations.map((station: Station): JSX.Element => {
              return (
                <li
                  onMouseEnter={() => setActive(station.station_id)}
                  onMouseLeave={() => setActive(0)}
                  onFocus={() => setActive(station.station_id)}
                  onBlur={() => setActive(0)}
                  data-id={station.station_id}
                  key={station.station_id}
                >
                  <StyledLink href={`stations/${station.station_id}`}>
                    {station.station_name}
                  </StyledLink>
                </li>
              );
            })}
          </StyledList>
        </div>
        <MapWithNoSSR stations={filteredStations} active={active} />
      </div>
    </div>
  );
};

export async function getStaticProps() {
  try {
    const stations: Station[] = await prisma.station.findMany({
      orderBy: [
        {
          station_id: 'asc',
        },
      ],
    });
    const totalCount = stations?.length || 0;

    stations.forEach((station) => {
      station.longitude = station.longitude.toString();
      station.latitude = station.latitude.toString();
    });
    return { props: { stations, totalCount } };
  } catch (e) {
    throw e;
  }
}

export default AllStations;
