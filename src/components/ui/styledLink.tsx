import styled from 'styled-components';
import Link from 'next/link';

const StyledLink = styled(Link)`
  font-size: 1.2 rem;
  font-weight: 700;
  color: #4B0082;

  :hover,
  :focus {
    background-color: #4B0082;
    color: #FFF5FF;
  }
`;



export default StyledLink;