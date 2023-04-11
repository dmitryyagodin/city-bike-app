import { useState } from 'react';

export default function DateFilter({ dateRange, stationId, emitFilterEvent }) {
  const { minDate, maxDate } = JSON.parse(dateRange);

  const min = new Date(minDate).toISOString().split('T')[0];
  const max = new Date(maxDate).toISOString().split('T')[0];

  const [newMax, setNewMax] = useState(max);
  const [newMin, setNewMin] = useState(min);

  const handleChange = (e) => {
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
    console.log(url);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        emitFilterEvent(data);
      });
  };

  return (
    <div>
      <label>
        Rides from date:
        <input
          type="date"
          name="ride-min"
          value={newMin}
          min={min}
          max={newMax}
          onChange={handleChange}
        />
      </label>
      <label>
        Rides until date:
        <input
          type="date"
          name="ride-max"
          value={newMax}
          min={newMin}
          max={max}
          onChange={handleChange}
        />
      </label>
    </div>
  );
}
