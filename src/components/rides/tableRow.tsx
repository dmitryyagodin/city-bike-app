import { useContext } from 'react';
import { RidesContext } from 'src/context/ridesContext';
import StyledTableRow from '../ui/styledTableRow';

export default function TableRow({ row }: { row: Ride }) {
  const { isLoading } = useContext(RidesContext);

  return (
    <StyledTableRow data-id={row.id} className={isLoading ? 'is-loading' : ''}>
      <td>{row.departureTime.toString()}</td>
      <td>{row.departureStationName}</td>
      <td className="text-center">{(row.distance / 1000).toFixed(2)}</td>
      <td className="text-center">{row.duration}</td>
      <td>{row.returnStationName}</td>
    </StyledTableRow>
    // ) : (
    //   <tr data-id={row.id}>
    //     <td>{row.departureTime.toString()}</td>
    //     <td>{row.departureStationName}</td>
    //     <td>{(row.distance / 1000).toFixed(2)}</td>
    //     <td>{row.duration}</td>
    //     <td>{row.returnStationName}</td>
    //   </tr>
  );
}
