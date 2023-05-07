import { useRouter } from 'next/router';
import React, { useCallback, useContext } from 'react';
import { StationContext } from 'src/context/stationContext';

const StationsSearch = () => {
  const router = useRouter();
  const { pathname } = router;

  const { allStations, setCurrentStations, setStationsCount, setFilteredStations, stationsOnPage } =
    useContext(StationContext);

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const searchText = e.target.value.toLowerCase();

      const query = { [e.target.name]: searchText };

      router.push(
        {
          pathname,
          query: query,
        },
        undefined,
        { shallow: true }
      );

      const filtered = allStations.filter((station: Station) =>
        station.station_name.toLowerCase().includes(searchText)
      );
      setStationsCount(filtered.length);
      setFilteredStations(filtered);
      setCurrentStations(filtered.slice(0, stationsOnPage));
    },
    [
      allStations,
      pathname,
      router,
      setCurrentStations,
      setFilteredStations,
      setStationsCount,
      stationsOnPage,
    ]
  );

  return (
    <label className="mt-2 mb-2 mr-2 flex-column">
      Search by station name
      <input
        className="mt-2"
        type="text"
        onChange={handleSearch}
        name="filter"
        placeholder="station name"
      />
    </label>
  );
};

export default StationsSearch;
