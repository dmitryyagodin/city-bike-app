import { NextPage } from 'next';
import React from 'react';

type HandleSearchFunction = (e: React.ChangeEvent<HTMLInputElement>) => void;

type Props = {
  handleSearch: HandleSearchFunction;
};

const StationsSearch: NextPage<Props> = ({ handleSearch }) => {
  return (
    <label>
      Search
      <input type="text" onChange={handleSearch} name="filter" />
    </label>
  );
};

export default StationsSearch;
