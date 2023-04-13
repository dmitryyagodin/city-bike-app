export default function TableRow({ row }: { row: Ride }) {
  return (
    <tr data-id={row.id}>
      <td>{row.departureTime.toString()}</td>
      <td>{row.departureStationName}</td>
      <td>{(row.distance / 1000).toFixed(2)}</td>
      <td>{row.duration}</td>
      <td>{row.returnStationName}</td>
      <td>{row.returnTime.toString()}</td>
    </tr>
  );
}
