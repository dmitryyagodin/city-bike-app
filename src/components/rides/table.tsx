import TableRow from './tableRow';
import TableHead from './tableHead';

import styled from 'styled-components';

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  & td,
  & th {
    padding: 6px 8px;
  }

  & td {
    text-align: center;
  }

  @media (max-width: 768px) {
    & thead {
      display: none;
    }

    display: block;
    width: 100%;

    & tbody,
    & tr,
    & td {
      display: block;
      width: 100%;
    }

    & tr {
      margin-bottom: 15px;
    }

    & td {
      text-align: left;
      padding-left: 50%;
      position: relative;
    }
    & td::before {
      content: attr(data-label);
      position: absolute;
      left: 0;
      width: 50%;
      padding-right: 15px;
      padding-left: 15px;
      font-weight: 700;
      text-align: right;
    }
  }
`;
 
export default function Table({ rows }: { rows: Ride[] }) {
  return (
    <StyledTable>
      <TableHead />
      <tbody>
        {rows.map((row, i) => {
          return <TableRow key={i} rowNumber={i + 1} row={row}></TableRow>;
        })}
      </tbody>
    </StyledTable>
  );
}
 