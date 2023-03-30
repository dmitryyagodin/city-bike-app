import TableRow from './tableRow';

export default function Table({ rows }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Departure</th>
          <th>Distance</th>
          <th>Duration</th>
          <th>Return</th>
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
