import type { NextPage } from "next";
import Row from '../ui/row';
import Col from '../ui/col';
import { useContext } from 'react';
import { StationContext } from 'src/context/stationContext';
import LoadingElement from '../../components/ui/loadingElement';
import styled from 'styled-components';

const StyledSection = styled.section`
  margin-bottom: 12px 0 24px 0;

  &.is-loading li {
    ${LoadingElement};
  }
`;

type Props = {
  topDepartures: TopConnection[];
  topReturns: TopConnection[];
  departuresCount: number;
  averageDepartureDistance: number;
  returnsCount: number;
  averageReturnDistance: number;
};

const StationStats: NextPage<Props> = ({
  topDepartures,
  topReturns,
  departuresCount,
  averageDepartureDistance,
  returnsCount,
  averageReturnDistance,
}) => {
  const { isLoading } = useContext(StationContext);

  return (
    <StyledSection className={isLoading ? 'is-loading' : ''}>
      <Row>
        <Col mobileS={12} mobileL={6}>
          <h3>Departures</h3>
          <ul>
            <li>{departuresCount} times</li>
            <li>{averageDepartureDistance} m on average</li>
          </ul>
        </Col>
        <Col mobileS={12} mobileL={6}>
          <h3>Returns</h3>
          <ul>
            <li>{returnsCount} times</li>
            <li>{averageReturnDistance} m on average</li>
          </ul>
        </Col>
      </Row>
      <Row>
        <Col mobileS={12} mobileL={6}>
          <h3>Top Departures</h3>
          <ul>
            {topDepartures.map((item) => (
              <li key={item.stationId}>
                {item.stationName}: {item.count} times
              </li>
            ))}
          </ul>
        </Col>
        <Col mobileS={12} mobileL={6}>
          <h3>Top Returns</h3>
          <ul>
            {topReturns.map((item) => (
              <li key={item.stationId}>
                {item.stationName}: {item.count} times
              </li>
            ))}
          </ul>
        </Col>
      </Row>
    </StyledSection>
  );
};

export default StationStats;