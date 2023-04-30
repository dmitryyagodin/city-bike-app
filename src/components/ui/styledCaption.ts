import styled from 'styled-components';
import LoadingElement from './loadingElement';

const StyledCaption = styled.caption`
  &.is-loading {
    ${LoadingElement};
  }
  text-align: center;
`;

export default StyledCaption;
