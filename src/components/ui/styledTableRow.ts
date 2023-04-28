import styled from 'styled-components';
import LoadingElement from './loadingElement';

const StyledTableRow = styled.tr`
  &.is-loading td {
    ${LoadingElement};
  }

  &:nth-child(even) {
    background-color: #fff5ff;
  }

  &:nth-child(odd) {
    background-color: #ffd6ff;
  }
`;

export default StyledTableRow;
