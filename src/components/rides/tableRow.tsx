import { useContext } from 'react';
import { RidesContext } from 'src/context/ridesContext';
import StyledTableRow from '../ui/styledTableRow';

export default function TableRow({ row, rowNumber }: { row: Ride; rowNumber: number }) {
  const { isLoading, skipItems } = useContext(RidesContext);

  return (
    <StyledTableRow role="row" data-id={row.id} className={isLoading ? 'is-loading' : ''}>
      <td role="cell" data-label={'#'}>
        {rowNumber + skipItems}
      </td>
      <td role="cell" data-label={'Date/Time:'}>
        {row.departureTime.toString()}
      </td>
      <td role="cell" data-label={'From Station:'}>
        {row.departureStationName}
      </td>
      <td role="cell" data-label={'Distance (km):'}>
        {(row.distance / 1000).toFixed(2)}
      </td>
      <td role="cell" data-label={'Duration (min):'}>
        {row.duration}
      </td>
      <td role="cell" data-label={'To Station:'}>
        {row.returnStationName}
      </td>
    </StyledTableRow>
  );
}
