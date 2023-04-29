import styled from 'styled-components';
import LoadingElement from './loadingElement';

const StyledHeading = styled.h2`
  &.is-loading {
    ${LoadingElement};
  }
  text-align: center;
`;

export default StyledHeading;
