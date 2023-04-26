import React from 'react';
import { useRouter } from 'next/router';
import { StyledInput } from '@components';
import { updateSearchParams } from '../../lib/utils';

const SearchByDistance = () => {
  const router = useRouter();

  return (
    <details>
      <summary>Search by distance (km)</summary>
      <fieldset>
        Distance from:
        <label>
          <StyledInput
            type="number"
            name="min_distance"
            onChange={(e) => updateSearchParams(e, router)}
            min="0"
            max="100000"
          />
        </label>
        <label>
          Distance less:
          <StyledInput
            type="number"
            name="max_distance"
            onChange={(e) => updateSearchParams(e, router)}
            min="0"
            max="100000"
          />
        </label>
      </fieldset>
    </details>
  );
};

export default SearchByDistance;
