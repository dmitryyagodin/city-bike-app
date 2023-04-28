import React from 'react';
import { useRouter } from 'next/router';
import { StyledDetails, StyledInput } from '@components';
import { updateSearchParams } from '../../lib/utils';

const SearchByDistance = () => {
  const router = useRouter();

  return (
    <StyledDetails>
      <summary>Search by distance (km)</summary>
      <fieldset>
        <label>
          Distance from:
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
    </StyledDetails>
  );
};

export default SearchByDistance;
