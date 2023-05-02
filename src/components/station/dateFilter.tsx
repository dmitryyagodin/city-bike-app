import { useContext, useState } from 'react';
import type { NextPage } from 'next';
import Row from '../ui/row';
import Col from '../ui/col';
import { StationContext } from 'src/context/stationContext';

type HandleFilterEventFunction = ({
  topConnections,
  stationWithStats,
}: {
  topConnections: TopConnectionRaw[];
  stationWithStats: Station & StationStats;
}) => void;

type Props = {
  dateRange: string;
  stationId: string;
  emitFilterEvent: HandleFilterEventFunction;
};

const DateFilter: NextPage<Props> = ({ dateRange, stationId, emitFilterEvent }) => {
  const { minDate, maxDate } = JSON.parse(dateRange);

  const { setIsLoading } = useContext(StationContext);

  const min = new Date(minDate).toISOString().split('T')[0];
  const max = new Date(maxDate).toISOString().split('T')[0];

  const [newMax, setNewMax] = useState(max);
  const [newMin, setNewMin] = useState(min);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    let _min = newMin;
    let _max = newMax;
    if (e.target.name === 'ride-min') {
      setNewMin(e.target.value);
      _min = e.target.value;
    } else if (e.target.name === 'ride-max') {
      setNewMax(e.target.value);
      _max = e.target.value;
    }

    const url = `/api/station/stats?stationId=${stationId}&min=${_min}&max=${_max}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        emitFilterEvent(data);
        setIsLoading(false);
      });
  };

  return (
    <Row>
      <Col mobileS={6}>
        <h2>Filter rides by date</h2>
        <Col mobileS={7} className="mt-2">
          <label className="flex-column">
            From date:
            <input
              type="date"
              name="ride-min"
              value={newMin}
              min={min}
              max={newMax}
              onChange={handleChange}
            />
          </label>
        </Col>
        <Col mobileS={7} className="mt-2">
          <label className="flex-column">
            Till date:
            <input
              type="date"
              name="ride-max"
              value={newMax}
              min={newMin}
              max={max}
              onChange={handleChange}
            />
          </label>
        </Col>
      </Col>
    </Row>
  );
};

export default DateFilter;
