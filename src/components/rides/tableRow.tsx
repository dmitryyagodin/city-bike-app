import { useContext } from 'react';
import { RidesContext } from 'src/context/ridesContext';
import StyledTableRow from '../ui/styledTableRow';

export default function TableRow({ row }: { row: Ride }) {
  const { isLoading } = useContext(RidesContext);

  return isLoading ? (
    <StyledTableRow data-id={row.id}>
      <td>{row.departureTime.toString()}</td>
      <td>{row.departureStationName}</td>
      <td>{(row.distance / 1000).toFixed(2)}</td>
      <td>{row.duration}</td>
      <td>{row.returnStationName}</td>
      {/* <td>{row.returnTime.toString()}</td> */}
    </StyledTableRow>
  ) : (
    <tr data-id={row.id}>
      <td>{row.departureTime.toString()}</td>
      <td>{row.departureStationName}</td>
      <td>{(row.distance / 1000).toFixed(1)}</td>
      <td>{row.duration}</td>
      <td>{row.returnStationName}</td>
      {/* <td>{row.returnTime.toString()}</td> */}
    </tr>
  );
}
