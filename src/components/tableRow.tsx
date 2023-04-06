export default function TableRow({ row }: {row: Ride}) {
  return (
    <tr data-id={row.id}>
      <td>{(row.departureTime).toString()}</td>
      <td>{row.departure_station_name}</td>
      <td>{(row.distance / 1000).toFixed(2)}</td>
      <td>{row.duration}</td>
      <td>{row.return_station_name}</td>
      <td>{(row.returnTime).toString()}</td>
    </tr>
  );
}
