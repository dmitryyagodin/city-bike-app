import type { NextPage } from 'next';
import { useContext } from 'react';
import { StationContext } from 'src/context/stationContext';
import LoadingElement from '../../components/ui/loadingElement';
import styled from 'styled-components';
import { StyledStationStatsRow, Row, Col } from '@components';

const StyledSection = styled.section`
  margin: 12px 0 24px 0;

  &.is-loading li {
    ${LoadingElement};
  }

  & ul {
    padding: 0 20px 0 0;
    list-style-type: none;
    max-width: 300px;
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
  const maxDepartures = topDepartures[0].count;
  const maxReturns = topReturns[0].count;

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
              <li className={'flex-column mb-2'} key={item.stationId}>
                {item.stationName}: {item.count} times
                <StyledStationStatsRow
                  coloredWidth={((item.count / maxDepartures) * 100).toFixed(2) + '%'}
                />
              </li>
            ))}
          </ul>
        </Col>
        <Col mobileS={12} mobileL={6}>
          <h3>Top Returns</h3>
          <ul>
            {topReturns.map((item) => (
              <li className={'flex-column mb-2'} key={item.stationId}>
                {item.stationName}: {item.count} times
                <StyledStationStatsRow
                  coloredWidth={((item.count / maxReturns) * 100).toFixed(2) + '%'}
                />
              </li>
            ))}
          </ul>
        </Col>
      </Row>
    </StyledSection>
  );
};

export default StationStats;
