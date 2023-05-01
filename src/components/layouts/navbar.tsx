import Link from 'next/link';
import Container from '../ui/container';

import styled from 'styled-components';

const StyledHeader = styled.header`
  background-color: ${({ theme }) => theme.color.primary};
  & ul {
    padding: 0;
    height: 80px;
    margin: 0;
    list-style: none;
    color: white;
    display: flex;
    align-items: center;
    gap: 20px;

    & a {
      font-weight: 800;
      color: inherit;
      text-decoration: none;
    }
  }
`;

// export default function Navbar({ children }: { children: JSX.Element }) {
export default function Navbar() {
  return (
    <StyledHeader>
      <Container>
        <nav>
          <ul>
            <li>
              <Link href="/stations">Stations</Link>
            </li>
            <li>
              <Link href="/rides">Rides</Link>
            </li>
            <li>
              <Link href="/stations/on-map">Map</Link>
            </li>
          </ul>
        </nav>
      </Container>
    </StyledHeader>
  );
}
