import TableRow from './tableRow';
import TableHead from './tableHead';
import { StyledCaption, StyledTable } from '@components';
import { useContext } from 'react';
import { RidesContext } from 'src/context/ridesContext';
import { numberWithCommas } from 'src/lib/utils';

export default function Table({ rows }: { rows: Ride[] }) {
  const ridesCtx = useContext(RidesContext);

  return rows.length ? (
    <StyledTable role="table">
      <StyledCaption className={ridesCtx.isLoading ? 'is-loading' : ''}>
        {numberWithCommas(ridesCtx.ridesCount) + ' results'}
      </StyledCaption>
      <TableHead />
      <tbody role="rowgroup">
        {rows.map((row, i) => {
          return <TableRow key={i} rowNumber={i + 1} row={row}></TableRow>;
        })}
      </tbody>
    </StyledTable>
  ) : (
    <p className="text-center">{numberWithCommas(ridesCtx.ridesCount) + ' results'}</p>
  );
}
 