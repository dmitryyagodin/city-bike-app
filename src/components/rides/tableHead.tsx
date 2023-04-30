import { useContext } from 'react';
import { StyledButton, StyledTableHead } from '@components';
import { RidesContext } from '../../context/ridesContext';

enum ColumnNames {
  'departureTime' = 'Date/Time',
  'departureStationName' = 'From',
  'distance' = 'Km',
  'duration' = 'Minutes',
  'returnStationName' = 'To',
}

export default function TableHead() {
  const { searchParams, setSearchParams, setIsLoading, isLoading } = useContext(RidesContext);

  const toggleOrder: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    setIsLoading(true);
    const target = e.currentTarget as HTMLButtonElement;
    const newOrderClause = target.hasAttribute('asc')
      ? { [target.name]: 'desc' }
      : { [target.name]: 'asc' };
    const nextOrderClause: OrderBy = { ...searchParams.orderBy, ...newOrderClause };

    if (target.hasAttribute('asc')) {
      target.removeAttribute('asc');
      target.setAttribute('desc', 'true');
    } else {
      target.removeAttribute('desc');
      target.setAttribute('asc', 'true');
    }
    setSearchParams({ ...searchParams, orderBy: nextOrderClause });
  };

  return (
    <StyledTableHead role="rowgroup">
      <tr role="row">
        <th role="columnheader">#</th>
        {Object.entries(ColumnNames).map(([property, value], index) => {
          return (
            <th key={index} role="columnheader">
              <StyledButton name={property} onClick={toggleOrder} disabled={isLoading}>
                <span>{value}</span>
                <svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
                  <path d="m15.5 13-9 9h37l-9-9c-4.9-5-9.2-9-9.5-9-.3 0-4.6 4-9.5 9.2z" />
                  <path d="m15.5 26-9 9zM15.8 35.2l9.2 9.3 9.2-9.3 9.3-9.2h-37l9.3 9.2z" />
                </svg>
              </StyledButton>
            </th>
          );
        })}
      </tr>
    </StyledTableHead>
  );
}
