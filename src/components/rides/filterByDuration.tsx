import React from 'react';
import { useRouter } from 'next/router';
import { StyledDetails, StyledFieldset, StyledInput } from '@components';
import { updateSearchParams } from 'src/lib/utils';

const FilterByDuration = () => {
  const router = useRouter();

  return (
    <StyledDetails>
      <summary>
        <h3>By duration (mins)</h3>
      </summary>
      <StyledFieldset>
        <label>
          Duration from:
          <StyledInput
            type="number"
            name="min_duration"
            onChange={(e) => updateSearchParams(e, router)}
            min="0"
            max="100000"
          />
        </label>
        <label>
          Duration less:
          <StyledInput
            type="number"
            name="max_duration"
            onChange={(e) => updateSearchParams(e, router)}
            min="0"
            max="100000"
          />
        </label>
      </StyledFieldset>
    </StyledDetails>
  );
};

export default FilterByDuration;
