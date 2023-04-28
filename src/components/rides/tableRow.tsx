import { useContext } from 'react';
import { RidesContext } from 'src/context/ridesContext';
import StyledTableRow from '../ui/styledTableRow';

export default function TableRow({ row, rowNumber }: { row: Ride; rowNumber: number }) {
  const { isLoading, skipItems } = useContext(RidesContext);

  return (
    <StyledTableRow data-id={row.id} className={isLoading ? 'is-loading' : ''}>
      <td data-label={'#'}>{rowNumber + skipItems}</td>
      <td data-label={'Date/Time:'}>{row.departureTime.toString()}</td>
      <td data-label={'From Station:'}>{row.departureStationName}</td>
      <td data-label={'Distance (km):'}>{(row.distance / 1000).toFixed(2)}</td>
      <td data-label={'Duration (min):'}>{row.duration}</td>
      <td data-label={'To Station:'}>{row.returnStationName}</td>
    </StyledTableRow>
  );
}
