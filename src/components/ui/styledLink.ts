import styled from 'styled-components';
import Link from 'next/link';

const StyledLink = styled(Link)`
  font-weight: 700;
  color: ${({ theme }) => theme.color.primary};
  display: flex;
  align-items: center;
  column-gap: 12px;
  padding: 12px;
  width: fit-content;

  &.active,
  :hover,
  :focus {
    background-color: ${({ theme }) => theme.color.primary};
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