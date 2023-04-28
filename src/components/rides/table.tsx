import TableRow from './tableRow';
import TableHead from './tableHead';

export default function Table({ rows }: { rows: Ride[] }) {
  return (
    <table>
      <TableHead />
      <tbody>
        {rows.map((row, i) => {
          return <TableRow key={i} rowNumber={i + 1} row={row}></TableRow>;
        })}
      </tbody>
    </table>
  );
}
