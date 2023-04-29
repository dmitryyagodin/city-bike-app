import React from 'react';
import { useRouter } from 'next/router';
import { StyledDetails, StyledFieldset, StyledInput } from '@components';
import { updateSearchParams } from '../../lib/utils';

const FilterByDistance = () => {
  const router = useRouter();

  return (
    <StyledDetails>
      <summary>
        <h3>By distance (km)</h3>
      </summary>
      <StyledFieldset>
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
      </StyledFieldset>
    </StyledDetails>
  );
};

export default FilterByDistance;
