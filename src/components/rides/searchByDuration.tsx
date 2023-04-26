import React from 'react';
import { useRouter } from 'next/router';
import { StyledInput } from '@components';
import { updateSearchParams } from 'src/lib/utils';

const SearchByDuration = () => {
  const router = useRouter();

  return (
    <details>
      <summary>Search by duration (minutes)</summary>
      <fieldset>
        Duration from:
        <label>
          <StyledInput
            type="number"
            name="max_distance"
            onChange={(e) => updateSearchParams(e, router)}
            min="0"
            max="1000"
          />
        </label>
        <label>
          Duration less:
          <StyledInput
            type="number"
            name="max_distance"
            onChange={(e) => updateSearchParams(e, router)}
            min="0"
            max="1000"
          />
        </label>
      </fieldset>
    </details>
  );
};

export default SearchByDuration;
