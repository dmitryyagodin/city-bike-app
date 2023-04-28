import { useContext } from 'react';
import { RidesContext } from 'src/context/ridesContext';
import StyledTableRow from '../ui/styledTableRow';

export default function TableRow({ row, rowNumber }: { row: Ride; rowNumber: number }) {
  const { isLoading } = useContext(RidesContext);

  return (
    <StyledTableRow data-id={row.id} className={isLoading ? 'is-loading' : ''}>
      <td data-label={'#'}>{rowNumber}</td>
      <td data-label={'Date'}>{row.departureTime.toString()}</td>
      <td data-label={'From Station'}>{row.departureStationName}</td>
      <td data-label={'Distance'} className="text-center">{(row.distance / 1000).toFixed(2)}</td>
      <td data-label={'Duration'} className="text-center">{row.duration}</td>
      <td data-label={'To Station'}>{row.returnStationName}</td>
    </StyledTableRow>
  );
}
