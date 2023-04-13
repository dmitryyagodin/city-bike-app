import TableRow from './tableRow';


export default function Table({ rows }: { rows: Ride[] }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Departure Time</th>
          <th>Departure</th>
          <th>Distance</th>
          <th>Duration</th>
          <th>Return</th>
          <th>Return time</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => {
          return <TableRow key={i} row={row}></TableRow>;
        })}
      </tbody>
    </table>
  );
}
