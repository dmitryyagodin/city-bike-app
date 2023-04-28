import TableRow from './tableRow';
import TableHead from './tableHead';

import styled from 'styled-components';

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  & td,
  & th {
    padding: 12px 15px; 
  }

  @media (max-width: 550px) {
    & thead {
      display: none;
    }

    display: block;
    width: 100%;

    & tbody, & tr, & td {
      display: block;
      width: 100%;
    }

    & tr {
      margin-bottom: 15px;
    }

    & td {
      text-align: right;
      padding-left: 50%;
      position: relative; 
    }
    & td::before {
      content: attr(data-label);
      position: absolute;
      left: 0;
      width: 50%;
      padding-left: 15px;
      font-size: 16px;
      font-weight: 700;
      text-align: left;
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
 