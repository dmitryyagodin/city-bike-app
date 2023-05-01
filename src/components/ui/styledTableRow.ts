import styled from 'styled-components';
import LoadingElement from './loadingElement';

const StyledTableRow = styled.tr`
  &.is-loading td {
    ${LoadingElement};
  }

  &:nth-child(even) {
    background-color: ${({ theme }) => theme.color.base10};
  }

  &:nth-child(odd) {
    background-color: ${({ theme }) => theme.color.base5};
  }
`;

export default StyledTableRow;
