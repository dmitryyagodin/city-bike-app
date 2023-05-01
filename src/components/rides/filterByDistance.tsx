import React from 'react';
import { useRouter } from 'next/router';
import { Col, Row, StyledDetails, StyledInput } from '@components';
import { updateSearchParams } from '../../lib/utils';

const FilterByDistance = () => {
  const router = useRouter();

  return (
    <StyledDetails>
      <summary>
        <h3>By distance (km)</h3>
      </summary>
      {/* <StyledFieldset> */}
      <Row>
        <Col mobileS={5} laptopS={10}>
          <label className="mt-2 flex-column">
            Distance from:
            <StyledInput
              type="number"
              name="min_distance"
              onChange={(e) => updateSearchParams(e, router)}
              min="0"
              max="100000"
            />
          </label>
        </Col>
        <Col mobileS={2}></Col>
        <Col mobileS={5} laptopS={10}>
          <label className="mt-2 flex-column">
            Distance less:
            <StyledInput
              type="number"
              name="max_distance"
              onChange={(e) => updateSearchParams(e, router)}
              min="0"
              max="100000"
            />
          </label>
        </Col>
      </Row>
      {/* </StyledFieldset> */}
    </StyledDetails>
  );
};

export default FilterByDistance;
