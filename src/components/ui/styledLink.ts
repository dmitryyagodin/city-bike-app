import styled from 'styled-components';
import Link from 'next/link';

const StyledLink = styled(Link)`
  font-size: 1.2rem;
  font-weight: 700;
  color: #4b0082;
  display: flex;
  align-items: center;
  column-gap: 12px;
  padding: 12px;

  &.active,
  :hover,
  :focus {
    background-color: #4b0082;
    color: #fff5ff;
  }

  & .icon--prev {
    transform: rotate(180deg);
  }

  & p {
    margin: 0;
  }
`;

export default StyledLink;