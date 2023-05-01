import styled from 'styled-components';

const StyledTableHead = styled.thead`
  background-color: ${({ theme }) => theme.color.background};
  position: sticky;
  top: 0;
`;

export default StyledTableHead;
