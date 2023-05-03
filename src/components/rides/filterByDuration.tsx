import React from 'react';
// import { useRouter } from 'next/router';
import { Col, Row, StyledDetails, StyledInput } from '@components';
// import { updateSearchParams } from 'src/lib/utils';

const FilterByDuration = () => {
  // const router = useRouter();

  return (
    <StyledDetails>
      <summary>
        <h3>By duration (mins)</h3>
      </summary>
      <Row>
        <Col mobileS={5} laptopS={10}>
          <label className="mt-2 flex-column">
            Duration from:
            <StyledInput
              type="number"
              name="min_duration"
              // onChange={(e) => updateSearchParams(e, router)}
              min="0"
              max="100000"
            />
          </label>
        </Col>
        <Col mobileS={2}></Col>
        <Col mobileS={5} laptopS={10}>
          <label className="mt-2 flex-column">
            Duration less:
            <StyledInput
              type="number"
              name="max_duration"
              // onChange={(e) => updateSearchParams(e, router)}
              min="0"
              max="100000"
            />
          </label>
        </Col>
      </Row>
    </StyledDetails>
  );
};

export default FilterByDuration;
