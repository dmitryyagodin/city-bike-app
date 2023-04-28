import { useContext } from 'react';
import { RidesContext } from 'src/context/ridesContext';
import StyledTableRow from '../ui/styledTableRow';

export default function TableRow({ row, rowNumber }: { row: Ride; rowNumber: number }) {
  const { isLoading } = useContext(RidesContext);

  return (
    <StyledTableRow data-id={row.id} className={isLoading ? 'is-loading' : ''}>
      <td>{rowNumber}</td>
      <td>{row.departureTime.toString()}</td>
      <td>{row.departureStationName}</td>
      <td className="text-center">{(row.distance / 1000).toFixed(2)}</td>
      <td className="text-center">{row.duration}</td>
      <td>{row.returnStationName}</td>
    </StyledTableRow>
  );
}
