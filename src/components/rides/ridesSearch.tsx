import { useRouter } from 'next/router';
import React from 'react';
import { RidesFilter, SearchByDuration, SearchByStationName, SearchByDistance } from '@components';


const RidesSearch = ({ stations }: { stations: Station[] }) => {
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log('submit event');
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <form onSubmit={onSubmit}>
        <RidesFilter />
        <SearchByStationName stations={stations} />
        <SearchByDistance />
        <SearchByDuration />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default RidesSearch;
